import { BasePaymentDecorator } from './BasePaymentDecorator';
import { IPaymentProcessor, PaymentResult } from '../interfaces/IPaymentProcessor';

export class ValidationDecorator extends BasePaymentDecorator {
  constructor(processor: IPaymentProcessor) {
    super(processor);
  }
  
  async processPayment(amount: number, currency: string): Promise<PaymentResult> {
    console.log(`[VALIDATION] Checking: ${amount} ${currency}`);
    // Валидация суммы
    if (amount <= 0) {
      return {
        success: false,
        error: 'Amount must be greater than 0',
        timestamp: new Date(),
        amount,
        currency
      };
    }
    
    // Валидация максимальной суммы
    if (amount > 1000000) {
      return {
        success: false,
        error: 'Amount exceeds maximum limit of 1,000,000',
        timestamp: new Date(),
        amount,
        currency
      };
    }
    
    // Валидация валюты
    const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY'];
    if (!validCurrencies.includes(currency.toUpperCase())) {
      return {
        success: false,
        error: `Unsupported currency. Valid currencies: ${validCurrencies.join(', ')}`,
        timestamp: new Date(),
        amount,
        currency
      };
    }
    
    return super.processPayment(amount, currency);
  }
  
  async refundPayment(transactionId: string, amount: number): Promise<PaymentResult> {
    // Валидация ID транзакции
    if (!transactionId || transactionId.trim() === '') {
      return {
        success: false,
        error: 'Transaction ID is required',
        timestamp: new Date(),
        amount,
        currency: 'USD'
      };
    }
    
    // Валидация суммы возврата
    if (amount <= 0) {
      return {
        success: false,
        error: 'Refund amount must be greater than 0',
        timestamp: new Date(),
        amount,
        currency: 'USD'
      };
    }
    
    return super.refundPayment(transactionId, amount);
  }
}