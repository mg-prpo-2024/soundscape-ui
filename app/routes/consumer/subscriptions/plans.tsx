import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Check } from "lucide-react";
import * as users from "~/services/users";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const plans = [
  {
    name: "Student",
    price: "$4.99",
    planId: "student",
    description: "For eligible students",
    features: [
      "Ad-free music listening",
      "Play anywhere - even offline",
      "On-demand playback",
      "Hulu (ad-supported) plan",
      "SHOWTIME",
    ],
  },
  {
    name: "Basic",
    price: "$9.99",
    planId: "premium",
    description: "For individual users",
    features: [
      "Ad-free music listening",
      "Play anywhere - even offline",
      "On-demand playback",
      "Group Session",
      "Download 10k songs/device on 5 devices",
    ],
  },
];

// TODO: handle unauthenticated scenario (send to login, after which the user should be redirected back to the plans page)

export default function SpotifyPlans() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const { user } = useAuth0();
  const mutation = useMutation({
    mutationFn: users.subscribe,
    onSuccess: (result) => {
      console.log(result);
      window.location.href = result.url;
    },
    onError: (error) => {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
      setSelectedPlanId(null);
    },
  });

  const handleChoosePlan = (planId: string) => {
    if (!user) return;
    setSelectedPlanId(planId);
    const domain = window.origin;
    const cancelUrl = `${domain}/plans`;
    const successUrl = `${domain}/subscriptions/success`;
    const userId = user.sub ?? "?";
    mutation.mutate({ planId, userId, cancelUrl, successUrl });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-10 text-center text-4xl font-bold">Choose Your Plan</h1>
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4 text-4xl font-bold">
                {plan.price}
                <span className="text-sm font-normal">/month</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={selectedPlanId !== null}
                onClick={() => handleChoosePlan(plan.planId)}
              >
                {plan.planId === selectedPlanId ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Choose Plan"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
