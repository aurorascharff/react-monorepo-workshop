import { expect, test } from '@playwright/test'

test('blocks invalid journal submissions before sending a request', async ({
  page,
}) => {
  await page.goto('/patients/p1')

  const save = page.getByRole('button', { name: /save entry/i })
  await expect(save).toBeEnabled()

  await page.getByLabel(/title/i).fill('Too short')
  await page.getByLabel(/content/i).fill('short')

  await expect(
    page.getByText(/content must be at least 10 characters/i),
  ).toBeVisible()
  await expect(save).toBeEnabled()

  let createRequestSent = false
  page.on('request', (request) => {
    if (
      request.method() === 'POST' &&
      request.url().includes('/journals/patient/p1')
    ) {
      createRequestSent = true
    }
  })

  await save.click()
  await expect(page.getByText(/date is required/i)).toBeVisible()
  expect(createRequestSent).toBe(false)
})
