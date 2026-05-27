import axios from 'axios'
import type { Employee, Step } from '../types'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
})

export const employeeService = {
  getAll: async (): Promise<Employee[]> => (await api.get('/employees')).data,
  create: async (e: Omit<Employee, 'id'>): Promise<Employee> => (await api.post('/employees', e)).data,
  update: async (e: Employee): Promise<Employee> => (await api.put(`/employees/${e.id}`, e)).data,
  delete: async (id: string): Promise<void> => { await api.delete(`/employees/${id}`) },
}

export const stepService = {
  getAll: async (): Promise<Step[]> => (await api.get('/steps')).data,
  updateCompleted: async (id: string, completed: boolean): Promise<Step> =>
    (await api.patch(`/steps/${id}`, { completed })).data,
}
