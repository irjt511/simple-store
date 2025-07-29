import { CartItem, CONTACT_INFO } from '../data/config';

interface CheckoutViewProps {
  cart: CartItem[];
  getTotalPrice: () => number;
  customerName: string;
  setCustomerName: (name: string) => void;
  sendToWhatsApp: () => void;
  setCurrentView: (view: 'categories' | 'products' | 'product-details' | 'cart' | 'checkout') => void;
}

export function CheckoutView({ 
  cart, 
  getTotalPrice, 
  customerName, 
  setCustomerName, 
  sendToWhatsApp, 
  setCurrentView 
}: CheckoutViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">إتمام الطلب</h2>
        <button
          onClick={() => setCurrentView('cart')}
          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 text-lg bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          ← العودة للسلة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* معلومات العميل */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">معلومات العميل</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                الاسم الكامل *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                required
              />
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">طريقة التواصل:</h4>
              <p className="text-gray-600 text-sm">
                سيتم إرسال تفاصيل طلبك عبر الواتساب لمناقشة التفاصيل وتأكيد الطلب
              </p>
            </div>
          </div>
        </div>

        {/* ملخص الطلب */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">ملخص الطلب</h3>
          <div className="space-y-3 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <span className="text-gray-500 text-sm"> × {item.quantity}</span>
                </div>
                <span className="font-semibold text-blue-600">{item.price * item.quantity} ريال</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">المجموع الكلي:</span>
              <span className="text-2xl font-bold text-blue-600">{getTotalPrice()} ريال</span>
            </div>
          </div>

          <button
            onClick={sendToWhatsApp}
            disabled={!customerName.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none flex items-center justify-center gap-2"
          >
            <span>📱</span>
            إرسال الطلب عبر الواتساب
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              سيتم التواصل معك عبر الواتساب على الرقم: +{CONTACT_INFO.whatsappNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
