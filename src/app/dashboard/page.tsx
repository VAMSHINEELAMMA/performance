
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle2, AlertTriangle, Target, Activity, Loader2, BrainCircuit } from "lucide-react";
import { PerformanceChart } from './performance-chart';
import { useAuth } from "@/hooks/use-auth";
import { studentData } from "@/data/student-data";
import type { Student } from "@/data/student-data";
import { generateStrengthsAndWeaknesses, GenerateStrengthsAndWeaknessesOutput } from "@/ai/flows/generate-strengths-weaknesses-flow";

export default function DashboardPage() {
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [analysis, setAnalysis] = useState<GenerateStrengthsAndWeaknessesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      let foundStudent: Student | null = null;
      for (const dept in studentData) {
        const studentInDept = studentData[dept].find(s => s.name === user.fullName);
        if (studentInDept) {
          foundStudent = studentInDept;
          break;
        }
      }
      setStudent(foundStudent);
    }
  }, [user]);

  useEffect(() => {
    if (student) {
      const getAnalysis = async () => {
        try {
          const result = await generateStrengthsAndWeaknesses(student.scores);
          setAnalysis(result);
        } catch (error) {
          console.error("Failed to generate strengths and weaknesses:", error);
          setAnalysis({ strengths: "Could not load AI analysis.", weaknesses: "Could not load AI analysis." });
        } finally {
            setIsLoading(false);
        }
      };
      getAnalysis();
    } else {
        setIsLoading(false);
    }
  }, [student]);

  if (!student) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
            <p>Loading student data...</p>
            {!isLoading && !student && <p>Could not find data for user: {user?.fullName}</p>}
        </div>
      </div>
    );
  }
  
  const overallPerformance = (
    (student.scores.assessmentScore +
     student.scores.projectScore +
     student.scores.feedbackScore +
     student.scores.efficiency) / 4
  ).toFixed(1);

  const kpiData = [
    { title: "Overall Performance", value: `${overallPerformance}%`, icon: <BarChart className="h-6 w-6 text-primary" /> },
    { title: "Assessment Score", value: `${student.scores.assessmentScore}%`, icon: <CheckCircle2 className="h-6 w-6 text-green-500" /> },
    { title: "Project Score", value: `${student.scores.projectScore}%`, icon: <CheckCircle2 className="h-6 w-6 text-green-500" /> },
    { title: "Efficiency", value: `${student.scores.efficiency}%`, icon: <Activity className="h-6 w-6 text-primary" /> },
  ];

  const renderList = (items: string) => {
    const listItems = items.split('\n- ').filter(item => item.trim() !== '');
    if (listItems.length === 1 && !items.startsWith('- ')) { // It's just a sentence
       return <p>{items}</p>
    }
    return (
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {listItems.map((item, index) => (
                <li key={index}>{item.startsWith('- ') ? item.substring(2) : item}</li>
            ))}
        </ul>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {kpi.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="text-green-500"/> AI-Generated Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Analyzing...</div>
            ) : (
                analysis && renderList(analysis.strengths)
            )}
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-yellow-500" /> AI-Generated Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
             {isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Analyzing...</div>
            ) : (
                analysis && renderList(analysis.weaknesses)
            )}
          </CardContent>
        </Card>
      </div>

       <Card className="shadow-md col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart scores={student.scores} />
          </CardContent>
        </Card>
    </div>
  );
}
