import { taskService } from '../services/task.service'
import { store } from './store.js'
import { ADD_TASK, REMOVE_TASK, SET_TASKS } from './task.reducer'
import { SET_SCORE, SET_WATCHED_USER } from './user.reducer.js'

// Action Creators
export function getActionRemoveTask(taskId) {
  return { type: REMOVE_TASK, taskId }
}
export function getActionAddTask(task) {
  return { type: ADD_TASK, task }
}
export function getActionSetWatchedUser(user) {
  return { type: SET_WATCHED_USER, user }
}

export async function loadTasks() {
  try {
    const tasks = await taskService.query()
    store.dispatch({ type: SET_TASKS, tasks })

  } catch (err) {
    console.log('TaskActions: err in loadTasks', err)
    throw err
  }
}

export async function addTask(task) {
  try {
    const addedTask = await taskService.add(task)
    store.dispatch(getActionAddTask(addedTask))
    const { score } = addedTask.byUser
    store.dispatch({ type: SET_SCORE, score })
  } catch (err) {
    console.log('TaskActions: err in addTask', err)
    throw err
  }
}

export async function removeTask(taskId) {
  try {
    await taskService.remove(taskId)
    store.dispatch(getActionRemoveTask(taskId))
  } catch (err) {
    console.log('TaskActions: err in removeTask', err)
    throw err
  }
}