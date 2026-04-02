import { expect, test } from '@playwright/test'

test.describe('app shell', () => {
  test('generate program, run races, last lap in results', async ({ page }) => {
    test.setTimeout(120_000)
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Horse Racing' })).toBeVisible()
    await page.getByRole('button', { name: 'GENERATE PROGRAM' }).click()
    await page.getByRole('button', { name: 'START / PAUSE' }).click()
    const resultsColumn = page.locator('aside.right').locator('.col').nth(1)
    await expect(resultsColumn.getByText('6ST Lap - 2200m')).toBeVisible({ timeout: 110_000 })
  })
})
