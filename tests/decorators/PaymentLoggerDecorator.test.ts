import { PaymentLoggerDecorator } from "../../src/payment/decorators/PaymentLoggerDecorator";

describe("PaymentLoggerDecorator", () => {
  let mockProcessor: any;
  let decorator: PaymentLoggerDecorator;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    // Мок процессора для тестирования
    mockProcessor = {
      processPayment: jest.fn().mockResolvedValue({
        success: true,
        transactionId: "TXN-123",
      }),
    };
    decorator = new PaymentLoggerDecorator(mockProcessor);

    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  test("should log successful payment", async () => {
    // Декоратор должен логировать начало и окончание операции
    await decorator.processPayment(100, "USD");

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Payment process started")
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Payment process completed: SUCCESS")
    );
  });
});
