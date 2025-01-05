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
