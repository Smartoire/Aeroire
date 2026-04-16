import { useState, useRef, useEffect } from "react";
import {
  VscChromeMaximize,
  VscChromeMinimize,
  VscClose,
  VscArrowLeft,
  VscArrowRight
} from "react-icons/vsc";

// Global z-index counter
let globalZIndex = 10;

// Minimum window dimensions
const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

interface DraggableWindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  className?: string;
}

export default function DraggableWindow({
  title,
  onClose,
  children,
  initialPosition = { x: 0, y: 0 },
  initialSize = { width: 400, height: 300 },
  className = ""
}: DraggableWindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<
    "bottom" | "right" | "bottom-right" | "left" | "bottom-left" | null
  >(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(globalZIndex);
  const [isMobile, setIsMobile] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bringToFront = () => {
    globalZIndex += 1;
    setZIndex(globalZIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;

    if (e.target instanceof HTMLElement) {
      bringToFront();

      if (e.target.closest(".window-header")) {
        setIsDragging(true);
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
          setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          });
        }
        e.preventDefault();
      } else if (e.target.closest(".resize-handle")) {
        setIsResizing(true);
        setResizeDirection(
          e.target.getAttribute("data-direction") as
            | "bottom"
            | "right"
            | "bottom-right"
            | "left"
            | "bottom-left"
        );
        e.preventDefault();
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isMobile) return;

    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      const windowWidth = windowRef.current?.offsetWidth || 0;
      const windowHeight = windowRef.current?.offsetHeight || 0;

      const maxX = window.innerWidth - windowWidth / 2;
      const maxY = window.innerHeight - windowHeight / 2;
      const minX = -windowWidth / 2;
      const minY = 24;

      setPosition({
        x: Math.max(minX, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, maxY))
      });
    } else if (isResizing) {
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        const newSize = { ...size };
        const newPosition = { ...position };

        if (resizeDirection?.includes("right")) {
          newSize.width = Math.max(MIN_WIDTH, e.clientX - rect.left);
        }

        if (resizeDirection?.includes("left")) {
          const newWidth = Math.max(MIN_WIDTH, rect.right - e.clientX);
          newSize.width = newWidth;
          newPosition.x = rect.right - newWidth;
        }

        if (resizeDirection?.includes("bottom")) {
          newSize.height = Math.max(MIN_HEIGHT, e.clientY - rect.top);
        }

        if (resizeDirection?.includes("bottom-left")) {
          const newWidth = Math.max(MIN_WIDTH, rect.right - e.clientX);
          newSize.width = newWidth;
          newPosition.x = rect.right - newWidth;
          newSize.height = Math.max(MIN_HEIGHT, e.clientY - rect.top);
        }

        setSize(newSize);
        setPosition(newPosition);
      }
    }
  };

  const handleMouseUp = () => {
    if (isMobile) return;
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  };

  useEffect(() => {
    bringToFront();
    if (isMobile) return;

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, isResizing, resizeDirection, dragOffset, isMobile]);

  return (
    <div
      ref={windowRef}
      className={`${
        isMobile ? "fixed inset-0 m-4 rounded-xl" : "absolute rounded-xl"
      } bg-[#1d1d1f] shadow-xl overflow-hidden p-0 transition-all duration-300 ${
        isDragging ? "cursor-grabbing" : "cursor-default"
      } ${className}`}
      style={{
        ...(isMobile
          ? {}
          : {
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height
            }),
        zIndex,
        transition: isDragging || isResizing ? "none" : "all 0.2s ease-out"
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="window-header bg-white/70 backdrop-blur-md border-b border-white/30 h-12 flex items-center justify-between px-3 cursor-grab active:cursor-grabbing select-none">
        {/* Left controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => console.log("Back")}
            className="p-1.5 rounded-md hover:bg-white/40 transition"
            title="Back"
          >
            <VscArrowLeft className="text-gray-700" size={18} />
          </button>
          <button
            onClick={() => console.log("Forward")}
            className="p-1.5 rounded-md hover:bg-white/40 transition"
            title="Forward"
          >
            <VscArrowRight className="text-gray-700" size={18} />
          </button>

          <span className="ml-3 font-medium text-gray-800 text-sm">
            {title}
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded-md transition"
            title="Minimize"
            disabled
          >
            <VscChromeMinimize className="text-gray-700" size={18} />
          </button>

          <button
            className="p-1.5 rounded-md transition"
            title="Maximize"
            disabled
          >
            <VscChromeMaximize className="text-gray-700" size={18} />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-red-500/80 hover:text-white transition"
            title="Close"
          >
            <VscClose size={18} />
          </button>
        </div>
      </div>

      <div className="relative h-[calc(100%-3rem)]">
        {children}
        {!isMobile && (
          <>
            <div
              className="resize-handle absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"
              data-direction="bottom"
            />
            <div
              className="resize-handle absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize"
              data-direction="right"
            />
            <div
              className="resize-handle absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize"
              data-direction="left"
            />
            <div
              className="resize-handle absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
              data-direction="bottom-right"
            />
            <div
              className="resize-handle absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize"
              data-direction="bottom-left"
            />
          </>
        )}
      </div>
    </div>
  );
}
