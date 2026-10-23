import { expect, test } from '@playwright/test'
import images from '../src/data/redesign-images.json' with { type: 'json' }

test('redesign opens from product, preserves all seven images and returns to product', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/work/product')
  const cover = page.getByRole('link', { name: /Редизайн Витрины подарков/ }).locator('img')
  await expect(cover).toHaveAttribute('src', '/media/projects/product-redesign.svg')
  await expect(cover).not.toHaveAttribute('srcset')
  expect(await cover.evaluate(async element => {
    await (element as HTMLImageElement).decode()
    return (element as HTMLImageElement).naturalWidth > 0
  })).toBe(true)
  await cover.screenshot({ path: testInfo.outputPath('redesign-cover.png') })
  await page.getByRole('link', { name: /Редизайн Витрины подарков/ }).click()
  await expect(page).toHaveURL(/\/projects\/redesign$/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Редизайн продукта и внедрение дизайн-системы')
  await expect(page.locator('.case-year')).toHaveText('2026')
  const gallery = page.locator('.case-gallery img')
  await expect(gallery).toHaveCount(7)
  for (let index = 0; index < images.length; index++) {
    const image = gallery.nth(index)
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveAttribute('alt', images[index].alt)
    const rendered = await image.evaluate(async element => {
      const img = element as HTMLImageElement
      await img.decode()
      const box = img.getBoundingClientRect()
      return { src: img.currentSrc, loaded: img.naturalWidth > 0, ratio: box.width / box.height }
    })
    expect(rendered.loaded).toBe(true)
    expect(rendered.src).toMatch(new RegExp(`/redesign/${index + 1}-\\d+\\.webp$`))
    expect(rendered.ratio).toBeCloseTo(images[index].width / images[index].height, 2)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.evaluate(async () => { await document.fonts.ready; scrollTo({ top: 0, behavior: 'instant' }) })
  await page.screenshot({ path: testInfo.outputPath('redesign.png') })
  await page.getByRole('link', { name: '← Все продуктовые кейсы' }).click()
  await expect(page).toHaveURL(/\/work\/product$/)
  await page.getByRole('link', { name: /Редизайн Витрины подарков/ }).click()
  await page.getByRole('link', { name: '← Назад', exact: true }).click()
  await expect(page).toHaveURL(/\/work\/product$/)
  expect(errors).toEqual([])
})
