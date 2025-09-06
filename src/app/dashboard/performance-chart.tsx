
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

type Scores = {
  assessmentScore: number;
  projectScore: number;
  feedbackScore: number;
  efficiency: number;
};

interface PerformanceChartProps {
  scores: Scores;
}

export function PerformanceChart({ scores }: PerformanceChartProps) {
  const data = [
    { name: "Assessment", score: scores.assessmentScore },
    { name: "Project", score: scores.projectScore },
    { name: "Feedback", score: scores.feedbackScore },
    { name: "Efficiency", score: scores.efficiency },
  ];
  
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            domain={[0, 100]}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
            contentStyle={{ 
                background: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)'
            }}
          />
          <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
