"use client";
import { IPlan } from "@/interfaces";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";

function PlansTable({ plans }: { plans: IPlan[] }) {
  const router = useRouter();
  const columns = [
    "Name",
    "Monthly Price",
    "Quarterly Price",
    "Half Yearly Price",
    "Yearly Price",
    "Date Created",
    "Actions",
  ];
  return (
    <div>
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
          {plans.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>${plan.monthly_price}</TableCell>
              <TableCell>${plan.quarterly_price}</TableCell>
              <TableCell>${plan.half_yearly_price}</TableCell>
              <TableCell>${plan.yearly_price}</TableCell>
              <TableCell>
                {dayjs(plan.created_at).format("MMM DD, YYYY HH:mmA")}
              </TableCell>
              <TableCell>
                <div className="flex gap-5">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() =>
                      router.push(`/account/admin/plans/edit/${plan.id}`)
                    }
                  >
                    <Edit2 size={14} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PlansTable;
