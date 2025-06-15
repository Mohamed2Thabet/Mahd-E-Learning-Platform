// src/services/paymentService.js

class PaymentService {
  constructor() {
    this.baseURL = import.meta.env.VITE_PAYMENT_API_URL;
  }

  async createPaymentIntent(paymentData) {
    try {
      const response = await fetch(`${this.baseURL}/payments/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_PAYMENT_API_TOKEN}`
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();
      return result;

    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new PaymentService();
