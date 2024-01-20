import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a title"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  college: {
    type: String,
  },
  markdown: {
    type: String,
  },
  // githubLink: {
  //     type: String,
  //     required: [true, "Please provide a githubLink"],
  // },
  // liveLink: {
  //     type: String,
  //     required: [true, "Please provide a liveLink"],
  // },
  date: {
    type: Date,
    default: new Date(),
  },
});
export const Project = mongoose.model("projects", projectSchema);
