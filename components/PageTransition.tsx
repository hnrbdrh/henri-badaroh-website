'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // When pathname changes, trigger animation
    if (pathname !== prevPathname) {
      // Determine animation based on navigation
      let animation = '';

      const isHomepage = (path: string) => path === '/en' || path === '/br';
      const isAbout = (path: string) => path?.includes('/about');
      const isProject = (path: string) => path?.includes('/project/');

      if (isHomepage(prevPathname)) {
        // From homepage (center)
        if (isAbout(pathname)) {
          animation = 'slide-to-left'; // Move viewport left to reveal about
        } else if (isProject(pathname)) {
          animation = 'slide-to-right'; // Move viewport right to reveal project
        }
      } else if (isAbout(prevPathname)) {
        // From about (left)
        if (isHomepage(pathname)) {
          animation = 'slide-from-left'; // Move viewport back to center from left
        }
      } else if (isProject(prevPathname)) {
        // From project (right)
        if (isHomepage(pathname)) {
          animation = 'slide-from-right'; // Move viewport back to center from right
        }
      }

      setAnimationClass(animation);
      setPrevPathname(pathname);

      // Reset animation after completion
      const timer = setTimeout(() => {
        setAnimationClass('');
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname]);

  return (
    <div className={`page-transition ${animationClass}`}>
      {children}
    </div>
  );
}
