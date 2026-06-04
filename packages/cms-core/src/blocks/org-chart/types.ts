export interface DepartmentItem {
  name: string
  head?: string
  description?: string
}

export interface OrgChartBlockProps {
  blockType?: 'org-chart'
  heading?: string
  chartImageUrl?: string
  chartImageAlt?: string
  departments?: DepartmentItem[]
  renderMode?: 'image' | 'list'
}
