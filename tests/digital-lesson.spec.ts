import { expect, test } from '@playwright/test'

test('digital lesson opens from its card with video second and returns to special projects', async ({ page }, testInfo) => {
  await page.goto('/work/special-projects')
  await page.getByRole('link', { name: /Яндекс Урок цифры/ }).click()
  await expect(page).toHaveURL(/\/projects\/digital-lesson$/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Яндекс Урок цифры 2025: дело в чате')
  await expect(page.getByRole('link', { name: 'Смотреть спецпроект →' })).toHaveAttribute('href', 'https://xn--h1adlhdnlo2c.xn--p1ai/lessons/ai-evolution')
  const blocks = page.locator('.case-gallery > *')
  await expect(blocks).toHaveCount(18)
  await expect(blocks.nth(1)).toHaveAttribute('src', 'https://player.vimeo.com/video/1192429201?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1')
  await expect(blocks.nth(1)).toHaveAttribute('sandbox', 'allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox')
  const videoBox = await blocks.nth(1).boundingBox()
  expect(videoBox!.width / videoBox!.height).toBeCloseTo(1260 / 720, 2)
  for (const image of await page.locator('.case-gallery img').all()) {
    await image.scrollIntoViewIfNeeded()
    expect(await image.evaluate(async (element) => {
      const image = element as HTMLImageElement
      await image.decode()
      const box = image.getBoundingClientRect()
      return image.naturalWidth > 0 && box.width > 0 && box.height > 0
    })).toBe(true)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.evaluate(async () => { await document.fonts.ready; scrollTo(0, 0) })
  await page.screenshot({ path: testInfo.outputPath('digital-lesson.png'), fullPage: true })
  await page.getByRole('link', { name: '← Все спецпроекты' }).click()
  await expect(page).toHaveURL(/\/work\/special-projects$/)
  await page.getByRole('link', { name: /Яндекс Урок цифры/ }).click()
  await page.getByRole('link', { name: '← Назад', exact: true }).click()
  await expect(page).toHaveURL(/\/work\/special-projects$/)
})
