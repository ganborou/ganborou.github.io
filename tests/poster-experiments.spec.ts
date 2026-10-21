import { expect, test } from '@playwright/test'

test('poster collection opens from its card, displays all artwork and returns to posters', async ({ page }, testInfo) => {
  await page.goto('/work/posters')
  await page.getByRole('link', { name: /Эксперименты с.*типографикой/ }).click()
  await expect(page).toHaveURL(/\/projects\/poster-experiments$/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Коллекция постеров')
  const images = page.locator('.case-gallery img')
  await expect(images).toHaveCount(9)
  await expect(page.locator('.case-gallery')).toHaveCSS('background-color', 'rgb(188, 189, 198)')
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded()
    const geometry = await image.evaluate(async (element) => {
      const image = element as HTMLImageElement
      await image.decode()
      const box = image.getBoundingClientRect()
      return { loaded: image.naturalWidth > 0, width: box.width, height: box.height, x: box.x }
    })
    expect(geometry.loaded).toBe(true)
    expect(geometry.width).toBe(Math.min(462, page.viewportSize()!.width - 32))
    expect(geometry.width / geometry.height).toBeCloseTo(462 / 655, 3)
    expect(geometry.x).toBeCloseTo((page.viewportSize()!.width - geometry.width) / 2, 1)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.evaluate(async () => { await document.fonts.ready; scrollTo({ top: 0, behavior: 'instant' }) })
  if (testInfo.project.name === 'desktop') {
    const first = await images.first().boundingBox()
    expect(first!.y).toBe(762)
    const second = await images.nth(1).boundingBox()
    expect(second!.y - first!.y - first!.height).toBe(97)
  }
  await page.screenshot({ path: testInfo.outputPath('poster-collection.png'), fullPage: true, scale: 'css' })
  await page.getByRole('link', { name: '← Все постеры' }).click()
  await expect(page).toHaveURL(/\/work\/posters$/)
  await page.getByRole('link', { name: /Эксперименты с.*типографикой/ }).click()
  await page.getByRole('link', { name: '← Назад', exact: true }).click()
  await expect(page).toHaveURL(/\/work\/posters$/)
})
