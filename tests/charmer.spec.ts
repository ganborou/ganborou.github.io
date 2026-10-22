import { expect, test } from '@playwright/test'

test('Charmer opens from merch with Vimeo, original artwork and return navigation', async ({ page }, testInfo) => {
  await page.goto('/work/merch')
  await page.getByRole('link', { name: /Dark side of Charmer/ }).click()
  await expect(page).toHaveURL(/\/projects\/charmer$/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Иллюстрация и анимация для студии Charmer')
  await expect(page.locator('.case-year')).toHaveText('2023')
  const video = page.locator('.charmer-video-panel iframe')
  await expect(video).toHaveAttribute('src', 'https://player.vimeo.com/video/892542250?h=6741ca7bef&autoplay=1&loop=1&muted=1')
  await expect(video).toHaveAttribute('allowfullscreen', '')
  await expect(video).toHaveAttribute('sandbox', 'allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox')
  const videoBox = (await video.boundingBox())!
  expect(videoBox.width / videoBox.height).toBeCloseTo(2, 3)
  const images = page.locator('.charmer-gallery img')
  const names = ['logo-white.svg', 'logo-dark.svg', 'hoodie-', 'typography-', 'tape-', 'shirt-']
  await expect(images).toHaveCount(6)
  for (const [index, image] of (await images.all()).entries()) {
    await expect(image).toHaveAttribute('src', new RegExp(names[index]))
    await image.scrollIntoViewIfNeeded()
    expect(await image.evaluate(async (element) => {
      await (element as HTMLImageElement).decode()
      return (element as HTMLImageElement).naturalWidth > 0
    })).toBe(true)
  }
  await page.evaluate(async () => { await document.fonts.ready; scrollTo({ top: 0, behavior: 'instant' }) })
  const scale = page.viewportSize()!.width / 1440
  const logoBox = (await images.nth(1).boundingBox())!
  expect(logoBox.width).toBeCloseTo(392.46 * scale, 1)
  expect(logoBox.height).toBeCloseTo(163.68 * scale, 1)
  const panels = page.locator('.charmer-gallery > div')
  const heights = [826, 826, 960, 844, 844, 960]
  let previousBottom: number | undefined
  for (const [index, panel] of (await panels.all()).entries()) {
    const box = (await panel.boundingBox())!
    expect(box.height).toBeCloseTo(heights[index] * scale, 1)
    if (previousBottom !== undefined) expect(box.y).toBeCloseTo(previousBottom, 1)
    previousBottom = box.y + box.height
  }
  if (testInfo.project.name === 'desktop') {
    expect((await panels.first().boundingBox())!.y).toBe(680)
    expect((await panels.last().boundingBox())!.y).toBe(4980)
    expect((await page.locator('.case-year').boundingBox())!.y).toBeCloseTo(591, 1)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.screenshot({ path: testInfo.outputPath('charmer.png'), fullPage: true, scale: 'css' })
  await page.getByRole('link', { name: '← Весь мерч' }).click()
  await expect(page).toHaveURL(/\/work\/merch$/)
  await page.getByRole('link', { name: /Dark side of Charmer/ }).click()
  await page.getByRole('link', { name: '← Назад', exact: true }).click()
  await expect(page).toHaveURL(/\/work\/merch$/)
})
