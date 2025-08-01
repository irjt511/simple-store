export async function createCheckoutSession(product: {
  name: string;
  price: number;
}) {
  const response = await fetch('http://localhost:4242/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product }),
  });

  const data = await response.json();

  if (data.url) {
    window.location.href = data.url; // يوجه المستخدم لصفحة الدفع
  } else {
    alert('حدث خطأ أثناء إنشاء جلسة الدفع');
    console.error(data);
  }
}
