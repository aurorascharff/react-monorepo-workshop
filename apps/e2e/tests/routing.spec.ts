import { expect, test } from '@playwright/test'

test('supports direct patient detail URLs and browser navigation', async ({
  page,
}) => {
  await page.goto('/patients/p1')

  await expect(page).toHaveURL(/\/patients\/p1$/)
  await expect(page.getByRole('heading', { name: /mary smith/i })).toBeVisible()

  await page.reload()
  await expect(page.getByRole('heading', { name: /mary smith/i })).toBeVisible()

  await page.getByRole('link', { name: /back to patient list/i }).click()
  await expect(page).toHaveURL(/\/patients$/)
  await expect(page.getByRole('heading', { name: /^patients$/i })).toBeVisible()
})

test('uses real links for patient navigation', async ({ page }) => {
  await page.goto('/patients')

  const mary = page.getByRole('link', { name: /mary smith/i }).first()
  await expect(mary).toHaveAttribute('href', '/patients/p1')

  await mary.click()
  await expect(page).toHaveURL(/\/patients\/p1$/)
})
