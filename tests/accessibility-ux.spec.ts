import { expect, test } from '@playwright/test'

test.describe('Accessibility and UX smoke coverage', () => {
  test('route navigation restores focus to main content', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'All CSS' }).first().click()
    await expect(page.locator('#main-content')).toBeFocused()
  })

  test('inspector target picker supports keyboard selection', async ({ page }) => {
    await page.goto('/layout')

    const firstTarget = page.getByRole('button', { name: /inspect card container/i }).first()
    await firstTarget.focus()
    await page.keyboard.press('ArrowRight')

    await expect(page.getByRole('status').filter({ hasText: /Inspecting Card body/i }).first()).toBeAttached()
  })

  test('copy buttons expose screen-reader feedback', async ({ page }) => {
    await page.goto('/colors')

    await page.getByRole('button', { name: /copy dynamic oklch token css/i }).first().click()
    await expect(
      page.getByRole('status').filter({ hasText: /Snippet copied to clipboard\.|Copy failed\./ }).first(),
    ).toBeAttached()
  })

  test('catalog dev console tabs support arrow-key navigation', async ({ page }) => {
    await page.goto('/css/accent-color')

    await page.getByRole('tab', { name: 'elements' }).focus()
    await page.keyboard.press('ArrowRight')
    await expect(page.getByRole('tab', { name: 'styles' })).toBeFocused()
    await expect(page.getByRole('tabpanel')).toContainText('Authored rules')
  })

  test('motion demos honor reduced-motion media preference', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/motion')

    const durationSeconds = await page.locator('.scroll-progress-demo__bar').evaluate((element) => {
      const duration = window.getComputedStyle(element).animationDuration
      return duration.endsWith('ms') ? Number.parseFloat(duration) / 1000 : Number.parseFloat(duration)
    })

    expect(durationSeconds).toBeLessThanOrEqual(0.00001)
  })

  test('mobile navigation remains labelled and usable', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 })
    await page.goto('/')

    await page.getByLabel('Navigate to section').selectOption('/typography')
    await expect(page).toHaveURL(/\/typography$/)
    await expect(page.locator('#main-content')).toBeFocused()
  })

  test('game pages expose accessibility guidance and labelled play region', async ({ page }) => {
    await page.goto('/games/tic-tac-toe')

    await expect(page.getByRole('region', { name: 'Play Tic-Tac-Toe' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Accessibility' })).toBeVisible()
    await expect(page.getByText('Keyboard users can tab through the native controls')).toBeVisible()
  })
})
