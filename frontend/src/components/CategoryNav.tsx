import { Button } from "@/components/ui/button";
import { BookOpen, Laptop, Sofa, Shirt, Car, Gamepad2, Coffee, MoreHorizontal } from "lucide-react";

const categories = [
  { name: "Textbooks", icon: BookOpen, count: "150+" },
  { name: "Electronics", icon: Laptop, count: "89+" },
  { name: "Furniture", icon: Sofa, count: "67+" },
  { name: "Clothing", icon: Shirt, count: "45+" },
  { name: "Transportation", icon: Car, count: "23+" },
  { name: "Gaming", icon: Gamepad2, count: "34+" },
  { name: "Kitchen", icon: Coffee, count: "56+" },
  { name: "More", icon: MoreHorizontal, count: "" }
];

const CategoryNav = () => {
  return (
    <section className="py-8 bg-uva-gray">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-white hover:shadow-card transition-all duration-300"
              >
                <Icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{category.name}</span>
                {category.count && (
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;