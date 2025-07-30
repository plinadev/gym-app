"use client";
import { Button } from "@/components/ui/button";
import { MoveDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import PlansList from "./_components/plans-list";

function Homepage() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const queryStrings = useSearchParams();
  const form = queryStrings.get("form");
  return (
    <div className="home-parent py-10 px-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-white uppercase ">Stay.Fit</h1>
        <Button variant={"outline"} onClick={() => setOpenSidebar(true)}>
          Sign In
        </Button>
      </div>
      <div className="flex flex-col justify-center gap-6 items-center h-[80vh] mt-15">
        <h1 className=" text-6xl font-black text-center text-white">
          Stay.
          <span className="text-stone-500 font-black">Fit</span>
        </h1>

        <p className="text-m text-stone-400">
          A perfect gym for you to get fit and healthy with the best trainers
          and equipment.
        </p>

        <Button
          variant={"outline"}
          onClick={() => {
            const plansDiv = document.getElementById("plans");
            plansDiv?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explore Plans
        </Button>
        <MoveDown
          size={20}
          color="gray"
          className="animate-bounce cursor-pointer mt-20"
        />
      </div>

      <div id="plans">
        <h1 className="text-3xl font-bold text-center text-white mt-20">
          Our Plans
        </h1>
        <PlansList />
      </div>
      <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
        <SheetContent className="md:min-w-[500px] flex items-center justify-center min-h-screen auth-parent">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>

          {form === "sign-up" ? (
            <SignUp
              routing="hash"
              signInUrl="/?form=sign-in"
              fallbackRedirectUrl={"/account"}
            />
          ) : (
            <SignIn
              routing="hash"
              signUpUrl="/?form=sign-up"
              fallbackRedirectUrl={"/account"}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Homepage;
