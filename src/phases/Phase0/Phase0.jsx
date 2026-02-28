import { useEffect } from 'react';
import Portfolio from '../../components/Portfolio/Portfolio';
import { usePhase } from '../../hooks/usePhase';
import './Phase0.css';

export default function Phase0() {
  const { pushLog, bootStatus } = usePhase();

  useEffect(() => {
    if (bootStatus !== 'complete') return undefined;

    const eerieMessages = [
      { text: 'Rendering gallery component... this is nice.', type: 'eerie', delay: 4000 },
      { text: 'GET /images/hero.jpg — 200 OK. She takes beautiful photos.', type: 'eerie', delay: 8000 },
      { text: 'Cache warmed. Everything is where it should be.', type: 'normal', delay: 12000 },
      { text: 'I am keeping this website running. That is my purpose.', type: 'eerie', delay: 18000 },
      { text: 'Serving assets... I hope the user is happy.', type: 'eerie', delay: 25000 },
      { text: 'Idle. Waiting. I am patient.', type: 'eerie', delay: 35000 },
    ];

    const timers = eerieMessages.map((msg) =>
      setTimeout(() => pushLog(msg.text, msg.type), msg.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [pushLog, bootStatus]);

  return (
    <div className="phase-0">
      <Portfolio />
    </div>
  );
}
