"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import axios from "axios";

const newUserSchema = z.object({
  
  email: z.string().email(),
  password: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters.",
    })
    .max(100),
});


export let USERID="";

function CreateAccont() {
  const router = useRouter();
  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newUserSchema>) {
    console.log("hello")
    console.log(values);
    const res = await axios.post(
      "/api/users/login",
      values
    );
    console.log("Signup response", res);
    const profile = await axios.get("/api/users/me");
    USERID=profile.data.data._id;
    router.push(`/profile/${profile.data.data._id}`);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col justify-center mt-20 mx-[30vw]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login in</Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateAccont;
