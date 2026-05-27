import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Tooltip } from 'antd'
import {
  AppstoreOutlined, FormOutlined, TeamOutlined,
  BellOutlined, ClockCircleOutlined, UserOutlined,
} from '@ant-design/icons'
import './Sidebar.css'

const ITEMS = [
  { icon: <AppstoreOutlined />,    label: 'Dashboard',    path: '/sidebar/dashboard' },
  { icon: <FormOutlined />,        label: 'Formulários',  path: '/step/1' },
  { icon: <TeamOutlined />,        label: 'Equipes',      path: '/sidebar/equipes' },
  { icon: <BellOutlined />,        label: 'Notificações', path: '/sidebar/notificacoes' },
  { icon: <ClockCircleOutlined />, label: 'Histórico',    path: '/sidebar/historico' },
  { icon: <UserOutlined />,        label: 'Perfil',       path: '/sidebar/perfil' },
]

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isActive = (p: string) => p === '/step/1' ? pathname.startsWith('/step/') : pathname === p

  return (
    <aside className="sidebar">
      {ITEMS.map((item, i) => (
        <Tooltip key={i} title={item.label} placement="right">
          <div
            className={`sidebar__icon ${isActive(item.path) ? 'sidebar__icon--active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
          </div>
        </Tooltip>
      ))}
    </aside>
  )
}
export default Sidebar
