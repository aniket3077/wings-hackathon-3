"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RecoilRoot } from "recoil";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import { Label } from "@/components/ui/label";

const newUserSchema = z.object({
  projectname: z
    .string()
    .min(3, {
      message: "Project must be at least 3 characters.",
    })
    .max(20),
  description: z.string(),
  members: z.array(z.string()),
  college: z.string().max(100),
});
function CreateProject() {
  const getColleges = async () => {
    try {
      await axios.get("/api/college");
    } catch (err) {
      console.log(err);
    }
  };
  const router = useRouter();
  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      projectname: "",
      description: "",
      members: [],
      college: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newUserSchema>) {
    console.log(values);
    const res = await axios.post(
      `${process.env.DOMAIN}/api/users/createacc`,
      values
    );
    console.log("Signup response", res);
    router.push("/login");
  }
  return (
    <RecoilRoot>
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8  flex flex-col   mt-20"
          >
            <div className=" mx-[30vw] ">
              <FormField
                control={form.control}
                name="projectname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem className="z-10">
                    <FormLabel>College</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a College" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black text-white">
                        <SelectItem value="Mit Aurangabad">
                          Gramodyogik Shikshan Prasarak Mandals Maharashtra
                          Institute of Technology
                        </SelectItem>
                        <SelectItem value="Dr. Babasaheb Ambedkar Smarak Samiti Aurangabad">
                          Dr. Babasaheb Ambedkar Smarak Samiti Aurangabad
                        </SelectItem>
                        <SelectItem value="Goverment college of Engineering Aurangabad">
                          Goverment college of Engineering Aurangabad
                        </SelectItem>
                        <SelectItem value="Deogiri Institute of Engineering">
                          Deogiri Institute of Engineering
                        </SelectItem>
                      </SelectContent>
                    </Select>

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
                      <Textarea rows={5} placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

                <Label className="flex justify-center text-lg">Add Markdown</Label>
            <div className="flex mx-6  gap-5 flex-wrap md:items-center md:justify-center lg:flex-row flex-col">
              <Editor />
              <Preview />
            </div>
            <Button className="bottom-0 bg-black text-white" type="submit">
              Add Project
            </Button>
          </form>
        </Form>
      </div>
    </RecoilRoot>
  );
}

export default CreateProject;
