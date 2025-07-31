"use client";
import PageTitle from "@/components/ui/page-title";
import { getAllUsers } from "@/actions/users";
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
import dayjs from "dayjs";
function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response: any = await getAllUsers();
      if (!response.success) {
        toast.error("Failed to fetch users");
      }
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    "User ID",
    "Name",
    "Email",
    "Is Admin",
    "Is Active",
    "Created At",
  ];
  return (
    <div>
      <PageTitle title="Users" />
      {loading && <Spinner parentHeight={150} />}
      {!loading && users.length === 0 && (
        <p className="text-md text-stone-600">
          There are no active users at the moment.
        </p>
      )}
      {users.length > 0 && !loading && (
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
            {users.map((user: IUser) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.is_admin ? "Yes" : "No"}</TableCell>
                <TableCell>{user.is_active ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {dayjs(user.created_at).format("MMM DD, YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AllUsersPage;
