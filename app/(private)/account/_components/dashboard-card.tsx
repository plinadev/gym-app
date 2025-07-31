interface DashboardCardProps {
  name: string;
  description: string;
  value: number;
  isCurrency?: boolean;
}
function DashboardCard({
  name,
  description,
  value,
  isCurrency = false,
}: DashboardCardProps) {
  return (
    <div className="border border-stone-500 p-5 flex flex-col rounded">
      <h1 className="text-sm font-semibold">{name}</h1>
      <p className="text-stone-700 text-xs">{description}</p>
      <h1 className="text-6xl font-bold text-center my-5">
        {" "}
        {isCurrency ? `$${value}` : value}
      </h1>
    </div>
  );
}

export default DashboardCard;
