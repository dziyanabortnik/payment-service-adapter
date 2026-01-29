import { PaymentResult } from "../../src/payment/interfaces/IPaymentProcessor";

describe("PaymentResult Interface", () => {
  test("should have correct structure", () => {
    // Тестируем структуру интерфейса PaymentResult
    const result: PaymentResult = {
      success: true,
      transactionId: "TXN-123",
      timestamp: new Date(),
      amount: 100,
      currency: "USD",
    };

    // Проверяем наличие обязательных полей
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("timestamp");
    expect(result).toHaveProperty("amount");
    expect(result).toHaveProperty("currency");
  });
});
