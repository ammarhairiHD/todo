import { TokenData } from "@/types/tokenData";
import { useState } from "react";

export default function AddTask({ user }: { user: TokenData }) {
  const [openCard, setOpenCard] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const getToken = localStorage.getItem("token");

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/tasks/create_task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      },
      body: JSON.stringify({
        title,
        description,
        task_status: "todo",
      }),
    });
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={() => setOpenCard(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Add Task
      </button>
      {openCard && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Create a New Task</h3>
          <form onSubmit={createTask}>
            <input
              type="text"
              placeholder="Task Title"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Task Description"
              className="border border-gray-300 rounded-md p-2 w-full mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mt-2"
            >
              Create Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
