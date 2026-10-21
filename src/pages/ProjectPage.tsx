import { Link, useParams } from 'react-router'
import { PageHeader, OptionalLink } from '../components/Links'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { NotFoundPage } from './NotFoundPage'
import { PortfolioImage } from '../components/PortfolioImage'

export function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFoundPage />
  const categoryPath = `/work/${project.category}`

  return <>
    <PageHeader backTo={categoryPath} />
    <main id="main-content" tabIndex={-1} className={`case-page case-page--${project.slug}`}>
      <div className="case-header page-container">
        <h1 className="statement case-title">{project.displayTitle ?? project.title}</h1>
        <p className="case-summary">{project.summary}</p>
        <p className="case-year">{project.year}</p>
        {project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="text-link resume-link case-external">{project.externalLabel ?? 'Смотреть сайт →'}</a>}
      </div>
      <div className="case-gallery" aria-label="Материалы проекта">
        {project.images.map((image, index) => image.videoUrl ? <iframe
          key={image.src}
          className="case-video"
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
          title={`${project.title} — видео`}
          src={image.videoUrl}
          sandbox={image.videoSandbox}
          width={image.width}
          height={image.height}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
        /> : <div key={image.src} className="case-image">
          <PortfolioImage
            src={image.src} alt={image.alt} width={image.width} height={image.height}
            style={{ aspectRatio: `${image.width} / ${image.height}`, objectFit: 'cover' }}
            sizes={project.slug === 'poster-experiments' ? '(max-width: 494px) calc(100vw - 32px), 462px' : project.slug === 'ministry-of-culture' && index === 0 ? '120vw' : '100vw'}
            loading={index === 0 ? 'eager' : 'lazy'} decoding="async"
          />
        </div>)}
      </div>
      <div className="page-container case-return">
        <Link className="text-link" to={categoryPath}>{project.category === 'posters' ? '← Все постеры' : project.category === 'special-projects' ? '← Все спецпроекты' : '← Все сайты'}</Link>
        <OptionalLink href={profile.contact}>Написать мне →</OptionalLink>
      </div>
    </main>
  </>
}
