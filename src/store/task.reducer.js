export const SET_TASKS = 'SET_TASKS'
export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'

const initialState = {
  tasks: [],
}

export function taskReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.tasks }
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.task] }
    case REMOVE_TASK:
      return { ...state, tasks: state.tasks.filter(task => task._id !== action.taskId) }
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.task._id ? action.task : task
        )}
    default:
      return state
  }
}
