
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PredictionResult } from "@/types";
import { getPredictionHistory, clearPredictionHistory } from "@/lib/prediction";
import HistoryItem from "@/components/prediction/HistoryItem";
import PredictionResult as PredictionResultComponent from "@/components/prediction/PredictionResult";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const History = () => {
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<PredictionResult | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  useEffect(() => {
    if (user) {
      const predictions = getPredictionHistory(user.id);
      setHistory(predictions);
    }
  }, [user]);

  const handleClearHistory = () => {
    if (user) {
      clearPredictionHistory(user.id);
      setHistory([]);
      setShowClearDialog(false);
      toast({
        title: "History cleared",
        description: "Your prediction history has been cleared",
      });
    }
  };

  const handleSelectResult = (result: PredictionResult) => {
    setSelectedResult(result);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Prediction History</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setShowClearDialog(true)}
            disabled={history.length === 0}
          >
            Clear History
          </Button>
          <Button onClick={() => navigate("/predict")}>
            <Plus className="mr-2 h-4 w-4" />
            New Prediction
          </Button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-muted/40 rounded-lg p-12 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-medium mb-2">No Prediction History</h3>
            <p className="text-muted-foreground mb-6">
              You haven't made any predictions yet. Start by creating a new prediction.
            </p>
            <Button onClick={() => navigate("/predict")}>
              Create Your First Prediction
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((result) => (
            <HistoryItem
              key={result.id}
              result={result}
              onSelect={handleSelectResult}
            />
          ))}
        </div>
      )}

      {/* Prediction Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          {selectedResult && (
            <PredictionResultComponent result={selectedResult} />
          )}
        </DialogContent>
      </Dialog>

      {/* Clear History Confirmation Dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
              Clear Prediction History
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to clear your prediction history? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClearDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleClearHistory}>
              Clear History
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
