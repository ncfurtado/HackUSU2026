import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

export function usePhase() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('usePhase must be used within GameProvider');
  return ctx;
}
