import { expect, test } from '@playwright/test'

test('dashboard renders with seeded patient stats', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /good morning/i }),
  ).toBeVisible()
  await expect(page.getByText(/total patients/i)).toBeVisible()
  await expect(page.getByText(/female/i).first()).toBeVisible()
  await expect(page.getByText(/male/i).first()).toBeVisible()

  await expect(page.getByText(/mary smith/i).first()).toBeVisible()
})

test('opens the patient list from the dashboard', async ({ page }) => {
  await page.goto('/')

  await clickNavigationControl(page, /go to patient list/i)

  await expect(page.getByRole('heading', { name: /^patients$/i })).toBeVisible()
  await expect(page.getByText(/mary smith/i).first()).toBeVisible()
})

async function clickNavigationControl(
  page: import('@playwright/test').Page,
  name: RegExp,
) {
  await page
    .getByRole('link', { name })
    .or(page.getByRole('button', { name }))
    .first()
    .click()
}
