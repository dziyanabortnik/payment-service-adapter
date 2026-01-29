import { PaymentServiceAdapter } from "../../src/payment/adapters/PaymentServiceAdapter";
import { PaymentLoggerDecorator } from "../../src/payment/decorators/PaymentLoggerDecorator";
import { ValidationDecorator } from "../../src/payment/decorators/ValidationDecorator";

describe("Integration: Adapter and Decorators", () => {
  test("Full decorator chain should work correctly", async () => {
    const adapter = new PaymentServiceAdapter();

    // Мокаем внутренний сервис адаптера для тестирования
    const mockService = {
      getMerchantInfo: jest
        .fn()
        .mockReturnValue({ merchantId: "TEST", apiKey: "key" }),
      makePayment: jest.fn().mockResolvedValue({
        status: "success",
        payment_id: "INTEGRATION-TXN",
      }),
    };

    // Заменяем внутренний сервис адаптера на мок
    (adapter as any).paymentService = mockService;

    // Создаем цепочку декораторов: валидация - логирование
    const processor = new PaymentLoggerDecorator(
      new ValidationDecorator(adapter)
    );

    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    // Выполняем платеж через полную цепочку
    const result = await processor.processPayment(500, "EUR");

    expect(result.success).toBe(true);
    expect(result.transactionId).toBe("INTEGRATION-TXN");
    expect(result.amount).toBe(500);
    expect(result.currency).toBe("EUR");

    // Проверяем, что логирование сработало
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Payment process started")
    );

    // Восстанавливаем оригинальный console.log
    consoleLogSpy.mockRestore();
  });
});
