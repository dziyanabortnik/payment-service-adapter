import {
  IPaymentProcessor,
  PaymentResult,
} from "../interfaces/IPaymentProcessor";

// Базовый класс для всех декораторов
export abstract class BasePaymentDecorator implements IPaymentProcessor {
  protected processor: IPaymentProcessor;

  constructor(processor: IPaymentProcessor) {
    this.processor = processor;
  }

  processPayment(amount: number, currency: string): Promise<PaymentResult> {
    return this.processor.processPayment(amount, currency);
  }

  refundPayment(transactionId: string, amount: number): Promise<PaymentResult> {
    return this.processor.refundPayment(transactionId, amount);
  }
}
