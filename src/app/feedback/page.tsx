
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ThumbsUp, ThumbsDown, Send, FileDown, BrainCircuit, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { analyzeStudentFeedback, AnalyzeFeedbackInput, AnalyzeFeedbackOutput } from "@/ai/flows/analyze-feedback-flow";

type Feedback = {
  subject: string;
  experience: "Like" | "Dislike";
  comments: string;
};

const initialFeedbacks: Feedback[] = [
    { subject: 'Calculus Midterm', experience: 'Dislike', comments: 'The midterm was too difficult and the concepts were not covered well in class.' },
    { subject: 'React Components Lab', experience: 'Like', comments: 'I really enjoyed this lab, it was very practical and helped me understand React better.' },
    { subject: 'Calculus Midterm', experience: 'Like', comments: 'Challenging but fair. I felt prepared.' },
];


export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [subject, setSubject] = useState("");
  const [experience, setExperience] = useState<"Like" | "Dislike" | null>(null);
  const [comments, setComments] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const [analysis, setAnalysis] = useState<AnalyzeFeedbackOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);


  const handleSubmit = () => {
    if (!subject || !experience || !comments) {
      toast({
        variant: "destructive",
        title: "Incomplete Feedback",
        description: "Please fill out all fields before submitting.",
      });
      return;
    }

    const newFeedback: Feedback = { subject, experience, comments };
    setFeedbacks(prev => [...prev, newFeedback]);
    
    toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
    });

    // Reset form
    setSubject("");
    setExperience(null);
    setComments("");
  };

  const handleAnalyze = async (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
        const result = await analyzeStudentFeedback({
            subject: feedback.subject,
            rating: feedback.experience,
            comments: feedback.comments
        });
        setAnalysis(result);
    } catch (error) {
        console.error("Analysis failed", error);
        toast({ variant: "destructive", title: "Analysis Failed" });
    } finally {
        setIsAnalyzing(false);
    }
  };

  const downloadSubjectFeedback = (subject: string, feedbacksForSubject: Feedback[]) => {
    let csvContent = "data:text/csv;charset=utf-8,Subject,Rating,Comments\n";
    feedbacksForSubject.forEach(f => {
        csvContent += `${f.subject},${f.experience},"${f.comments.replace(/"/g, '""')}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${subject.replace(/\s+/g, '_')}_feedback.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const groupedFeedback = feedbacks.reduce((acc, f) => {
    if (!acc[f.subject]) {
      acc[f.subject] = [];
    }
    acc[f.subject].push(f);
    return acc;
  }, {} as Record<string, Feedback[]>);

  const defaultTab = user?.role === 'faculty' ? 'faculty' : 'student';

  return (
    <Tabs defaultValue={defaultTab} className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
        <TabsTrigger value="student" disabled={user?.role === 'faculty'}>Student View</TabsTrigger>
        <TabsTrigger value="faculty" disabled={user?.role === 'student'}>Faculty View</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <div className="flex justify-center items-start pt-10">
          <Card className="w-full max-w-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Submit Your Feedback</CardTitle>
              <CardDescription>
                We value your opinion. Let us know what you think about your courses or assessments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="feedback-subject">Feedback Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="feedback-subject">
                    <SelectValue placeholder="Select a course or assessment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Calculus Midterm">Calculus Midterm</SelectItem>
                    <SelectItem value="World War II Essay">World War II Essay</SelectItem>
                    <SelectItem value="React Components Lab">React Components Lab</SelectItem>
                    <SelectItem value="General Platform Feedback">General Platform Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label>Overall Experience</Label>
                <div className="flex gap-4">
                  <Button 
                    variant={experience === 'Like' ? 'default' : 'outline'} 
                    className="flex-1 group"
                    onClick={() => setExperience('Like')}
                  >
                    <ThumbsUp className="h-5 w-5 mr-2 text-green-500 transition-transform group-hover:scale-110" />
                    Like
                  </Button>
                  <Button 
                    variant={experience === 'Dislike' ? 'destructive' : 'outline'} 
                    className="flex-1 group"
                    onClick={() => setExperience('Dislike')}
                  >
                    <ThumbsDown className="h-5 w-5 mr-2 text-red-500 transition-transform group-hover:scale-110" />
                    Dislike
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea 
                    id="comments" 
                    placeholder="Tell us more about your experience..." 
                    rows={5} 
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
              </div>

              <Button className="w-full" onClick={handleSubmit}>
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="faculty">
         <Card className="mt-6 shadow-lg">
            <CardHeader>
                <CardTitle>Student Feedback Submissions</CardTitle>
                <CardDescription>Review, analyze, and download feedback submitted by students, grouped by subject.</CardDescription>
            </CardHeader>
            <CardContent>
                {feedbacks.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                        {Object.entries(groupedFeedback).map(([subject, feedbacksForSubject]) => (
                            <AccordionItem value={subject} key={subject}>
                                <div className="flex justify-between items-center w-full pr-4 py-4">
                                  <AccordionTrigger className="w-full text-lg font-medium text-left p-0 hover:no-underline">
                                    {subject} ({feedbacksForSubject.length})
                                  </AccordionTrigger>
                                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); downloadSubjectFeedback(subject, feedbacksForSubject); }} disabled={feedbacksForSubject.length === 0}>
                                      <FileDown className="mr-2 h-4 w-4"/>
                                      Download
                                  </Button>
                                </div>
                                <AccordionContent>
                                    <div className="space-y-4">
                                        {feedbacksForSubject.map((feedback, index) => (
                                            <div key={index} className="p-4 border rounded-md bg-muted/20 flex items-center justify-between">
                                                <div>
                                                    <p className="flex items-center gap-2 font-semibold">
                                                        Rating:
                                                        <span className={`flex items-center gap-1 ${feedback.experience === 'Like' ? 'text-green-500' : 'text-red-500'}`}>
                                                            {feedback.experience === 'Like' ? <ThumbsUp className="h-4 w-4"/> : <ThumbsDown className="h-4 w-4"/>}
                                                            {feedback.experience}
                                                        </span>
                                                    </p>
                                                    <p className="text-muted-foreground mt-1">"{feedback.comments}"</p>
                                                </div>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="secondary" onClick={() => handleAnalyze(feedback)}>
                                                          <BrainCircuit className="mr-2 h-4 w-4" />
                                                          View & Analyze
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle>Feedback Analysis</DialogTitle>
                                                            <DialogDescription>AI-powered suggestions based on student feedback.</DialogDescription>
                                                        </DialogHeader>
                                                        {selectedFeedback && (
                                                            <div className="space-y-4 mt-4">
                                                              <Card>
                                                                <CardHeader className="pb-2">
                                                                  <CardTitle className="text-sm">Original Feedback</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                  <p className="text-sm text-muted-foreground"><strong>Rating:</strong> {selectedFeedback.experience}</p>
                                                                  <p className="text-sm text-muted-foreground mt-1"><strong>Comment:</strong> "{selectedFeedback.comments}"</p>
                                                                </CardContent>
                                                              </Card>
                                                              <Card>
                                                                <CardHeader className="pb-2">
                                                                  <CardTitle className="text-sm flex items-center gap-2"><BrainCircuit className="text-primary"/> AI Suggestions</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                    {isAnalyzing && <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin"/>Analyzing...</div>}
                                                                    {analysis && <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis.suggestions}</p>}
                                                                </CardContent>
                                                              </Card>
                                                            </div>
                                                        )}
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No feedback has been submitted yet.</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
