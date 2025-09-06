
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Wand2, Tag } from "lucide-react";
import { predictExamScore, RegressionDemoInput, RegressionDemoOutput } from "@/ai/flows/regression-demo-flow";
import { classifyStudentQuery, ClassificationDemoInput, ClassificationDemoOutput } from "@/ai/flows/classification-demo-flow";
import { useToast } from "@/hooks/use-toast";


// Regression Form
const regressionSchema = z.object({
  hoursStudied: z.number().min(0).max(20),
});
type RegressionFormValues = z.infer<typeof regressionSchema>;

// Classification Form
const classificationSchema = z.object({
  queryText: z.string().min(10, "Please enter at least 10 characters.").max(500),
});
type ClassificationFormValues = z.infer<typeof classificationSchema>;


export default function ConceptsPage() {
  const { toast } = useToast();

  // Regression State
  const [isRegressionLoading, setIsRegressionLoading] = useState(false);
  const [regressionPrediction, setRegressionPrediction] = useState<RegressionDemoOutput | null>(null);
  const { register: registerRegression, handleSubmit: handleRegressionSubmit, watch: watchRegression, setValue: setRegressionValue } = useForm<RegressionFormValues>({
    resolver: zodResolver(regressionSchema),
    defaultValues: { hoursStudied: 5 },
  });
  const hoursStudied = watchRegression("hoursStudied");

  // Classification State
  const [isClassificationLoading, setIsClassificationLoading] = useState(false);
  const [classificationPrediction, setClassificationPrediction] = useState<ClassificationDemoOutput | null>(null);
  const { register: registerClassification, handleSubmit: handleClassificationSubmit, formState: { errors: classificationErrors } } = useForm<ClassificationFormValues>({
    resolver: zodResolver(classificationSchema),
  });

  const onRegressionSubmit = async (data: RegressionFormValues) => {
    setIsRegressionLoading(true);
    setRegressionPrediction(null);
    try {
      const result = await predictExamScore(data);
      setRegressionPrediction(result);
    } catch (error) {
      console.error("Regression failed:", error);
      toast({ variant: "destructive", title: "Prediction Failed", description: "Could not get a prediction." });
    } finally {
      setIsRegressionLoading(false);
    }
  };
  
  const onClassificationSubmit = async (data: ClassificationFormValues) => {
    setIsClassificationLoading(true);
    setClassificationPrediction(null);
    try {
      const result = await classifyStudentQuery(data);
      setClassificationPrediction(result);
    } catch (error) {
      console.error("Classification failed:", error);
      toast({ variant: "destructive", title: "Classification Failed", description: "Could not classify the text." });
    } finally {
      setIsClassificationLoading(false);
    }
  };


  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        
        {/* Regression Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-4">
               <span className="p-2 bg-primary/10 rounded-md"><Wand2 className="h-6 w-6 text-primary"/></span>
                <div>
                  <CardTitle>Regression Demo</CardTitle>
                  <CardDescription>Predicting a continuous value (like a score).</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegressionSubmit(onRegressionSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="hoursStudied" className="text-base">Hours Studied: <span className="font-bold text-primary">{hoursStudied}</span></Label>
                <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-muted-foreground">0</span>
                    <Slider
                      id="hoursStudied"
                      min={0}
                      max={20}
                      step={0.5}
                      value={[hoursStudied]}
                      onValueChange={(value) => setRegressionValue("hoursStudied", value[0])}
                    />
                    <span className="text-sm text-muted-foreground">20</span>
                </div>
              </div>
              <Button type="submit" disabled={isRegressionLoading} className="w-full">
                {isRegressionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Predict Exam Score
              </Button>
            </form>
            {regressionPrediction && (
              <div className="mt-6 text-center animate-in fade-in duration-500">
                <p className="text-muted-foreground">Predicted Score:</p>
                <p className="text-5xl font-bold text-primary">{regressionPrediction.predictedScore.toFixed(1)} / 100</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Classification Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-4">
               <span className="p-2 bg-accent/10 rounded-md"><Tag className="h-6 w-6 text-accent"/></span>
                <div>
                  <CardTitle>Classification Demo</CardTitle>
                  <CardDescription>Assigning an input to a category (like a tag).</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleClassificationSubmit(onClassificationSubmit)} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="queryText">Student Query</Label>
                <Textarea
                  id="queryText"
                  placeholder="e.g., 'My code isn't working, can you help me debug it?'"
                  {...registerClassification("queryText")}
                />
                {classificationErrors.queryText && <p className="text-sm text-destructive">{classificationErrors.queryText.message}</p>}
              </div>
               <Button type="submit" disabled={isClassificationLoading} className="w-full">
                {isClassificationLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Classify Text
              </Button>
            </form>
             {classificationPrediction && (
              <div className="mt-6 text-center animate-in fade-in duration-500">
                <p className="text-muted-foreground">Predicted Category:</p>
                <p className="text-2xl font-bold text-accent bg-accent/10 py-2 px-4 rounded-md inline-block mt-1">{classificationPrediction.category}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
