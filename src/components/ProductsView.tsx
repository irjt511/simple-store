import { Product } from '../data/products';

interface ProductsViewProps {
  products: Product[];
  addToCart: (product: Product) => void;
  viewProductDetails: (product: Product) => void;
  categoryName: string;
  setCurrentView: (view: 'categories' | 'products' | 'product-details' | 'cart' | 'checkout') => void;
}

export function ProductsView({ products, addToCart, viewProductDetails, categoryName, setCurrentView }: ProductsViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">{categoryName}</h2>
        <button
          onClick={() => setCurrentView('categories')}
          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 text-lg bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          ← العودة للتصنيفات
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.map((product: Product) => (
          <div key={product.id} className="product-card border border-blue-100 relative">
            {product.isSpecialOffer && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                عرض حصري
              </div>
            )}
            <div className="overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image cursor-pointer"
                onClick={() => viewProductDetails(product)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)';
                  target.style.display = 'flex';
                  target.style.alignItems = 'center';
                  target.style.justifyContent = 'center';
                  target.style.color = 'white';
                  target.style.fontSize = '16px';
                  target.style.fontWeight = 'bold';
                  target.style.textAlign = 'center';
                  target.style.padding = '20px';
                  target.innerHTML = product.name;
                  target.src = '';
                }}
              />
            </div>
            <div className="p-6">
              <h3 
                className="text-xl font-bold mb-3 text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => viewProductDetails(product)}
              >
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">{product.price} ريال</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => viewProductDetails(product)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-300 font-semibold"
                  >
                    التفاصيل
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
