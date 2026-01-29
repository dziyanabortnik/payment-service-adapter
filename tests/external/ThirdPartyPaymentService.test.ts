import { ThirdPartyPaymentService } from "../../src/payment/external/ThirdPartyPaymentService";

describe("ThirdPartyPaymentService", () => {
  test("should process payment and return status", async () => {
    const service = new ThirdPartyPaymentService();
    const result = await service.makePayment(100, "USD", "MERCHANT123");

    expect(result).toHaveProperty("status");
    expect(["success", "failed"]).toContain(result.status);
  });

  test("should refund transaction", async () => {
    const service = new ThirdPartyPaymentService();
    const result = await service.refundTransaction("TXN-123", 50);

    expect(result).toHaveProperty("status");
    expect(["refunded", "failed"]).toContain(result.status);
  });
});
