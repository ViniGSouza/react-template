/**
 * Notifications Dropdown
 * Dropdown de notificações com badge de contador
 */

import { useState } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  useNotificationsStore,
  type NotificationType,
} from "@/core/store/notifications.store";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

const notificationIcons: Record<NotificationType, React.ReactNode> = {
  info: <Info className="h-4 w-4 text-blue-500" />,
  success: <CheckCircle className="h-4 w-4 text-green-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  error: <XCircle className="h-4 w-4 text-red-500" />,
};

const notificationColors: Record<NotificationType, string> = {
  info: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
  success:
    "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
  warning:
    "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
  error: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
};

export const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  } = useNotificationsStore();

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    markAsRead(id);
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(id);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div className="relative">
        <DropdownMenuTrigger>
          <button
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-accent cursor-pointer"
            aria-label="Notificações"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center animate-pulse"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </button>
        </DropdownMenuTrigger>

        {open && (
          <DropdownMenuContent align="end" className="p-0 bg-card">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3 bg-card">
              <div>
                <h3 className="font-semibold">Notificações</h3>
                <p className="text-xs text-muted-foreground">
                  {unreadCount} não lida{unreadCount !== 1 ? "s" : ""}
                </p>
              </div>
              {notifications.length > 0 && (
                <div className="flex gap-1">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="h-8 px-2 text-xs"
                      title="Marcar todas como lidas"
                    >
                      <CheckCheck className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="h-8 px-2 text-xs hover:text-destructive"
                    title="Limpar todas"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nenhuma notificação
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={cn(
                        "flex flex-col items-start gap-2 p-3 cursor-default hover:bg-transparent",
                        !notification.read && "border-l-2 border-primary"
                      )}
                      onClick={() =>
                        !notification.read && markAsRead(notification.id)
                      }
                    >
                      <div
                        className={cn(
                          "w-full rounded-lg border p-3 transition-all",
                          notificationColors[notification.type],
                          !notification.read && "shadow-sm"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {notificationIcons[notification.type]}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-medium leading-tight">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(
                                  new Date(notification.timestamp),
                                  {
                                    addSuffix: true,
                                    locale: ptBR,
                                  }
                                )}
                              </span>
                              <div className="flex gap-1">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2 text-xs"
                                    onClick={(e) =>
                                      handleMarkAsRead(notification.id, e)
                                    }
                                  >
                                    <CheckCheck className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs hover:text-destructive"
                                  onClick={(e) =>
                                    handleRemove(notification.id, e)
                                  }
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              )}
            </div>
          </DropdownMenuContent>
        )}
      </div>
    </DropdownMenu>
  );
};
