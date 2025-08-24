enum taskStatusData {
  todo,
  inprogress,
  done,
}

let dateType: Date = new Date();

export type task = {
  title: string;
  description: string;
  task_status: taskStatusData;
  createdAt: typeof dateType;
};
