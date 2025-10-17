import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import ItemsGrid from "@/components/ItemsGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CategoryNav />
        <ItemsGrid />
      </main>
      
      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CavalierMarket</h3>
              <p className="text-sm opacity-90">
                The trusted marketplace for UVA students to buy and sell items safely within the university community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-secondary transition-colors">Browse Items</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Sell an Item</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-secondary transition-colors">Textbooks</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Furniture</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Clothing</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2024 CavalierMarket. Made for UVA students, by UVA students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
