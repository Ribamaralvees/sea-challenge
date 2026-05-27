import React from 'react'
import Sidebar from './Sidebar'
import StepperBar from '../stepper/StepperBar'
import InfoPanel from '../info/InfoPanel'
import StepFooter from '../common/StepFooter'
import './MainLayout.css'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="main-layout">
    <Sidebar />
    <div className="main-layout__content">
      <StepperBar />
      <div className="main-layout__body">
        <InfoPanel />
        <main className="main-layout__main">{children}</main>
      </div>
      <StepFooter />
    </div>
  </div>
)
export default MainLayout
