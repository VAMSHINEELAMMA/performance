
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Linkedin, Github, Download, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";


const initialProjects = [
  {
    id: "proj-1",
    studentName: "John Doe",
    title: "E-commerce Website",
    description: "A full-stack e-commerce platform built with Next.js, Stripe, and PostgreSQL.",
    imageUrl: "https://picsum.photos/600/400?random=1",
    linkedinUrl: "https://linkedin.com/in/user",
    githubUrl: "https://github.com/user",
    projectFile: new File(["dummy zip"], "ecommerce.zip", { type: "application/zip" }),
    dataAiHint: 'ecommerce website'
  },
  {
    id: "proj-2",
    studentName: "Jane Smith",
    title: "Data Visualization Dashboard",
    description: "An analytics dashboard for visualizing sales data using D3.js and React.",
    imageUrl: "https://picsum.photos/600/400?random=2",
    linkedinUrl: "https://linkedin.com/in/user",
    githubUrl: "https://github.com/user",
    projectFile: null as File | null,
    dataAiHint: 'data dashboard'
  },
  {
    id: "proj-3",
    studentName: "Peter Jones",
    title: "Mobile Fitness App",
    description: "A cross-platform mobile app developed with React Native to track workouts and nutrition.",
    imageUrl: "https://picsum.photos/600/400?random=3",
    linkedinUrl: "https://linkedin.com/in/user",
    githubUrl: "https://github.com/user",
    projectFile: new File(["dummy zip"], "fitness_app.zip", { type: "application/zip" }),
    dataAiHint: 'fitness app'
  },
  {
    id: "proj-4",
    studentName: "John Doe",
    title: "Machine Learning Model",
    description: "A Python-based model to predict stock market trends using historical data.",
    imageUrl: "https://picsum.photos/600/400?random=4",
    linkedinUrl: "https://linkedin.com/in/user",
    githubUrl: "https://github.com/user",
    projectFile: null as File | null,
    dataAiHint: 'machine learning'
  },
];

type Project = typeof initialProjects[0];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    projectFile: null as File | null
  });

  const studentProjects = projects.filter(p => p.studentName === user?.fullName);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewProject(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewProject(prev => ({ ...prev, projectFile: e.target.files?.[0] || null }));
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description || !newProject.imageUrl || !user) {
        toast({ variant: "destructive", title: "Error", description: "Please fill in all required fields."});
        return;
    }
    const projectToAdd: Project = { 
        ...newProject, 
        id: `proj-${Date.now()}`,
        studentName: user.fullName, 
        dataAiHint: 'custom project' 
    };
    setProjects(prev => [projectToAdd, ...prev]);
    setIsUploadDialogOpen(false);
    setNewProject({
        title: "",
        description: "",
        imageUrl: "",
        linkedinUrl: "",
        githubUrl: "",
        projectFile: null
    });
    toast({ title: "Project Uploaded", description: "Your new project has been added."});
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    toast({ title: "Project Deleted", description: "The project has been removed from the portfolio." });
  };

  const studentView = (
    <div className="space-y-6">
        <div className="flex justify-end">
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Upload New Project</DialogTitle>
              <DialogDescription>
                Showcase your work by adding a new project to your portfolio.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" value={newProject.title} onChange={handleInputChange} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" value={newProject.description} onChange={handleInputChange} className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                  <Input id="imageUrl" value={newProject.imageUrl} onChange={handleInputChange} className="col-span-3" placeholder="https://picsum.photos/600/400" required />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="linkedinUrl" className="text-right">LinkedIn URL</Label>
                  <Input id="linkedinUrl" value={newProject.linkedinUrl} onChange={handleInputChange} className="col-span-3" placeholder="https://linkedin.com/in/your-profile" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="githubUrl" className="text-right">GitHub URL</Label>
                  <Input id="githubUrl" value={newProject.githubUrl} onChange={handleInputChange} className="col-span-3" placeholder="https://github.com/your-repo" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="projectFile" className="text-right">Project File</Label>
                  <Input id="projectFile" type="file" accept=".zip" onChange={handleFileChange} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studentProjects.map((project) => (
          <Card key={project.id} className="shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint={project.dataAiHint}
                />
              </div>
            </CardHeader>
            <div className="p-6 flex flex-col flex-grow">
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="mt-2 flex-grow">{project.description}</CardDescription>
            </div>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">View Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <div className="relative h-60 w-full rounded-lg overflow-hidden mb-4">
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover"
                              data-ai-hint={project.dataAiHint}
                            />
                        </div>
                        <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                        <DialogDescription>{project.description}</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                       {project.projectFile && (
                          <Button onClick={() => handleDownload(project.projectFile!)} className="w-full">
                              <Download className="mr-2 h-4 w-4" />
                              Download Project
                          </Button>
                        )}
                        {project.githubUrl && (
                            <Button asChild variant="secondary" className="w-full">
                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    GitHub
                                </Link>
                            </Button>
                        )}
                        {project.linkedinUrl && (
                          <Button asChild variant="secondary" className="w-full">
                              <Link href={project.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                  <Linkedin className="mr-2 h-4 w-4" />
                                  LinkedIn
                              </Link>
                          </Button>
                        )}
                    </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

  const facultyView = (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint={project.dataAiHint}
                />
                 <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm font-semibold">{project.studentName}</div>
              </div>
            </CardHeader>
            <div className="p-6 flex flex-col flex-grow">
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="mt-2 flex-grow">{project.description}</CardDescription>
            </div>
            <CardFooter className="flex justify-between items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">View Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <div className="relative h-60 w-full rounded-lg overflow-hidden mb-4">
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover"
                              data-ai-hint={project.dataAiHint}
                            />
                        </div>
                        <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                         <DialogDescription className="font-semibold text-foreground">By {project.studentName}</DialogDescription>
                        <DialogDescription>{project.description}</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                       {project.projectFile && (
                          <Button onClick={() => handleDownload(project.projectFile!)} className="w-full">
                              <Download className="mr-2 h-4 w-4" />
                              Download Project
                          </Button>
                        )}
                        {project.githubUrl && (
                            <Button asChild variant="secondary" className="w-full">
                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    GitHub
                                </Link>
                            </Button>
                        )}
                        {project.linkedinUrl && (
                          <Button asChild variant="secondary" className="w-full">
                              <Link href={project.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                  <Linkedin className="mr-2 h-4 w-4" />
                                  LinkedIn
                              </Link>
                          </Button>
                        )}
                    </div>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete {project.studentName}'s project "{project.title}".</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

  if (user?.role === 'student') {
      return studentView;
  }

  if(user?.role === 'faculty') {
      return facultyView;
  }

  return (
    <div className="flex items-center justify-center h-full">
        <p>You do not have a role assigned. Please contact support.</p>
    </div>
  );
}
