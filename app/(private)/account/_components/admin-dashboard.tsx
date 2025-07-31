import { useEffect, useState } from "react";
import DashboardCard from "./dashboard-card";
import toast from "react-hot-toast";
import { getUsersReport } from "@/actions/dashboard";

function AdminDashboard() {
  const [usersData, setUsersData] = useState({
    users_count: 0,
    customers_count: 0,
    admins_count: 0,
  });

  const fetchData = async () => {
    try {
      const usersReportResponse = await getUsersReport();
      if (!usersReportResponse.success) {
        toast.error("Failed to fetch reports datas");
      }
      setUsersData(usersReportResponse.data);
    } catch (error) {
      toast.error("Failed to fetch reports datas");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-xl font-bold ">Users / Customers</h1>
      <div className="grid grid-cols-4 mt-3 gap-5">
        <DashboardCard
          name="Total Users"
          value={usersData.users_count}
          description="Total number of users"
        />
        <DashboardCard
          name="Total Customers"
          value={usersData.customers_count}
          description="Total number of customers"
        />

        <DashboardCard
          name="Total Admins"
          value={usersData.admins_count}
          description="Total number of admins"
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
