export type Student = {
    id: string;
    name: string;
    scores: {
        assessmentScore: number;
        projectScore: number;
        feedbackScore: number;
        efficiency: number;
    }
};

export type Department = Student[];

export type StudentData = Record<string, Department>;

export const studentData: StudentData = {
    "CS": [
        { id: 'cs001', name: 'John Doe', scores: { assessmentScore: 85, projectScore: 90, feedbackScore: 95, efficiency: 88 }},
        { id: 'cs002', name: 'Jane Smith', scores: { assessmentScore: 92, projectScore: 88, feedbackScore: 91, efficiency: 94 }},
        { id: 'cs003', name: 'Peter Jones', scores: { assessmentScore: 78, projectScore: 82, feedbackScore: 80, efficiency: 75 }},
    ],
    "IS": [
        { id: 'is001', name: 'Emily White', scores: { assessmentScore: 88, projectScore: 85, feedbackScore: 92, efficiency: 90 }},
        { id: 'is002', name: 'Michael Brown', scores: { assessmentScore: 81, projectScore: 79, feedbackScore: 85, efficiency: 82 }},
    ],
    "ECE": [
        { id: 'ece001', name: 'Sarah Green', scores: { assessmentScore: 95, projectScore: 91, feedbackScore: 96, efficiency: 93 }},
        { id: 'ece002', name: 'David Black', scores: { assessmentScore: 75, projectScore: 88, feedbackScore: 81, efficiency: 80 }},
    ],
    "EEE": [
        { id: 'eee001', name: 'Chris Harris', scores: { assessmentScore: 82, projectScore: 89, feedbackScore: 88, efficiency: 85 }},
    ],
    "AI & ML": [
        { id: 'aiml001', name: 'Linda Martinez', scores: { assessmentScore: 98, projectScore: 95, feedbackScore: 97, efficiency: 96 }},
        { id: 'aiml002', name: 'Robert Wilson', scores: { assessmentScore: 91, projectScore: 93, feedbackScore: 90, efficiency: 92 }},
    ],
    "AI & DS": [
        { id: 'aids001', name: 'Jessica Taylor', scores: { assessmentScore: 93, projectScore: 94, feedbackScore: 92, efficiency: 91 }},
    ]
};
