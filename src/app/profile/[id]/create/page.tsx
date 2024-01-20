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
} from "../../../../components/ui/select";

import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import axios from "axios";
import { Textarea } from "../../../../components/ui/textarea";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

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
  markdown: z.string(),
});
function CreateProject() {
  const [course, setCourse] = useState({
    name: "",
    description: "",
    members: [],
    college: "",
    markdown: "",
  });
  const getColleges = async () => {
    try {
      await axios.get("/api/college");
    } catch (err) {
      console.log(err);
    }
  };
  const router = useRouter();
  // const form = useForm<z.infer<typeof newUserSchema>>({
  //   resolver: zodResolver(newUserSchema),
  //   defaultValues: {
  //     projectname: "",
  //     description: "",
  //     members: [],
  //     college: "",
  //     markdown: "",
  //   },
  // });
  // async function onSubmit(values: z.infer<typeof newUserSchema>) {
  // setMarkdown(values.markdown);
  // const res = await axios.post(
  //   `${process.env.DOMAIN}/api/users/create`,
  //   values
  // );
  // console.log("Signup response", res);
  // router.push("/login");
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(course);
      await axios.post("/api/users/project", course);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col m-6 justify-center items-center gap-10"
      >
        <label htmlFor="">
          Project Name
          <hr />
          <input
          value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            className="border-black border-2"
            type="text"
          />
        </label>
        <label htmlFor="">
          Description
          <hr />
          <textarea
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            className="border-black border-2"
          />
        </label>
        <label htmlFor="college">
          College :{" "}
          <select
            id="college"
            onChange={(e) => setCourse({ ...course, college: e.target.value })}
            name="college"
          >
            <option value="CSMSS College of Engineering">
              CSMSS College of Engineering
            </option>
            <option value="Mit Aurangabad">Mit Aurangabad</option>
            <option value="Deogiri Institute of Engineering">
              Deogiri Institute of Engineering
            </option>
          </select>
        </label>

        <div className="flex">
          <div>
            <textarea
              value={course.markdown}
              placeholder="write markdown here"
              onChange={(e) =>
                setCourse({ ...course, markdown: e.target.value })
              }
              className=" p-3 border-2 lg:border-black lg:h-[80vh] lg:w-[40vw] h-[44vh] "
            />
          </div>
          <div className="overflow-scroll p-3 prose lg:prose-sm border-2 border-black  h-[44vh]  lg:w-[40vw] lg:h-[80vh]">
            <Markdown remarkPlugins={[remarkGfm]}>{course.markdown}</Markdown>
          </div>
        </div>
        <button className="bg-black px-3 py-2 text-white" type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default CreateProject;
