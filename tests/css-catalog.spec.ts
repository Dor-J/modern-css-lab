import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

type TestCatalogEntry = {
  slug: string
  title: string
  kind: string
}

const cssCatalogKinds = [
  'property',
  'at-rule',
  'descriptor',
  'selector',
  'pseudo-class',
  'pseudo-element',
  'function',
  'data-type',
  'value',
  'concept',
]

const cssCatalogEntries = cssCatalogKinds.flatMap((kind) =>
  JSON.parse(readFileSync(join('src', 'data', 'cssCatalog', 'entries', `${kind}.json`), 'utf8')) as TestCatalogEntry[],
)

const mainRoutes = [
  '/',
  '/css',
  '/layout',
  '/colors',
  '/functions',
  '/selectors',
  '/typography',
  '/motion',
  '/components',
  '/effects',
  '/architecture',
  '/games',
]

test.describe('Modern CSS Lab routes', () => {
  for (const route of mainRoutes) {
    test(`renders ${route}`, async ({ page }) => {
      await page.goto(route)
      await expect(page.locator('body')).toBeVisible()
    })
  }
})

test.describe('Complete CSS catalog', () => {
  test('every catalog detail route returns the app shell', async ({ request }) => {
    for (const entry of cssCatalogEntries) {
      const response = await request.get(`/css/${entry.slug}`)
      expect(response.status(), entry.slug).toBe(200)
    }
  })

  test('renders one representative detail page for every catalog kind', async ({ page }) => {
    for (const kind of cssCatalogKinds) {
      const entry = cssCatalogEntries.find((candidate) => candidate.kind === kind)
      expect(entry, kind).toBeTruthy()
      await page.goto(`/css/${entry?.slug}`)
      await expect(page.getByRole('heading', { name: entry?.title, level: 1 })).toBeVisible()
      await expect(page.getByRole('tab', { name: 'elements' })).toBeVisible()
      await expect(page.getByRole('tab', { name: 'computed' })).toBeVisible()
      await expect(page.getByRole('tab', { name: 'snippets' })).toBeVisible()
    }
  })

  test('catalog controls update URL state and dev console snippets', async ({ page }) => {
    await page.goto('/css/accent-color')
    await page.getByLabel('Feature value').selectOption({ label: 'Alternate' })
    await expect(page).toHaveURL(/demo=css-accent-color/)
    await expect(page).toHaveURL(/demoValue=/)

    await page.getByRole('tab', { name: 'variables' }).click()
    await expect(page.getByText('--demo-value')).toBeVisible()

    await page.getByRole('tab', { name: 'snippets' }).click()
    await expect(page.getByText('Live CSS')).toBeVisible()
  })
})
