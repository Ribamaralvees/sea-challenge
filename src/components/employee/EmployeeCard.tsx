import React from 'react'
import { Dropdown, Tag } from 'antd'
import type { MenuProps } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../store/hooks'
import { openEditForm, deleteEmployee } from '../../store/slices/employeeSlice'
import type { Employee } from '../../types'
import './EmployeeCard.css'

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  const dispatch = useAppDispatch()
  const menu: MenuProps['items'] = [
    { key: 'edit',   label: 'Editar',  onClick: () => dispatch(openEditForm(employee)) },
    { key: 'delete', label: 'Excluir', danger: true, onClick: () => dispatch(deleteEmployee(employee.id)) },
  ]
  return (
    <div className="employee-card">
      <div className="employee-card__info">
        <span className="employee-card__name">{employee.name}</span>
        <div className="employee-card__tags">
          <span className="employee-card__cpf">{employee.cpf}</span>
          <Tag color={employee.active ? 'blue' : 'default'}>{employee.active ? 'Ativo' : 'Inativo'}</Tag>
          <Tag color="cyan">{employee.role}</Tag>
        </div>
      </div>
      <Dropdown menu={{ items: menu }} trigger={['click']} placement="bottomRight">
        <div className="employee-card__btn"><MoreOutlined /></div>
      </Dropdown>
    </div>
  )
}
export default EmployeeCard
