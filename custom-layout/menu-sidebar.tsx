import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IUser } from "@/interfaces";
import { SignOutButton } from "@clerk/nextjs";
import {
  Heart,
  Home,
  List,
  LogOut,
  ShieldCheck,
  User2,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface IMenuSidebarProps {
  user: IUser;
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}
function MenuSidebar({ user, openSidebar, setOpenSidebar }: IMenuSidebarProps) {
  const iconSize = 15;
  const pathname = usePathname();
  const router = useRouter();

  const userMenuItems = [
    { name: "Home", icon: <Home size={iconSize} />, route: "/account" },
    {
      name: "Profile",
      icon: <User2 size={iconSize} />,
      route: "/account/user/profile",
    },
    {
      name: "My Subscriptions",
      icon: <ShieldCheck size={iconSize} />,
      route: "/account/user/subscriptions",
    },
    {
      name: "Referrals",
      icon: <Heart size={iconSize} />,
      route: "/account/user/referrals",
    },
  ];
  const adminMenuItems = [
    { name: "Home", icon: <Home size={iconSize} />, route: "/account" },
    {
      name: "Users",
      icon: <Users size={iconSize} />,
      route: "/account/admin/users",
    },
    {
      name: "Subscriptions",
      icon: <ShieldCheck size={iconSize} />,
      route: "/account/admin/subscriptions",
    },
    {
      name: "Customers",
      icon: <List size={iconSize} />,
      route: "/account/admin/customers",
    },
    {
      name: "Referrals",
      icon: <Heart size={iconSize} />,
      route: "/account/admin/referrals",
    },
  ];

  const menuItemsToRender = user.is_admin ? adminMenuItems : userMenuItems;

  return (
    <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-10 m-7 mt-20">
          {menuItemsToRender.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 cursor-pointer rounded ${
                pathname === item.route
                  ? "bg-stone-100 border border-stone-500"
                  : ""
              }`}
              onClick={() => {
                router.push(item.route);
                setOpenSidebar(false);
              }}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
          <SignOutButton>
            <Button className="p-5">
              <LogOut size={iconSize} />
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MenuSidebar;
