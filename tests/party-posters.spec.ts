import { expect, test } from '@playwright/test'
import artwork from '../src/data/party-posters-images.json' with { type: 'json' }

test('party posters open from their card, load in Figma order and return to posters', async ({ page }, testInfo) => {
  await page.goto('/work/posters')
  await page.getByRole('link', { name: /Афиши вечеринок/ }).click()
  await expect(page).toHaveURL(/\/projects\/party-posters$/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Афиши к вечеринкам и рейвам')
  const images = page.locator('.case-gallery img')
  await expect(images).toHaveCount(12)
  for (const [index, image] of (await images.all()).entries()) {
    await expect(image).toHaveAttribute('alt', artwork[index].alt)
    await expect(image).toHaveAttribute('src', new RegExp(artwork[index].src.replace('.png', '-\\d+\\.webp')))
    await expect(image).toHaveAttribute('sizes', '100vw')
    await image.scrollIntoViewIfNeeded()
    const geometry = await image.evaluate(async (element) => {
      const image = element as HTMLImageElement
      await image.decode()
      const box = image.getBoundingClientRect()
      return { loaded: image.naturalWidth > 0, width: box.width, height: box.height, x: box.x }
    })
    expect(geometry.loaded).toBe(true)
    expect(geometry.width).toBe(page.viewportSize()!.width)
    expect(geometry.width / geometry.height).toBeCloseTo(1440 / 758, 3)
    expect(geometry.x).toBe(0)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.evaluate(async () => { await document.fonts.ready; scrollTo({ top: 0, behavior: 'instant' }) })
  if (testInfo.project.name === 'desktop') {
    const first = await images.first().boundingBox()
    expect(first!.y).toBe(692)
    const last = await images.last().boundingBox()
    expect(last!.y).toBe(9030)
  }
  await page.screenshot({ path: testInfo.outputPath('party-posters.png'), fullPage: true, scale: 'css' })
  await page.getByRole('link', { name: '← Все постеры' }).click()
  await expect(page).toHaveURL(/\/work\/posters$/)
  await page.getByRole('link', { name: /Афиши вечеринок/ }).click()
  await page.getByRole('link', { name: '← Назад', exact: true }).click()
  await expect(page).toHaveURL(/\/work\/posters$/)
})
