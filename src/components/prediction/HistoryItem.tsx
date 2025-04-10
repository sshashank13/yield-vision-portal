
import { PredictionResult } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BarChart2 } from "lucide-react";

interface HistoryItemProps {
  result: PredictionResult;
  onSelect: (result: PredictionResult) => void;
}

const HistoryItem = ({ result, onSelect }: HistoryItemProps) => {
  const date = new Date(result.date).toLocaleDateString();
  const cropLabel = result.input.cropType.charAt(0).toUpperCase() + result.input.cropType.slice(1);

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
            {cropLabel}
          </Badge>
          <CardDescription>{date}</CardDescription>
        </div>
        <CardTitle className="text-xl mt-2">
          {result.yieldPrediction} tons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Area:</span>
            <span>{result.input.area} hectares</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Seed:</span>
            <span>{result.input.seedVariety}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Soil Quality:</span>
            <span>{result.input.soilQuality.charAt(0).toUpperCase() + result.input.soilQuality.slice(1)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Confidence:</span>
            <span>{result.confidence}%</span>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-4 flex items-center justify-center gap-2"
            onClick={() => onSelect(result)}
          >
            <BarChart2 className="h-4 w-4" />
            <span>View Details</span>
            <ArrowRightIcon className="h-4 w-4 ml-auto" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryItem;
