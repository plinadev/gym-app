"use client";
import { getStripePaymentIntent } from "@/actions/payments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageTitle from "@/components/ui/page-title";
import {
  IPlansGlobalStore,
  plansGlobalStore,
} from "@/global-store/plans-store";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/checkout-form";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { createNewSubscription } from "@/actions/subscriptions";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const router = useRouter();

  const { selectedPaymentPlan, setSelectedPaymentPlan } =
    plansGlobalStore() as IPlansGlobalStore;

  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));

  const renderProperty = (key: string, value: any) => {
    try {
      return (
        <div className="flex justify-between items-center">
          <span className="text-stone-500 text-sm">{key}</span>
          <span className="text-stone-700 font-semibold text-sm">{value}</span>
        </div>
      );
    } catch (error) {
      return;
    }
  };

  const endDate = useMemo(() => {
    return dayjs(startDate)
      .add(selectedPaymentPlan?.paymentPlan?.duration, "day")
      .format("YYYY-MM-DD");
  }, [startDate]);

  const paymentIntentHandler = async () => {
    try {
      setLoading(true);
      const response = await getStripePaymentIntent(
        selectedPaymentPlan?.paymentPlan?.price
      );
      if (response.success) {
        setClientSecret(response.data);
        setShowCheckoutForm(true);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };
  const options = {
    clientSecret: clientSecret!,
  };
  const onPaymentSuccess = async (paymentId: string) => {
    try {
      const payload = {
        user_id: user?.id,
        plan_id: selectedPaymentPlan?.mainPlan?.id,
        start_date: startDate,
        end_date: endDate,
        payment_id: paymentId,
        amount: Number(selectedPaymentPlan?.paymentPlan?.price),
        total_duration: Number(selectedPaymentPlan?.paymentPlan?.duration),
        is_active: true,
      };
      const response = await createNewSubscription(payload);
      if (response.success) {
        toast.success("Congratulations! You are all set!");
        router.push("/account/user/subscriptions");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error("An error occured while processing your payment");
    }
  };
  return (
    <div>
      <PageTitle title="Checkout" />
      {selectedPaymentPlan && (
        <div className="grid grid-cols-2 mt-7">
          <div className="col-span-1 p-5 border border-stone-500 flex flex-col gap-2 rounded">
            {renderProperty("Plan name", selectedPaymentPlan?.mainPlan?.name)}
            {renderProperty(
              "Amount",
              "$" + selectedPaymentPlan?.paymentPlan?.price
            )}
            {renderProperty(
              "Duration",
              selectedPaymentPlan?.paymentPlan?.duration + " days"
            )}
            {renderProperty(
              "Start Date",
              <Input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
              />
            )}

            {startDate && renderProperty("End Date", endDate)}

            <Button
              className="mt-5"
              onClick={paymentIntentHandler}
              disabled={loading}
            >
              Pay Now
            </Button>
          </div>
        </div>
      )}
      {!selectedPaymentPlan && (
        <div className="mt-4 text-lg">
          <p>Please select a payment plan!</p>
        </div>
      )}

      {showCheckoutForm && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            onPaymentSuccess={onPaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
}

export default CheckoutPage;
