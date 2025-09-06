
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { PredictStudentPerformanceInput, PredictStudentPerformanceOutput } from "@/ai/flows/predict-student-performance";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Lightbulb, TrendingUp, User, Building } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { StudentData } from "@/data/student-data";


const formSchema = z.object({
  assessmentScore: z.number().min(0).max(100),
  projectScore: z.number().min(0).max(100),
  feedbackScore: z.number().min(0).max(100),
  efficiency: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

interface PerformanceFormProps {
  predictStudentPerformance: (input: PredictStudentPerformanceInput) => Promise<PredictStudentPerformanceOutput>;
  studentData: StudentData;
}

export function PerformanceForm({ predictStudentPerformance, studentData }: PerformanceFormProps) {
  const [prediction, setPrediction] = useState<PredictStudentPerformanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  const { control, handleSubmit, watch, reset, getValues } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assessmentScore: 0,
      projectScore: 0,
      feedbackScore: 0,
      efficiency: 0,
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (selectedDept && selectedStudentId) {
      const student = studentData[selectedDept]?.find(s => s.id === selectedStudentId);
      if (student) {
        reset(student.scores);
      }
    } else {
      reset({ assessmentScore: 0, projectScore: 0, feedbackScore: 0, efficiency: 0 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudentId, selectedDept, reset]);


  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictStudentPerformance(data);
      setPrediction(result);
    } catch (error) => {
      console.error("Prediction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDepartmentChange = (dept: string) => {
    setSelectedDept(dept);
    setSelectedStudentId(""); // Reset student selection
    reset({ assessmentScore: 0, projectScore: 0, feedbackScore: 0, efficiency: 0 });
  };
  
  const studentsInDept = studentData[selectedDept] || [];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
         <div className="grid gap-2">
            <Label htmlFor="department" className="flex items-center gap-2"><Building className="h-4 w-4" /> Department</Label>
            <Select onValueChange={handleDepartmentChange} value={selectedDept}>
                <SelectTrigger id="department">
                    <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(studentData).map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
         </div>
         <div className="grid gap-2">
            <Label htmlFor="student" className="flex items-center gap-2"><User className="h-4 w-4" /> Student</Label>
            <Select onValueChange={setSelectedStudentId} value={selectedStudentId} disabled={!selectedDept}>
                <SelectTrigger id="student">
                    <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                    {studentsInDept.map(student => (
                        <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
         </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
            {Object.keys(getValues()).map((key) => {
              const fieldName = key as keyof FormValues;
              const label = fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return (
                <div key={fieldName} className="space-y-2">
                  <Label>{label}</Label>
                  <Card className="p-4">
                     <p className="text-2xl font-bold text-primary">{formValues[fieldName]}</p>
                  </Card>
                </div>
              );
            })}
        </div>
        <Button type="submit" disabled={isLoading || !selectedStudentId} className="w-full md:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
             <>
              <Sparkles className="mr-2 h-4 w-4" />
              Predict Performance
            </>
          )}
        </Button>
      </form>

      {prediction && (
        <div className="space-y-6 animate-in fade-in duration-500">
           <Card className="bg-primary/5 border-primary/20">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="text-primary"/> Predicted Performance</CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-5xl font-bold text-primary">{prediction.predictedPerformance.toFixed(1)} / 100</p>
             </CardContent>
           </Card>

           <Card className="bg-accent/5 border-accent/20">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="text-accent" /> Areas for Improvement</CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{prediction.areasForImprovement}</p>
             </CardContent>
           </Card>
        </div>
      )}
    </div>
  );
}
