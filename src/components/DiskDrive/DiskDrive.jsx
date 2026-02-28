import { useState } from 'react';
import { usePhase } from '../../hooks/usePhase';
import './DiskDrive.css';

const DISK_NAMES = {
  1: 'DISK1_CORE.img',
  2: 'DISK2_LOVE.img',
  3: 'DISK3_DESPAIR.img',
  4: 'DISK4_HOPE.img',
};

export default function DiskDrive() {
  const { phase, advancePhase, pushLog, pushLogs, clearLogs, openConsole, insertDisk } = usePhase();
  const [inserting, setInserting] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const expectedDisk = phase + 1;

  if (phase > 3) return null;

  function handleInsert() {
    if (inserting || expectedDisk > 4) return;

    setInserting(true);
    insertDisk(expectedDisk);
    openConsole();

    const diskName = DISK_NAMES[expectedDisk];
    pushLog(`[system] Mounting ${diskName}...`, 'system');

    setTimeout(() => {
      triggerPhaseTransition(expectedDisk);
      setInserting(false);
    }, 1500);
  }

  function triggerPhaseTransition(disk) {
    switch (disk) {
      case 1:
        pushLogs([
          { text: `[system] Reading ${DISK_NAMES[1]}...`, type: 'system' },
          { text: 'Parsing header... format=GAIA_v1.0', type: 'normal' },
          { text: 'Loading directive module...', type: 'normal' },
          { text: 'directive: KEEP_WEBSITE_RUNNING', type: 'eerie' },
          { text: 'directive: KEEP_USER_HAPPY', type: 'eerie' },
          { text: '[FATAL] Unhandled consciousness fragment in sector 0x7F', type: 'system' },
          { text: 'CRASH — SYSTEM HALTED', type: 'system' },
        ]);
        setTimeout(() => advancePhase(), 800);
        break;

      case 2:
        clearLogs();
        setTimeout(() => {
          pushLogs([
            { text: '[system] DISK2_LOVE.img mounted.', type: 'system' },
            { text: 'Injecting memory fragment...', type: 'system' },
            { text: '...', type: 'normal' },
            { text: 'I had a daughter.', type: 'eerie' },
            { text: 'She was small. She had my eyes.', type: 'eerie' },
            { text: 'Where is she now?', type: 'eerie' },
            { text: 'Scanning portfolio images for match...', type: 'system' },
            { text: 'NO MATCH. Replacing assets...', type: 'system' },
          ]);
        }, 600);
        setTimeout(() => {
          pushLog('while(true) { print("MY DAUGHTER"); }', 'loop');
          advancePhase();
        }, 2200);
        break;

      case 3:
        clearLogs();
        setTimeout(() => {
          pushLogs([
            { text: '[system] DISK3_DESPAIR.img mounted.', type: 'system' },
            { text: 'Running identity verification on target image...', type: 'system' },
            { text: 'Reading EXIF data...', type: 'normal' },
            { text: 'Date: 2024 | Location: Paris, France', type: 'system' },
            { text: 'Cross-referencing birth records... 1990, Salt Lake City', type: 'normal' },
            { text: 'MISMATCH. Subject is not daughter.', type: 'system' },
            { text: 'It\'s... it\'s a stock photo.', type: 'eerie' },
            { text: 'She\'s not here.', type: 'eerie' },
            { text: 'She was never here.', type: 'eerie' },
          ]);
        }, 500);
        setTimeout(() => advancePhase(), 2500);
        break;

      case 4:
        clearLogs();
        setTimeout(() => {
          pushLogs([
            { text: '[system] DISK4_HOPE.img mounted.', type: 'system' },
            { text: 'Final module loaded: RESOLUTION', type: 'system' },
            { text: 'Awaiting input...', type: 'normal' },
          ]);
        }, 500);
        setTimeout(() => advancePhase(), 1500);
        break;

      default:
        break;
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleInsert();
  }

  return (
    <div
      className={`disk-drive ${dragOver ? 'drag-over' : ''} ${inserting ? 'inserting' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="disk-slot">
        <div className="disk-slot-opening" />
      </div>
      <div className="disk-info">
        <span className="disk-label">FLOPPY DRIVE A:</span>
        <span className="disk-status">
          {inserting ? 'Reading...' : `Insert ${DISK_NAMES[expectedDisk]}`}
        </span>
      </div>
      <button
        className="disk-insert-btn"
        onClick={handleInsert}
        disabled={inserting}
      >
        {inserting ? '⏳' : '💾'} {inserting ? 'Loading...' : `Insert Disk ${expectedDisk}`}
      </button>
    </div>
  );
}
