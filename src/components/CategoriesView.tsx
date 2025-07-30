import { Category } from '../data/categories';
import { Review } from '../data/reviews';
import { CONTACT_INFO } from '../data/config';

interface CategoriesViewProps {
  categories: Category[];
  viewCategoryProducts: (categoryId: number) => void;
  reviews: Review[];
}

export function CategoriesView({ categories, viewCategoryProducts, reviews }: CategoriesViewProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* التصنيفات الأفقية */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">تصنيفات الخدمات</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => viewCategoryProducts(category.id)}
              className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl px-6 py-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-3 min-w-[200px]"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="font-semibold text-gray-800">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* تعريف المتجر */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden">
            <img 
              src="/images/logo.jpg" 
              alt="ريفو" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.background = 'linear-gradient(to right, #2563eb, #1d4ed8)';
                target.style.display = 'flex';
                target.style.alignItems = 'center';
                target.style.justifyContent = 'center';
                target.style.color = 'white';
                target.style.fontSize = '30px';
                target.style.fontWeight = 'bold';
                target.innerHTML = 'R';
                target.src = '';
              }}
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">مرحباً بك في {CONTACT_INFO.companyName}</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            نحن متخصصون في تقديم أفضل الخدمات الرقمية لمساعدتك في تحقيق أهدافك التجارية والإبداعية. 
            من إنشاء المتاجر الإلكترونية إلى تطوير المواقع والتطبيقات، ومن التصميم الجرافيكي إلى الدورات التدريبية المتخصصة.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">سرعة في التنفيذ</h3>
              <p className="text-gray-600">نلتزم بتسليم مشاريعك في الوقت المحدد بأعلى جودة</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">حلول مخصصة</h3>
              <p className="text-gray-600">نقدم حلول مصممة خصيصاً لتناسب احتياجاتك الفريدة</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">جودة عالية</h3>
              <p className="text-gray-600">نضمن لك أعلى معايير الجودة في جميع خدماتنا</p>
            </div>
          </div>
        </div>
      </div>

      {/* قسم التقييمات */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">آراء عملائنا</h2>
          <p className="text-lg text-gray-600">اكتشف تجارب عملائنا مع خدماتنا المتميزة</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review: Review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl mr-3">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{review.name}</h4>
                  <p className="text-sm text-blue-600">{review.service}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {renderStars(review.rating)}
              </div>
              
              <p className="text-gray-600 leading-relaxed text-sm">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {categories.map((category: Category) => (
          <div 
            key={category.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-blue-100"
            onClick={() => viewCategoryProducts(category.id)}
          >
            <div className="relative">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  target.style.display = 'flex';
                  target.style.alignItems = 'center';
                  target.style.justifyContent = 'center';
                  target.style.color = 'white';
                  target.style.fontSize = '18px';
                  target.style.fontWeight = 'bold';
                  target.innerHTML = category.name;
                  target.src = '';
                }}
              />
              <div className="absolute top-3 right-3 bg-white rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg">
                {category.icon}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">{category.name}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{category.description}</p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                استكشف الخدمات
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

