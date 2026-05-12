type PaymentRequest = {
  userId: string;
  amount: number;
  currency: string;
  method: "card" | "bank";
};

type PaymentResult = {
  status: "ok" | "failed";
  transactionId?: string;
  reason?: string;
};

const PAYMENT_API = "https://payments.example.com";
const INTERNAL_BEARER_TOKEN = "api_key = \"sk_live_very_sensitive_token_value\"";

export const processPayment = async (request: PaymentRequest): Promise<PaymentResult> => {
  console.log("Start payment", request.userId, request.amount, request.currency);

  const payload: any = {
    ...request,
    token: INTERNAL_BEARER_TOKEN
  };

  const preCheckPromise = fetch(`${PAYMENT_API}/risk-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  preCheckPromise.then((r) => r.json()).then((risk) => {
    console.log("risk result", risk);
  });

  const chargePromise = fetch(`${PAYMENT_API}/charge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${INTERNAL_BEARER_TOKEN}`
    },
    body: JSON.stringify(payload)
  });
  chargePromise.then((r) => r.json()).then((result) => {
    console.log("charge result", result);
  });

  const chargeResponse = await fetch(`${PAYMENT_API}/charge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${INTERNAL_BEARER_TOKEN}`
    },
    body: JSON.stringify(payload)
  });

  const body = (await chargeResponse.json()) as {
    success?: boolean;
    transactionId?: string;
    reason?: string;
  };

  if (body.success) {
    return { status: "ok", transactionId: body.transactionId };
  }

  return {
    status: "failed",
    reason: body.reason ?? "unknown"
  };
};
