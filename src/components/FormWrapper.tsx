import React, { useEffect, useState, useRef } from "react";

interface ResponsiveCalculatorWrapperProps {
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  isMobileView: boolean;
}

const ResponsiveCalculatorWrapper: React.FC<ResponsiveCalculatorWrapperProps> = ({ 
  children, 
  defaultWidth = 1225,
  defaultHeight = 680,
  isMobileView 
}) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (isMobileView || !containerRef.current) {
        setScale(1);
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      const windowHeight = globalThis.innerHeight;

      let newScale = containerWidth / defaultWidth;

      const scaledHeight = defaultHeight * newScale;
      const maxHeight = windowHeight * 0.8;

      if (scaledHeight > maxHeight) {
        newScale = maxHeight / defaultHeight;
      }

      setScale(newScale);
    };

    updateScale();
    globalThis.addEventListener("resize", updateScale);

    const timeout = setTimeout(updateScale, 100);

    return () => {
      globalThis.removeEventListener("resize", updateScale);
      clearTimeout(timeout);
    };
  }, [isMobileView, defaultWidth, defaultHeight]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'visible',
        height: isMobileView ? 'auto' : `${defaultHeight * scale}px`,
        transition: 'height 0.3s ease'
      }}
    >
      <div
        style={{
          transform: isMobileView ? 'none' : `scale(${scale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.3s ease',
          width: isMobileView ? '100%' : `${defaultWidth}px`,
          height: isMobileView ? 'auto' : `${defaultHeight}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ResponsiveCalculatorWrapper;
