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
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* ====== نسخة الكمبيوتر (تظهر من md وفوق) ====== */}
      <div className="hidden md:block">
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
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              مرحباً بك في {CONTACT_INFO.companyName}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              نحن متخصصون في تقديم أفضل الخدمات الرقمية لمساعدتك في تحقيق أهدافك التجارية والإبداعية.
            </p>
          </div>
        </div>

        {/* قسم التقييمات */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">آراء عملائنا</h2>
          <div className="grid grid-cols-3 gap-6">
            {reviews.map((review: Review) => (
              <div 
                key={review.id} 
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl mr-3">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-sm text-blue-600">{review.service}</p>
                  </div>
                </div>
                <div className="flex mb-3">{renderStars(review.rating)}</div>
                <p className="text-gray-600 text-sm">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== نسخة الجوال (تظهر تحت md) ====== */}
      <div className="block md:hidden">
        {/* تعريف المتجر للجوال */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-center mb-3">{CONTACT_INFO.companyName}</h1>
          <p className="text-center text-gray-600 text-sm">
            خدمات رقمية - تصميم - برمجة - متاجر
          </p>
        </div>

        {/* قسم التقييمات للجوال */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">آراء العملاء</h2>
          <div className="grid grid-cols-1 gap-4">
            {reviews.map((review: Review) => (
              <div 
                key={review.id} 
                className="bg-white rounded-xl shadow p-4"
              >
                <h4 className="font-bold">{review.name}</h4>
                <div className="flex">{renderStars(review.rating)}</div>
                <p className="text-gray-600 text-xs mt-2">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* التصنيفات للجوال (صفين 2x2) */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category: Category) => (
            <div 
              key={category.id} 
              onClick={() => viewCategoryProducts(category.id)}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-semibold">{category.name}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
