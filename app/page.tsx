import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Homepage() {
  return (
    <div className="p-5 flex flex-col gap-5">
      <h1>Homepage</h1>
      <Button className="w-max">Button</Button>
      <Input />
    </div>
  );
}

export default Homepage;
