import { Product } from '../data/products';
import { useState } from 'react';

interface ProductDetailsViewProps {
  product: Product;
  addToCart: (product: Product) => void;
  setCurrentView: (view: 'categories' | 'products' | 'product-details' | 'cart' | 'checkout') => void;
}

export function ProductDetailsView({ product, addToCart, setCurrentView }: ProductDetailsViewProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header مُحسن */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentView('products')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <span className="text-lg">←</span>
              </div>
              <span className="font-medium">العودة للخدمات</span>
            </button>
            <div className="text-sm text-gray-500">تفاصيل الخدمة</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* بطاقة المنتج الرئيسية */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-gray-100">
          {/* شارة العرض الحصري */}
          {product.isSpecialOffer && (
            <div className="absolute top-6 right-6 z-10">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                🔥 عرض حصري
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* قسم الصورة المُحسن */}
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8 lg:p-12">
              <div className="relative group">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.style.color = 'white';
                    target.style.fontSize = '18px';
                    target.style.fontWeight = 'bold';
                    target.style.textAlign = 'center';
                    target.style.padding = '40px';
                    target.innerHTML = product.name;
                    target.src = '';
                  }}
                />
                {/* تأثير الإضاءة */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* قسم التفاصيل المُحسن */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              {/* العنوان والسعر */}
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {product.price}
                      </span>
                      <span className="text-xl text-gray-600 font-medium">ريال</span>
                    </div>
                  </div>
                </div>

                {/* مدة التسليم */}
                {product.deliveryTime && (
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-xl border border-green-200">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-lg">⚡</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">مدة التسليم</div>
                        <div className="font-bold text-green-700">{product.deliveryTime}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* الوصف */}
                <div className="mb-8">
                  <div className="text-gray-700 text-lg leading-relaxed">
                    {showFullDescription ? (
                      <div>
                        <p className="mb-4">{product.description}</p>
                        <button
                          onClick={() => setShowFullDescription(false)}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                        >
                          عرض أقل <span className="transform rotate-180">↓</span>
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-2">
                          {product.description.length > 100 
                            ? `${product.description.substring(0, 100)}...` 
                            : product.description
                          }
                        </p>
                        {product.description.length > 100 && (
                          <button
                            onClick={() => setShowFullDescription(true)}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                          >
                            عرض المزيد <span>↓</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* الميزات */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm">✨</span>
                      </span>
                      ما يشمله هذه الخدمة
                    </h3>
                    <div className="grid gap-3">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-600 text-sm">✓</span>
                          </div>
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* زر الإضافة للسلة */}
              <div className="space-y-4">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <span>🛒</span>
                    <span>أضف إلى السلة - {product.price} ريال</span>
                  </div>
                </button>
                
                {/* معلومات إضافية */}
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>🔒</span>
                    <span>دفع آمن</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📞</span>
                    <span>دعم 24/7</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>✅</span>
                    <span>ضمان الجودة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* قسم إضافي للثقة */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">تسليم سريع</h3>
            <p className="text-gray-600 text-sm">نلتزم بالمواعيد المحددة</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">جودة عالية</h3>
            <p className="text-gray-600 text-sm">معايير احترافية متقدمة</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">دعم مستمر</h3>
            <p className="text-gray-600 text-sm">متابعة ما بعد التسليم</p>
          </div>
        </div>
      </div>
    </div>
  );
}
