import { PerformanceForm } from "./performance-form";
import { predictStudentPerformance } from "@/ai/flows/predict-student-performance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu } from "lucide-react";
import { studentData } from "@/data/student-data";


export default function CalculatorPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Cpu className="h-8 w-8 text-primary"/>
            <div>
              <CardTitle className="text-2xl font-headline">AI Performance Calculator</CardTitle>
              <CardDescription>
                Select a student to load their data and get an AI-powered performance prediction.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PerformanceForm 
            predictStudentPerformance={predictStudentPerformance}
            studentData={studentData}
          />
        </CardContent>
      </Card>
    </div>
  );
}
