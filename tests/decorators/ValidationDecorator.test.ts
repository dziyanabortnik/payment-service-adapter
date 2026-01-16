import { ValidationDecorator } from "../../src/payment/decorators/ValidationDecorator";

describe("ValidationDecorator", () => {
  let mockProcessor: any;
  let decorator: ValidationDecorator;

  beforeEach(() => {
    mockProcessor = {
      processPayment: jest.fn().mockResolvedValue({
        success: true,
        transactionId: "TEST",
      }),
    };
    decorator = new ValidationDecorator(mockProcessor);
  });

  test("should reject negative amount", async () => {
    // Декоратор должен отклонять отрицательные суммы
    const result = await decorator.processPayment(-10, "USD");

    expect(result.success).toBe(false);
    expect(result.error).toContain("Amount must be greater than 0");
    // Проверяем, что процессор не был вызван при невалидных данных
    expect(mockProcessor.processPayment).not.toHaveBeenCalled();
  });

  test("should reject invalid currency", async () => {
    // Декоратор должен отклонять неподдерживаемые валюты
    const result = await decorator.processPayment(100, "RUB");

    expect(result.success).toBe(false);
    expect(result.error).toContain("Unsupported currency");
    expect(mockProcessor.processPayment).not.toHaveBeenCalled();
  });

  test("should allow valid payment", async () => {
    // Декоратор должен пропускать валидные платежи
    const result = await decorator.processPayment(100, "USD");

    expect(result.success).toBe(true);
    expect(mockProcessor.processPayment).toHaveBeenCalledWith(100, "USD");
  });
});
