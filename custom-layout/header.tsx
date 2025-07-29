import { IUser } from "@/interfaces";
import { Menu } from "lucide-react";
import { useState } from "react";
import MenuSidebar from "./menu-sidebar";

function Header({ user }: { user: IUser | null }) {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between bg-primary px-5 py-7">
      <h1 className="text-white font-black text-2xl">
        Stay.<span className="text-stone-500 font-black">Fit</span>
      </h1>
      <div className="flex gap-5 items-center">
        <h1 className="text-sm text-white">{user?.name}</h1>
        <Menu
          className="text-white cursor-pointer"
          size={15}
          onClick={() => setOpenSidebar(true)}
        />
      </div>

      {openSidebar && user && (
        <MenuSidebar
          user={user}
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      )}
    </div>
  );
}

export default Header;
