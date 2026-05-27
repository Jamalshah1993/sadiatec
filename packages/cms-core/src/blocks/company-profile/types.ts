export interface CompanyProfileRow {
  label: string
  value: string
}

export interface CompanyProfileCta {
  label: string
  href: string
}

export interface CompanyProfileBlockProps {
  blockType?: 'company-profile'
  eyebrow?: string
  heading?: string
  rows: CompanyProfileRow[]
  photoUrl?: string
  photoAlt?: string
  photoFallbackText?: string
  yearsBadge?: { years: number; label: string }
  viewFullPageCta?: CompanyProfileCta
}
