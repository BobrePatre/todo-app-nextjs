import { UUID } from 'crypto'
import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


export type TodoTask = {
    id: string,
    title: string,
    completed: boolean
}


export type State = {
    tasks: TodoTask[]
}


export type Actions = {
    addTask: (title: string) => void
    removeTask: (id: string) => void
    updateTask: (id: string, completed: boolean) => void
}

export const useTaskStore = create<State & Actions>()(
    persist(
      set => ({
        tasks: [],
        addTask: (title: string) =>
          set(state => ({
            tasks: [
              ...state.tasks,
              { id: uuid(), title: title, completed: false}
            ]
          })),
        removeTask: (id: string) =>
          set(state => ({
            tasks: state.tasks.filter(task => task.id !== id)
          })),
          updateTask: (id: string, completed: boolean) => 
          set(state => ({
            tasks: state.tasks.map(task =>
              task.id === id ? { ...task, completed } : task
            )
          }))
      }),
      { name: 'task-store', skipHydration: true }
    )
)
  

