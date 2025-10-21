import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Heart, MapPin, Clock, User, AlertCircle, Loader2 } from "lucide-react";
import { useItem, useTrackItemView } from "@/hooks/useApi";
import { useEffect } from "react";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useItem(id || '');
  const trackItemView = useTrackItemView();

  // Track view when component mounts
  useEffect(() => {
    if (id) {
      trackItemView.mutate({
        item_id: id,
        user_id: undefined, // TODO: Add user authentication
      });
    }
  }, [id, trackItemView]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading item details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.item) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load item details. The item may not exist.
            </AlertDescription>
          </Alert>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const item = data.item;

  // Helper functions
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  
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

  const getImageUrl = (index: number = 0) => {
    if (item.images && item.images.length > index) {
      return item.images[index];
    }
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Back button */}
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Items
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image section */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={getImageUrl(0)} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Additional images */}
            {item.images && item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.slice(1, 5).map((image, index) => (
                  <Card key={index}>
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <img 
                          src={image} 
                          alt={`${item.title} ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Details section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">{item.title}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-secondary text-secondary-foreground">
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {item.condition}
                    </Badge>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="text-4xl font-bold text-primary mb-6">
                {formatPrice(item.price)}
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>

            {/* Seller info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Seller Information</h3>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{item.seller_name}</span>
                </div>
              </CardContent>
            </Card>

            {/* Item details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Item Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Posted {getTimeAgo(item.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Seller: {item.seller_name}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                Contact Seller
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Make Offer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
