import { Config } from '../../config'
import { initFirestore } from '../../lib/firestore'
import { Task, TaskDocument } from './../../types'

const USERS = 'users'
const TASKS = 'tasks'

export const initDataBase = (config: Config) => {
  const firestore = initFirestore(config.firestore)

  const users = firestore.collection(USERS)

  return {
    getTasks: async (userId: string) => {
      const userTasksRef = users.doc(userId).collection(TASKS)

      const snapshot = await userTasksRef
        .orderBy('isCompleted', 'asc')
        .orderBy('createdAt', 'desc')
        .get()

      if (snapshot.empty) {
        return [] as TaskDocument[]
      }

      const tasks = snapshot.docs.map((doc) => {
        const data = doc.data()

        return {
          id: doc.id,
          ...data,
          dueDate: data.dueDate?.seconds || null,
          createdAt: doc.createTime.seconds,
        }
      })

      return tasks as unknown as TaskDocument[]
    },
    getTask: async (userId: string, taskId: string) => {
      const taskRef = users.doc(userId).collection(TASKS).doc(taskId)

      const doc = await taskRef.get()

      if (!doc.exists) {
        return null
      }

      return doc.data() as Task
    },
    addTask: async (userId: string, task: Task) => {
      const createdAt = new Date().getTime()

      const res = await users
        .doc(userId)
        .collection(TASKS)
        .add({ ...task, createdAt })

      return res.id
    },
    deleteTask: async (userId: string, taskId: string) => {
      await users.doc(userId).collection(TASKS).doc(taskId).delete()

      return true
    },
    setTaskComplete: async (
      userId: string,
      taskId: string,
      status: boolean
    ) => {
      const taskRef = users.doc(userId).collection(TASKS).doc(taskId)

      await taskRef.update({ isCompleted: status })

      return true
    },
  }
}

export type DbClient = ReturnType<typeof initDataBase>
