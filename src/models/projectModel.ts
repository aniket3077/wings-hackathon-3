import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    
    // githubLink: {
    //     type: String,
    //     required: [true, "Please provide a githubLink"],
    // },
    // liveLink: {
    //     type: String,
    //     required: [true, "Please provide a liveLink"],
    // },
    tags: {
        type: Array,
    },
    date: {
        type: Date,
        default: new Date(), 
    },
})
export const Project = mongoose.model("Projects", projectSchema);