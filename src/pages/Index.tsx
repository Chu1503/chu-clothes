import { CategoryCard } from "@/components/CategoryCard";
import { clothingCategories } from "@/data/clothing";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-foreground mb-6 tracking-tight">
            Chu Clothes
          </h1>
          <div className="text-center">
          <div className="bg-gradient-card rounded-lg p-8 shadow-card max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold mb-3">
                  1
                </div>
                <p>Choose a clothing category to start rating</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold mb-3">
                  2
                </div>
                <p>Vote on each item: Good (green), Mid (yellow), or Bad (red)</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold mb-3">
                  3
                </div>
                <p>Export your complete scorecard as a PDF</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {clothingCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>        
      </div>
    </div>
  );
};

export default Index;