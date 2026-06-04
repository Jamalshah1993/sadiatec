export interface ProfileTableRow {
  label: string
  value: string
  isHighlighted?: boolean
}

export interface CompanyProfileTableBlockProps {
  blockType?: 'company-profile-table'
  heading?: string
  rows: ProfileTableRow[]
  tableStyle?: 'bordered' | 'striped' | 'clean'
  labelWidth?: 'narrow' | 'medium' | 'wide'
}
