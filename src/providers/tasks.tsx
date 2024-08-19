import {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from 'react'
import { Alert } from 'react-native'
import { ITask } from '../components/task'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface TaskProviderProps {
  children: ReactNode
}

const TASKS_STORAGE_KEY = '@todo:tasks'

interface TasksContextData {
  tasks: ITask[]
  addNewTask: (taskText: string) => void 
  onUpdateChecked: (taskText: string) => void 
  onRemoveTask: (taskText: string) => void 
  tasksCounter: number
  finishedTasksCounter: number
  loading: boolean
} 

const TasksContext = createContext({} as TasksContextData)

const TaskProvider = ({children}: TaskProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState<ITask[]>([])


  const addNewTask = useCallback(async (taskText: string) => {
    const id = new Date().toISOString()
    
    const task: ITask = {
      text: taskText,
      checked: false,
      id
    } 

    try {
      setLoading(true)
      const tasksList = [...tasks, task]
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksList))
    } catch (error) {
      return Alert.alert('add new task', error as string) 
    }finally {
      setLoading(false)
    }

    setTasks(prev => [...prev, task])
  }, [tasks])

  const onUpdateChecked = useCallback((taskId: string) => {
      const index = tasks.findIndex(task => task.id === taskId)

      if(index < 0) return

      const tasksList = [...tasks]

      tasksList[index] = {
        ...tasksList[index],
        checked: !tasksList[index].checked
      }

      setTasks(tasksList)
  },[tasks])

  const onRemoveTask = useCallback(async (taskId: string) => {
      const findTask = tasks.find(task => task.id === taskId)

      if(!findTask) return

      try {
        setLoading(true)
        const tasksList = [...tasks].filter(task => task.id !== findTask.id)
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksList))
      } catch (error) {
        return Alert.alert('delete task', error as string) 
      }finally {
        setLoading(false)
      }

      setTasks(prev => [...prev.filter(task => task.id !== findTask.id)])
  },[tasks])

  const tasksCounter = useMemo(() => {
    return tasks.length 
  },[tasks])


  const finishedTasksCounter = useMemo(() => {
    return tasks.filter(task => task.checked).length
  },[tasks])


  useEffect(function fetchStoragedTasks() {
    (async () => {
      try {
        setLoading(true)
        const storaged = await AsyncStorage.getItem(TASKS_STORAGE_KEY)

        if(storaged) {
          const storagedTasks = JSON.parse(storaged)

          setTasks(storagedTasks)
        }
      } catch (error) {
        console.log(error)
        return Alert.alert('fetch tasks', error as string) 
      }finally {
        setLoading(false)
      }
    })()
  },[])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        tasksCounter,
        finishedTasksCounter,
        loading,
        addNewTask,
        onUpdateChecked,
        onRemoveTask
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

function useTask() {
  const context = useContext(TasksContext)

  if(!context) {
    throw new Error('useTask should be used within an TaskProvider')
  }

  return context
}

export {useTask, TaskProvider}