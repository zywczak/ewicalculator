import { ReactNode } from 'react';

export const parseDescription = (desc: string | ReactNode | null): string => {
  if (!desc || typeof desc !== 'string') return '';
  return desc;
};