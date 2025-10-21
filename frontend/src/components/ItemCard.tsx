import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Clock } from "lucide-react";
import type { Item } from "@/types/api";
import { useTrackItemView } from "@/hooks/useApi";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const navigate = useNavigate();
  const trackItemView = useTrackItemView();

  // Helper function to format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  };

  // Helper function to format price
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Helper function to get first image or placeholder
  const getImageUrl = () => {
    if (item.images && item.images.length > 0) {
      return item.images[0];
    }
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'; // Placeholder
  };

  const handleCardClick = async () => {
    try {
      // Track the view
      await trackItemView.mutateAsync({
        item_id: item.id,
        user_id: undefined, // TODO: Add user authentication
      });
      
      // Navigate to item detail page
      navigate(`/item/${item.id}`);
    } catch (error) {
      console.error('Failed to track item view:', error);
      // Still navigate even if tracking fails
      navigate(`/item/${item.id}`);
    }
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img 
            src={getImageUrl()} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button 
            size="icon" 
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Badge className="absolute bottom-2 left-2 bg-secondary text-secondary-foreground">
            {item.category}
          </Badge>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-primary">{formatPrice(item.price)}</span>
            <Badge variant="outline" className="capitalize">{item.condition}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {item.seller_name}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {getTimeAgo(item.created_at)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;