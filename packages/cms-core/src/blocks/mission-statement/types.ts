export type MissionPhotoSize = 'small' | 'medium' | 'large'

export interface MissionPhoto {
  imageUrl: string
  alt: string
  size: MissionPhotoSize
}

export interface MissionStatementBlockProps {
  blockType?: 'mission-statement'
  heading: string
  body?: string
  photos?: MissionPhoto[]
}
