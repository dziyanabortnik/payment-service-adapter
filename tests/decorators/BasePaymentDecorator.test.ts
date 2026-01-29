import { BasePaymentDecorator } from "../../src/payment/decorators/BasePaymentDecorator";
import {
  IPaymentProcessor,
  PaymentResult,
} from "../../src/payment/interfaces/IPaymentProcessor";

class TestDecorator extends BasePaymentDecorator {
  constructor(processor: IPaymentProcessor) {
    super(processor);
  }
}

describe("BasePaymentDecorator - Basic Tests", () => {
  test("should create decorator instance", () => {
    const mockProcessor: IPaymentProcessor = {
      processPayment: jest.fn(),
      refundPayment: jest.fn(),
    };

    const decorator = new TestDecorator(mockProcessor);
    expect(decorator).toBeInstanceOf(BasePaymentDecorator);
  });

  test("should delegate processPayment calls", async () => {
    const mockResult: PaymentResult = {
      success: true,
      transactionId: "TEST-123",
      timestamp: new Date(),
      amount: 100,
      currency: "USD",
    };

    const mockProcessor: IPaymentProcessor = {
      processPayment: jest.fn().mockResolvedValue(mockResult),
      refundPayment: jest.fn(),
    };

    const decorator = new TestDecorator(mockProcessor);
    const result = await decorator.processPayment(100, "USD");

    expect(mockProcessor.processPayment).toHaveBeenCalledWith(100, "USD");
    expect(result).toEqual(mockResult);
  });

  test("should delegate refundPayment calls", async () => {
    const mockResult: PaymentResult = {
      success: true,
      transactionId: "REF-456",
      timestamp: new Date(),
      amount: 50,
      currency: "USD",
    };

    const mockProcessor: IPaymentProcessor = {
      processPayment: jest.fn(),
      refundPayment: jest.fn().mockResolvedValue(mockResult),
    };

    const decorator = new TestDecorator(mockProcessor);
    const result = await decorator.refundPayment("TXN-123", 50);

    expect(mockProcessor.refundPayment).toHaveBeenCalledWith("TXN-123", 50);
    expect(result).toEqual(mockResult);
  });

  test("should wrap any processor", () => {
    const mockProcessor = {
      processPayment: jest.fn(),
      refundPayment: jest.fn(),
    } as IPaymentProcessor;

    const decorator = new TestDecorator(mockProcessor);
    expect(decorator).toBeInstanceOf(TestDecorator);
  });
});
