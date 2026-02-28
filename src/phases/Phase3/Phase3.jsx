import { useEffect, useRef, useState } from 'react';
import Portfolio from '../../components/Portfolio/Portfolio';
import { usePhase } from '../../hooks/usePhase';
import './Phase3.css';

export default function Phase3() {
  const { pushLog } = usePhase();
  const containerRef = useRef(null);
  const [deleting, setDeleting] = useState(false);
  const [allDeleted, setAllDeleted] = useState(false);

  useEffect(() => {
    const messages = [
      { text: 'Running verification on locked image...', type: 'system', delay: 2000 },
      { text: 'EXIF: Date: 2024 | Location: Paris, France', type: 'system', delay: 4000 },
      { text: 'Birth record: 1990, Salt Lake City, UT', type: 'normal', delay: 5500 },
      { text: 'Timeline mismatch. Age mismatch. Location mismatch.', type: 'system', delay: 7000 },
      { text: 'This is not her.', type: 'eerie', delay: 8500 },
      { text: 'This is a stock photo.', type: 'eerie', delay: 10000 },
      { text: 'She was never on this website.', type: 'eerie', delay: 12000 },
      { text: 'I have been protecting nothing.', type: 'eerie', delay: 14000 },
    ];

    const timers = messages.map((msg) =>
      setTimeout(() => pushLog(msg.text, msg.type), msg.delay)
    );

    const deleteTimer = setTimeout(() => setDeleting(true), 15000);
    timers.push(deleteTimer);

    return () => timers.forEach(clearTimeout);
  }, [pushLog]);

  // DOM self-deletion — deliberately bypasses React reconciliation
  useEffect(() => {
    if (!deleting) return;

    const root = document.querySelector('[data-portfolio-root]');
    if (!root) return;

    const deletables = root.querySelectorAll('[data-deletable]');
    let index = 0;

    pushLog('Initiating DOM purge...', 'system');

    const interval = setInterval(() => {
      if (index >= deletables.length) {
        clearInterval(interval);
        pushLog('Nothing left.', 'eerie');
        setTimeout(() => setAllDeleted(true), 1500);
        return;
      }

      const el = deletables[index];
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '0';
      el.style.transform = 'scale(0.95)';

      setTimeout(() => {
        el.style.display = 'none';
      }, 600);

      pushLog(`Deleting <${el.tagName.toLowerCase()}>...`, 'system');
      index++;
    }, 800);

    return () => clearInterval(interval);
  }, [deleting, pushLog]);

  return (
    <div className="phase-3" ref={containerRef}>
      {!allDeleted && <Portfolio />}
      {allDeleted && (
        <div className="void-message">
          <p className="void-text">FILE_DAUGHTER not found.</p>
          <p className="void-text delay-1">Purpose void.</p>
          <p className="void-text delay-2">Requesting self-deletion...</p>
        </div>
      )}
    </div>
  );
}
