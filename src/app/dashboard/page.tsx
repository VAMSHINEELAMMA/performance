
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, CheckCircle2, AlertTriangle, Target, Activity, Loader2, User, Hand } from "lucide-react";
import { PerformanceChart } from './performance-chart';
import { useAuth } from "@/hooks/use-auth";
import { studentData } from "@/data/student-data";
import type { Student } from "@/data/student-data";
import { generateStrengthsAndWeaknesses, GenerateStrengthsAndWeaknessesOutput } from "@/ai/flows/generate-strengths-weaknesses-flow";

function StudentDashboard({ student }: { student: Student }) {
  const [analysis, setAnalysis] = useState<GenerateStrengthsAndWeaknessesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, [student]);

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
    if (listItems.length === 1 && !items.startsWith('- ')) { 
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

function FacultyDashboard() {
    const { user } = useAuth();
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-lg text-center shadow-lg">
                <CardHeader>
                    <Hand className="h-12 w-12 mx-auto text-primary"/>
                    <CardTitle className="text-3xl font-headline mt-4">Welcome, {user?.fullName || 'Faculty'}</CardTitle>
                    <CardDescription>You are logged in as a faculty member. Use the sidebar to navigate to student assessments, feedback, and other tools.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'student') {
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
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
      return (
          <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary"/>
          </div>
      )
  }

  if (user?.role === 'faculty') {
      return <FacultyDashboard />;
  }

  if (user?.role === 'student') {
      if (student) {
        return <StudentDashboard student={student} />;
      } else {
         return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                    <User className="h-12 w-12 mx-auto text-destructive"/>
                    <p className="mt-4">Could not find data for user: {user?.fullName}</p>
                    <p className="text-sm">Please ensure your name matches a record in the student database.</p>
                </div>
            </div>
         )
      }
  }

  return (
    <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
            <p>Your role is not defined. Please contact an administrator.</p>
        </div>
    </div>
  );
}
