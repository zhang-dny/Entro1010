import ItemCard from "./ItemCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Mock data for demonstration
const featuredItems = [
  {
    id: 1,
    title: "Calculus Textbook - Early Transcendentals",
    price: "$85",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    condition: "Like New",
    location: "McCormick Dorms",
    timeAgo: "2 hours ago",
    category: "Textbooks"
  },
  {
    id: 2,
    title: "MacBook Pro 13-inch 2020",
    price: "$950",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    condition: "Good",
    location: "Alderman Library",
    timeAgo: "5 hours ago",
    category: "Electronics"
  },
  {
    id: 3,
    title: "IKEA Study Desk with Chair",
    price: "$120",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    condition: "Good",
    location: "Copeley Dorms",
    timeAgo: "1 day ago",
    category: "Furniture"
  },
  {
    id: 4,
    title: "UVA Hoodie - Official Merchandise",
    price: "$35",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    condition: "Excellent",
    location: "The Corner",
    timeAgo: "3 hours ago",
    category: "Clothing"
  },
  {
    id: 5,
    title: "Nintendo Switch with Games",
    price: "$220",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    condition: "Like New",
    location: "Hereford College",
    timeAgo: "6 hours ago",
    category: "Gaming"
  },
  {
    id: 6,
    title: "Mini Fridge - Perfect for Dorms",
    price: "$75",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
    condition: "Good",
    location: "Gooch Dillard",
    timeAgo: "4 hours ago",
    category: "Appliances"
  }
];

const ItemsGrid = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-primary">Featured Items</h2>
          <Button variant="outline">
            View All Items
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredItems.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" variant="secondary" className="px-8">
            Load More Items
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ItemsGrid;