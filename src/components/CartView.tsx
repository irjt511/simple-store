import { CartItem } from '../data/config';

interface CartViewProps {
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  setCurrentView: (view: 'categories' | 'products' | 'product-details' | 'cart' | 'checkout') => void;
}

export function CartView({ cart, removeFromCart, updateQuantity, getTotalPrice, setCurrentView }: CartViewProps) {
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-6xl text-gray-400">🛒</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">السلة فارغة</h2>
          <p className="text-gray-600 mb-8">لم تقم بإضافة أي خدمات إلى السلة بعد</p>
          <button
            onClick={() => setCurrentView('categories')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            تصفح الخدمات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">سلة المشتريات</h2>
        <button
          onClick={() => setCurrentView('categories')}
          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 text-lg bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          ← متابعة التسوق
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-6 border-b border-gray-100 last:border-b-0">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-blue-600 font-semibold">{item.price} ريال</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600 transition-colors"
                >
                  +
                </button>
              </div>
              
              <div className="text-lg font-bold text-gray-800 min-w-[100px] text-right">
                {item.price * item.quantity} ريال
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 p-2 transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
        
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-gray-800">المجموع الكلي:</span>
            <span className="text-2xl font-bold text-blue-600">{getTotalPrice()} ريال</span>
          </div>
          
          <button
            onClick={() => setCurrentView('checkout')}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            إتمام الطلب
          </button>
        </div>
      </div>
    </div>
  );
}
