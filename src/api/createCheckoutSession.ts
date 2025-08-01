export async function createCheckoutSession(cartItems: any[], customerName: string) {
  try {
    const res = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
        customerName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "فشل في إنشاء الجلسة");
    }

    window.location.href = data.url;
  } catch (err) {
    console.error("خطأ في الدفع:", err);
    alert("فشل في إنشاء جلسة الدفع");
  }
}
    