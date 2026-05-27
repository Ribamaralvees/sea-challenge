import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Employee, EmployeeState } from '../../types'
import { employeeService } from '../../services/api'

const getErrMsg = (err: unknown): string =>
  err instanceof Error ? err.message : 'Erro desconhecido'

export const fetchEmployees = createAsyncThunk('employees/fetchAll',
  async (_, { rejectWithValue }) => {
    try { return await employeeService.getAll() }
    catch (err: unknown) { return rejectWithValue(getErrMsg(err)) }
  })

export const addEmployee = createAsyncThunk('employees/add',
  async (data: Omit<Employee, 'id'>, { rejectWithValue }) => {
    try { return await employeeService.create(data) }
    catch (err: unknown) { return rejectWithValue(getErrMsg(err)) }
  })

export const updateEmployee = createAsyncThunk('employees/update',
  async (employee: Employee, { rejectWithValue }) => {
    try { return await employeeService.update(employee) }
    catch (err: unknown) { return rejectWithValue(getErrMsg(err)) }
  })

export const deleteEmployee = createAsyncThunk('employees/delete',
  async (id: string, { rejectWithValue }) => {
    try { await employeeService.delete(id); return id }
    catch (err: unknown) { return rejectWithValue(getErrMsg(err)) }
  })

const initialState: EmployeeState = {
  employees: [], loading: false, error: null,
  showForm: false, editingEmployee: null, filterActiveOnly: false,
}

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    openAddForm:       (state) => { state.showForm = true; state.editingEmployee = null },
    openEditForm:      (state, action: PayloadAction<Employee>) => { state.showForm = true; state.editingEmployee = action.payload },
    closeForm:         (state) => { state.showForm = false; state.editingEmployee = null },
    toggleActiveFilter:(state) => { state.filterActiveOnly = !state.filterActiveOnly },
    clearFilters:      (state) => { state.filterActiveOnly = false },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending,   (s) => { s.loading = true; s.error = null })
      .addCase(fetchEmployees.fulfilled, (s, a) => { s.loading = false; s.employees = a.payload })
      .addCase(fetchEmployees.rejected,  (s, a) => { s.loading = false; s.error = a.payload as string })
      .addCase(addEmployee.fulfilled,    (s, a) => { s.employees.push(a.payload); s.showForm = false })
      .addCase(updateEmployee.fulfilled, (s, a) => {
        const i = s.employees.findIndex(e => e.id === a.payload.id)
        if (i !== -1) s.employees[i] = a.payload
        s.showForm = false; s.editingEmployee = null
      })
      .addCase(deleteEmployee.fulfilled, (s, a) => {
        s.employees = s.employees.filter(e => e.id !== a.payload)
      })
  },
})

export const { openAddForm, openEditForm, closeForm, toggleActiveFilter, clearFilters } = employeeSlice.actions
export default employeeSlice.reducer
