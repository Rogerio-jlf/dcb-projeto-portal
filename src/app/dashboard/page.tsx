import { LayoutDashboard } from "../../components/dashboard/Layout_Dashboard";
// import ProtectedRoute from "../../components/ProtectedRouter";

export default function DashboardPage() {
  return (
    <>
      <div>
        {/* <ProtectedRoute> */}
        <LayoutDashboard />
        {/* </ProtectedRoute> */}
      </div>
    </>
  );
}
