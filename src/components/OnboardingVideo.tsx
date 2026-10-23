import { useEffect, useRef, useState } from 'react'

export function OnboardingVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(true)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        video.pause()
        return
      }
      // Defer the MP4 request until its slide enters the viewport.
      if (!video.getAttribute('src')) video.src = src
      if (!reducedMotion.matches) void video.play().catch(() => {
        // The play button remains available when autoplay is blocked.
      })
    }, { threshold: 0.1 })
    const onMotionChange = () => { if (reducedMotion.matches) video.pause() }
    observer.observe(video)
    reducedMotion.addEventListener('change', onMotionChange)
    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', onMotionChange)
      video.pause()
    }
  }, [src])

  function togglePlayback() {
    const video = ref.current
    if (!video) return
    if (video.paused) void video.play().catch(() => {})
    else video.pause()
  }

  return <>
    <video
      ref={ref} poster={poster} aria-label={title} muted loop playsInline preload="none"
      onPlay={() => setPaused(false)} onPause={() => setPaused(true)}
    />
    <button
      type="button" className="onboarding-video-toggle" data-paused={paused}
      aria-label={`${paused ? 'Воспроизвести' : 'Приостановить'}: ${title}`}
      onClick={togglePlayback}
    ><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span></button>
  </>
}
