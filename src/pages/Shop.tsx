import { useState, useEffect } from "react";
import { Filter, Search, ShoppingCart, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  company: string;
  image: string;
  description: string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = products;

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      result = result.filter((p) => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, products]);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const handleBuyNow = async (product: Product) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      window.location.href = data.paymentUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong with the checkout. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-serif mb-2">Pharmacy Shop</h1>
          <p className="text-slate-600">Premium health and wellness products delivered to your door.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search medications..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-brand-red transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-brand-red text-white shadow-md shadow-red-200" 
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-4 border border-slate-100 animate-pulse">
              <div className="aspect-[4/3] bg-slate-100 rounded-2xl mb-4" />
              <div className="h-6 bg-slate-100 rounded w-2/3 mb-2" />
              <div className="h-4 bg-slate-100 rounded w-1/2 mb-4" />
              <div className="h-10 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl p-4 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group flex flex-col"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold text-slate-900 uppercase">
                    {product.company}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="text-xs font-bold text-brand-red uppercase tracking-wider mb-1">{product.category}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{product.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                  <div className="text-xl font-bold text-slate-900">
                    {product.price} <span className="text-xs font-normal text-slate-500">EGP</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleBuyNow(product)}
                      className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-brand-red transition-colors shadow-lg shadow-slate-100"
                      title="Buy Now"
                    >
                      <ShoppingCart size={18} />
                    </button>
                    <button 
                      className="p-2.5 bg-slate-50 text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                      title="Product Details"
                    >
                      <Info size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full text-slate-400 mb-4">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No products found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
            className="mt-6 text-brand-red font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
