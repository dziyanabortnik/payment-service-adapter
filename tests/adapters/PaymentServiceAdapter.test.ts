import { PaymentServiceAdapter } from "../../src/payment/adapters/PaymentServiceAdapter";

describe("PaymentServiceAdapter - Basic Tests", () => {
  test("should create adapter instance", () => {
    const adapter = new PaymentServiceAdapter();
    expect(adapter).toBeInstanceOf(PaymentServiceAdapter);
  });

  test("should have required payment methods", () => {
    const adapter = new PaymentServiceAdapter();
    expect(typeof adapter.processPayment).toBe("function");
    expect(typeof adapter.refundPayment).toBe("function");
  });

  test("should implement IPaymentProcessor interface", () => {
    const adapter = new PaymentServiceAdapter();
    expect(adapter.processPayment).toBeDefined();
    expect(adapter.refundPayment).toBeDefined();
  });
});
