import { expect, type Page, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await goToPatients(page)
})

test('filters patients by search and gender', async ({ page }) => {
  const search = page.getByLabel(/search patients/i)

  await search.fill('hansen')
  await expect(page.getByText(/robert hansen/i)).toBeVisible()
  await expect(page.getByText(/mary smith/i)).not.toBeVisible()

  await search.fill('')
  await page.getByLabel(/gender/i).click()
  await page.getByRole('option', { name: /^female$/i }).click()

  await expect(page.getByText(/mary smith/i)).toBeVisible()
  await expect(page.getByText(/emily bergman/i)).toBeVisible()
  await expect(page.getByText(/robert hansen/i)).not.toBeVisible()

  await search.fill('zzzz')
  await expect(page.getByText(/no patients found/i)).toBeVisible()
})

test('opens a patient, updates a journal status, and returns to the list', async ({
  page,
}) => {
  await openPatient(page, /mary smith/i)

  await expect(page.getByRole('heading', { name: /mary smith/i })).toBeVisible()
  await expect(page.getByText(/routine blood glucose check/i)).toBeVisible()

  const statusUpdate = page.waitForResponse(
    (response) =>
      response.url().includes('/journals/') &&
      response.url().includes('/status') &&
      response.request().method() === 'PATCH',
  )
  const firstStatusSelect = page.getByRole('combobox', {
    name: /change status for routine blood glucose check/i,
  })
  await firstStatusSelect.click()
  await page.getByRole('option', { name: /^draft$/i }).click()
  await statusUpdate

  await expect(firstStatusSelect).toContainText(/draft/i)

  await clickNavigationControl(page, /back to patient list/i)
  await expect(page.getByRole('heading', { name: /^patients$/i })).toBeVisible()
})

test('creates a journal entry for a patient', async ({ page }) => {
  await openPatient(page, /mary smith/i)

  const title = `E2E entry ${Date.now()}`
  await page.getByLabel(/title/i).fill(title)
  await setDate(page, '2026-05-10')
  await page
    .getByLabel(/content/i)
    .fill('New entry created by Playwright. Patient stable today.')

  const createEntry = page.waitForResponse(
    (response) =>
      response.url().includes('/journals/patient/p1') &&
      response.request().method() === 'POST',
  )
  await page.getByRole('button', { name: /save entry/i }).click()
  await createEntry

  await expect(page.getByText(title)).toBeVisible()
})

async function goToPatients(page: Page) {
  if (page.url().endsWith('/patients')) return

  await clickNavigationControl(page, /go to patient list/i)
  await expect(page.getByRole('heading', { name: /^patients$/i })).toBeVisible()
}

async function openPatient(page: Page, name: RegExp) {
  await page
    .getByRole('link', { name })
    .or(page.getByRole('button', { name }))
    .first()
    .click()
}

async function clickNavigationControl(page: Page, name: RegExp) {
  await page
    .getByRole('link', { name })
    .or(page.getByRole('button', { name }))
    .first()
    .click()
}

async function setDate(page: Page, value: string) {
  const dateControl = page.getByLabel(/^date$/i)
  const tagName = await dateControl.evaluate((element) => element.tagName)

  if (tagName.toLowerCase() === 'input') {
    await dateControl.fill(value)
    return
  }

  await dateControl.click()
  const day = String(new Date(`${value}T12:00:00`).getDate())
  await page
    .getByRole('grid')
    .getByText(new RegExp(`^${day}$`))
    .first()
    .click()
}
