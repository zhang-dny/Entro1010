import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";


const Hero = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src={import.meta.env.VITE_HERO_IMAGE} 
          alt="UVA Campus marketplace" 
          className="w-full h-full object-cover"
        />
      </div>
      
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
                className="pl-10 bg-white/95 border-0 h-12"
              />
            </div>
            <Button size="lg" variant="secondary" className="h-12 px-6">
              Search
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 rounded-full px-4 py-2">📚 Textbooks</span>
            <span className="bg-white/20 rounded-full px-4 py-2">🪑 Furniture</span>
            <span className="bg-white/20 rounded-full px-4 py-2">💻 Electronics</span>
            <span className="bg-white/20 rounded-full px-4 py-2">👕 Clothing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;