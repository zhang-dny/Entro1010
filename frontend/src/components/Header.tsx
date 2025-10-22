import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRefreshStore } from "@/hooks/useApi";

const Header = () => {
  const navigate = useNavigate();
  const refreshStore = useRefreshStore();
  
  const handleRefresh = () => {
    refreshStore();
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-hero"></div>
            <h1 className="text-xl font-bold text-primary">UVALoop</h1>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search for textbooks, furniture, electronics..." 
              className="pl-10 text-foreground"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRefresh}
            title="Refresh data"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            Netbadge Sign In
          </Button>
          <Button 
            size="sm" 
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            onClick={() => navigate('/sell')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Sell Item
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;