let dateType: Date = new Date();

export type task = {
  title: string;
  description: string;
  task_status: "todo" | "inprogress" | "done";
  user: any;
  createdAt: Date;
};
