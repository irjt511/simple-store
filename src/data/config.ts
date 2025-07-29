// ===== إعدادات التواصل =====
export const CONTACT_INFO = {
  whatsappNumber: '966533170903',             // رقم الواتساب
  email: 're32vo@gmail.com',                 // البريد الإلكتروني
  location: 'الرياض، المملكة العربية السعودية', // الموقع
  companyName: 'ريفو'                        // اسم الشركة
};

// ===== نوع بيانات السلة =====
export type CartItem = {
  id: number;       // رقم المنتج
  name: string;     // اسم المنتج
  price: number;    // السعر
  quantity: number; // الكمية
};
