
import { PredictionResult as PredictionResultType } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PredictionResultProps {
  result: PredictionResultType;
}

const PredictionResult = ({ result }: PredictionResultProps) => {
  const date = new Date(result.date).toLocaleDateString();
  const cropLabel = result.input.cropType.charAt(0).toUpperCase() + result.input.cropType.slice(1);
  
  // Prepare data for charts
  const nutrientData = [
    {
      name: "Nitrogen",
      value: result.input.nitrogen,
      fill: "#2D6A4F",
    },
    {
      name: "Phosphorus",
      value: result.input.phosphorus,
      fill: "#40916C",
    },
    {
      name: "Potassium",
      value: result.input.potassium,
      fill: "#52B788",
    },
  ];
  
  const environmentData = [
    {
      name: "Temperature",
      value: result.input.temperature,
      max: 45,
      fill: "#DDA15E",
    },
    {
      name: "Humidity",
      value: result.input.humidity,
      max: 100,
      fill: "#A98467",
    },
    {
      name: "pH",
      value: result.input.ph * 7, // Scale pH for better visualization
      max: 100,
      fill: "#BC6C25",
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Prediction Results</CardTitle>
            <CardDescription>Predicted on {date}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-accent text-accent-foreground">
            {cropLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Predicted Yield</h3>
              <div className="flex items-end space-x-2">
                <span className="text-4xl font-bold text-forest-500">
                  {result.yieldPrediction}
                </span>
                <span className="text-muted-foreground">tons</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Total yield from {result.input.area} hectares of {cropLabel}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Prediction Confidence</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{result.confidence}%</span>
                </div>
                <Progress value={result.confidence} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Based on historical data and current conditions
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Soil Nutrient Levels</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutrientData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 140]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Environmental Conditions</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={environmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip labelFormatter={(name) => `${name}`} formatter={(value, name, props) => {
                  if (props.payload.name === "pH") {
                    return [props.payload.value / 7, "pH"];
                  }
                  if (props.payload.name === "Temperature") {
                    return [`${value}°C`, name];
                  }
                  if (props.payload.name === "Humidity") {
                    return [`${value}%`, name];
                  }
                  return [value, name];
                }} />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Soil Type</p>
            <p className="text-sm text-muted-foreground">
              {result.input.soilType.charAt(0).toUpperCase() + result.input.soilType.slice(1).replace(/([A-Z])/g, ' $1')}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Rainfall</p>
            <p className="text-sm text-muted-foreground">{result.input.rainfall} mm</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Area</p>
            <p className="text-sm text-muted-foreground">{result.input.area} hectares</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
