import { config } from "~/config";
import { baseFetcher } from "~/services/base";

const fetcher = baseFetcher.extend({ prefixUrl: config.services.endpoints.users });

export async function subscribe({
  userId,
  planId,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  planId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return await fetcher
    .post("subscriptions", {
      json: {
        user_id: userId,
        plan_id: planId,
        success_url: successUrl,
        cancel_url: cancelUrl,
      },
    })
    .json<{ id: string; url: string }>();
}

type User = {
  auth0_id: string;
  email: string;
  id: string;
  stripe_customer_id?: string;
};

export async function getUser(userId: string) {
  return await fetcher.get(`users/${userId}`).json<User>();
}

type Customer = {
  id: string;
};

export async function getCustomer(userId: string) {
  return await fetcher.get(`users/${userId}/customer`).json<Customer>();
}

export type Payment = {
  id: string;
  amount: number;
  currency: string;
  created: number;
  status: string;
};

export async function getPayments(userId: string) {
  return await fetcher.get(`users/${userId}/payments`).json<Payment[]>();
}
