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
      
      {/* التصنيفات */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">تصنيفات الخدمات</h2>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => viewCategoryProducts(category.id)}
              className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl px-4 py-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center"
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <span className="font-semibold text-gray-800 text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* تعريف المتجر */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden">
          <img 
            src="/images/logo.jpg" 
            alt="ريفو" 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.background = 'linear-gradient(to right, #2563eb, #1d4ed8)';
              target.style.color = 'white';
              target.src = '';
            }}
          />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">مرحباً بك في {CONTACT_INFO.companyName}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          نحن متخصصون في تقديم أفضل الخدمات الرقمية لمساعدتك في تحقيق أهدافك التجارية والإبداعية. 
          من إنشاء المتاجر الإلكترونية إلى تطوير المواقع والتطبيقات، ومن التصميم الجرافيكي إلى الدورات التدريبية.
        </p>
      </div>

      {/* قسم التقييمات */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">آراء عملائنا</h2>
        <p className="text-lg text-gray-600 text-center mb-8">اكتشف تجارب عملائنا مع خدماتنا</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review: Review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300"
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
              
              <p className="text-gray-600 text-sm">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
