import { Product } from '../data/products';

interface CheckoutViewProps {
  cart: Product[];
  customerName: string;
  setCustomerName: (name: string) => void;
  resetCart: () => void;
}

export function CheckoutView({ cart, customerName, setCustomerName, resetCart }: CheckoutViewProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const whatsappMessage = `طلب جديد من ${customerName}:\n\n${cart
    .map((item) => `- ${item.name} × ${item.quantity} = ${item.price * item.quantity} ريال`)
    .join('\n')}\n\nالإجمالي: ${total} ريال`;

  const whatsappLink = `https://wa.me/966500000000?text=${encodeURIComponent(whatsappMessage)}`;

  const handleStripeCheckout = async () => {
    try {
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          customerName,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('فشل في إنشاء جلسة الدفع');
      }
    } catch (error) {
      console.error('Stripe Checkout Error:', error);
      alert('حدث خطأ أثناء عملية الدفع');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">إتمام الطلب</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">اسم العميل:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="اكتب اسمك هنا"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">محتويات السلة:</h2>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="text-lg font-medium text-gray-700">{item.name}</p>
              <p className="text-sm text-gray-500">× {item.quantity}</p>
            </div>
            <p className="text-lg text-blue-600 font-bold">{item.price * item.quantity} ريال</p>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <span className="text-xl font-bold text-gray-800">الإجمالي:</span>
          <span className="text-2xl font-bold text-green-600">{total} ريال</span>
        </div>
      </div>

      {/* زر الطلب عبر واتساب */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full block text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
          !customerName.trim() ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        📦 إرسال الطلب عبر واتساب
      </a>

      {/* زر الدفع عبر Stripe */}
      <button
        onClick={handleStripeCheckout}
        disabled={!customerName.trim()}
        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none flex items-center justify-center gap-2"
      >
        💳 الدفع الإلكتروني
      </button>
    </div>
  );
}
