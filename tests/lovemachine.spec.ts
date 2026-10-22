import { expect, test } from '@playwright/test'
import artwork from '../src/data/lovemachine-images.json' with { type: 'json' }

test('Lovemachine card opens the complete case and returns to merch', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/work/merch')
  await page.getByRole('link', { name: /Иллюстрации и.*мерч/ }).click()
  await expect(page).toHaveURL(/\/projects\/lovemachine$/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Иллюстрации для вечеринки Lovemachine')
  await expect(page.locator('.case-year')).toHaveText('2022')
  const images = page.locator('.case-gallery img')
  await expect(images).toHaveCount(8)
  for (const [index, image] of (await images.all()).entries()) {
    await expect(image).toHaveAttribute('alt', artwork[index].alt)
    await expect(image).toHaveAttribute('src', new RegExp(artwork[index].src.replace('.png', '-\\d+\\.webp')))
    await image.scrollIntoViewIfNeeded()
    const box = await image.evaluate(async (element) => {
      const img = element as HTMLImageElement
      await img.decode()
      const rect = img.getBoundingClientRect()
      return { width: rect.width, height: rect.height, x: rect.x, loaded: img.naturalWidth > 0 }
    })
    expect(box.loaded).toBe(true)
    expect(box.width / box.height).toBeCloseTo(1443.525 / 825.516, 3)
    expect(box.width).toBeCloseTo(page.viewportSize()!.width * 1443.525 / 1440, 1)
    expect(box.x).toBeCloseTo(page.viewportSize()!.width * -3 / 1440, 1)
  }
  await page.evaluate(async () => { await document.fonts.ready; scrollTo({ top: 0, behavior: 'instant' }) })
  if (testInfo.project.name === 'desktop') {
    expect((await images.first().boundingBox())!.y).toBeCloseTo(680.09, 1)
    expect((await page.locator('h1').boundingBox())!.y).toBe(212)
    expect((await page.locator('.case-year').boundingBox())!.y).toBeCloseTo(591, 1)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.screenshot({ path: testInfo.outputPath('lovemachine.png'), fullPage: true, scale: 'css' })
  await page.getByRole('link', { name: '← Весь мерч' }).click()
  await expect(page).toHaveURL(/\/work\/merch$/)
  await page.getByRole('link', { name: /Иллюстрации и.*мерч/ }).click()
  await page.getByRole('link', { name: '← Назад', exact: true }).click()
  await expect(page).toHaveURL(/\/work\/merch$/)
  expect(errors).toEqual([])
})
