import { usePhase } from './hooks/usePhase';
import FakeConsole from './components/FakeConsole/FakeConsole';
import DiskDrive from './components/DiskDrive/DiskDrive';
import Phase0 from './phases/Phase0/Phase0';
import Phase1 from './phases/Phase1/Phase1';
import Phase2 from './phases/Phase2/Phase2';
import Phase3 from './phases/Phase3/Phase3';
import Phase4 from './phases/Phase4/Phase4';
import './App.css';

const PHASES = {
  0: Phase0,
  1: Phase1,
  2: Phase2,
  3: Phase3,
  4: Phase4,
};

export default function App() {
  const { phase } = usePhase();
  const PhaseComponent = PHASES[phase] || Phase0;

  return (
    <div className="app">
      <PhaseComponent />
      <DiskDrive />
      <FakeConsole />
    </div>
  );
}
