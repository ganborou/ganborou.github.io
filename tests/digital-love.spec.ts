import { expect, test } from '@playwright/test'

test('digital love opens from animation with all five videos in design order', async ({ page }, testInfo) => {
  await page.goto('/work/animation')
  await page.getByRole('link', { name: /Визуальное исследование/ }).click()
  await expect(page).toHaveURL(/\/projects\/digital-love$/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Визуальное исследование: любовь в эру диджитал')
  const blocks = page.locator('.case-gallery > *')
  await expect(blocks).toHaveCount(15)
  const videos = [[0, '1157839579'], [4, '1157840679'], [7, '1157840754'], [10, '1157840912'], [13, '1158176632']] as const
  for (const [index, id] of videos) {
    const video = blocks.nth(index)
    await expect(video).toHaveAttribute('src', `https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1`)
    await expect(video).toHaveAttribute('sandbox', 'allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox')
    const box = await video.boundingBox()
    expect(box!.width / box!.height).toBeCloseTo(16 / 9, 2)
  }
  const images = page.locator('.case-gallery img')
  await expect(images).toHaveCount(10)
  for (const [index, image] of (await images.all()).entries()) {
    const name = index === 9 ? 'footer' : String(index + 1).padStart(2, '0')
    await expect(image).toHaveAttribute('src', new RegExp(`/digital-love/${name}-\\d+\\.webp$`))
    await image.scrollIntoViewIfNeeded()
    const geometry = await image.evaluate(async (element) => {
      const img = element as HTMLImageElement
      await img.decode()
      const box = img.getBoundingClientRect()
      return { naturalWidth: img.naturalWidth, width: box.width, height: box.height }
    })
    expect(geometry.naturalWidth).toBeGreaterThan(0)
    expect(geometry.width).toBe(testInfo.project.use.viewport!.width)
    const height = index === 9 ? 291 : index === 2 || index === 6 ? 823 : 824
    expect(geometry.width / geometry.height).toBeCloseTo(1440 / height, 2)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.evaluate(async () => { await document.fonts.ready; scrollTo({ top: 0, behavior: 'instant' }) })
  if (testInfo.project.name === 'desktop') {
    expect((await blocks.first().boundingBox())!.y).toBeCloseTo(680, 0)
  }
  await page.screenshot({ path: testInfo.outputPath('digital-love.png'), fullPage: true })
  const returnLink = page.getByRole('link', { name: '← Вся анимация' })
  await returnLink.scrollIntoViewIfNeeded()
  await expect(returnLink).toBeInViewport()
  if (testInfo.project.name === 'mobile') await returnLink.tap()
  else await returnLink.click()
  await expect(page).toHaveURL(/\/work\/animation$/)
  await page.getByRole('link', { name: /Визуальное исследование/ }).click()
  await page.getByRole('link', { name: '← Назад', exact: true }).click()
  await expect(page).toHaveURL(/\/work\/animation$/)
})
