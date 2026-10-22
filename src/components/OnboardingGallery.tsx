import type { CSSProperties } from 'react'
import screens from '../data/onboarding-screens.json'
import { PortfolioImage } from './PortfolioImage'

type Bounds = { x: number; y: number; width: number; height: number }

// Presentation slides scale as a whole, keeping each phone in its Figma slot.
function placement(bounds: Bounds, height: number): CSSProperties {
  return {
    left: `${bounds.x / 1440 * 100}%`,
    top: `${bounds.y / height * 100}%`,
    width: `${bounds.width / 1440 * 100}%`,
    height: `${bounds.height / height * 100}%`,
  }
}

export function OnboardingGallery() {
  return <div className="case-gallery onboarding-gallery" aria-label="Материалы проекта">
    {screens.map((screen, index) => screen.src ? <div
      key={screen.number} className="case-image" data-screen={screen.number}
    >
      <PortfolioImage
        src={screen.src} alt={screen.alt ?? ''}
        width={screen.width} height={screen.height}
        style={{ aspectRatio: `${screen.width} / ${screen.height}`, objectFit: 'cover' }}
        loading={index === 0 ? 'eager' : 'lazy'} decoding="async"
      />
    </div> : <section
      key={screen.number} className="onboarding-concept" data-screen={screen.number}
      aria-labelledby={`onboarding-concept-${screen.number}`}
      style={{ aspectRatio: `${screen.width} / ${screen.height}`, background: screen.background }}
    >
      <p className="onboarding-concept-label" style={{ top: `${screen.labelY! / screen.height * 100}%` }}>Концепты</p>
      <h2
        id={`onboarding-concept-${screen.number}`} className="onboarding-concept-title"
        style={{ top: `${screen.titleY! / screen.height * 100}%`, height: `${screen.titleHeight! / screen.height * 100}%` }}
      >{screen.title}</h2>
      <p className="onboarding-concept-description" style={{ top: `${screen.descriptionY! / screen.height * 100}%` }}>{screen.description}</p>
      {screen.phones?.map((phone) => <div key={phone.nodeId} className="onboarding-phone" style={placement(phone, screen.height)}>
        <PortfolioImage
          src={phone.src} alt={phone.alt} width={phone.width} height={phone.height}
          sizes={`${phone.width / 1440 * 100}vw`} loading="lazy" decoding="async"
        />
      </div>)}
      {screen.video && <div className="onboarding-phone onboarding-video" style={placement(screen.video, screen.height)}>
        <PortfolioImage
          src={screen.video.poster} alt={`${screen.title} — превью анимации`}
          width={screen.video.width} height={screen.video.height}
          sizes={`${screen.video.width / 1440 * 100}vw`} loading="lazy" decoding="async"
        />
      </div>}
    </section>)}
  </div>
}
