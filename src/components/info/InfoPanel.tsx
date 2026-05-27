import React from 'react'
import './InfoPanel.css'

const InfoPanel: React.FC = () => (
  <aside className="info-panel">
    <p className="info-panel__text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit
      porttitor. Suspendisse ex lorem, rhoncus nec ante eu, venenatis aliquam
      turpis. Nulla facilisi. Curabitur nec mattis dolor. Nulla finibus
      bibendum ligula tempus vehicula. Ut at tristique libero, nec efficitur
      dui. Aliquam erat volutpat.
    </p>
    <div className="info-panel__avatar-wrapper">
      <div className="info-panel__avatar">
        <svg viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="44" cy="44" r="44" fill="#C8C8C8" />
          <circle cx="44" cy="31" r="14" fill="#8A8A8A" />
          <ellipse cx="44" cy="68" rx="24" ry="18" fill="#8A8A8A" />
        </svg>
      </div>
    </div>
  </aside>
)
export default InfoPanel
