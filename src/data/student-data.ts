

export type UserRole = "student" | "faculty";

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
        { id: 'cs004', name: 'Alex Ray', scores: { assessmentScore: 88, projectScore: 91, feedbackScore: 92, efficiency: 90 }},
        { id: 'cs005', name: 'Maria Garcia', scores: { assessmentScore: 95, projectScore: 89, feedbackScore: 94, efficiency: 96 }},
        { id: 'cs006', name: 'David Lee', scores: { assessmentScore: 81, projectScore: 85, feedbackScore: 83, efficiency: 80 }},
        { id: 'cs007', name: 'Olivia Martinez', scores: { assessmentScore: 90, projectScore: 92, feedbackScore: 89, efficiency: 91 }},
        { id: 'cs008', name: 'James Rodriguez', scores: { assessmentScore: 76, projectScore: 80, feedbackScore: 79, efficiency: 77 }},
        { id: 'cs009', name: 'Sophia Hernandez', scores: { assessmentScore: 93, projectScore: 95, feedbackScore: 96, efficiency: 94 }},
        { id: 'cs010', name: 'William Brown', scores: { assessmentScore: 84, projectScore: 87, feedbackScore: 86, efficiency: 85 }},
        { id: 'cs011', name: 'Isabella Davis', scores: { assessmentScore: 96, projectScore: 94, feedbackScore: 97, efficiency: 98 }},
        { id: 'cs012', name: 'Lucas Miller', scores: { assessmentScore: 79, projectScore: 81, feedbackScore: 80, efficiency: 78 }},
        { id: 'cs013', name: 'Mia Wilson', scores: { assessmentScore: 89, projectScore: 90, feedbackScore: 88, efficiency: 89 }},
        { id: 'cs014', name: 'Benjamin Moore', scores: { assessmentScore: 82, projectScore: 84, feedbackScore: 83, efficiency: 81 }},
        { id: 'cs015', name: 'Charlotte Taylor', scores: { assessmentScore: 91, projectScore: 93, feedbackScore: 90, efficiency: 92 }},
        { id: 'cs016', name: 'Henry Anderson', scores: { assessmentScore: 86, projectScore: 88, feedbackScore: 87, efficiency: 87 }},
        { id: 'cs017', name: 'Amelia Thomas', scores: { assessmentScore: 94, projectScore: 96, feedbackScore: 95, efficiency: 95 }},
        { id: 'cs018', name: 'Theodore Jackson', scores: { assessmentScore: 80, projectScore: 78, feedbackScore: 82, efficiency: 79 }},
        { id: 'cs019', name: 'Harper White', scores: { assessmentScore: 87, projectScore: 89, feedbackScore: 88, efficiency: 88 }},
        { id: 'cs020', name: 'Elijah Harris', scores: { assessmentScore: 92, projectScore: 91, feedbackScore: 93, efficiency: 92 }},
    ],
    "IS": [
        { id: 'is001', name: 'Emily White', scores: { assessmentScore: 88, projectScore: 85, feedbackScore: 92, efficiency: 90 }},
        { id: 'is002', name: 'Michael Brown', scores: { assessmentScore: 81, projectScore: 79, feedbackScore: 85, efficiency: 82 }},
        { id: 'is003', name: 'Abigail Martin', scores: { assessmentScore: 90, projectScore: 88, feedbackScore: 91, efficiency: 89 }},
        { id: 'is004', name: 'Daniel Thompson', scores: { assessmentScore: 83, projectScore: 86, feedbackScore: 84, efficiency: 85 }},
        { id: 'is005', name: 'Madison Garcia', scores: { assessmentScore: 92, projectScore: 90, feedbackScore: 93, efficiency: 91 }},
        { id: 'is006', name: 'Joseph Martinez', scores: { assessmentScore: 80, projectScore: 82, feedbackScore: 81, efficiency: 79 }},
        { id: 'is007', name: 'Chloe Robinson', scores: { assessmentScore: 89, projectScore: 87, feedbackScore: 88, efficiency: 88 }},
        { id: 'is008', name: 'Samuel Clark', scores: { assessmentScore: 85, projectScore: 84, feedbackScore: 86, efficiency: 85 }},
        { id: 'is009', name: 'Avery Lewis', scores: { assessmentScore: 91, projectScore: 89, feedbackScore: 90, efficiency: 90 }},
        { id: 'is010', name: 'David Walker', scores: { assessmentScore: 84, projectScore: 83, feedbackScore: 85, efficiency: 84 }},
        { id: 'is011', name: 'Sofia Hall', scores: { assessmentScore: 87, projectScore: 90, feedbackScore: 88, efficiency: 89 }},
        { id: 'is012', name: 'Matthew Allen', scores: { assessmentScore: 93, projectScore: 92, feedbackScore: 94, efficiency: 93 }},
        { id: 'is013', name: 'Grace Young', scores: { assessmentScore: 82, projectScore: 81, feedbackScore: 83, efficiency: 82 }},
        { id: 'is014', name: 'Andrew Hernandez', scores: { assessmentScore: 86, projectScore: 88, feedbackScore: 87, efficiency: 87 }},
        { id: 'is015', name: 'Victoria King', scores: { assessmentScore: 94, projectScore: 91, feedbackScore: 95, efficiency: 94 }},
    ],
    "ECE": [
        { id: 'ece001', name: 'Sarah Green', scores: { assessmentScore: 95, projectScore: 91, feedbackScore: 96, efficiency: 93 }},
        { id: 'ece002', name: 'David Black', scores: { assessmentScore: 75, projectScore: 88, feedbackScore: 81, efficiency: 80 }},
        { id: 'ece003', name: 'Christopher Wright', scores: { assessmentScore: 89, projectScore: 92, feedbackScore: 90, efficiency: 91 }},
        { id: 'ece004', name: 'Hannah Lopez', scores: { assessmentScore: 82, projectScore: 85, feedbackScore: 84, efficiency: 83 }},
        { id: 'ece005', name: 'Joshua Hill', scores: { assessmentScore: 91, projectScore: 89, feedbackScore: 92, efficiency: 90 }},
        { id: 'ece006', name: 'Lauren Scott', scores: { assessmentScore: 86, projectScore: 87, feedbackScore: 85, efficiency: 86 }},
        { id: 'ece007', name: 'Anthony Green', scores: { assessmentScore: 93, projectScore: 94, feedbackScore: 91, efficiency: 92 }},
        { id: 'ece008', name: 'Mia Adams', scores: { assessmentScore: 79, projectScore: 81, feedbackScore: 80, efficiency: 78 }},
        { id: 'ece009', name: 'William Baker', scores: { assessmentScore: 88, projectScore: 90, feedbackScore: 89, efficiency: 89 }},
        { id: 'ece010', name: 'Natalie Nelson', scores: { assessmentScore: 84, projectScore: 86, feedbackScore: 83, efficiency: 85 }},
        { id: 'ece011', name: 'Ryan Carter', scores: { assessmentScore: 92, projectScore: 93, feedbackScore: 90, efficiency: 91 }},
        { id: 'ece012', name: 'Zoe Mitchell', scores: { assessmentScore: 81, projectScore: 80, feedbackScore: 82, efficiency: 81 }},
        { id: 'ece013', name: 'Kevin Perez', scores: { assessmentScore: 87, projectScore: 88, feedbackScore: 86, efficiency: 87 }},
        { id: 'ece014', name: 'Lillian Roberts', scores: { assessmentScore: 94, projectScore: 95, feedbackScore: 93, efficiency: 94 }},
        { id: 'ece015', name: 'Justin Turner', scores: { assessmentScore: 83, projectScore: 82, feedbackScore: 84, efficiency: 83 }},
    ],
    "EEE": [
        { id: 'eee001', name: 'Chris Harris', scores: { assessmentScore: 82, projectScore: 89, feedbackScore: 88, efficiency: 85 }},
        { id: 'eee002', name: 'Jessica Phillips', scores: { assessmentScore: 90, projectScore: 91, feedbackScore: 89, efficiency: 90 }},
        { id: 'eee003', name: 'Brandon Campbell', scores: { assessmentScore: 85, projectScore: 86, feedbackScore: 84, efficiency: 85 }},
        { id: 'eee004', name: 'Megan Parker', scores: { assessmentScore: 91, projectScore: 92, feedbackScore: 90, efficiency: 91 }},
        { id: 'eee005', name: 'Brian Evans', scores: { assessmentScore: 83, projectScore: 84, feedbackScore: 82, efficiency: 83 }},
        { id: 'eee006', name: 'Ashley Edwards', scores: { assessmentScore: 88, projectScore: 90, feedbackScore: 87, efficiency: 88 }},
        { id: 'eee007', name: 'Jason Collins', scores: { assessmentScore: 86, projectScore: 85, feedbackScore: 88, efficiency: 86 }},
        { id: 'eee008', name: 'Samantha Stewart', scores: { assessmentScore: 92, projectScore: 93, feedbackScore: 91, efficiency: 92 }},
        { id: 'eee009', name: 'Tyler Morris', scores: { assessmentScore: 80, projectScore: 81, feedbackScore: 83, efficiency: 81 }},
        { id: 'eee010', name: 'Kimberly Rogers', scores: { assessmentScore: 87, projectScore: 88, feedbackScore: 86, efficiency: 87 }},
        { id: 'eee011', name: 'Matthew Reed', scores: { assessmentScore: 93, projectScore: 94, feedbackScore: 92, efficiency: 93 }},
        { id: 'eee012', name: 'Nicole Cook', scores: { assessmentScore: 81, projectScore: 83, feedbackScore: 80, efficiency: 82 }},
        { id: 'eee013', name: 'Jacob Morgan', scores: { assessmentScore: 89, projectScore: 87, feedbackScore: 88, efficiency: 89 }},
        { id: 'eee014', name: 'Amber Bell', scores: { assessmentScore: 94, projectScore: 95, feedbackScore: 93, efficiency: 94 }},
        { id: 'eee015', name: 'Kevin Murphy', scores: { assessmentScore: 84, projectScore: 82, feedbackScore: 85, efficiency: 84 }},
    ],
    "AI & ML": [
        { id: 'aiml001', name: 'Linda Martinez', scores: { assessmentScore: 98, projectScore: 95, feedbackScore: 97, efficiency: 96 }},
        { id: 'aiml002', name: 'Robert Wilson', scores: { assessmentScore: 91, projectScore: 93, feedbackScore: 90, efficiency: 92 }},
        { id: 'aiml003', name: 'Patricia Anderson', scores: { assessmentScore: 96, projectScore: 97, feedbackScore: 95, efficiency: 97 }},
        { id: 'aiml004', name: 'James Taylor', scores: { assessmentScore: 92, projectScore: 94, feedbackScore: 91, efficiency: 93 }},
        { id: 'aiml005', name: 'Jennifer Thomas', scores: { assessmentScore: 97, projectScore: 96, feedbackScore: 98, efficiency: 98 }},
        { id: 'aiml006', name: 'Charles Moore', scores: { assessmentScore: 90, projectScore: 92, feedbackScore: 89, efficiency: 91 }},
        { id: 'aiml007', name: 'Barbara Jackson', scores: { assessmentScore: 95, projectScore: 94, feedbackScore: 96, efficiency: 95 }},
        { id: 'aiml008', name: 'Richard White', scores: { assessmentScore: 93, projectScore: 91, feedbackScore: 92, efficiency: 92 }},
        { id: 'aiml009', name: 'Susan Harris', scores: { assessmentScore: 99, projectScore: 98, feedbackScore: 99, efficiency: 99 }},
        { id: 'aiml010', name: 'Joseph Clark', scores: { assessmentScore: 89, projectScore: 90, feedbackScore: 88, efficiency: 89 }},
        { id: 'aiml011', name: 'Jessica Lewis', scores: { assessmentScore: 94, projectScore: 93, feedbackScore: 95, efficiency: 94 }},
        { id: 'aiml012', name: 'Thomas Robinson', scores: { assessmentScore: 92, projectScore: 95, feedbackScore: 93, efficiency: 94 }},
        { id: 'aiml013', name: 'Nancy Walker', scores: { assessmentScore: 97, projectScore: 99, feedbackScore: 96, efficiency: 98 }},
        { id: 'aiml014', name: 'Daniel Young', scores: { assessmentScore: 91, projectScore: 89, feedbackScore: 90, efficiency: 90 }},
        { id: 'aiml015', name: 'Karen Allen', scores: { assessmentScore: 96, projectScore: 92, feedbackScore: 94, efficiency: 95 }},
        { id: 'aiml016', name: 'Mark King', scores: { assessmentScore: 94, projectScore: 96, feedbackScore: 93, efficiency: 95 }},
        { id: 'aiml017', name: 'Betty Wright', scores: { assessmentScore: 98, projectScore: 97, feedbackScore: 99, efficiency: 98 }},
        { id: 'aiml018', name: 'Steven Lopez', scores: { assessmentScore: 88, projectScore: 91, feedbackScore: 89, efficiency: 90 }},
        { id: 'aiml019', name: 'Donna Hill', scores: { assessmentScore: 95, projectScore: 94, feedbackScore: 97, efficiency: 96 }},
        { id: 'aiml020', name: 'George Scott', scores: { assessmentScore: 93, projectScore: 95, feedbackScore: 92, efficiency: 94 }},
    ],
    "AI & DS": [
        { id: 'aids001', name: 'Jessica Taylor', scores: { assessmentScore: 93, projectScore: 94, feedbackScore: 92, efficiency: 91 }},
        { id: 'aids002', name: 'Paul Green', scores: { assessmentScore: 90, projectScore: 89, feedbackScore: 91, efficiency: 90 }},
        { id: 'aids003', name: 'Sandra Adams', scores: { assessmentScore: 95, projectScore: 96, feedbackScore: 94, efficiency: 95 }},
        { id: 'aids004', name: 'Kenneth Baker', scores: { assessmentScore: 88, projectScore: 87, feedbackScore: 89, efficiency: 88 }},
        { id: 'aids005', name: 'Cynthia Nelson', scores: { assessmentScore: 92, projectScore: 93, feedbackScore: 90, efficiency: 92 }},
        { id: 'aids006', name: 'Edward Carter', scores: { assessmentScore: 91, projectScore: 90, feedbackScore: 92, efficiency: 91 }},
        { id: 'aids007', name: 'Sharon Mitchell', scores: { assessmentScore: 96, projectScore: 95, feedbackScore: 97, efficiency: 96 }},
        { id: 'aids008', name: 'Ronald Perez', scores: { assessmentScore: 89, projectScore: 88, feedbackScore: 90, efficiency: 89 }},
        { id: 'aids009', name: 'Deborah Roberts', scores: { assessmentScore: 94, projectScore: 92, feedbackScore: 93, efficiency: 93 }},
        { id: 'aids010', name: 'Timothy Turner', scores: { assessmentScore: 90, projectScore: 91, feedbackScore: 89, efficiency: 90 }},
    ]
};
