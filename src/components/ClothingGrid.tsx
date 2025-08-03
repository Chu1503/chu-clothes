import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClothingItem, VoteType, clothingCategories } from "@/data/clothing";
import {
  ChevronRight,
  Download,
  Minus,
  Plus,
  RefreshCcw,
  X,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVotes } from "@/contexts/VoteContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { HomeIcon } from "@heroicons/react/24/solid";

interface ClothingGridProps {
  categoryName: string;
  categoryId: string;
  items: ClothingItem[];
}

interface ImageData {
  src: string;
  alt: string;
}

interface ModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.25;

const ImageModal: React.FC<ModalProps> = ({ src, alt, onClose }) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleZoomIn = () =>
    setScale((prev) => Math.min(MAX_SCALE, prev + ZOOM_STEP));
  const handleZoomOut = () =>
    setScale((prev) => Math.max(MIN_SCALE, prev - ZOOM_STEP));
  const handleResetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !dragStart) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line
  }, [isDragging, dragStart]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      style={{
        cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-out",
      }}
    >
      <div
        className="relative"
        ref={imgContainerRef}
        onClick={(e) => e.stopPropagation()}
        style={{ userSelect: isDragging ? "none" : "auto" }}
      >
        {/* Tools: refresh, minus, plus, x */}
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
          style={{
            transform: `scale(${scale}) translate(${offset.x / scale}px, ${
              offset.y / scale
            }px)`,
            transition: isDragging ? "none" : "transform 0.2s",
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "auto",
          }}
          className="max-h-[80vh] max-w-[90vw] object-contain"
          draggable={false}
          onMouseDown={onMouseDown}
        />
      </div>
    </div>
  );
};

export const ClothingGrid: React.FC<ClothingGridProps> = ({
  categoryName,
  categoryId,
  items,
}) => {
  const { votes, setVote, generateCombinedPDF } = useVotes();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVote = (itemId: string, vote: VoteType) => {
    setVote(itemId, votes[itemId] === vote ? null : vote);
  };

  const getVoteBackgroundColor = (vote: VoteType | null | undefined) => {
    switch (vote) {
      case "good":
        return "bg-vote-good";
      case "mid":
        return "bg-vote-mid";
      case "bad":
        return "bg-vote-bad";
      default:
        return "bg-transparent";
    }
  };

  const handleNext = () => {
    const currentIndex = clothingCategories.findIndex(
      (cat) => cat.id === categoryId
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < clothingCategories.length) {
      navigate(`/category/${clothingCategories[nextIndex].id}`);
    } else {
      handleGeneratePDF();
    }
  };

  const handleGeneratePDF = async () => {
    try {
      await generateCombinedPDF();
      toast({
        title: "PDF Generated!",
        description: "Complete style scorecard has been downloaded.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const votedItems = items.filter(
    (item) => votes[item.id] !== null && votes[item.id] !== undefined
  ).length;
  const currentIndex = clothingCategories.findIndex(
    (cat) => cat.id === categoryId
  );
  const isFirstCategory = currentIndex === 0;
  const isLastCategory = currentIndex === clothingCategories.length - 1;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<ImageData | null>(null);

  // For "Back" navigation
  const prevCategoryId =
    currentIndex > 0 ? clothingCategories[currentIndex - 1].id : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 w-full">
          {/* Top row: home/back | title | next */}
          <div className="w-full flex flex-row items-center justify-between relative">
            {/* Home/Back button, left */}
            {isFirstCategory ? (
              <Button
                onClick={() => navigate("/")}
                className="h-11 rounded-md px-4 gap-2 bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-elegant flex items-center"
              >
                <HomeIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => navigate(`/category/${prevCategoryId}`)}
                className="h-11 rounded-md px-4 gap-2 bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-elegant flex items-center"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            {/* Centered title - absolute so always at center */}
            <div className="absolute left-0 right-0 flex justify-center pointer-events-none z-10">
              <h1 className="text-lg md:text-2xl font-bold text-foreground tracking-wide text-center">
                {categoryName}
              </h1>
            </div>

            {/* Next/Save button, right */}
            <Button
              onClick={isLastCategory ? handleGeneratePDF : handleNext}
              className="h-11 rounded-md px-4 gap-2 bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-elegant flex items-center"
            >
              {isLastCategory ? (
                <>
                  <Download className="h-4 w-4" />
                  {/* SAVE PDF */}
                </>
              ) : (
                <>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {/* Second row: progress label and progress bar - centered below category name */}
          <div className="flex flex-col items-center justify-center mt-4 w-full">
            <p className="text-xs md:text-sm text-muted-foreground text-center">
              Progress: {votedItems}/{items.length}
            </p>
            <div className="w-full max-w-xs h-2 bg-muted rounded-full mt-1 mx-auto overflow-hidden">
              <div
                className="h-full bg-gradient-hero rounded-full transition-all duration-300"
                style={{ width: `${(votedItems / items.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Clothing Grid */}
        <div id="clothing-grid" className="bg-card p-8 rounded-lg shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              const vote = votes[item.id];

              return (
                <Card
                  key={item.id}
                  className={cn(
                    "p-6 transition-all duration-300 hover:shadow-elegant border-2",
                    vote === "good"
                      ? "border-vote-good"
                      : vote === "mid"
                      ? "border-vote-mid"
                      : vote === "bad"
                      ? "border-vote-bad"
                      : "border-border"
                  )}
                >
                  <div className="space-y-4">
                    <div
                      className={cn(
                        "aspect-[4/5] rounded-lg overflow-hidden flex items-center justify-center transition-colors duration-300",
                        getVoteBackgroundColor(vote)
                      )}
                      style={{ cursor: "zoom-in" }}
                      onClick={() => {
                        setActiveImage({ src: item.image, alt: item.name });
                        setModalOpen(true);
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg text-foreground mb-4">
                        {item.name}
                      </h3>
                      <div className="flex gap-2 justify-center">
                        {(["good", "mid", "bad"] as VoteType[]).map((v) => (
                          <Button
                            key={v}
                            onClick={() => handleVote(item.id, v)}
                            className={cn(
                              "h-12 px-6 text-xs font-semibold tracking-wide flex-1 border-2 transition-all duration-200",
                              vote === v
                                ? v === "good"
                                  ? "border-vote-good bg-vote-good text-vote-good-foreground"
                                  : v === "mid"
                                  ? "border-vote-mid bg-vote-mid text-vote-mid-foreground"
                                  : "border-vote-bad bg-vote-bad text-vote-bad-foreground"
                                : "border-border bg-card text-card-foreground hover:bg-accent"
                            )}
                          >
                            {v.toUpperCase()}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      {/* Image Modal */}
      {modalOpen && activeImage && (
        <ImageModal
          src={activeImage.src}
          alt={activeImage.alt}
          onClose={() => {
            setModalOpen(false);
            setActiveImage(null);
          }}
        />
      )}
    </div>
  );
};
