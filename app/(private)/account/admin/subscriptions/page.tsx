/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getAllSubscriptions } from "@/actions/subscriptions";
import PageTitle from "@/components/ui/page-title";

import { ISubscription } from "@/interfaces";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import Spinner from "@/components/ui/spinner";

function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response: any = await getAllSubscriptions();
      if (!response.success) {
        throw new Error(response.message);
      }
      console.log(response.data);
      setSubscriptions(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    "Customer",
    "Subscription ID",
    "Purchase Date",
    "Start Date",
    "End Date",
    "Plan",
    "Amount",
    "Payment ID",
  ];
  return (
    <div>
      <PageTitle title="All Subscriptions" />
      {loading && <Spinner parentHeight={150} />}
      {!loading && subscriptions.length === 0 && (
        <p className="text-md text-stone-600">
          There are no purchased subscriptions at the moment.
        </p>
      )}
      {subscriptions.length > 0 && !loading && (
        <Table>
          <TableHeader>
            <TableRow className="bg-stone-100">
              {columns.map((column) => (
                <TableHead key={column} className="font-bold">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.user.name}</TableCell>

                <TableCell>{subscription.id}</TableCell>
                <TableCell>
                  {dayjs(subscription.created_at).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell>
                  {dayjs(subscription.start_date).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell>
                  {dayjs(subscription.end_date).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell>{subscription.plan?.name}</TableCell>
                <TableCell>${subscription.amount}</TableCell>
                <TableCell>{subscription.payment_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AdminSubscriptionsPage;
