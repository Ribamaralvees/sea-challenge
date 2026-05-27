export interface EPI {
  name: string
  ca: string
}
export interface EpiActivity {
  activity: string
  epis: EPI[]
}
export interface Employee {
  id: string
  name: string
  cpf: string
  rg: string
  birthDate: string
  gender: 'masculino' | 'feminino'
  role: string
  active: boolean
  epiActivities: EpiActivity[]
  healthCertificate: string | null
}
export interface Step {
  id: string
  label: string
  completed: boolean
}
export interface EmployeeState {
  employees: Employee[]
  loading: boolean
  error: string | null
  showForm: boolean
  editingEmployee: Employee | null
  filterActiveOnly: boolean
}
export interface StepState {
  steps: Step[]
  currentStepIndex: number
  loading: boolean
}
