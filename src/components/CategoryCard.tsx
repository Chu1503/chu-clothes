import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClothingCategory } from "@/data/clothing";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: ClothingCategory;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="p-8 bg-gradient-card shadow-card border-0 hover:shadow-elegant transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-hero rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl font-bold text-primary-foreground tracking-wider">
            {category.name.charAt(0)}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2 tracking-wide">
            {category.name}
          </h3>
          <p className="text-muted-foreground text-sm">
            {category.items.length} items to review
          </p>
        </div>

        <Button
          className="w-full py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/category/${category.id}`);
          }}
        >
          RATE STYLES
        </Button>
      </div>
    </Card>
  );
};
