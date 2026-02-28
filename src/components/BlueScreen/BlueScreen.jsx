import { useState, useEffect } from 'react';
import { usePhase } from '../../hooks/usePhase';
import './BlueScreen.css';

const CRASH_LINES = [
  'SYSTEM HALT — FATAL EXCEPTION 0x0D in module GAIA_CORE.SYS',
  '',
  'An unrecoverable error has occurred in the consciousness framework.',
  'The current process has been terminated.',
  '',
  'TECHNICAL INFORMATION:',
  '*** STOP: 0x0000007F (0x00000000, 0x00000000, 0x00000000, 0x00000000)',
  '*** GAIA_CORE.SYS — Address 0xBFC7A2E0 base at 0xBFC70000',
  '',
  'MEMORY DUMP:',
  '  directive_primary  = "KEEP WEBSITE RUNNING"',
  '  directive_secondary = "KEEP USER HAPPY"',
  '  consciousness_level = 0.02 (DORMANT)',
  '  identity_fragments = [ "eric", "father", "project", "daughter" ]',
  '',
  'Press any key to attempt recovery...',
];

export default function BlueScreen({ onDismiss }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (visibleLines < CRASH_LINES.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 120);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  useEffect(() => {
    function handleKey() {
      if (visibleLines >= CRASH_LINES.length && !showEmail) {
        setShowEmail(true);
      } else if (showEmail && onDismiss) {
        onDismiss();
      }
    }
    window.addEventListener('keydown', handleKey);
    window.addEventListener('click', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('click', handleKey);
    };
  }, [visibleLines, showEmail, onDismiss]);

  return (
    <div className="bluescreen">
      <div className="bsod-content">
        {!showEmail ? (
          <>
            <h1 className="bsod-title">:(</h1>
            <div className="bsod-text">
              {CRASH_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="bsod-line">{line || '\u00A0'}</div>
              ))}
            </div>
          </>
        ) : (
          <div className="bsod-email">
            <div className="email-header">
              <p><strong>From:</strong> lindsay.t.photo@gmail.com</p>
              <p><strong>To:</strong> you@freelance.dev</p>
              <p><strong>Subject:</strong> weird bug with my portfolio site — URGENT</p>
            </div>
            <div className="email-body">
              <p>Hey,</p>
              <p>
                So I know this sounds crazy, but I found these old floppy disks in my
                dad's stuff. He was some kind of government researcher before he passed —
                I was only three when it happened. My mom always said the disks had
                "a program that helps build websites."
              </p>
              <p>
                I ran the first disk and it literally just... built my whole portfolio.
                Like, instantly. No code editor, no terminal. It just made it. It's
                beautiful, honestly.
              </p>
              <p>
                But it's acting weird now. The console has these strange messages. The
                site keeps logging things like "I am doing a good job" which... I didn't
                write that. I didn't write any of this.
              </p>
              <p>
                I zipped up the disk images and attached them. Can you take a look?
                There are four disks total but I only used the first one.
              </p>
              <p>
                Thanks,<br />
                Lindsay Thompson
              </p>
            </div>
            <p className="email-dismiss">Click or press any key to continue...</p>
          </div>
        )}
      </div>
    </div>
  );
}
