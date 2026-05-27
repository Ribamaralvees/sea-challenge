import React from 'react'
interface Props { size?: number }
const AvatarIcon: React.FC<Props> = ({ size = 88 }) => (
  <svg width={size} height={size} viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Avatar">
    <circle cx="44" cy="44" r="44" fill="#C8C8C8" />
    <circle cx="44" cy="31" r="14" fill="#8A8A8A" />
    <ellipse cx="44" cy="68" rx="24" ry="18" fill="#8A8A8A" />
  </svg>
)
export default AvatarIcon
