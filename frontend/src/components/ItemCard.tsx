import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Clock } from "lucide-react";

interface ItemCardProps {
  title: string;
  price: string;
  image: string;
  condition: string;
  location: string;
  timeAgo: string;
  category: string;
}

const ItemCard = ({ title, price, image, condition, location, timeAgo, category }: ItemCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button 
            size="icon" 
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Badge className="absolute bottom-2 left-2 bg-secondary text-secondary-foreground">
            {category}
          </Badge>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-primary">{price}</span>
            <Badge variant="outline">{condition}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;