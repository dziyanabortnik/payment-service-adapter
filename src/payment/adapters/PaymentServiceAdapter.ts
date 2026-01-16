import {
  IPaymentProcessor,
  PaymentResult,
} from "../interfaces/IPaymentProcessor";
import { ThirdPartyPaymentService } from "../external/ThirdPartyPaymentService";

// Адаптирует сторонний сервис к интерфейсу
export class PaymentServiceAdapter implements IPaymentProcessor {
  private paymentService: ThirdPartyPaymentService;

  constructor() {
    this.paymentService = new ThirdPartyPaymentService();
  }

  //метод обработки платежа
  async processPayment(
    amount: number,
    currency: string
  ): Promise<PaymentResult> {
    const merchantInfo = this.paymentService.getMerchantInfo();

    try {
      // Преобразуем вызов к стороннему сервису
      const result = await this.paymentService.makePayment(
        amount,
        currency,
        merchantInfo.merchantId
      );

      // Преобразуем результат в наш формат
      return {
        success: result.status === "success",
        transactionId: result.payment_id,
        error: result.error_message,
        timestamp: new Date(),
        amount,
        currency,
      };
    } catch (error) {
      // Обрабатываем исключения
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date(),
        amount,
        currency,
      };
    }
  }

  async refundPayment(
    // метод возврата средств
    transactionId: string,
    amount: number
  ): Promise<PaymentResult> {
    try {
      const result = await this.paymentService.refundTransaction(
        transactionId,
        amount
      );

      return {
        success: result.status === "refunded",
        transactionId: result.refund_id,
        error: result.error_message,
        timestamp: new Date(),
        amount,
        currency: "USD",
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date(),
        amount,
        currency: "USD",
      };
    }
  }
}
