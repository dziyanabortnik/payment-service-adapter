export class ThirdPartyPaymentService {
  // Имитация стороннего платежного сервиса с несовместимым интерфейсом

  public async makePayment(
    total: number,
    currencyCode: string,
    merchantId: string
  ): Promise<{
    status: "success" | "failed";
    payment_id?: string;
    error_message?: string;
  }> {
    console.log(
      `ThirdPartyPaymentService: Processing payment of ${total} ${currencyCode}`
    );

    // Имитация сетевой задержки
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Случайный успех или ошибка для демонстрации
    const isSuccess = Math.random() > 0.3;

    if (isSuccess) {
      const transactionId =
        "TXN-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
      return {
        status: "success",
        payment_id: transactionId,
      };
    } else {
      return {
        status: "failed",
        error_message: "Payment declined by bank",
      };
    }
  }

  public async refundTransaction(
    originalPaymentId: string,
    refundAmount: number
  ): Promise<{
    status: "refunded" | "failed";
    refund_id?: string;
    error_message?: string;
  }> {
    console.log(
      `ThirdPartyPaymentService: Refunding ${refundAmount} for transaction ${originalPaymentId}`
    );

    await new Promise((resolve) => setTimeout(resolve, 800));

    const isSuccess = Math.random() > 0.2;

    if (isSuccess) {
      const refundId =
        "REF-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
      return {
        status: "refunded",
        refund_id: refundId,
      };
    } else {
      return {
        status: "failed",
        error_message: "Refund not possible",
      };
    }
  }

  public getMerchantInfo() {
    return {
      merchantId: "MERCHANT123",
      apiKey: "xxxx-yyyy-zzzz",
    };
  }
}
