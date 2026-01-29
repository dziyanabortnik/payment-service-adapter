import { BasePaymentDecorator } from "./BasePaymentDecorator";
import {
  IPaymentProcessor,
  PaymentResult,
} from "../interfaces/IPaymentProcessor";

// Декоратор для обработки ошибок и повторных попыток
export class ErrorHandlerDecorator extends BasePaymentDecorator {
  private maxRetries: number;

  constructor(processor: IPaymentProcessor, maxRetries: number = 3) {
    super(processor);
    this.maxRetries = maxRetries;
  }

  async processPayment(
    amount: number,
    currency: string
  ): Promise<PaymentResult> {
    let lastError: string = "";

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await super.processPayment(amount, currency);

        // Если платеж не удался и есть еще попытки - повторяем
        if (!result.success && attempt < this.maxRetries) {
          console.log(
            `[ERROR_HANDLER] Payment failed, retry ${attempt}/${this.maxRetries}`
          );
          lastError = result.error || "Unknown error";
          // Ззадержка перед повторной попыткой
          await this.delay(1000 * attempt);
          continue;
        }

        return result;
      } catch (error) {
        lastError = error instanceof Error ? error.message : "Unknown error";
        console.log(
          `[ERROR_HANDLER] Exception on attempt ${attempt}: ${lastError}`
        );

        if (attempt < this.maxRetries) {
          await this.delay(1000 * attempt);
        }
      }
    }

    // Все попытки исчерпаны
    return {
      success: false,
      error: `All ${this.maxRetries} attempts failed. Last error: ${lastError}`,
      timestamp: new Date(),
      amount,
      currency,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
