import { Category } from '../data/categories';
import { Review } from '../data/reviews';
import { CONTACT_INFO } from '../data/config';
import { useState } from 'react';

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
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* التصنيفات الأفقية */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">تصنيفات الخدمات</h2>
      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => viewCategoryProducts(category.id)}
            className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl px-6 py-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-3 md:min-w-[200px]"
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      {/* تعريف المتجر */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-2xl">
            <img
              src="/images/logo.jpg"
              alt="ريفو"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className="absolute">R</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">مرحباً بك في {CONTACT_INFO.companyName}</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            نحن متخصصون في تقديم أفضل الخدمات الرقمية لمساعدتك في تحقيق أهدافك التجارية والإبداعية.
          </p>
        </div>
      </div>

      {/* قسم التقييمات */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">آراء عملائنا</h2>
          <p className="text-lg text-gray-600">اكتشف تجارب عملائنا مع خدماتنا المتميزة</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              <p className="text-gray-600 leading-relaxed text-sm">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* قسم التصنيفات المحسن */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: Category) => {
          const [imageError, setImageError] = useState(false);

          return (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-blue-100 flex flex-col"
              onClick={() => viewCategoryProducts(category.id)}
            >
              <div className="relative h-48">
                {!imageError ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold">
                    {category.name}
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">{category.name}</h3>
                <p className="text-gray-600 mb-6 text-sm text-center flex-grow">{category.description}</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all font-semibold mt-auto">
                  استكشف الخدمات
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
