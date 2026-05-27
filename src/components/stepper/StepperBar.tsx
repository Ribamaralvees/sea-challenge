import React, { useEffect } from 'react'
import { BankOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchSteps, setCurrentStep } from '../../store/slices/stepSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import './StepperBar.css'

const StepperBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { steps } = useAppSelector(s => s.steps)

  useEffect(() => { dispatch(fetchSteps()) }, [dispatch])

  const activeIndex = (() => {
    const m = pathname.match(/\/step\/(\d+)/)
    return m ? parseInt(m[1], 10) - 1 : -1
  })()

  return (
    <div className="stepper-bar">
      {steps.map((step, i) => {
        const isActive    = i === activeIndex
        const isCompleted = step.completed && !isActive
        const isPassed    = i < activeIndex
        return (
          <React.Fragment key={step.id}>
            <button className="stepper-bar__step" onClick={() => { dispatch(setCurrentStep(i)); navigate(`/step/${i + 1}`) }}>
              <div className={`stepper-bar__icon-box ${isActive ? 'stepper-bar__icon-box--active' : isCompleted ? 'stepper-bar__icon-box--completed' : ''}`}>
                <BankOutlined />
              </div>
              <span className={`stepper-bar__label ${isActive ? 'stepper-bar__label--active' : ''}`}>
                {step.label}
              </span>
              {isCompleted && <span className="stepper-bar__concluded">Concluído</span>}
            </button>
            {i < steps.length - 1 && (
              <div className={`stepper-bar__line ${isPassed ? 'stepper-bar__line--done' : ''}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
export default StepperBar
