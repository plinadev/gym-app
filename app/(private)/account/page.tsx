import { getCurrentUserFromSupabase } from "@/actions/users";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

async function AccountPage() {
  const result = await currentUser();
  const name = result?.firstName + " " + result?.lastName;
  const clerkUserId = result?.id;
  const email = result?.emailAddresses[0].emailAddress;
  const response = await getCurrentUserFromSupabase();
  console.log(response);
  return (
    <div className="p-5">
      <h1>Account Page</h1>
      <UserButton afterSignOutUrl="/" />

      <h1>Clerk User Name: {name}</h1>
      <h1>Clerk User Email: {email}</h1>
      <h1>Clerk User Id: {clerkUserId}</h1>
    </div>
  );
}

export default AccountPage;
