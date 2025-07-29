// ===== التصنيفات =====
export type Category = {
  id: number;        // رقم التصنيف
  name: string;      // اسم التصنيف
  description: string; // وصف التصنيف
  icon: string;      // أيقونة التصنيف
  image: string;     // صورة التصنيف
};

export const categories: Category[] = [
  {
    id: 1,                                    // رقم التصنيف
    name: "إنشاء متجر إلكتروني",              // اسم التصنيف
    description: "إنشاء متاجر إلكترونية احترافية عبر منصة سلة وغيرها", // الوصف
    icon: "🛒",                              // الأيقونة
    image: "/images/ecommerce-category.jpg"   // صورة التصنيف
  },
  {
    id: 2,
    name: "برمجة موقع إلكتروني",
    description: "تطوير مواقع إلكترونية مخصصة وتطبيقات ويب",
    icon: "💻",
    image: "/images/web-development-category.jpg"
  },
  {
    id: 3,
    name: "تصميم",
    description: "تصميم شعارات، بانرات، وهويات بصرية احترافية",
    icon: "🎨",
    image: "/images/design-category.jpg"
  },
  {
    id: 4,
    name: "دورات تدريبية",
    description: "دورات تدريبية في التصميم والبرمجة والتسويق الرقمي",
    icon: "📚",
    image: "/images/training-category.jpg"
  }
];
