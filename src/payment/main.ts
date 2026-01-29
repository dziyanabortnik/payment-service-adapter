import { PaymentServiceAdapter } from "./adapters/PaymentServiceAdapter";
import { PaymentLoggerDecorator } from "./decorators/PaymentLoggerDecorator";
import { ErrorHandlerDecorator } from "./decorators/ErrorHandlerDecorator";
import { ValidationDecorator } from "./decorators/ValidationDecorator";
import { IPaymentProcessor } from "./interfaces/IPaymentProcessor";

class PaymentApplication {
  private paymentProcessor: IPaymentProcessor;

  constructor() {
    const adapter = new PaymentServiceAdapter();

    //Обертываем адаптер в декораторы
    //валидация - обработка ошибок - логирование
    let processor: IPaymentProcessor = adapter;
    processor = new ValidationDecorator(processor);
    processor = new ErrorHandlerDecorator(processor, 2); // 2 попытки
    processor = new PaymentLoggerDecorator(processor);

    this.paymentProcessor = processor;
  }

  async runDemo() {
    console.log("Payment System Demo\n");

    // Демонстрация различных сценариев
    await this.testPayment(100, "USD", "Normal payment");
    await this.testPayment(50, "EUR", "Payment in Euros");
    await this.testPayment(-10, "USD", "Invalid negative amount");
    await this.testPayment(150, "XYZ", "Unsupported currency");
    await this.testPayment(2000000, "USD", "Amount exceeds limit");

    // Демонстрация возврата средств
    await this.testRefund("TXN-123456", 25, "Normal refund");
  }

  private async testPayment(
    amount: number,
    currency: string,
    description: string
  ) {
    console.log(`\n${description}`);
    console.log(`Amount: ${amount} ${currency}`);

    console.log(`Test #: ${description}`);

    const result = await this.paymentProcessor.processPayment(amount, currency);

    console.log(`Payment result: ${result.success ? "SUCCESS" : "FAILED"}`);
    if (result.transactionId) {
      console.log(`Transaction ID: ${result.transactionId}`);
    }
    if (result.error) {
      console.log(`Error: ${result.error}`);
    }
    console.log(`Timestamp: ${result.timestamp.toISOString()}`);
  }

  private async testRefund(
    transactionId: string,
    amount: number,
    description: string
  ) {
    console.log(`\n${description}`);
    console.log(`Transaction: ${transactionId}, Refund amount: ${amount}`);

    const result = await this.paymentProcessor.refundPayment(
      transactionId,
      amount
    );

    console.log(`Refund result: ${result.success ? "SUCCESS" : "FAILED"}`);
    if (result.transactionId) {
      console.log(`Refund ID: ${result.transactionId}`);
    }
    if (result.error) {
      console.log(`Error: ${result.error}`);
    }
  }
}

// Запуск демонстрации
const app = new PaymentApplication();
app.runDemo().catch(console.error);
