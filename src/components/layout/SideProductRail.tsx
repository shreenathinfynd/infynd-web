import { Link, useLocation } from "react-router-dom";
import { products } from "@/data/products";
import { Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles,
};

interface SideProductRailProps {
  open: boolean;
}

const SideProductRail = ({ open }: SideProductRailProps) => {
  const location = useLocation();

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 bg-sidebar border-r overflow-y-auto transition-all duration-300 ease-in-out",
        open ? "w-60" : "w-0 -translate-x-full lg:w-14 lg:translate-x-0"
      )}
    >
      <nav className="py-4">
        {categories.map((cat) => (
          <div key={cat} className="mb-4">
            <h3 className={cn(
              "px-4 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2",
              !open && "lg:hidden"
            )}>
              {cat}
            </h3>
            {products
              .filter((p) => p.category === cat)
              .map((product) => {
                const Icon = iconMap[product.icon] || Sparkles;
                const isActive = location.pathname === `/products/${product.slug}`;
                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className={cn("truncate", !open && "lg:hidden")}>{product.shortName}</span>
                  </Link>
                );
              })}
          </div>
        ))}

        {/* Extra nav items */}
        <div className="border-t border-sidebar-border mt-4 pt-4">
          {[
            { label: "Compare Products", to: "/compare" },
            { label: "Use Cases", to: "/use-cases" },
            { label: "Compliance", to: "/compliance" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "block px-4 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                !open && "lg:hidden"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default SideProductRail;
