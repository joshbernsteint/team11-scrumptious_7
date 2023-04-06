const mongoCollections = require("./../config/mongoCollections");
const tasks = mongoCollections.tasks;
const { ObjectId } = require("mongodb");

/*
  Schema for tasks:
  {
    _id: ObjectId,
    id: "3",
    title: "Connect wiring",
    due: "May 12, 2023",
    owner: "Manager",
    assignedTo: "Construction Worker",
    description: "Connect electrical wiring",
    priority: "2",
    date: "2023-03-31",
    completed: "90",
  }
*/

const createTask = async (
  id,
  title,
  due,
  owner,
  description,
  priority,
  date
) => {
  let errors = [];
  if (!id || typeof id !== "string") {
    errors.push("Id must be a string");
  }
  if (!title || typeof title !== "string") {
    errors.push("Title must be a string");
  }
  if (!due || typeof due !== "string") {
    errors.push("Due date must be a string");
  }
  if (!owner || typeof owner !== "string") {
    errors.push("Owner must be a string");
  }
  if (!description || typeof description !== "string") {
    errors.push("Description must be a string");
  }
  if (!priority || typeof priority !== "string") {
    errors.push("Priority must be a string");
  }
  if (!date || typeof date !== "string") {
    errors.push("Date must be a string");
  }

  if (errors.length > 0) {
    return { error: errors };
  }
  const taskCollection = await tasks();
  const newTask = {
    id: id,
    title: title,
    due: due,
    owner: owner,
    assignedTo: "no one",
    description: description,
    priority: priority,
    date: date,
    completed: "0",
  };

  const newInsertInformation = await taskCollection.insertOne(newTask);
  if (newInsertInformation.insertedCount === 0) {
    return { error: "Could not add task" };
  }
  const newId = newInsertInformation.insertedId;
  const task = await getTaskById(newId.toString());
  return task;
};

const getTaskById = async (id) => {
  if (!id) {
    return { error: "You must provide an id to search for" };
  }
  if (typeof id !== "string") {
    return { error: "Id must be a string" };
  }
  const taskCollection = await tasks();
  const task = await taskCollection.findOne({ _id: ObjectId(id) });
  if (task === null) {
    return { error: "No task with that id" };
  }
  return task;
};

const getTaskByTitle = async (title) => {
  if (!title) {
    return { error: "You must provide a title to search for" };
  }
  if (typeof title !== "string") {
    return { error: "Title must be a string" };
  }
  const taskCollection = await tasks();
  const task = await taskCollection.findOne({ title: title });
  if (task === null) {
    return { error: "No task with that title" };
  }
  return task;
};

const updateTask = async (
  taskid,
  id,
  title,
  due,
  owner,
  description,
  priority,
  date
) => {
  if (taskid === undefined || taskid === null) {
    return { error: "You must provide an id to search for" };
  }
  if (typeof taskid !== "string") {
    return { error: "Id must be a string" };
  }
  if (ObjectId.isValid(taskid) === false) {
    return { error: "Invalid id" };
  }

  let errors = [];
  if (!id || typeof id !== "string") {
    errors.push("Id must be a string");
  }
  if (!title || typeof title !== "string") {
    errors.push("Title must be a string");
  }
  if (!due || typeof due !== "string") {
    errors.push("Due date must be a string");
  }
  if (!owner || typeof owner !== "string") {
    errors.push("Owner must be a string");
  }
  if (!description || typeof description !== "string") {
    errors.push("Description must be a string");
  }
  if (!priority || typeof priority !== "string") {
    errors.push("Priority must be a string");
  }
  if (!date || typeof date !== "string") {
    errors.push("Date must be a string");
  }

  if (errors.length > 0) {
    return { error: errors };
  }

  let task = await getTaskById(taskid);
  if (task.error) {
    return { error: task.error };
  }
  const taskCollection = await tasks();
  const updatedTask = {
    id: id,
    title: title,
    due: due,
    owner: owner,
    assignedTo: task.assignedTo,
    description: description,
    priority: priority,
    date: date,
    completed: task.completed,
  };

  const updatedInfo = await taskCollection.updateOne(
    { _id: ObjectId(taskid) },
    { $set: updatedTask }
  );

  if (updatedInfo.modifiedCount === 0) {
    return { error: "Could not update task successfully" };
  }

  return await getTaskById(taskid);
};

const updateAssignedTo = async (taskid, assignedTo) => {
  if (taskid === undefined || taskid === null) {
    return { error: "You must provide an id to search for" };
  }

  if (typeof taskid !== "string") {
    return { error: "Id must be a string" };
  }
  taskid = taskid.trim();
  if (ObjectId.isValid(taskid) === false) {
    return { error: "Invalid id" };
  }

  if (assignedTo === undefined || assignedTo === null) {
    return { error: "You must provide an assignedTo to search for" };
  }
  if (typeof assignedTo !== "string") {
    return { error: "assignedTo must be a string" };
  }
  assignedTo = assignedTo.trim();
  if (assignedTo === "") {
    return { error: "assignedTo must not be empty" };
  }

  let task = await getTaskById(taskid);
  if (task.error) {
    return { error: task.error };
  }

  const taskCollection = await tasks();
  const updatedInfo = await taskCollection.updateOne(
    { _id: ObjectId(taskid) },
    { $set: { assignedTo: assignedTo } }
  );
  if (updatedInfo.modifiedCount === 0) {
    return { error: "Could not update task successfully" };
  }
  return await getTaskById(taskid);
};

module.exports = {
  createTask,
  getTaskById,
  getTaskByTitle,
  updateTask,
  updateAssignedTo,
};
