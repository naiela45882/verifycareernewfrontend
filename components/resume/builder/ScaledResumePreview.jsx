import { useLayoutEffect, useRef, useState } from "react";

const EDITOR_MAX_HEIGHT = 720;

/**
 * Fits resume into a frame without inner scroll.
 * - editor: scale to panel width, shrink-wrap height (minimal empty chrome)
 * - picker: fit inside fixed thumbnail box (template selection step)
 */
export default function ScaledResumePreview({
  children,
  className = "",
  variant = "picker",
}) {
  const isEditor = variant === "editor";
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [layout, setLayout] = useState({ scale: 0.5, width: 0, height: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const fit = () => {
      const pad = isEditor ? 12 : 16;
      const cw = Math.max(container.clientWidth - pad * 2, 1);
      const contentW = content.offsetWidth;
      const contentH = content.scrollHeight;
      if (!contentW || !contentH) return;

      let scale;
      if (isEditor) {
        // Use full panel width so the page appears larger; only shrink if taller than max
        scale = (cw * 0.98) / contentW;
        if (contentH * scale > EDITOR_MAX_HEIGHT) {
          scale = EDITOR_MAX_HEIGHT / contentH;
        }
      } else {
        const ch = Math.max(container.clientHeight - pad * 2, 1);
        scale = Math.min(cw / contentW, ch / contentH, 1);
      }
      scale = Math.min(scale, 1);

      setLayout({
        scale,
        width: Math.round(contentW * scale),
        height: Math.round(contentH * scale),
      });
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(container);
    ro.observe(content);
    return () => ro.disconnect();
  }, [children, isEditor]);

  const containerClass = isEditor
    ? "flex w-full max-w-full justify-center overflow-hidden bg-luxury-muted/20 py-3"
    : `flex w-full items-center justify-center overflow-hidden bg-luxury-muted/20 h-[min(52vh,480px)] ${className}`;

  return (
    <div ref={containerRef} className={containerClass}>
      <div
        className="pointer-events-none select-none overflow-hidden rounded-sm shadow-md ring-1 ring-black/10"
        style={{
          width: layout.width || undefined,
          height: layout.height || undefined,
        }}
      >
        <div
          ref={contentRef}
          className="inline-block"
          style={{
            transform: `scale(${layout.scale})`,
            transformOrigin: "top left",
            width: "210mm",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
