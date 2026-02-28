import { useEffect, useRef } from 'react';
import { usePhase } from '../../hooks/usePhase';
import './FakeConsole.css';

export default function FakeConsole() {
  const { consoleLogs, consoleOpen, consoleMinimized, toggleConsole, toggleConsoleMinimized, phase } = usePhase();
  const bottomRef = useRef(null);
  const showAsClose = consoleOpen && !consoleMinimized;
  const handleToggleClick = () => {
    if (consoleOpen && consoleMinimized) {
      toggleConsoleMinimized();
    } else {
      toggleConsole();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  return (
    <>
      <button
        className="console-toggle"
        onClick={handleToggleClick}
        title={showAsClose ? 'Close console' : 'Open console'}
        aria-label={showAsClose ? 'Close console' : 'Open console'}
      >
        {showAsClose ? '✕' : '⌥ Console'}
      </button>

      <div className={`fake-console ${consoleOpen ? 'open' : ''} ${consoleOpen && consoleMinimized ? 'minimized' : ''} phase-${phase}`}>
        <div className="console-titlebar">
          <span>Console</span>
          <div className="console-titlebar-actions">
            <button
              type="button"
              onClick={toggleConsoleMinimized}
              title={consoleMinimized ? 'Expand' : 'Minimize'}
              aria-label={consoleMinimized ? 'Expand' : 'Minimize'}
            >
              {consoleMinimized ? '▾' : '▴'}
            </button>
            <button type="button" onClick={toggleConsole}>✕</button>
          </div>
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
    </>
  );
}
