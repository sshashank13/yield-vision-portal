
import { useState } from "react";
import { PredictionInput } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PredictionFormProps {
  onSubmit: (input: PredictionInput) => void;
  isLoading: boolean;
}

const cropTypes = [
  "rice",
  "wheat",
  "maize",
  "potato",
  "cotton",
  "sugarcane",
  "coffee",
  "jute",
  "coconut",
  "mungbean"
];

const soilTypes = [
  "clay",
  "clayLoam",
  "loam",
  "sandyLoam",
  "sandy",
  "silt",
  "siltyLoam"
];

const formatSoilType = (type: string): string => {
  return type
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

const PredictionForm = ({ onSubmit, isLoading }: PredictionFormProps) => {
  const [input, setInput] = useState<PredictionInput>({
    cropType: "rice",
    soilType: "loam",
    area: 1,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 60,
    ph: 6.5,
    rainfall: 200
  });

  const handleChange = (name: keyof PredictionInput, value: string | number) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Predict Crop Yield</CardTitle>
        <CardDescription>
          Enter the details about your crop and field conditions
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type</Label>
              <Select
                value={input.cropType}
                onValueChange={(value) => handleChange("cropType", value)}
              >
                <SelectTrigger id="cropType">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop.charAt(0).toUpperCase() + crop.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type</Label>
              <Select
                value={input.soilType}
                onValueChange={(value) => handleChange("soilType", value)}
              >
                <SelectTrigger id="soilType">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil} value={soil}>
                      {formatSoilType(soil)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="area">Area (hectares)</Label>
              <Input
                id="area"
                type="number"
                min="0.1"
                step="0.1"
                value={input.area}
                onChange={(e) => handleChange("area", parseFloat(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ph">Soil pH (0-14)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="ph"
                  min={0}
                  max={14}
                  step={0.1}
                  value={[input.ph]}
                  onValueChange={([value]) => handleChange("ph", value)}
                />
                <span className="w-12 text-center">{input.ph}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Soil Nutrients</h3>
            
            <div className="space-y-2">
              <Label htmlFor="nitrogen">Nitrogen (kg/ha)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="nitrogen"
                  min={0}
                  max={140}
                  value={[input.nitrogen]}
                  onValueChange={([value]) => handleChange("nitrogen", value)}
                />
                <span className="w-12 text-center">{input.nitrogen}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phosphorus">Phosphorus (kg/ha)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="phosphorus"
                  min={0}
                  max={140}
                  value={[input.phosphorus]}
                  onValueChange={([value]) => handleChange("phosphorus", value)}
                />
                <span className="w-12 text-center">{input.phosphorus}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="potassium">Potassium (kg/ha)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="potassium"
                  min={0}
                  max={140}
                  value={[input.potassium]}
                  onValueChange={([value]) => handleChange("potassium", value)}
                />
                <span className="w-12 text-center">{input.potassium}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Climate Conditions</h3>
            
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="temperature"
                  min={0}
                  max={45}
                  step={0.1}
                  value={[input.temperature]}
                  onValueChange={([value]) => handleChange("temperature", value)}
                />
                <span className="w-12 text-center">{input.temperature}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="humidity">Humidity (%)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="humidity"
                  min={0}
                  max={100}
                  value={[input.humidity]}
                  onValueChange={([value]) => handleChange("humidity", value)}
                />
                <span className="w-12 text-center">{input.humidity}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rainfall">Rainfall (mm)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="rainfall"
                  min={0}
                  max={3000}
                  value={[input.rainfall]}
                  onValueChange={([value]) => handleChange("rainfall", value)}
                />
                <span className="w-12 text-center">{input.rainfall}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Predicting..." : "Predict Yield"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PredictionForm;
