import { BasePaymentDecorator } from "./BasePaymentDecorator";
import {
  IPaymentProcessor,
  PaymentResult,
} from "../interfaces/IPaymentProcessor";

// Декоратор для логирования всех операций
export class PaymentLoggerDecorator extends BasePaymentDecorator {
  constructor(processor: IPaymentProcessor) {
    super(processor);
  }

  async processPayment(
    amount: number,
    currency: string
  ): Promise<PaymentResult> {
    // Логирование начала операции
    console.log(
      `[LOG] Payment process started: ${amount} ${currency} at ${new Date().toISOString()}`
    );

    const result = await super.processPayment(amount, currency);

    // Логирование результата
    console.log(
      `[LOG] Payment process completed: ${result.success ? "SUCCESS" : "FAILED"}`
    );
    if (result.transactionId) {
      console.log(`[LOG] Transaction ID: ${result.transactionId}`);
    }
    if (result.error) {
      console.log(`[LOG] Error: ${result.error}`);
    }

    return result;
  }

  async refundPayment(
    transactionId: string,
    amount: number
  ): Promise<PaymentResult> {
    console.log(
      `[LOG] Refund process started for transaction ${transactionId}, amount: ${amount}`
    );

    const result = await super.refundPayment(transactionId, amount);

    console.log(
      `[LOG] Refund process completed: ${result.success ? "SUCCESS" : "FAILED"}`
    );

    return result;
  }
}
