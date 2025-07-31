"use client";

import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import dayjs from "dayjs";
import Link from "next/link";
import AdminDashboard from "./_components/admin-dashboard";

function AccountPage() {
  const { user, currentSubscription } = usersGlobalStore() as IUsersGlobalStore;

  const renderProperties = (label: string, value: any) => (
    <div className="flex justify-between">
      <p className="text-sm text-stone-600">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );

  if (user?.is_admin) {
    return <AdminDashboard />;
  }
  return (
    <div>
      <PageTitle title={`Welcome, ${user?.name}!`} />
      {!currentSubscription && (
        <div className="flex flex-col gap-5">
          <p className="mt-5 text-sm text-stone-600">
            You do not have any active subscriptions at the moment. Please
            subscribe to enjoy our services.
          </p>

          <Button className="w-max">
            <Link href={"/account/user/purchase-plan"}>
              View Subscription Plans
            </Link>
          </Button>
        </div>
      )}
      {currentSubscription && (
        <div className="mt-7 grid grid-cols-2">
          <div className="col-span-1 p-5 border rounded border--stone-500 flex flex-col gap-2">
            <h1 className="text-md font-semibold text-stone-700">
              Your Current Subscription
            </h1>
            <hr />
            {renderProperties("Subscription ID", currentSubscription?.id)}

            {renderProperties("Plan", currentSubscription?.plan?.name)}
            {renderProperties(
              "Purchased On",
              dayjs(currentSubscription?.created_at).format("MMM DD, YYYY")
            )}
            {renderProperties(
              "Start Date",
              dayjs(currentSubscription?.start_date).format("MMM DD, YYYY")
            )}
            {renderProperties(
              "End Date",
              dayjs(currentSubscription?.end_date).format("MMM DD, YYYY")
            )}
            {renderProperties(
              "Total Duration",
              currentSubscription?.total_duration + " days"
            )}
            {renderProperties("Amount", currentSubscription?.amount)}
            {renderProperties("Payment Id", currentSubscription?.payment_id)}
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
