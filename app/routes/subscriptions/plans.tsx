import { Button } from "~/components/ui/button";
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
  const { user } = useAuth0();

  const handleChoosePlan = (planId: string) => {
    if (!user) return;
    const domain = window.origin;
    const cancelUrl = `${domain}/subscriptions/cancel`;
    const successUrl = `${domain}/subscriptions/success`;
    const userId = user.sub ?? "?";
    users
      .subscribe({ planId, userId, cancelUrl, successUrl })
      .then((result) => {
        console.log(result);
        window.location.href = result.url;
      })
      .catch((err) => console.error(err));
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
              <Button className="w-full" onClick={() => handleChoosePlan(plan.planId)}>
                Choose Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
