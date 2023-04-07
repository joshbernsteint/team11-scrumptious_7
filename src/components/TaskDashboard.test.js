import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskDashboard } from "./TaskDashboard";

const MyTasks = [
  
   {
      id:   "0507ae01-3364-4d76-94c8-c8fe7dc7cd6b",
      assignedTo: "Joshua Bernstein",
      completed: false,
      dateCompleted: "",
      description: "Verify planned system design onsite",
      dueDate: "Fri Apr 07 2023 00:00:00 GMT-0400 (Eastern Daylight Time)",
      owner: "Jasmine Perez",
      priority: "1",
      title: "Site Evaluation",
    },
     {
      id: "3a766bf6-6c0d-4e6b-bb47-c4d46728b9b7",
      assignedTo: "Josh Bern",
      complete: false,
      completed: true,
      dateCompleted: "Fri Apr 07 2023 4:05:21 PM",
      description: "There is no light here",
      dueDate: "Wed Apr 12 2023 00:00:00 GMT-0400 (Eastern Daylight Time)",
      owner: "Jasmine Perez",
      priority: "4",
      title: "Begin Truss Supports",
    },
    {
      id:  "48f0b5f3-4c73-4c71-a67f-738537e7d9f6",
      assignedTo: "managertwo managertwo",
      completed: true,
      dateCompleted: "Fri Apr 07 2023 5:44:07 PM",
      description:
        "Review Contract and make sure client has signed all documents",
      dueDate: "Sun Apr 09 2023 00:00:00 GMT-0400 (Eastern Daylight Time)",
      owner: "Jasmine Perez",
      priority: "1",
      title: "Document Review",
    },
     {
      id: "4dd172a2-d70a-4266-a5f5-5c166ef9652f",
      assignedTo: "Campbell Tedtsen",
      completed: false,
      dateCompleted: "",
      description: "Must read terms and conditions in contract and sign.",
      dueDate: "Sat Apr 08 2023 00:00:00 GMT-0400 (Eastern Daylight Time)",
      owner: "Jasmine Perez",
      priority: "1",
      title: "Contract Review and Sign",
    },
    {
      id:  "58b4c184-3fe8-4130-976f-bc08c5cec7fa",
      assignedTo: "Harry Potter",
      completed: true,
      dateCompleted: "Fri Apr 07 2023 4:05:22 PM",
      description: "Connect Electrical wiring",
      dueDate: "Wed Apr 12 2023 00:00:00 GMT-0400 (Eastern Daylight Time)",
      owner: "Jasmine Perez",
      priority: 2,
      title: "Connect Wiring",
    },
     {
      id:"757b97d7-07bc-496d-a49b-b5b3106db954" ,
      assignedTo: "Manager manager",
      completed: true,
      dateCompleted: "Fri Apr 07 2023 4:26:03 PM",
      description: "Send permit application and design documents to city hall.",
      dueDate: "Tue Apr 11 2023 00:00:00 GMT-0400 (Eastern Daylight Time)",
      owner: "Jasmine Perez",
      priority: "2",
      title: "Permit Approval",
    },
     {
      id:"9a3960c2-e066-4d46-a9e2-1001b8c2f422" ,
      assignedTo: "Jane Doe",
      completed: true,
      dateCompleted: "Fri Apr 07 2023 5:47:59 PM",
      description: "Must install 3 panels on mid-sized house roof",
      dueDate: "Sat Apr 08 2023 00:00:00 GMT-0400 (Eastern Daylight Time)",
      owner: "Jasmine Perez",
      priority: 1,
      title: "Install Panels",
    },
  
];

test("check if featured task is in the document", () => {
  render(<TaskDashboard taskRef={MyTasks} />);
  const input = screen.getByLabelText("featured");
  expect(input).toBeInTheDocument();
});

test("check if there is button to switch featured task", () => {
  render(<TaskDashboard taskRef={MyTasks} />);
  const input = screen.getByLabelText("change-task-button");
  expect(input).toBeInTheDocument();
});

test("Push featured task button and change featured task", () => {
  render(<TaskDashboard taskRef={MyTasks} />);
  const input = screen.getByText("Change Featured Task");
  fireEvent.click(input);
  const input2 = screen.getByLabelText("featured-selector");
  expect(input2).toBeInTheDocument();
});

test("See if all of the tasks are on the screen", () => {
  render(<TaskDashboard taskRef={MyTasks} />);
  for (let i = 0; i < MyTasks.length; i++) {
    expect(screen.getByLabelText(MyTasks[i].id)).toBeInTheDocument();
  }
});

test("Push different filter buttons, all tasks are still there", () => {
  render(<TaskDashboard taskRef={MyTasks} />);
  fireEvent.click(screen.getByText("Id"));
  for (let i = 0; i < MyTasks.length; i++) {
    expect(screen.getByLabelText(MyTasks[i].id)).toBeInTheDocument();
  }

  fireEvent.click(screen.getByText("Date"));
  for (let i = 0; i < MyTasks.length; i++) {
    expect(screen.getByLabelText(MyTasks[i].id)).toBeInTheDocument();
  }

  fireEvent.click(screen.getByText("Priority"));
  for (let i = 0; i < MyTasks.length; i++) {
    expect(screen.getByLabelText(MyTasks[i].id)).toBeInTheDocument();
  }
});
