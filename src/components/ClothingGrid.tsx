import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClothingItem, VoteType, clothingCategories } from "@/data/clothing";
import { ArrowLeft, ChevronRight, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVotes } from "@/contexts/VoteContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ClothingGridProps {
  categoryName: string;
  categoryId: string;
  items: ClothingItem[];
}

export const ClothingGrid = ({ categoryName, categoryId, items }: ClothingGridProps) => {
  const { votes, setVote, generateCombinedPDF } = useVotes();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVote = (itemId: string, vote: VoteType) => {
    setVote(itemId, votes[itemId] === vote ? null : vote);
  };

  const getVoteBackgroundColor = (vote: VoteType) => {
    switch (vote) {
      case 'good': return 'bg-vote-good';
      case 'mid': return 'bg-vote-mid';
      case 'bad': return 'bg-vote-bad';
      default: return 'bg-transparent';
    }
  };

  const handleNext = () => {
    const currentIndex = clothingCategories.findIndex(cat => cat.id === categoryId);
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
      navigate('/');
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const votedItems = items.filter(item => votes[item.id] !== null && votes[item.id] !== undefined).length;
  const currentIndex = clothingCategories.findIndex(cat => cat.id === categoryId);
  const isLastCategory = currentIndex === clothingCategories.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              className="h-10 w-10 hover:bg-accent flex items-center justify-center"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-foreground tracking-wide">{categoryName}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Progress: {votedItems}/{items.length}
              </p>
              <div className="w-32 h-2 bg-muted rounded-full mt-1">
                <div
                  className="h-full bg-gradient-hero rounded-full transition-all duration-300"
                  style={{ width: `${(votedItems / items.length) * 100}%` }}
                />
              </div>
            </div>

            <Button
              onClick={isLastCategory ? handleGeneratePDF : handleNext}
              className="h-11 rounded-md px-8 gap-2 bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-elegant flex items-center"
            >
              {isLastCategory ? (
                <>
                  <Download className="h-4 w-4" />
                  SAVE PDF
                </>
              ) : (
                <>
                  NEXT
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Clothing Grid */}
        <div id="clothing-grid" className="bg-card p-8 rounded-lg shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              const vote = votes[item.id];
              const isVoted = vote !== null && vote !== undefined;

              return (
                <Card
                  key={item.id}
                  className={cn(
                    "p-6 transition-all duration-300 hover:shadow-elegant border-2",
                    vote === 'good'
                      ? "border-vote-good"
                      : vote === 'mid'
                      ? "border-vote-mid"
                      : vote === 'bad'
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
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <div className="text-center">
                      <h3 className="font-semibold text-lg text-foreground mb-4">
                        {item.name}
                      </h3>

                      <div className="flex gap-2 justify-center">
                        {(['good', 'mid', 'bad'] as VoteType[]).map((v) => (
                          <Button
                            key={v}
                            onClick={() => handleVote(item.id, v)}
                            className={cn(
                              "h-12 px-6 text-xs font-semibold tracking-wide flex-1 border-2 transition-all duration-200",
                              vote === v
                                ? v === 'good'
                                  ? "border-vote-good bg-vote-good text-vote-good-foreground"
                                  : v === 'mid'
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
    </div>
  );
};
