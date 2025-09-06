
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, Clock, CheckCircle, FileUp, Download, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";


const initialAssessments = [
  { id: "calc-midterm", title: "Calculus Midterm", subject: "Mathematics", dueDate: "2024-08-15", status: "Not Submitted", file: null as File | null, score: null },
  { id: "history-essay", title: "World War II Essay", subject: "History", dueDate: "2024-08-10", status: "Submitted", file: new File([], "history_essay.pdf"), score: 88 },
  { id: "react-lab", title: "React Components Lab", subject: "Computer Science", dueDate: "2024-08-12", status: "Submitted", file: new File([], "react-lab.pdf"), score: 92 },
];

const initialSubmissions = [
    { student: "John Doe", assessment: "World War II Essay", date: "2024-08-09", file: new File([], "history_essay.pdf") },
    { student: "Peter Jones", assessment: "Calculus Midterm", date: "2024-08-14", file: new File([], "calculus_midterm.pdf") },
    { student: "John Doe", assessment: "React Components Lab", date: "2024-08-11", file: new File([], "react-lab.pdf") },
];


export default function AssessmentPage() {
  const [assessments, setAssessments] = useState(initialAssessments);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const [newAssessment, setNewAssessment] = useState({ title: '', subject: '', file: null as File | null});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (assessmentTitle: string) => {
    if (!selectedFile || !user) return;

    // Update assessment status for the student
    setAssessments(prev =>
      prev.map(assessment =>
        assessment.title === assessmentTitle
          ? { ...assessment, status: "Submitted", file: selectedFile }
          : assessment
      )
    );

    // Add to submissions list for faculty view
    const newSubmission = {
        student: user.fullName,
        assessment: assessmentTitle,
        date: new Date().toISOString().split('T')[0],
        file: selectedFile
    };
    setSubmissions(prev => [...prev, newSubmission]);

    setSelectedFile(null);
    setActiveAssessment(null);
  };

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssessment.title || !newAssessment.subject || !newAssessment.file) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please fill out all fields.'});
        return;
    }
    const newId = newAssessment.title.toLowerCase().replace(/\s+/g, '-');
    const newAssessmentData = {
      id: newId,
      title: newAssessment.title,
      subject: newAssessment.subject,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // Due in 7 days
      status: 'Not Submitted',
      file: newAssessment.file,
      score: null
    };
    setAssessments(prev => [newAssessmentData, ...prev]);
    toast({ title: 'Success', description: 'New assessment has been created.' });
    setNewAssessment({ title: '', subject: '', file: null });
    (e.target as HTMLFormElement).reset();
  }

  const handleDeleteAssessment = (assessmentId: string) => {
    setAssessments(prev => prev.filter(a => a.id !== assessmentId));
    // Also remove related submissions
    const assessmentToDelete = assessments.find(a => a.id === assessmentId);
    if(assessmentToDelete) {
      setSubmissions(prev => prev.filter(s => s.assessment !== assessmentToDelete.title));
    }
    toast({ title: 'Success', description: 'Assessment has been deleted.' });
  }
  
  const studentView = (
    <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
      {assessments.map((assessment) => (
        <Card key={assessment.id} className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="text-primary"/>{assessment.title}</CardTitle>
            <CardDescription>{assessment.subject}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Due: {assessment.dueDate}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${assessment.status === 'Submitted' ? 'text-green-500' : 'text-yellow-500'}`}>
              {assessment.status === 'Submitted' ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              <span>{assessment.status}</span>
            </div>
             {assessment.score && (
              <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                <span>Score: {assessment.score}/100</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
             <Dialog open={activeAssessment === assessment.title} onOpenChange={(open) => { if (!open) { setActiveAssessment(null); setSelectedFile(null); } }}>
               <DialogTrigger asChild>
                  <Button className="w-full" disabled={assessment.status === 'Submitted'} onClick={() => setActiveAssessment(assessment.title)}>
                    <Upload className="mr-2 h-4 w-4" />
                    {assessment.status === 'Submitted' ? 'Submitted' : 'Submit Now'}
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[425px]">
                 <DialogHeader>
                   <DialogTitle>Upload Submission</DialogTitle>
                   <DialogDescription>
                     Select the file for your submission. Click submit when you're done.
                   </DialogDescription>
                 </DialogHeader>
                 <div className="grid gap-4 py-4">
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="submission-file" className="text-right">
                       File
                     </Label>
                     <Input id="submission-file" type="file" className="col-span-3" onChange={handleFileChange} />
                   </div>
                 </div>
                 <DialogFooter>
                   <Button type="submit" onClick={() => handleSubmit(assessment.title)} disabled={!selectedFile}>
                     Submit
                   </Button>
                 </DialogFooter>
               </DialogContent>
             </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const facultyView = (
     <div className="grid gap-8 mt-6">
        <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Upload New Assessment</CardTitle>
              <CardDescription>Create and distribute a new assessment for your students.</CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateAssessment}>
                <CardContent className="space-y-4">
                   <div className="grid gap-2">
                     <Label htmlFor="assessment-title">Title</Label>
                     <Input id="assessment-title" placeholder="e.g., Final Exam" onChange={(e) => setNewAssessment(p => ({...p, title: e.target.value}))}/>
                   </div>
                   <div className="grid gap-2">
                     <Label htmlFor="assessment-subject">Subject</Label>
                     <Input id="assessment-subject" placeholder="e.g., Computer Science" onChange={(e) => setNewAssessment(p => ({...p, subject: e.target.value}))}/>
                   </div>
                   <div className="grid gap-2">
                     <Label htmlFor="assessment-file">Assessment File</Label>
                     <Input id="assessment-file" type="file" onChange={(e) => setNewAssessment(p => ({...p, file: e.target.files?.[0] || null}))} />
                   </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit">
                    <FileUp className="mr-2 h-4 w-4"/>
                    Upload Assessment
                  </Button>
                </CardFooter>
            </form>
          </Card>

         <Card className="shadow-lg">
          <CardHeader>
              <CardTitle>Existing Assessments</CardTitle>
              <CardDescription>Manage and review existing assessments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {assessments.map(assessment => (
                 <Card key={assessment.id} className="flex items-center justify-between p-4">
                     <div>
                         <p className="font-bold">{assessment.title}</p>
                         <p className="text-sm text-muted-foreground">{assessment.subject}</p>
                     </div>
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4"/>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone. This will permanently delete the assessment "{assessment.title}" and all associated submissions.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteAssessment(assessment.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                     </AlertDialog>
                 </Card>
             ))}
          </CardContent>
        </Card>


        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Student Submissions</CardTitle>
                <CardDescription>Review and download assignments submitted by students.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Assessment</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission, index) => (
                      <TableRow key={`${submission.student}-${submission.assessment}-${index}`}>
                        <TableCell className="font-medium">{submission.student}</TableCell>
                        <TableCell>{submission.assessment}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleDownload(submission.file)}>
                            <Download className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );

  if (user?.role === 'faculty') {
      return facultyView;
  }
  
  if (user?.role === 'student') {
      return studentView;
  }

  return (
    <div className="flex items-center justify-center h-full">
        <p>You do not have a role assigned. Please contact support.</p>
    </div>
  );
}
