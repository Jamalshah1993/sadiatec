export interface JobOpening {
  title: string
  company: string
  location: string
  salary: string
  postedDate: string
  tag?: 'Urgent' | 'Standard' | string
  applyHref: string
}

export interface ProcessStep {
  number: number
  title: string
  description: string
}

export interface TimelineBlockProps {
  eyebrow?: string
  heading?: string
  openings?: JobOpening[]
  processEyebrow?: string
  processSteps?: ProcessStep[]
}