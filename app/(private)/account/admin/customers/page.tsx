"use client";
import PageTitle from "@/components/ui/page-title";
import { getAllCustomers } from "@/actions/users";
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
import Spinner from "@/components/ui/spinner";
import { IUser } from "@/interfaces";

function CustomersListPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response: any = await getAllCustomers();
      if (!response.success) {
        toast.error("Failed to fetch customers");
      }
      setCustomers(response.data);
    } catch (error) {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = ["Customer ID", "Name", "Email"];
  return (
    <div>
      <PageTitle title="Users" />
      {loading && <Spinner parentHeight={150} />}
      {!loading && customers.length === 0 && (
        <p className="text-md text-stone-600">
          There are no active customers at the moment.
        </p>
      )}
      {customers.length > 0 && !loading && (
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
            {customers.map((user: IUser) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default CustomersListPage;
