import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { Project } from "@/models/projectModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const reqBody = await request.json();
  console.log(reqBody);
  const { name, description, college, markdown } = reqBody;
  console.log(name, description, college, markdown);
  const userId = await getDataFromToken(request);
  const newProject = new Project({
    name,
    description,
    college,
    markdown,
  });
 const project = await newProject.save();
 console.log(project)
  const user = await User.findById(userId);
  user.projects = user.projects || [];
  user.projects.push(project._id);
  await user.save();

  console.log(userId);

  return NextResponse.json({
    message: "Project created successfully",
    status: 200,
  });
}
