import { Product } from '../data/products';

interface ProductDetailsViewProps {
  product: Product;
  addToCart: (product: Product) => void;
  setCurrentView: (view: 'categories' | 'products' | 'product-details' | 'cart' | 'checkout') => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

export function ProductDetailsView({ product, addToCart, setCurrentView, cartItemsCount, onCartClick }: ProductDetailsViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentView('products')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <span className="text-lg">←</span>
              </div>
              <span className="font-medium">العودة للمنتجات</span>
            </button>
            
            <h1 className="text-xl font-bold text-gray-800">تفاصيل المنتج</h1>
            
            <button
              onClick={onCartClick}
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
            >
              <span>🛒</span>
              <span>السلة</span>
              {cartItemsCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* قسم الصورة */}
            <div className="relative">
              {product.isSpecialOffer && (
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🔥 عرض خاص
                  </div>
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  target.style.display = 'flex';
                  target.style.alignItems = 'center';
                  target.style.justifyContent = 'center';
                  target.style.color = 'white';
                  target.style.fontSize = '24px';
                  target.style.fontWeight = 'bold';
                  target.style.textAlign = 'center';
                  target.style.padding = '40px';
                  target.innerHTML = product.name;
                  target.src = '';
                }}
              />
            </div>

            {/* قسم التفاصيل */}
            <div className="p-8 flex flex-col">
              <div className="flex-grow">
                {/* العنوان والسعر */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <span className="text-lg text-gray-600">ريال سعودي</span>
                  </div>
                  
                  {product.deliveryTime && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full w-fit">
                      <span className="text-lg">⚡</span>
                      <span className="font-medium">{product.deliveryTime}</span>
                    </div>
                  )}
                </div>

                {/* الوصف */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">وصف المنتج</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                {/* الميزات */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">المميزات الرئيسية</h2>
                    <div className="grid grid-cols-1 gap-3">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* معلومات إضافية */}
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">ضمانات الجودة</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">🛡️</span>
                      <span className="text-sm text-gray-700">ضمان الجودة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">🔄</span>
                      <span className="text-sm text-gray-700">مراجعات مجانية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">💬</span>
                      <span className="text-sm text-gray-700">دعم فني</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-600">📞</span>
                      <span className="text-sm text-gray-700">استشارة مجانية</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* زر الإضافة للسلة */}
              <div className="mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <span className="text-xl">🛒</span>
                  <span>أضف إلى السلة - {product.price} ريال</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* قسم المنتجات المشابهة */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            قد يعجبك أيضاً
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <p>المنتجات المشابهة ستظهر هنا قريباً</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
