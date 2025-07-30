import { Product } from "../data/products";

interface ProductsViewProps {
  products: Product[];
  addToCart: (product: Product) => void;
  setCurrentView: (view: 'categories' | 'products' | 'product-details' | 'cart' | 'checkout') => void;
  setSelectedProduct: (product: Product) => void;
}
export function ProductsView({ products, addToCart, setCurrentView, setSelectedProduct }: ProductsViewProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">الخدمات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* صورة المنتج */}
            <div className="bg-blue-900 h-40 flex items-center justify-center text-white text-xl font-bold">
              {product.name}
            </div>

            {/* تفاصيل سريعة */}
            <div className="p-4 flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-blue-600 font-bold text-xl">{product.price} ريال</p>

              {/* أزرار */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentView('product-details');
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg py-2 transition-all"
                >
                  التفاصيل
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition-all"
                >
                  أضف للسلة
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}