import {gql} from "apollo-boost";

const CREATE_TASK = gql`
  mutation CreateTask($taskData: JSONString!) {
    createTask(taskData: $taskData) {
      task {
        id
        taskName
      }
    }
  }
`;

const GET_ALL_TASKS = gql`
  query allTasks {
    allTasks {
      id
      taskName
    }
  }
`;

const GET_ALL_TASKS_DURATION = gql`
  query tasksDuration($starttime: String, $endtime: String) {
    tasksDuration(starttime: $starttime, endtime: $endtime) {
      id
      taskName
      taskDate
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      name
    }
  }
`;

export {CREATE_TASK, GET_ALL_TASKS, GET_ALL_TASKS_DURATION, DELETE_TASK};
