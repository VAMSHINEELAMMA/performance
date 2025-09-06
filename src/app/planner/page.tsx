
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, Map, BookOpen, Clock } from "lucide-react";
import { generateLearningPath, GenerateLearningPathOutput } from "@/ai/flows/generate-learning-path-flow";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PlannerPage() {
  const [topic, setTopic] = useState("");
  const [learningPath, setLearningPath] = useState<GenerateLearningPathOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePlan = async () => {
    if (!topic.trim()) {
      toast({
        variant: "destructive",
        title: "Topic is empty",
        description: "Please enter a topic to create a learning plan.",
      });
      return;
    }
    
    setIsLoading(true);
    setLearningPath(null);

    try {
      const result = await generateLearningPath({ topic });
      setLearningPath(result);
    } catch (error) {
      console.error("Learning path generation failed:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "An error occurred while creating the learning path.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGeneratePlan();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Map className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-headline">AI Learning Planner</CardTitle>
              <CardDescription>
                Enter any topic and get a customized, step-by-step learning path.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-lg items-center space-x-2">
            <Input
              type="text"
              placeholder="e.g., Machine Learning, Python, HTML..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="text-base"
            />
            <Button onClick={handleGeneratePlan} disabled={isLoading || !topic.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Plan
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {learningPath && (
        <Card className="animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="text-primary" /> Learning Path for "{topic}"
            </CardTitle>
            <CardDescription>
                A step-by-step guide to mastering {topic}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
               {learningPath.learningPath.map((step, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                                    {step.step}
                                </span>
                                {step.concept}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-12">
                            <p className="text-muted-foreground mb-4">{step.description}</p>
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                                <Clock className="h-4 w-4" />
                                <strong>Estimated Time:</strong> {step.estimatedTime}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
