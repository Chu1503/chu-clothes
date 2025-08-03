"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, RefreshCcw, X } from "lucide-react";

const MAX_SCALE = 3;
const MIN_SCALE = 1;
const ZOOM_STEP = 0.25;

interface ModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ModalProps> = ({ src, alt, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(MAX_SCALE, prev + ZOOM_STEP));
  };

  const handleZoomOut = () => {
    if (scale <= MIN_SCALE) return;
    setScale((prev) => {
      const newScale = Math.max(MIN_SCALE, prev - ZOOM_STEP);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      style={{ cursor: "zoom-out" }}
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
        }}
      >
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            className="bg-black/60 rounded-full text-white p-2 flex items-center justify-center"
            onClick={handleResetZoom}
            aria-label="Reset zoom"
            tabIndex={0}
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
          <button
            className="bg-black/60 rounded-full text-white p-2 flex items-center justify-center"
            onClick={handleZoomOut}
            aria-label="Zoom out"
            tabIndex={0}
          >
            <Minus className="w-5 h-5" />
          </button>
          <button
            className="bg-black/60 rounded-full text-white p-2 flex items-center justify-center"
            onClick={handleZoomIn}
            aria-label="Zoom in"
            tabIndex={0}
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            className="bg-black/60 rounded-full text-white p-2 flex items-center justify-center"
            onClick={onClose}
            aria-label="Close"
            tabIndex={0}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <img
          src={src}
          alt={alt}
          className="max-h-[80vh] max-w-[90vw] object-contain select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${
              position.y / scale
            }px)`,
            transition: isDragging ? "none" : "transform 0.2s",
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ImageModal;
