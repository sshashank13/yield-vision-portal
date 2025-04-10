
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PredictionInput, PredictionResult } from "@/types";
import { predictYield, savePrediction } from "@/lib/prediction";
import PredictionForm from "@/components/prediction/PredictionForm";
import PredictionResult as PredictionResultComponent from "@/components/prediction/PredictionResult";
import { useToast } from "@/hooks/use-toast";

const Predict = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (input: PredictionInput) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        const result = predictYield(input);
        setResult(result);
        
        // Save prediction to history
        if (user) {
          savePrediction(result, user.id);
          toast({
            title: "Prediction saved",
            description: "Your prediction has been saved to your history",
          });
        }
      } catch (error) {
        toast({
          title: "Prediction failed",
          description: "An error occurred while generating the prediction",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Crop Yield Prediction</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        
        <div>
          {result ? (
            <PredictionResultComponent result={result} />
          ) : (
            <div className="h-full flex items-center justify-center bg-muted/40 rounded-lg p-8 text-center">
              <div className="max-w-md">
                <h3 className="text-xl font-medium mb-2">No Prediction Yet</h3>
                <p className="text-muted-foreground">
                  Fill out the form to generate a crop yield prediction. Your results will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predict;
