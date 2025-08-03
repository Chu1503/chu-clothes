import { createContext, useContext, useState, ReactNode } from "react";
import { VoteType } from "@/data/clothing";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { clothingCategories } from "@/data/clothing";

interface VoteContextType {
  votes: Record<string, VoteType>;
  setVote: (itemId: string, vote: VoteType) => void;
  generateCombinedPDF: () => Promise<void>;
}

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const VoteProvider = ({ children }: { children: ReactNode }) => {
  const [votes, setVotes] = useState<Record<string, VoteType>>({});

  const setVote = (itemId: string, vote: VoteType) => {
    setVotes(prev => ({ ...prev, [itemId]: vote }));
  };

  const generateCombinedPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 20;

    for (let i = 0; i < clothingCategories.length; i++) {
      const category = clothingCategories[i];
      
      // Add category title
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(category.name, 20, yPosition);
      yPosition += 15;

      // Add items
      for (const item of category.items) {
        const vote = votes[item.id];
        const voteText = vote ? vote.toUpperCase() : "NOT RATED";
        
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        pdf.text(`• ${item.name}: ${voteText}`, 25, yPosition);
        yPosition += 8;
      }
      
      yPosition += 10;
      
      // Add new page if not last category and space is running out
      if (i < clothingCategories.length - 1 && yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }
    }

    pdf.save('complete-style-scorecard.pdf');
  };

  return (
    <VoteContext.Provider value={{ votes, setVote, generateCombinedPDF }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVotes = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error("useVotes must be used within a VoteProvider");
  }
  return context;
};