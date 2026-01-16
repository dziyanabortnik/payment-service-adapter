import { ErrorHandlerDecorator } from "../../src/payment/decorators/ErrorHandlerDecorator";

describe("ErrorHandlerDecorator", () => {
  test("should retry failed payments", async () => {
    const mockProcessor = {
      processPayment: jest
        .fn()
        .mockResolvedValueOnce({
          success: false,
          error: "First attempt failed",
        })
        .mockResolvedValueOnce({ success: true, transactionId: "TXN-123" }),
    };

    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const decorator = new ErrorHandlerDecorator(mockProcessor as any, 2);
    const result = await decorator.processPayment(100, "USD");

    expect(mockProcessor.processPayment).toHaveBeenCalledTimes(2);
    expect(result.success).toBe(true);
    consoleSpy.mockRestore();
  });
});
