/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPlans } from "@/actions/plans";
import { IPlan } from "@/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function PlansList() {
  const [plans, setPlans] = useState<IPlan[]>([]);

  const fetchPlans = async () => {
    try {
      const response: any = await getAllPlans();
      if (response.success) {
        const sortedPlans = response.data.sort(
          (a: IPlan, b: IPlan) => a.monthly_price - b.monthly_price
        );
        setPlans(sortedPlans);
      } else {
        setPlans([]);
      }
    } catch (error) {
      toast.error("Failed to fetch plans");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className=" justify-between p-5 border-2 border-stone-300 hover:border-stone-500 flex flex-col gap-3 rounded cursor-pointer"
        >
          <div className="flex flex-col gap-2 ">
            <h1 className="text-xl font-bold text-white">{plan.name}</h1>
            <img
              src={plan.images[0]}
              alt={plan.name}
              className=" w-full h-50 rounded"
            />
            <p className="text-xs  text-stone-400 line-clamp-2">
              {plan.description}
            </p>

            <hr />
            <h1 className="text-sm font-semibold text-stone-300">Features</h1>
            <ul className="flex flex-col gap-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-xs text-stone-400">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <hr />

          <h1 className="text-xl font-black text-stone-200">
            Starts at ${plan.monthly_price}/month
          </h1>
        </div>
      ))}
    </div>
  );
}

export default PlansList;
