import { expect, test } from '@playwright/test'

test('cultural marathon opens from its card, embeds video second and returns to special projects', async ({ page }) => {
  await page.goto('/work/special-projects')
  await page.getByRole('link', { name: /Культурный марафон/ }).click()
  await expect(page).toHaveURL(/\/projects\/cultural-marathon$/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Яндекс культурный марафон')
  await expect(page.getByRole('link', { name: 'Смотреть спецпроект →' })).toHaveAttribute('href', 'https://education.yandex.ru/culture')
  const blocks = page.locator('.case-gallery > *')
  await expect(blocks).toHaveCount(9)
  await expect(blocks.nth(1)).toHaveAttribute('src', 'https://player.vimeo.com/video/1009117995?badge=0&autopause=0&autoplay=1&loop=1')
  await expect(blocks.nth(1)).toHaveAttribute('title', 'Яндекс культурный марафон — видео')
  await expect(blocks.nth(1)).toHaveAttribute('sandbox', /allow-scripts/)
  for (const image of await page.locator('.case-gallery img').all()) {
    await image.scrollIntoViewIfNeeded()
    expect(await image.evaluate(async (element) => {
      const image = element as HTMLImageElement
      await image.decode()
      return image.naturalWidth > 0
    })).toBe(true)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.getByRole('link', { name: '← Все спецпроекты' }).click()
  await expect(page).toHaveURL(/\/work\/special-projects$/)
  await page.getByRole('link', { name: /Культурный марафон/ }).click()
  await page.getByRole('link', { name: '← Назад', exact: true }).click()
  await expect(page).toHaveURL(/\/work\/special-projects$/)
})
