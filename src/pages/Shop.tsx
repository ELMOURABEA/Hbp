import { useState, useEffect } from "react";
import { Filter, Search, ShoppingCart, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useSettings } from "@/src/contexts/SettingsContext";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { t } = useSettings();

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
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-slate-950 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-serif mb-2">{t("shop.title")}</h1>
          <p className="text-slate-600 dark:text-slate-400">{t("shop.desc")}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder={t("shop.search")}
              className="ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-brand-red transition-all dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-brand-red text-white shadow-md shadow-red-200 dark:shadow-none" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
            <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 animate-pulse">
              <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4" />
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-2/3 mb-2" />
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2 mb-4" />
              <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded" />
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
                className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all group flex flex-col"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-50 dark:bg-slate-800">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg text-[10px] font-bold text-slate-900 dark:text-white uppercase">
                    {product.company}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="text-xs font-bold text-brand-red uppercase tracking-wider mb-1">{product.category}</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 truncate">{product.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 h-10">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {product.price} <span className="text-xs font-normal text-slate-500">EGP</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleBuyNow(product)}
                      className="p-2.5 bg-slate-900 dark:bg-brand-red text-white rounded-xl hover:bg-brand-red dark:hover:bg-brand-red-dark transition-colors shadow-lg shadow-slate-100 dark:shadow-none"
                      title={t("shop.buy")}
                    >
                      <ShoppingCart size={18} />
                    </button>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      title={t("shop.details")}
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

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl w-full max-w-lg shadow-2xl relative border border-slate-100 dark:border-slate-800"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-slate-50 dark:bg-slate-800">
                 <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-bold text-brand-red uppercase tracking-wider mb-1">{selectedProduct.category}</div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedProduct.name}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">By {selectedProduct.company}</p>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedProduct.price} <span className="text-sm font-normal text-slate-500">EGP</span>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert prose-slate mb-8 max-w-none">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedProduct.description}
                </p>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium m-0 flex items-start gap-2">
                    <Info size={18} className="shrink-0 mt-0.5" />
                    Always read the label. Use only as directed. If symptoms persist see your healthcare professional.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => handleBuyNow(selectedProduct)}
                className="w-full bg-brand-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-red-dark transition-colors shadow-lg shadow-brand-red/20"
              >
                <ShoppingCart size={20} />
                {t("shop.buy")}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
