import React, { useEffect } from 'react'
import { Spin } from 'antd'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchEmployees, openAddForm, toggleActiveFilter, clearFilters } from '../../store/slices/employeeSlice'
import EmployeeCard from './EmployeeCard'
import EmployeeForm from './EmployeeForm'
import './EmployeeList.css'

const EmployeeList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { employees, loading, showForm, filterActiveOnly } = useAppSelector(s => s.employees)

  useEffect(() => { dispatch(fetchEmployees()) }, [dispatch])

  if (showForm) return <EmployeeForm />

  const displayed   = filterActiveOnly ? employees.filter(e => e.active) : employees
  const activeCount = employees.filter(e => e.active).length

  return (
    <div className="employee-list">
      <div className="employee-list__header">
        <span className="employee-list__title">Funcionário(s)</span>
      </div>
      <div className="employee-list__body">
        <button className="employee-list__add-btn" onClick={() => dispatch(openAddForm())}>
          + Adicionar Funcionário
        </button>
        <div className="employee-list__filters">
          <button
            className={`employee-list__filter-btn ${filterActiveOnly ? 'employee-list__filter-btn--active' : ''}`}
            onClick={() => dispatch(toggleActiveFilter())}
          >
            Ver apenas ativos
          </button>
          <button className="employee-list__filter-btn" onClick={() => dispatch(clearFilters())}>
            Limpar filtros
          </button>
          <span className="employee-list__count">Ativos {activeCount}/{employees.length}</span>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 24 }}><Spin /></div>
        ) : (
          <div className="employee-list__cards">
            {displayed.map(emp => <EmployeeCard key={emp.id} employee={emp} />)}
            {displayed.length === 0 && <p style={{ color: '#aaa', textAlign: 'center', padding: 24 }}>Nenhum funcionário.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
export default EmployeeList
