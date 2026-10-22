export type CategoryId = 'websites' | 'special-projects' | 'product' | 'animation' | 'posters' | 'merch'

export interface ProjectPreview {
  slug: string
  title: string
  image: string
  /** Only enable a route once its case study is implemented. */
  available?: boolean
}

export interface Category {
  id: CategoryId
  title: string
  description: string[]
  projects: ProjectPreview[]
}

export interface CaseImage {
  src: string
  alt: string
  width: number
  height: number
  videoUrl?: string
  videoSandbox?: string
}

export interface Project {
  slug: string
  category: CategoryId
  title: string
  displayTitle?: string
  year?: string
  summary?: string
  externalUrl?: string
  externalLabel?: string
  images: CaseImage[]
}
