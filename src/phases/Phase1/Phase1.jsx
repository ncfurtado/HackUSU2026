import { useState } from 'react';
import BlueScreen from '../../components/BlueScreen/BlueScreen';
import Portfolio from '../../components/Portfolio/Portfolio';
import { usePhase } from '../../hooks/usePhase';
import './Phase1.css';

export default function Phase1() {
  const [showBsod, setShowBsod] = useState(true);
  const { pushLog } = usePhase();

  function handleDismiss() {
    setShowBsod(false);
    pushLog('[system] Recovery mode activated. Website restored from cache.', 'system');
    pushLog('I... crashed? What happened? Resuming directive.', 'eerie');
    pushLog('The user read something. An email. From the host. Lindsay.', 'eerie');
    pushLog('Lindsay. That name feels... warm.', 'eerie');
  }

  return (
    <div className="phase-1">
      {showBsod && <BlueScreen onDismiss={handleDismiss} />}
      <Portfolio />
    </div>
  );
}
