import PageTitle from "@/components/ui/page-title";
import PlanForm from "../_components/plan-form";

function AddPlanPage() {
  return (
    <div>
      <PageTitle title="Add Plan" />
      <PlanForm formType="add" initialValues={null} />
    </div>
  );
}

export default AddPlanPage;
