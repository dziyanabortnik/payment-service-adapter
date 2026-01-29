export interface IPaymentProcessor {
  processPayment(amount: number, currency: string): Promise<PaymentResult>;
  refundPayment(transactionId: string, amount: number): Promise<PaymentResult>;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  timestamp: Date;
  amount: number;
  currency: string;
}
