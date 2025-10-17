enum taskStatus {
  TODO = "todo",
  INPROGRESS = "inprogress",
  DONE = "done",
}

export type task = {
  title: string;
  description: string;
  task_status: taskStatus;
  user: any;
  createdAt: Date;
};
