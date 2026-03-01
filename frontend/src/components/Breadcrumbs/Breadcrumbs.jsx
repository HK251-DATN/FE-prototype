import { Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [] }) {
  return (
    <div
      className="relative h-[64px] md:h-[80px] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://agriculture-ecommerce.s3.ap-southeast-2.amazonaws.com/breadcrumps.png)`,
      }}
    >
      <div className="absolute inset-0" />

      <div className="relative container mx-auto px-20 h-full flex flex-col justify-center">
        <nav className="flex items-center text-gray-200 text-sm">
          <Link to="/">
            <Home size={16} />
          </Link>

          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              <ChevronRight size={14} className="mx-2" />

              {item.href ? (
                <Link to={item.href} className="hover:text-green-400">
                  {item.label}
                </Link>
              ) : (
                <span className="text-green-400 font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
