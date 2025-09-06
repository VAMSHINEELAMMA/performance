import {
  LayoutDashboard,
  FileText,
  Briefcase,
  ThumbsUp,
  Calculator,
  Gamepad2,
  Users,
  LogOut,
  type LucideIcon,
  LifeBuoy,
  BookText,
  BrainCircuit,
} from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Assessments',
    href: '/assessment',
    icon: FileText,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: Briefcase,
  },
  {
    title: 'Feedback',
    href: '/feedback',
    icon: ThumbsUp,
  },
  {
    title: 'Calculator',
    href: '/calculator',
    icon: Calculator,
  },
  {
    title: 'Summarizer',
    href: '/summarizer',
    icon: BookText,
  },
  {
    title: 'Games',
    href: '/games',
    icon: Gamepad2,
  },
  {
    title: 'Connect',
    href: '/connect',
    icon: Users,
  },
  {
    title: 'Help',
    href: '/help',
    icon: LifeBuoy,
  },
];
