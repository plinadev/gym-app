"use client";

import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import Link from "next/link";

function AccountPage() {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  return (
    <div>
      <PageTitle title={`Welcome ${user?.name}`} />

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
    </div>
  );
}

export default AccountPage;
