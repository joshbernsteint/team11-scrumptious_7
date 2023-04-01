import { render, screen, fireEvent } from "@testing-library/react";
import { useRef } from "react"
import { TaskDashboard } from "./TaskDashboard";

const MyTasks =
    [{
      id: "1",
      title: "Submit Roof Picture",
      due: "March 8, 2023",
      owner: "Manager",
      assignedTo: "Construction Worker",
      description: "placeholder",
      priority: "3",
      date: "2023-03-8",
      completed: "40",
    },
    {
      id: "1.5",
      title: "Submit Roof",
      due: "March 13, 2023",
      owner: "Manager",
      assignedTo: "Construction Worker",
      description: "placeholder",
      priority: "3",
      date: "2023-03-8",
      completed: "15",
    },
    {
        id: "5",
        title: "Begin truss supports",
        due: "March 12, 2023",
        owner: "Manager",
        assignedTo: "Construction Worker",
        description: "There is no light here",
        priority: "4",
        date: "2023-03-12",
        completed: "65",

    },
    {
        id: "2",
        title: "Install panels",
        due: "March 16, 2023",
        owner: "Manager",
        assignedTo: "Construction Worker",
        description: "Put panels in place",
        priority: "1",
        date: "2023-03-30",
        completed: "30",

    },
    {
        id: "3",
        title: "Connect wiring",
        due: "May 12, 2023",
        owner: "Manager",
        assignedTo: "Construction Worker",
        description: "Connect electrical wiring",
        priority: "2",
        date: "2023-03-31",
        completed: "90",

    }];

test("check if featured task is in the document", () => {
  render(<TaskDashboard tasks={MyTasks}/>);
  const input = screen.getByLabelText("featured");
  expect(input).toBeInTheDocument();
});


test("check if there is button to switch featured task", () => {
    render(<TaskDashboard tasks={MyTasks}/>);
    const input = screen.getByLabelText("change-task-button");
    expect(input).toBeInTheDocument();
  });

  test("Push featured task button and change featured task", () => {
    render(<TaskDashboard tasks={MyTasks}/>);
    const input = screen.getByText("Change Featured Task");
    fireEvent.click(input);
    const input2 = screen.getByLabelText("featured-selector");
    expect(input2).toBeInTheDocument();
  });

  test("See if all of the tasks are on the screen", () => {
    render(<TaskDashboard tasks={MyTasks}/>);
    for(let i = 0; i < MyTasks.length; i++){
        expect(screen.getByLabelText(MyTasks[i].id)).toBeInTheDocument();
    }
  });

  test("Push different filter buttons, all tasks are still there", () => {
    render(<TaskDashboard tasks={MyTasks}/>);
    fireEvent.click(screen.getByText("Id"));
    for(let i = 0; i < MyTasks.length; i++){
        expect(screen.getByLabelText(MyTasks[i].id)).toBeInTheDocument();
    }

    fireEvent.click(screen.getByText("Date"));
    for(let i = 0; i < MyTasks.length; i++){
        expect(screen.getByLabelText(MyTasks[i].id)).toBeInTheDocument();
    }

    fireEvent.click(screen.getByText("Priority"));
    for(let i = 0; i < MyTasks.length; i++){
        expect(screen.getByLabelText(MyTasks[i].id)).toBeInTheDocument();
    }

  });