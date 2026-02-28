import { useEffect, useRef } from 'react';
import { usePhase } from '../../hooks/usePhase';
import './FakeConsole.css';

export default function FakeConsole() {
  const { consoleLogs, phase } = usePhase();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  return (
    <div className={`fake-console phase-${phase}`}>
      <div className="console-titlebar">
        <span>Console</span>
      </div>
      <div className="console-body">
        {consoleLogs.map((log) => (
          <div key={log.id} className={`console-line type-${log.type}`}>
            <span className="console-prefix">&gt;</span>
            {log.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
