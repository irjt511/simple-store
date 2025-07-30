import { Product } from '../data/products';

interface ProductDetailsViewProps {
  product: Product;
  addToCart: (product: Product) => void;
  setCurrentView: (view: 'categories' | 'products' | 'product-details' | 'cart' | 'checkout') => void;
}

export function ProductDetailsView({ product, addToCart, setCurrentView }: ProductDetailsViewProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const fallbackDiv = document.createElement('div');
    fallbackDiv.style.width = '100%';
    fallbackDiv.style.height = '100%';
    fallbackDiv.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)';
    fallbackDiv.style.color = 'white';
    fallbackDiv.style.display = 'flex';
    fallbackDiv.style.alignItems = 'center';
    fallbackDiv.style.justifyContent = 'center';
    fallbackDiv.style.fontSize = '20px';
    fallbackDiv.style.fontWeight = 'bold';
    fallbackDiv.style.borderRadius = '12px';
    fallbackDiv.innerText = product.name;
    e.currentTarget.parentNode?.appendChild(fallbackDiv);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">تفاصيل الخدمة</h1>
        <button
          onClick={() => setCurrentView('products')}
          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 text-lg bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          ← العودة للخدمات
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
        {product.isSpecialOffer && (
          <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold z-10 shadow-lg">
            عرض حصري
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* صورة المنتج */}
          <div className="p-8 flex justify-center items-center h-96">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xl font-bold rounded-xl shadow-lg">
                {product.name}
              </div>
            )}
          </div>

          {/* تفاصيل المنتج */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">{product.price} ريال</span>
            </div>

            {product.deliveryTime && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-xl">⏰</span>
                  <span className="font-semibold text-gray-800">مدة التسليم:</span>
                  <span className="text-blue-600 font-semibold">{product.deliveryTime}</span>
                </div>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">ما يشمله هذه الخدمة:</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="text-green-500 text-lg">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              أضف إلى السلة - {product.price} ريال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
