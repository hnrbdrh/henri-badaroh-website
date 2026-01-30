'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Frog {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  fadeOut: boolean;
}

export default function Screensaver() {
  const [frogs, setFrogs] = useState<Frog[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [screensaverStartTime, setScreensaverStartTime] = useState<number | null>(null);

  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      if (isActive) {
        // Fade out all frogs simultaneously
        setFrogs(prev => prev.map(f => ({ ...f, fadeOut: true })));

        // Clear all frogs after fade animation
        setTimeout(() => {
          setFrogs([]);
          setIsActive(false);
          setScreensaverStartTime(null);
        }, 800);
      }
    };

    const events = ['mousemove', 'scroll', 'keydown', 'click', 'touchstart'];
    events.forEach(event => window.addEventListener(event, handleActivity));

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [isActive, frogs]);

  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity;

      if (timeSinceActivity > 300000 && !isActive) { // 5 minutes
        setIsActive(true);
        setScreensaverStartTime(Date.now());
      }
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [lastActivity, isActive]);

  useEffect(() => {
    if (!isActive || !screensaverStartTime) return;

    const spawnFrog = () => {
      // Stop spawning after 10 minutes (600000ms)
      const timeSinceStart = Date.now() - screensaverStartTime;
      if (timeSinceStart >= 600000) {
        return;
      }

      const size = 100 + Math.random() * 200; // 100px to 300px
      const newFrog: Frog = {
        id: Date.now() + Math.random(),
        x: -50 + Math.random() * (window.innerWidth + 50 - size), // Allow slight edge overflow
        y: -50 + Math.random() * (window.innerHeight + 50 - size), // Allow slight edge overflow
        size,
        rotation: Math.random() * 360, // Random rotation between 0 and 360 degrees
        fadeOut: false,
      };

      setFrogs(prev => [...prev, newFrog]);
    };

    const spawnInterval = setInterval(spawnFrog, 2000); // Slower spawn rate (2 seconds)

    return () => clearInterval(spawnInterval);
  }, [isActive, screensaverStartTime]);

  if (!isActive && frogs.length === 0) return null;

  return (
    <div className="screensaver-container">
      {frogs.map(frog => (
        <div
          key={frog.id}
          className={`screensaver-frog ${frog.fadeOut ? 'fade-out' : ''}`}
          style={{
            left: `${frog.x}px`,
            top: `${frog.y}px`,
            width: `${frog.size}px`,
            height: `${frog.size}px`,
            ['--frog-rotation' as string]: `rotate(${frog.rotation}deg)`,
          }}
        >
          <Image
            src="/screensaver.png"
            alt="Screensaver"
            width={frog.size}
            height={frog.size}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      ))}
    </div>
  );
}
