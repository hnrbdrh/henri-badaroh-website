'use client';

import { useState, useRef, useEffect } from 'react';

const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'Brown', value: '#403A36' },
  { name: 'Rust', value: '#813823' },
  { name: 'Terra', value: '#774034' },
  { name: 'Orange', value: '#A0482C' },
];

export default function StyleTester() {
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeColor, setActiveColor] = useState('#7F0B00'); // Current default
  const [isMinimized, setIsMinimized] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const applyColor = (colorValue: string) => {
    setActiveColor(colorValue);
    document.documentElement.style.setProperty('--color-text', colorValue);
    document.documentElement.style.setProperty('--color-text-grey', colorValue + '4D'); // 30% opacity
  };

  return (
    <div
      ref={popupRef}
      className="style-tester"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 10000,
        backgroundColor: '#fff',
        border: '2px solid #333',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        color: '#333',
        minWidth: isMinimized ? 'auto' : '200px',
        userSelect: 'none',
      }}
    >
      {/* Header - draggable */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          padding: '8px 12px',
          backgroundColor: '#333',
          color: '#fff',
          cursor: 'move',
          borderRadius: '6px 6px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: 'bold' }}>Style Tester</span>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '0 4px',
          }}
        >
          {isMinimized ? '+' : '−'}
        </button>
      </div>

      {!isMinimized && (
        <div style={{ padding: '12px' }}>
          {/* Color Selection */}
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Color:</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => applyColor(color.value)}
                  title={color.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    backgroundColor: color.value,
                    border: activeColor === color.value ? '3px solid #333' : '2px solid #ccc',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
