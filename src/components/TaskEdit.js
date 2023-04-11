import React, { useState, useEffect } from "react";
import "../App.css";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, getDatabase, child, get } from "firebase/database";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import de from "date-fns/locale/de";
import { v4 as uuid } from "uuid";

function TaskEdit(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [owner, setOwner] = useState("");
  const [priority, setPriority] = useState("");
  const [uid, setUid] = useState(props.uid);
  const [userList, setUserList] = useState([]);
  const [result, setResult] = useState({});
  const [error, setError] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });
  const [success, setSuccess] = useState(false);
  let options = null;

  const getAllUsers = async () => {
    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, "users"));
      if (snapshot.exists()) {
        setResult(snapshot.val());
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        getUser();
      } else {
        console.log("User not signed in");
      }
    });
  }, [auth, uid]);

  useEffect(() => {
    if (uid) {
      getAllUsers();
    }
  }, [uid]);

  useEffect(() => {
    if (Object.keys(result).length !== 0) {
      let userNamesAndUid = [];
      Object.keys(result).forEach((key, index) => {
        let userName = `${result[key].firstName} ${result[key].lastName}`;
        let userUid = `${result[key].uid}`;
        userNamesAndUid = [
          ...userNamesAndUid,
          { name: userName, uid: userUid },
        ];
      });
      setUserList(userNamesAndUid);
    }
  }, [result]);

  if (userList.length > 0) {
    options = userList.map((user) => {
      return buildOptions(user.name, user.uid);
    });
  }

  function buildOptions(name, userUid) {
    if (name) {
      return (
        <option key={userUid} value={`${userUid} ${name}`}>
          {name}
        </option>
      );
    }
  }

  async function getUser() {
    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, `users/${uid}`));
      if (snapshot.exists) {
        if (snapshot.val().userType === "manager") {
          setOwner(snapshot.val().firstName + " " + snapshot.val().lastName);
        } else {
          setOwner(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  function writeTaskData() {
    if (title && description && assignedTo && dueDate && owner && priority) {
      const db = getDatabase();
      let assignedToObj = {uid: assignedTo.split(" ")[0], name: assignedTo.split(" ")[1] + " " + assignedTo.split(" ")[2]}
      set(ref(db, "tasks/" + uuid()), {
        title: title,
        description: description,
        dueDate: dueDate,
        assignedTo: assignedToObj,
        owner: owner,
        completed: false,
        priority: priority,
      });
      setSuccess(true);
      setError(false);
    } else {
      let errorObj = {};
      if (!title) {
        errorObj.title = "Title cannot be empty";
      }
      if (!description) {
        errorObj.description = "Task must have a description ";
      }

      if (!assignedTo) {
        errorObj.assignedTo = "Task must be assigned to someone";
      }

      if (!dueDate) {
        errorObj.dueDate = "Select a due date";
      }

      if (!priority) {
        errorObj.priority = "Select a priority";
      }

      if (!owner) {
        errorObj.owner = "Must be a manager to assign new tasks";
      }
      setError(errorObj);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSuccess(false);
    writeTaskData();
    if (error === false) {
      setTitle("");
      setDescription("");
      setAssignedTo("");
      setDueDate("");
      setPriority("");
    }
  }

  return (
    <div>
      {success && <p data-tesid="success">Task successfully created!</p>}
      {error.owner && <p data-testid="auth-msg">{error.owner}</p>}
      <form
        onSubmit={handleSubmit}
        data-testid="task-form"
        className="task-form"
      >
        <div>
          {error.title && <p data-testid="title-msg" className="error">{error.title}</p>}
          <label className="">Task Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            aria-label="title-input"
            onChange={(event) => {
              setSuccess(false);
              setTitle(event.target.value);
            }}
          ></input>
        </div>
        <div>
          {error.description && <p className="error">{error.description}</p>}
          <label className="">Task Description:</label>
          <textarea
            className="text-area"
            type="text"
            name="description"
            value={description}
            aria-label="desc-input"
            onChange={(event) => {
              setSuccess(false);
              setDescription(event.target.value);
            }}
          ></textarea>
        </div>
        <div className="date-picker">
          {error.dueDate && <p data-testid="date-msg" className="error">{error.dueDate}</p>}
          <label className="">Deadline:</label>
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
            <DatePicker
              selected={dueDate}
              format="MM/dd/yyyy"
              data-testid="date-picker"
              onChange={(date) => setDueDate(date.toString())}
            />
          </LocalizationProvider>
        </div>
        <div>
          {error.assignedTo && <p className="error">{error.assignedTo}</p>}
          <label className="">Assign To:</label>
          <select
            name="assignedTo"
            value={assignedTo}
            aria-label="assignee-input"
            onChange={(event) => {
              setSuccess(false);
              setAssignedTo(event.target.value);
            }}
          >
            <option disabled value="">
              Choose Assignee
            </option>
            {options}
          </select>

          {error.priority && <span className="error"> {error.priority}</span>}
          <label className="priority-select"> Priority</label>
          <select
            name="priority"
            value={priority}
            aria-label="priority-input"
            onChange={(event) => {
              setPriority(event.target.value);
            }}
          >
            <option disabled value="">
              Choose level
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="btn-div">
          <button
            data-testid="task-submit-btn"
            className="form-btn"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
