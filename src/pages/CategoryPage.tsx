import { useParams, useNavigate } from "react-router-dom";
import { ClothingGrid } from "@/components/ClothingGrid";
import { clothingCategories } from "@/data/clothing";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const category = clothingCategories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return <ClothingGrid categoryName={category.name} categoryId={category.id} items={category.items} />;
};

export default CategoryPage;
