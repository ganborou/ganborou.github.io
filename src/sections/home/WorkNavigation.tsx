import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { categories } from '../../data/categories'
import type { CategoryId } from '../../types/portfolio'
import { GradientGrain } from '../../components/GradientGrain'

const mobileQuery = '(max-width: 767px)'

export function WorkNavigation() {
  const [active, setActive] = useState<CategoryId>('special-projects')
  const linksRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const links = linksRef.current
    if (!links) return

    const mobile = window.matchMedia(mobileQuery)
    let frame = 0
    const updateActive = () => {
      frame = 0
      if (!mobile.matches) return

      // The row crossing the upper quarter owns the focus zone. Clamping to
      // the first/last row keeps one gradient active outside the list, too.
      const focusLine = window.innerHeight * 0.25
      let activeIndex = 0
      for (let index = 0; index < links.children.length; index += 1) {
        if (links.children[index].getBoundingClientRect().top <= focusLine) {
          activeIndex = index
        }
      }
      setActive(categories[activeIndex].id)
    }
    const scheduleUpdate = () => {
      if (mobile.matches && !frame) frame = requestAnimationFrame(updateActive)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    mobile.addEventListener('change', scheduleUpdate)
    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(links)
    scheduleUpdate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      mobile.removeEventListener('change', scheduleUpdate)
      resizeObserver.disconnect()
    }
  }, [])

  const activateFromPointerOrFocus = (id: CategoryId) => {
    // Touch-generated hover/focus must not replace the scroll-selected row.
    if (!window.matchMedia(mobileQuery).matches) setActive(id)
  }

  return (
    <nav id="work" aria-label="Направления работ" className="work-navigation">
      <h2 className="sr-only">Избранные работы</h2>
      <div className="work-scene">
        {categories.map(({ id }) => (
          <div key={id} className={`work-cloud work-cloud-${id}${active === id ? ' is-active' : ''}`} aria-hidden="true">
            <GradientGrain color="#83dce9" />
          </div>
        ))}
        <ul ref={linksRef} className="work-links">
          {categories.map(({ id, title }) => (
            <li key={id} className={`work-item work-${id}`}>
              <Link
                to={`/work/${id}`}
                onMouseEnter={() => activateFromPointerOrFocus(id)}
                onFocus={() => activateFromPointerOrFocus(id)}
                className="work-link"
              >
                <span>{title}</span><span className="work-marker" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
