import React, { useEffect, useState, useRef } from "react";

interface ResponsiveCalculatorWrapperProps {
  children: React.ReactNode | ((isMobile: boolean) => React.ReactNode);
  defaultWidth?: number;
  defaultHeight?: number;
  mobileBreakpoint?: number;
}

const ResponsiveCalculatorWrapper: React.FC<ResponsiveCalculatorWrapperProps> = ({
  children,
  defaultWidth = 1225,
  defaultHeight = 680,
  mobileBreakpoint = 800,
}) => {
  const [scale, setScale] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const target = containerRef.current;

    const updateScale = (containerWidth: number) => {
      if (containerWidth < mobileBreakpoint) {
        setIsMobileView(true);
        setScale(1);
        return;
      }

      const windowHeight = globalThis.innerHeight;
      let newScale = containerWidth / defaultWidth;

      const scaledHeight = defaultHeight * newScale;
      const maxHeight = windowHeight * 0.8;
      if (scaledHeight > maxHeight) {
        newScale = maxHeight / defaultHeight;
      }

      setIsMobileView(false);
      setScale(newScale);
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updateScale(entry.contentRect.width);
      }
    });

    observer.observe(target);
    updateScale(target.offsetWidth);

    return () => observer.disconnect();
  }, [defaultWidth, defaultHeight, mobileBreakpoint]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "visible",
        height: isMobileView ? "auto" : `${defaultHeight * scale}px`,
        transition: "height 0.3s ease",
      }}
    >
      <div
        style={{
          transform: isMobileView ? "none" : `scale(${scale})`,
          transformOrigin: "top center",
          transition: "transform 0.3s ease",
          width: isMobileView ? "100%" : `${defaultWidth}px`,
          height: isMobileView ? "auto" : `${defaultHeight}px`,
          willChange: "transform",
        }}
      >
        {typeof children === "function" ? children(isMobileView) : children}
      </div>
    </div>
  );
};

export default ResponsiveCalculatorWrapper;