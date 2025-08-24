import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  task_status: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    required: true,
    default: "todo",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", TaskSchema);
