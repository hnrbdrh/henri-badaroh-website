'use client';

export default function DebugGrid() {
  return (
    <div
      className="debug-grid"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    >
      {/* Vertical center line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
        }}
      />
      {/* Horizontal center line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
        }}
      />
      {/* Center crosshair */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '20px',
          height: '20px',
          transform: 'translate(-50%, -50%)',
          border: '2px solid rgba(255, 0, 0, 0.7)',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}
