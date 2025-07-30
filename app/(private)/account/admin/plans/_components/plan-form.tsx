/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { addNewPlan, editPlanById } from "@/actions/plans";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadFileAndGetUrl } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
interface PlanFormProps {
  formType: "add" | "edit";
  initialValues: any;
}

function PlanForm({ formType, initialValues }: PlanFormProps) {
  const [selectedMediaFiles, setSelectedMediaFiles] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [existingMediaUrls, setExistingMediaUrls] = useState<string[]>(
    initialValues?.images || []
  );

  const formSchema = z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    features: z.array(z.string()).nonempty("At least one feature is required"),
    monthly_price: z.number(),
    quarterly_price: z.number(),
    half_yearly_price: z.number(),
    yearly_price: z.number(),
  });

  const form: any = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      features: initialValues?.features || [],
      monthly_price: initialValues?.monthly_price || 0,
      quarterly_price: initialValues?.quarterly_price || 0,
      half_yearly_price: initialValues?.half_yearly_price || 0,
      yearly_price: initialValues?.yearly_price || 0,
    },
  });

  async function onSubmit(values: any) {
    try {
      setLoading(true);
      const newMediaUrls = [];
      for (const file of selectedMediaFiles) {
        const response = await uploadFileAndGetUrl(file);
        if (!response.success) {
          throw new Error(response.message);
        }
        newMediaUrls.push(response.data);
      }
      values.images = newMediaUrls;
      let response = null;
      if (formType === "add") {
        response = await addNewPlan(values);
      } else {
        values.images = [...values.images, ...existingMediaUrls];
        response = await editPlanById(initialValues.id, values);
      }

      if (response.success) {
        toast.success(response.message);
        router.push("/account/admin/plans");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const pricingFields = [
    "monthly_price",
    "quarterly_price",
    "half_yearly_price",
    "yearly_price",
  ];
  const onSelectedMediaFilesRemove = (index: number) => {
    const temp = [...selectedMediaFiles];
    temp.splice(index, 1);
    setSelectedMediaFiles(temp);
  };

  const onExistingMediaUrlsRemove = (index: number) => {
    const temp = [...existingMediaUrls];
    temp.splice(index, 1);
    setExistingMediaUrls(temp);
  };
  return (
    <div className="mt-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <fieldset className="p-5 border border-stone-400 rounded-lg ">
            <legend className="bg-white px-5 text-sm">Features</legend>
            <div className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`features.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <Button
                        className="w-fit"
                        type="button"
                        onClick={() => remove(index)}
                        variant={"outline"}
                      >
                        <Trash2 size={16} />
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <Button
              className="mt-5"
              variant={"outline"}
              size={"sm"}
              onClick={() => append("")}
              type="button"
            >
              Add Feature
            </Button>
          </fieldset>

          <fieldset className="p-5 border border-stone-400 rounded-lg ">
            <legend className="bg-white px-5 text-sm">Pricing</legend>

            <div className="grid grid-cols-4 gap-5">
              {pricingFields.map((item, index) => (
                <FormField
                  key={item}
                  control={form.control}
                  name={item}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        {item.replace("_", " ").toUpperCase()}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseFloat(e.target.value));
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-3 ">
            <FormLabel className="block">Images</FormLabel>
            <Input
              type="file"
              multiple
              onChange={(e: any) => {
                setSelectedMediaFiles([
                  ...selectedMediaFiles,
                  ...e.target.files,
                ]);
              }}
            />
            <div className="flex flex-wrap gap-5">
              {existingMediaUrls.map((url, index) => (
                <div
                  key={index}
                  className="border p-2 rounded broder-stone-300 flex flex-col items-center justify-end gap-2"
                >
                  <img src={url} alt="image" width={150} height={100} />
                  <span
                    className="text-stone-500 text-xs cursor-pointer underline "
                    onClick={() => onExistingMediaUrlsRemove(index)}
                  >
                    Remove
                  </span>
                </div>
              ))}
              {selectedMediaFiles.map((file, index) => (
                <div
                  key={index}
                  className="border p-2 rounded broder-stone-300 flex flex-col items-center justify-end gap-2"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="image"
                    width={150}
                    height={100}
                  />
                  <span
                    className="text-stone-500 text-xs cursor-pointer underline "
                    onClick={() => onSelectedMediaFilesRemove(index)}
                  >
                    Remove
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-5">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => router.push("/account/admin/plans")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PlanForm;
