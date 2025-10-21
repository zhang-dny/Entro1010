import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Laptop, Sofa, Shirt, Car, Gamepad2, Coffee, MoreHorizontal, Loader2, AlertCircle } from "lucide-react";
import { useCategories } from "@/hooks/useApi";
import { useState } from "react";

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  "Textbooks": BookOpen,
  "Electronics": Laptop,
  "Furniture": Sofa,
  "Clothing": Shirt,
  "Transportation": Car,
  "Gaming": Gamepad2,
  "Kitchen": Coffee,
  "Appliances": Coffee,
  "Accessories": MoreHorizontal,
};

const CategoryNav = () => {
  const { data, isLoading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    // TODO: Implement category filtering
    console.log('Selected category:', category);
  };

  if (isLoading) {
    return (
      <section className="py-8 bg-uva-gray">
        <div className="container">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2">Loading categories...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-uva-gray">
        <div className="container">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load categories. Please refresh the page.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  const categories = data?.categories || [];

  return (
    <section className="py-8 bg-uva-gray">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || MoreHorizontal;
            const isSelected = selectedCategory === category;
            
            return (
              <Button
                key={category}
                variant={isSelected ? "default" : "ghost"}
                className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300 ${
                  isSelected 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-white hover:shadow-card"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{category}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;