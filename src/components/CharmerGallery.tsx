import { PortfolioImage } from './PortfolioImage'

const media = '/media/projects/charmer/'

export function CharmerGallery() {
  return <div className="case-gallery charmer-gallery" aria-label="Материалы проекта">
    <div className="charmer-video-panel">
      <iframe
        className="case-video"
        title="Dark side of Charmer — анимация типографики"
        src="https://player.vimeo.com/video/892542250?h=6741ca7bef&autoplay=1&loop=1&muted=1"
        width="1280" height="640"
        allow="autoplay; picture-in-picture; fullscreen"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
    <div className="charmer-logos">
      <div className="charmer-logo charmer-logo--white">
        <img src={media + 'logo-white.svg'} alt="Логотип Charmer на белом фоне" width="496" height="496" loading="lazy" />
      </div>
      <div className="charmer-logo charmer-logo--dark">
        <img src={media + 'logo-dark.svg'} alt="Экспериментальная типографика Dark side of Charmer" width="392.46" height="163.68" loading="lazy" />
      </div>
    </div>
    <div className="charmer-artwork charmer-artwork--hoodie">
      <PortfolioImage src={media + 'hoodie.png'} alt="Чёрное худи с белой типографикой Charmer на спине" loading="lazy" />
    </div>
    <div className="charmer-artwork charmer-artwork--typography">
      <PortfolioImage src={media + 'typography.png'} alt="Белая экспериментальная типографика Charmer на чёрном фоне" loading="lazy" />
    </div>
    <div className="charmer-artwork charmer-artwork--tape">
      <PortfolioImage src={media + 'tape.png'} alt="Фирменный скотч Charmer Studios" loading="lazy" />
    </div>
    <div className="charmer-artwork charmer-artwork--shirt">
      <PortfolioImage src={media + 'shirt.png'} alt="Белая футболка Charmer Studios в поле цветов" loading="lazy" />
    </div>
  </div>
}
