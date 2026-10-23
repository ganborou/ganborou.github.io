import { expect, test } from '@playwright/test'

const directions = ['special-projects', 'websites', 'product', 'animation', 'posters', 'merch']

test('mobile gradients follow the upper focus zone in both scroll directions', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile')
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const active = page.locator('.work-cloud.is-active')

  for (const width of [320, 393, 767]) {
    await page.setViewportSize({ width, height: 852 })
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
    await expect(active).toHaveCount(1)
    await expect(active).toHaveClass(/work-cloud-special-projects/)

    for (const id of [...directions, ...directions.toReversed()]) {
      await page.locator(`.work-${id}`).evaluate(element => {
        scrollTo({ top: scrollY + element.getBoundingClientRect().top - innerHeight * 0.25 + 2, behavior: 'instant' })
      })
      await expect(active).toHaveCount(1)
      await expect(active).toHaveClass(new RegExp(`work-cloud-${id}`))
      await expect(active).toHaveCSS('transition-duration', '0.9s')
    }

    // A row must not activate before its top reaches the focus boundary.
    await page.locator('.work-product').evaluate(element => {
      scrollTo({ top: scrollY + element.getBoundingClientRect().top - innerHeight * 0.25 - 2, behavior: 'instant' })
    })
    await expect(active).toHaveClass(/work-cloud-websites/)
    await page.locator('.work-merch .work-link').dispatchEvent('mouseover')
    await page.locator('.work-merch .work-link').evaluate(element => (element as HTMLElement).focus({ preventScroll: true }))
    await expect(active).toHaveClass(/work-cloud-websites/)

    // Fast jumps still select the right endpoint without intermediate events.
    await page.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
    await expect(active).toHaveClass(/work-cloud-merch/)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  }

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.locator('.work-animation').evaluate(element => {
    scrollTo({ top: scrollY + element.getBoundingClientRect().top - innerHeight * 0.25 + 2, behavior: 'instant' })
  })
  await expect(active).toHaveClass(/work-cloud-animation/)
  await expect(active).toHaveCSS('transition-duration', '1e-05s')
  await page.screenshot({ path: testInfo.outputPath('mobile-active-gradient.png') })
})

test('desktop keeps hover and keyboard activation and resynchronizes on mobile resize', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')
  await page.goto('/#work')
  const active = page.locator('.work-cloud.is-active')
  await page.locator('.work-posters .work-link').hover()
  await expect(active).toHaveClass(/work-cloud-posters/)
  await page.locator('.work-product .work-link').focus()
  await expect(active).toHaveClass(/work-cloud-product/)
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  await expect(active).toHaveClass(/work-cloud-product/)
  await page.setViewportSize({ width: 393, height: 852 })
  await expect(active).toHaveClass(/work-cloud-special-projects/)
  await expect(active).toHaveCount(1)
})
