import { expect, test } from '@playwright/test'

test('onboarding case opens from product and preserves the numbered presentation', async ({ page }, testInfo) => {
  const videoRequests: string[] = []
  page.on('request', (request) => { if (request.url().endsWith('.mp4')) videoRequests.push(request.url()) })
  await page.goto('/work/product')
  await page.getByRole('link', { name: /Геймифицированные онбординги/ }).click()
  await expect(page).toHaveURL(/\/projects\/onboarding$/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Разработка игровых онбордингов')
  await expect(page.locator('.case-year')).toHaveText('2025')
  expect(videoRequests).toEqual([])
  const gallery = page.locator('.onboarding-gallery')
  await expect(gallery.locator(':scope > *')).toHaveCount(17)
  expect(await gallery.locator(':scope > *').evaluateAll((elements) => elements.map((element) => Number(element.getAttribute('data-screen')))))
    .toEqual(Array.from({ length: 17 }, (_, index) => index + 1))
  await expect(gallery.getByRole('heading')).toHaveText(['Ловец', 'Автомат', 'Башня'])

  const videos = gallery.locator('video')
  await expect(videos).toHaveCount(3)
  for (const [index, video] of (await videos.all()).entries()) {
    await video.scrollIntoViewIfNeeded()
    await expect(video).toHaveAttribute('src', new RegExp(['lovec', 'avtomat', 'bashnya'][index] + '\\.mp4$'))
    await expect.poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(0.1)
    await expect(video).toHaveJSProperty('muted', true)
    await expect(video).toHaveJSProperty('loop', true)
    await expect(video).toHaveAttribute('playsinline', '')
    const metadata = await video.evaluate((v) => {
      const element = v as HTMLVideoElement
      return { width: element.videoWidth, height: element.videoHeight, error: element.error }
    })
    expect(metadata).toEqual({ width: 374, height: 812, error: null })
    await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded()
    await expect(video).toHaveJSProperty('paused', true)
  }

  for (const image of await gallery.locator('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveJSProperty('complete', true)
    expect(await image.evaluate(async (element) => {
      await (element as HTMLImageElement).decode()
      return (element as HTMLImageElement).naturalWidth > 0
    })).toBe(true)
    await expect(image).toHaveAttribute('src', /\/media\/projects\/onboarding\/.*\.webp$/)
  }
  await page.evaluate(async () => { await document.fonts.ready; scrollTo({ top: 0, behavior: 'instant' }) })
  const scale = page.viewportSize()!.width / 1440
  const concept = gallery.locator('[data-screen="10"]')
  const conceptBox = (await concept.boundingBox())!
  const videoBox = (await concept.locator('.onboarding-video').boundingBox())!
  expect(videoBox.x - conceptBox.x).toBeCloseTo(91.5 * scale, 1)
  expect(videoBox.y - conceptBox.y).toBeCloseTo(244.5 * scale, 1)
  expect(videoBox.height).toBeCloseTo(489.795 * scale, 1)
  if (testInfo.project.name === 'desktop') {
    expect((await gallery.boundingBox())!.y).toBe(680)
    expect((await page.locator('.case-year').boundingBox())!.y).toBeCloseTo(591, 1)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.screenshot({ path: testInfo.outputPath('onboarding.png'), fullPage: true, scale: 'css' })
  for (const number of [10, 11, 12]) {
    await gallery.locator(`[data-screen="${number}"]`).screenshot({ path: testInfo.outputPath(`concept-${number}.png`), scale: 'css' })
  }
  await page.getByRole('link', { name: '← Все продуктовые кейсы' }).click()
  await expect(page).toHaveURL(/\/work\/product$/)
  await page.getByRole('link', { name: /Геймифицированные онбординги/ }).click()
  await page.getByRole('link', { name: '← Назад', exact: true }).click()
  await expect(page).toHaveURL(/\/work\/product$/)
})

test('onboarding videos respect reduced motion and remain playable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/projects/onboarding')
  const video = page.locator('video').first()
  await video.scrollIntoViewIfNeeded()
  await expect(video).toHaveAttribute('src', /lovec\.mp4$/)
  await expect(video).toHaveJSProperty('paused', true)
  await expect(video).toHaveJSProperty('currentTime', 0)
  const playButton = page.getByRole('button', { name: 'Воспроизвести: Ловец — анимация игрового онбординга', exact: true })
  await playButton.click()
  await expect.poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(0)
  await page.getByRole('button', { name: 'Приостановить: Ловец — анимация игрового онбординга', exact: true }).click()
  await expect(video).toHaveJSProperty('paused', true)
  await playButton.focus()
  await page.keyboard.press('Enter')
  await expect(video).toHaveJSProperty('paused', false)
})
