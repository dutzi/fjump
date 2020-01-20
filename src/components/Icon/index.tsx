import React from 'react';
import { isDarkMode } from '../../utils';

export default function Icon({
  type,
  className,
  color,
  size = 16,
}: {
  type: string;
  className?: string;
  color?: string;
  size?: number;
}) {
  color = color ?? isDarkMode() ? 'ffffff' : '000000';

  return (
    <img
      className={className}
      src={`https://icon.now.sh/${type}/${size}/${color}`}
      alt={type}
    />
  );
}
