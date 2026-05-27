import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { StepState } from '../../types'
import { stepService } from '../../services/api'

export const fetchSteps = createAsyncThunk('steps/fetchAll', async () => stepService.getAll())
export const toggleStepCompleted = createAsyncThunk('steps/toggle',
  async ({ id, completed }: { id: string; completed: boolean }) =>
    stepService.updateCompleted(id, completed))

const stepSlice = createSlice({
  name: 'steps',
  initialState: { steps: [], currentStepIndex: 0, loading: false } as StepState,
  reducers: {
    goToNextStep: (s) => { if (s.currentStepIndex < s.steps.length - 1) s.currentStepIndex++ },
    setCurrentStep: (s, a) => { s.currentStepIndex = a.payload },
  },
  extraReducers: (b) => {
    b.addCase(fetchSteps.fulfilled, (s, a) => { s.steps = a.payload })
     .addCase(toggleStepCompleted.fulfilled, (s, a) => {
       const i = s.steps.findIndex(x => x.id === a.payload.id)
       if (i !== -1) s.steps[i] = a.payload
     })
  },
})

export const { goToNextStep, setCurrentStep } = stepSlice.actions
export default stepSlice.reducer
