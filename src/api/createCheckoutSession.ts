export const createCheckoutSession = async ({
  items,
  customerName,
}: {
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  customerName: string;
}) => {
  try {
    const response = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        customerName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "فشل في إنشاء جلسة الدفع");
    }

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error("لم يتم استلام رابط الدفع من السيرفر");
    }
  } catch (error) {
    console.error("Checkout Session Error:", error);
    alert("حدث خطأ أثناء عملية الدفع");
  }
};
