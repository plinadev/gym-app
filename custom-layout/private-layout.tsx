/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Header from "./header";
import toast from "react-hot-toast";
import { getCurrentUserFromSupabase } from "@/actions/users";
import { IUser } from "@/interfaces";
import Spinner from "@/components/ui/spinner";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { getCurrentUserActiveSubscription } from "@/actions/subscriptions";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser, setCurrentSubscription } =
    usersGlobalStore() as IUsersGlobalStore;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response: any = await getCurrentUserFromSupabase();
      if (!response.success) {
        throw new Error(response.error);
      } else {
        setUser(response.data);
        const subResponse: any = await getCurrentUserActiveSubscription(
          response.data.id
        );
        if (subResponse.success) {
          setCurrentSubscription(subResponse.data);
        }
      }
    } catch (error: any) {
      setError("An error occured while fetching user data");
      toast.error("An error occured while fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <Spinner parentHeight={"100vh"} />;
  }
  if (error) {
    return <div className="p-5 text-red-900">{error}</div>;
  }
  return (
    <div>
      <Header user={user} />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PrivateLayout;
