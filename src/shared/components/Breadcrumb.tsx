import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useBreadcrumbs } from "@/shared/hooks";

export const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>

      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={breadcrumb.path} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="font-medium text-foreground">
                {breadcrumb.title}
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="hover:text-foreground transition-colors"
              >
                {breadcrumb.title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
