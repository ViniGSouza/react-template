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
  info: <Info className="w-4 h-4 text-blue-500" />,
  success: <CheckCircle className="w-4 h-4 text-green-500" />,
  warning: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
  error: <XCircle className="w-4 h-4 text-red-500" />,
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
        <DropdownMenuTrigger
          className="inline-flex relative justify-center items-center w-9 h-9 rounded-full transition-colors cursor-pointer hover:bg-accent"
          aria-label="Notificações"
          onClick={() => setOpen(!open)}
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="flex absolute -top-1 -right-1 justify-center items-center p-0 w-5 h-5 text-xs rounded-full animate-pulse"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </DropdownMenuTrigger>

        {open && (
          <DropdownMenuContent align="end" className="p-0">
            <div className="flex justify-between items-center px-4 py-3 border-b bg-card">
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
                      className="px-2 h-8 text-xs"
                      title="Marcar todas como lidas"
                    >
                      <CheckCheck className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="px-2 h-8 text-xs hover:text-destructive"
                    title="Limpar todas"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>

            <div className="min-w-[300px] max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col justify-center items-center py-8 text-center">
                  <Bell className="mb-2 w-8 h-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    Nenhuma notificação
                  </p>
                </div>
              ) : (
                <div className="p-2 space-y-1">
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
                        <div className="flex gap-3 items-start">
                          <div className="mt-0.5">
                            {notificationIcons[notification.type]}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex gap-2 justify-between items-start">
                              <h4 className="text-sm font-medium leading-tight">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                              )}
                            </div>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                              {notification.message}
                            </p>
                            <div className="flex justify-between items-center pt-1">
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
                                    className="px-2 h-6 text-xs"
                                    onClick={(e) =>
                                      handleMarkAsRead(notification.id, e)
                                    }
                                  >
                                    <CheckCheck className="w-3 h-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="px-2 h-6 text-xs hover:text-destructive"
                                  onClick={(e) =>
                                    handleRemove(notification.id, e)
                                  }
                                >
                                  <Trash2 className="w-3 h-3" />
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
