import React from 'react'
import { Switch } from 'antd'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { toggleStepCompleted, goToNextStep } from '../../store/slices/stepSlice'
import { useNavigate } from 'react-router-dom'
import './StepFooter.css'

const StepFooter: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { steps, currentStepIndex } = useAppSelector(s => s.steps)
  const current = steps[currentStepIndex]
  const isLast  = currentStepIndex >= steps.length - 1

  return (
    <footer className="step-footer">
      <div className="step-footer__left">
        <span>A etapa está concluída?</span>
        <Switch size="small" checked={current?.completed ?? false}
          onChange={v => current && dispatch(toggleStepCompleted({ id: current.id, completed: v }))}
          checkedChildren="Sim" unCheckedChildren="Não" />
      </div>
      <button
        className={`step-footer__btn ${isLast ? 'step-footer__btn--disabled' : ''}`}
        onClick={() => { if (!isLast) { dispatch(goToNextStep()); navigate(`/step/${currentStepIndex + 2}`) } }}
        disabled={isLast}
      >
        Próximo passo &rsaquo;
      </button>
    </footer>
  )
}
export default StepFooter
