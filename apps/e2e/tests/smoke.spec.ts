import { expect, test } from '@playwright/test'

test('dashboard renders with seeded patient stats', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /good morning/i })).toBeVisible()
  await expect(page.getByText(/total patients/i)).toBeVisible()

  // Recent patients list shows at least one seeded entry
  await expect(page.getByRole('link', { name: /mary smith/i })).toBeVisible()
})

test('navigates from dashboard to patient list', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: /go to patient list/i }).click()

  await expect(page).toHaveURL(/\/patients$/)
  await expect(page.getByRole('heading', { name: /^patients$/i })).toBeVisible()
  await expect(page.getByText(/mary smith/i)).toBeVisible()
})

test('filters patient list by search', async ({ page }) => {
  await page.goto('/patients')

  const search = page.getByPlaceholder(/search/i)
  await search.fill('hansen')

  await expect(page.getByText(/robert hansen/i)).toBeVisible()
  await expect(page.getByText(/mary smith/i)).not.toBeVisible()
})
