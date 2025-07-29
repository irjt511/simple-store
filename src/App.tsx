import { useState, useEffect } from "react";
import { Toaster } from "sonner";

// استيراد البيانات
import { categories } from './data/categories';
import { products, Product } from './data/products';
import { reviews } from './data/reviews';
import { CONTACT_INFO, CartItem } from './data/config';

// استيراد المكونات
import { CategoriesView } from './components/CategoriesView';
import { ProductsView } from './components/ProductsView';
import { ProductDetailsView } from './components/ProductDetailsView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';

export default function App() {
  // ===== حالات التطبيق =====
  const [currentView, setCurrentView] = useState<'categories' | 'products' | 'product-details' | 'cart' | 'checkout'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');

  // ===== تحميل وحفظ السلة =====
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ===== وظائف السلة =====
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          quantity: 1 
        }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // ===== وظائف التواصل =====
  const sendToWhatsApp = () => {
    if (!customerName.trim()) {
      alert('يرجى إدخال اسمك');
      return;
    }

    if (cart.length === 0) {
      alert('السلة فارغة');
      return;
    }

    let message = `مرحباً، اسمي ${customerName}\n\nأريد طلب الخدمات التالية:\n\n`;
    
    cart.forEach(item => {
      message += `• ${item.name} - الكمية: ${item.quantity} - السعر: ${item.price * item.quantity} ريال\n`;
    });
    
    message += `\nالمجموع الكلي: ${getTotalPrice()} ريال\n\nشكراً لكم`;

    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // مسح السلة بعد الإرسال
    setCart([]);
    setCustomerName('');
    setCurrentView('categories');
  };

  const openWhatsApp = () => {
    const message = 'مرحباً، أريد الاستفسار عن خدماتكم';
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // ===== وظائف التنقل =====
  const viewCategoryProducts = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setCurrentView('products');
  };

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
  };

  // ===== تصفية المنتجات =====
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

  const selectedCategoryName = selectedCategory 
    ? categories.find(cat => cat.id === selectedCategory)?.name || ''
    : '';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* ===== الهيدر ===== */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src="/images/logo.jpg" 
                  alt={CONTACT_INFO.companyName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.background = 'linear-gradient(to right, #2563eb, #1d4ed8)';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.style.color = 'white';
                    target.style.fontSize = '20px';
                    target.style.fontWeight = 'bold';
                    target.innerHTML = 'R';
                    target.src = '';
                  }}
                />
              </div>
              <h1 
                className="text-3xl font-bold cursor-pointer hover:text-blue-600 transition-colors text-gray-800"
                onClick={() => setCurrentView('categories')}
              >
                {CONTACT_INFO.companyName}
              </h1>
            </div>
            <button
              onClick={() => setCurrentView('cart')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="cart-icon" viewBox="0 0 24 24">
                <path d="M7 18C5.9 18 5 18.9 5 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5H5.21L4.27 3H1V2Z"/>
              </svg>
              السلة ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </div>
      </header>

      {/* ===== المحتوى الرئيسي ===== */}
      <main className="flex-1">
        {currentView === 'categories' && (
          <CategoriesView categories={categories} viewCategoryProducts={viewCategoryProducts} reviews={reviews} />
        )}
        {currentView === 'products' && (
          <ProductsView 
            products={filteredProducts} 
            addToCart={addToCart} 
            viewProductDetails={viewProductDetails}
            categoryName={selectedCategoryName}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView === 'product-details' && selectedProduct && (
          <ProductDetailsView 
            product={selectedProduct}
            addToCart={addToCart}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView === 'cart' && (
          <CartView 
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            getTotalPrice={getTotalPrice}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView === 'checkout' && (
          <CheckoutView
            cart={cart}
            getTotalPrice={getTotalPrice}
            customerName={customerName}
            setCustomerName={setCustomerName}
            sendToWhatsApp={sendToWhatsApp}
            setCurrentView={setCurrentView}
          />
        )}
      </main>

      {/* ===== الفوتر ===== */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">معلومات التواصل</h3>
              <div className="space-y-3">
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+{CONTACT_INFO.whatsappNumber}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>📧</span>
                  <span>{CONTACT_INFO.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{CONTACT_INFO.location}</span>
                </p>
                <button
                  onClick={openWhatsApp}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  <span>📱</span>
                  <span>تواصل عبر الواتساب</span>
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">خدماتنا</h3>
              <ul className="space-y-2">
                <li>• إنشاء المتاجر الإلكترونية</li>
                <li>• برمجة المواقع والتطبيقات</li>
                <li>• التصميم الجرافيكي</li>
                <li>• الدورات التدريبية</li>
                <li>• الاستشارات التقنية</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 {CONTACT_INFO.companyName}. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}
