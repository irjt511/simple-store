import { Product } from '../data/products';

interface ProductsViewProps {
  products: Product[];
  viewProductDetails: (product: Product) => void;
  addToCart: (product: Product) => void;
  setCurrentView: (view: 'categories' | 'products' | 'product-details' | 'cart' | 'checkout') => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

export function ProductsView({ products, viewProductDetails, addToCart, setCurrentView, cartItemsCount, onCartClick }: ProductsViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentView('categories')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <span className="text-lg">←</span>
              </div>
              <span className="font-medium">العودة للتصنيفات</span>
            </button>
            
            <h1 className="text-xl font-bold text-gray-800">المنتجات</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* شبكة المنتجات مع ارتفاع ثابت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col h-full group"
            >
              {/* قسم الصورة - ارتفاع ثابت */}
              <div className="relative h-48 flex-shrink-0 overflow-hidden">
                {product.isSpecialOffer && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      🔥 عرض
                    </div>
                  </div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                  onClick={() => viewProductDetails(product)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.style.color = 'white';
                    target.style.fontSize = '14px';
                    target.style.fontWeight = 'bold';
                    target.style.textAlign = 'center';
                    target.style.padding = '20px';
                    target.innerHTML = product.name;
                    target.src = '';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* قسم المحتوى - يتمدد ليملأ المساحة المتبقية */}
              <div className="p-4 flex flex-col flex-grow">
                {/* العنوان - ارتفاع ثابت */}
                <div className="h-12 mb-3">
                  <h3 
                    className="text-lg font-bold text-gray-900 line-clamp-2 leading-6 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => viewProductDetails(product)}
                  >
                    {product.name}
                  </h3>
                </div>

                {/* الوصف - ارتفاع ثابت */}
                <div className="h-12 mb-4">
                  <p className="text-gray-600 text-sm line-clamp-2 leading-6">
                    {product.description}
                  </p>
                </div>

                {/* السعر ومدة التسليم */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-600">ريال</span>
                    </div>
                  </div>
                  
                  {product.deliveryTime && (
                    <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
                      <span>⚡</span>
                      <span>{product.deliveryTime}</span>
                    </div>
                  )}
                </div>

                {/* الميزات - قسم قابل للتمدد */}
                <div className="flex-grow mb-4">
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">المميزات:</h4>
                      <ul className="space-y-1">
                        {product.features.slice(0, 2).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-green-500 text-xs mt-0.5">✓</span>
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                        {product.features.length > 2 && (
                          <li className="text-xs text-blue-600 font-medium">
                            +{product.features.length - 2} مميزات أخرى
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* الأزرار - مثبتة في الأسفل */}
                <div className="space-y-2 mt-auto">
                  <button
                    onClick={() => viewProductDetails(product)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm border border-gray-200 hover:border-gray-300"
                  >
                    عرض التفاصيل
                  </button>
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    أضف للسلة - {product.price} ريال
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* رسالة في حالة عدم وجود منتجات */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-gray-400">📦</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد منتجات</h3>
            <p className="text-gray-600">لم يتم العثور على منتجات في هذا التصنيف</p>
          </div>
        )}
      </div>
    </div>
  );
}
