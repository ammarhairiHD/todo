"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ListTodo() {
  const [todoList, setTodoList] = useState([]);
  const [showError, setShowError] = useState(" ");

  const theListHeader = [
    { title: "TITLE" },
    { title: "DESCRIPTION" },
    { title: "STATUS" },
    { title: "CREATED AT" },
  ];

  const getList = async () => {
    try {
      const getToken = localStorage.getItem("token");
      if (!getToken) {
        setShowError("Token not found");
        return;
      }
      const fetchData = await fetch("/api/tasks/get_lists", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      if (fetchData.ok) {
        const result = await fetchData.json();
        setTodoList(result);
      }
    } catch (error) {
      setShowError("Failed to fetch data");
    }
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      {showError && <div>{showError}</div>}

      <Table>
        <TableHeader>
          <TableRow>
            {theListHeader.map((headerItem, index) => (
              <TableHead key={index} className=" text-blue-500">
                {headerItem.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {todoList.map((item: any) => (
            <TableRow key={item._id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.task_status}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
