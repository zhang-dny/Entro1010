import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, X } from "lucide-react";

interface HeroProps {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onRemoveCategory: (category: string) => void;
}

const Hero = ({ selectedCategories, onCategoryToggle, onRemoveCategory }: HeroProps) => {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-hero overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Buy & Sell with Fellow
            <span className="text-secondary"> Cavaliers</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 opacity-90">
            The trusted marketplace for UVA students. Find textbooks, furniture, electronics, and more from your peers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="What are you looking for?"
                className="pl-10 bg-white/95 border-0 h-12 text-black placeholder:text-gray-500"
              />
            </div>
            <Button size="lg" variant="secondary" className="h-12 px-6">
              Search
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button 
              className={`rounded-full px-4 py-2 transition-colors cursor-pointer ${
                selectedCategories.includes('Textbooks') 
                  ? 'bg-white/40 border-2 border-white/60' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              onClick={() => onCategoryToggle('Textbooks')}
            >
              📚 Textbooks
            </button>
            <button 
              className={`rounded-full px-4 py-2 transition-colors cursor-pointer ${
                selectedCategories.includes('Furniture') 
                  ? 'bg-white/40 border-2 border-white/60' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              onClick={() => onCategoryToggle('Furniture')}
            >
              🪑 Furniture
            </button>
            <button 
              className={`rounded-full px-4 py-2 transition-colors cursor-pointer ${
                selectedCategories.includes('Electronics') 
                  ? 'bg-white/40 border-2 border-white/60' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              onClick={() => onCategoryToggle('Electronics')}
            >
              💻 Electronics
            </button>
            <button 
              className={`rounded-full px-4 py-2 transition-colors cursor-pointer ${
                selectedCategories.includes('Clothing') 
                  ? 'bg-white/40 border-2 border-white/60' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              onClick={() => onCategoryToggle('Clothing')}
            >
              👕 Clothing
            </button>
          </div>
          
          {/* Selected Categories with X buttons */}
          {selectedCategories.length > 0 && (
            <div className="mt-6">
              <p className="text-sm opacity-80 mb-3">Selected Categories:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedCategories.map((category) => (
                  <div 
                    key={category}
                    className="bg-white/30 rounded-full px-3 py-1 flex items-center gap-2 text-sm"
                  >
                    <span>
                      {category === 'Textbooks' && '📚'}
                      {category === 'Furniture' && '🪑'}
                      {category === 'Electronics' && '💻'}
                      {category === 'Clothing' && '👕'}
                      {category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveCategory(category);
                      }}
                      className="hover:bg-white/20 rounded-full p-1 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;