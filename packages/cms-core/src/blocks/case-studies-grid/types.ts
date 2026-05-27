export type CaseStudiesLayout = 'stacked' | 'grid' | 'carousel'

export interface CaseStudyCardItem {
  name: string
  role?: string
  metric?: { value: string; caption: string }
  challenge?: string
  solution?: string
  photoUrl?: string
}

export interface CaseStudiesGridBlockProps {
  blockType?: 'case-studies-grid'
  eyebrow?: string
  heading?: string
  studies: CaseStudyCardItem[]
  layout?: CaseStudiesLayout
  challengeLabel?: string
  solutionLabel?: string
}
