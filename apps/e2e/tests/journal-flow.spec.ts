import { expect, test } from '@playwright/test'

test('opens a patient and creates a journal entry', async ({ page }) => {
  await page.goto('/patients')

  await page.getByRole('link', { name: /mary smith/i }).click()
  await expect(page).toHaveURL(/\/patients\/p1$/)
  await expect(page.getByRole('heading', { name: /mary smith/i })).toBeVisible()

  // Existing seeded entry visible
  await expect(page.getByText(/routine blood glucose check/i)).toBeVisible()

  const title = `E2E entry ${Date.now()}`
  await page.getByLabel(/title/i).fill(title)

  // Open DatePicker popover and pick today's day button.
  // Day buttons are inside a role="grid" and their visible text is the day number.
  await page.getByRole('button', { name: /pick a date/i }).click()
  const today = new Date().getDate().toString()
  await page
    .getByRole('grid')
    .getByText(new RegExp(`^${today}$`))
    .first()
    .click()

  await page.getByLabel(/content/i).fill(
    'New entry created by Playwright e2e test. Patient stable, no acute issues.',
  )

  await page.getByRole('button', { name: /save entry/i }).click()

  await expect(page.getByText(title)).toBeVisible()
})
