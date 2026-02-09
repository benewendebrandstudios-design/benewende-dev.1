const CINETPAY_API_KEY = process.env.CINETPAY_API_KEY || "";
const CINETPAY_SITE_ID = process.env.CINETPAY_SITE_ID || "";
const CINETPAY_BASE_URL = "https://api-checkout.cinetpay.com/v2";

export interface CinetPayInitParams {
  transactionId: string;
  amount: number;
  currency?: string;
  description: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  returnUrl: string;
  notifyUrl: string;
  channels?: string; // "ALL", "MOBILE_MONEY", "CREDIT_CARD", "WALLET"
}

export interface CinetPayInitResponse {
  code: string;
  message: string;
  description: string;
  data: {
    payment_token: string;
    payment_url: string;
  };
  api_response_id: string;
}

export interface CinetPayCheckResponse {
  code: string;
  message: string;
  data: {
    amount: string;
    currency: string;
    status: string; // "ACCEPTED" | "REFUSED" | "CANCELLED"
    payment_method: string;
    description: string;
    metadata: string;
    operator_id: string;
    payment_date: string;
  };
  api_response_id: string;
}

/**
 * Initialize a CinetPay payment session
 */
export async function initPayment(params: CinetPayInitParams): Promise<CinetPayInitResponse> {
  const response = await fetch(`${CINETPAY_BASE_URL}/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: CINETPAY_API_KEY,
      site_id: CINETPAY_SITE_ID,
      transaction_id: params.transactionId,
      amount: params.amount,
      currency: params.currency || "XOF",
      description: params.description,
      customer_name: params.customerName || "",
      customer_email: params.customerEmail || "",
      customer_phone_number: params.customerPhone || "",
      return_url: params.returnUrl,
      notify_url: params.notifyUrl,
      channels: params.channels || "ALL",
      lang: "FR",
      metadata: "benewende-dev",
    }),
  });

  if (!response.ok) {
    throw new Error(`CinetPay init error: ${response.status}`);
  }

  return response.json();
}

/**
 * Check payment status via CinetPay API
 */
export async function checkPaymentStatus(transactionId: string): Promise<CinetPayCheckResponse> {
  const response = await fetch(`${CINETPAY_BASE_URL}/payment/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: CINETPAY_API_KEY,
      site_id: CINETPAY_SITE_ID,
      transaction_id: transactionId,
    }),
  });

  if (!response.ok) {
    throw new Error(`CinetPay check error: ${response.status}`);
  }

  return response.json();
}

/**
 * Plans and pricing in XOF
 */
export const PLANS = {
  "cv-pro": {
    name: "CV Pro",
    amount: 3000,
    description: "CV professionnel avec templates premium et IA",
    serviceType: "cv-generator",
    plan: "pro",
  },
  "cv-business": {
    name: "CV Business (mensuel)",
    amount: 30000,
    description: "CV illimités + templates premium + IA + priorité",
    serviceType: "cv-generator",
    plan: "business",
  },
} as const;

export type PlanId = keyof typeof PLANS;
