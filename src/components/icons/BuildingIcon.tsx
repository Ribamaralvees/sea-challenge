import React from 'react'
interface Props { size?: number; className?: string }
const BuildingIcon: React.FC<Props> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="7" y="2" width="6" height="4" rx="0.5" />
    <rect x="2" y="6" width="16" height="12" rx="0.5" />
    <rect x="4" y="8.5" width="2.5" height="2" rx="0.3" fill="white" opacity="0.7" />
    <rect x="8.5" y="8.5" width="2.5" height="2" rx="0.3" fill="white" opacity="0.7" />
    <rect x="13" y="8.5" width="2.5" height="2" rx="0.3" fill="white" opacity="0.7" />
    <rect x="8.5" y="13" width="3" height="5" rx="0.3" fill="white" opacity="0.7" />
  </svg>
)
export default BuildingIcon
