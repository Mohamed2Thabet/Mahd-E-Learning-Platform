class PaymentService {
  constructor() {
    this.baseURL = import.meta.env.VITE_PAYMENT_API_URL;
  }

  async createPaymentIntent({ course, finalPrice, currency, paymentMethod }) {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${this.baseURL}/payments/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: course._id,
          amount: finalPrice,
          currency: currency,
          source: paymentMethod.id,
          educatorId: course.educatorId,
          description: `Payment for ${course.title}`
        })
      });
      console.log(course.educatorId)
      const result = await response.json();
      return result;

    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new PaymentService(); // ✅ مهم: نستخدم new
