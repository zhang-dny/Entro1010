import ItemCard from "./ItemCard";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, Loader2, AlertCircle, X } from "lucide-react";
import { useStorePage, useRefreshStore } from "@/hooks/useApi";
import { useEffect, useMemo } from "react";

interface ItemsGridProps {
  selectedCategories?: string[];
  onClearAllFilters?: () => void;
}

const ItemsGrid = ({ selectedCategories = [], onClearAllFilters }: ItemsGridProps) => {
  const { data, isLoading, error, refetch } = useStorePage();
  const refreshStore = useRefreshStore();

  // Filter items based on selected categories - MUST be called before any early returns
  const filteredItems = useMemo(() => {
    if (!data?.items) return [];
    if (selectedCategories.length === 0) return data.items;
    
    return data.items.filter(item => 
      selectedCategories.some(category => 
        item.category.toLowerCase() === category.toLowerCase()
      )
    );
  }, [data?.items, selectedCategories]);

  // Refresh data when component mounts (e.g., returning from item detail)
  useEffect(() => {
    refreshStore();
  }, [refreshStore]);

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading items...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load items. Please try again.
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-4"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  const items = filteredItems;

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary">
              {selectedCategories.length > 0 
                ? `${selectedCategories.length === 1 ? selectedCategories[0] : 'Multiple Categories'} Items` 
                : 'Featured Items'
              }
            </h2>
            <p className="text-muted-foreground mt-1">
              {items.length} {selectedCategories.length > 0 ? 'filtered' : 'total'} items available
            </p>
            {selectedCategories.length > 0 && (
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onClearAllFilters}
                  className="text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
          <Button variant="outline">
            View All Items
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {selectedCategories.length > 0 
                ? `No items found for the selected categories.`
                : 'No items available at the moment.'
              }
            </p>
            {selectedCategories.length > 0 && onClearAllFilters ? (
              <div className="mt-4 space-x-2">
                <Button 
                  variant="outline" 
                  onClick={onClearAllFilters}
                >
                  Clear All Filters
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => refetch()}
                >
                  Refresh
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => refetch()}
              >
                Refresh
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
            
            <div className="text-center">
              <Button size="lg" variant="secondary" className="px-8">
                Load More Items
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ItemsGrid;