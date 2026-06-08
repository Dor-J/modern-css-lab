import { expect, test } from '@playwright/test'

const gameRoutes = [
  '/games/toggle-puzzle',
  '/games/tic-tac-toe',
  '/games/memory-cards',
  '/games/mine-sweeper',
  '/games/snake',
  '/games/icy-tower',
  '/games/doom',
]

test.describe('CSS-only games routes', () => {
  test('hub links to every game', async ({ page }) => {
    await page.goto('/games')

    for (const route of gameRoutes) {
      await expect(page.locator(`a[href="${route}"]`)).toBeVisible()
    }
  })

  for (const route of gameRoutes) {
    test(`renders ${route}`, async ({ page }) => {
      await page.goto(route)
      await expect(page.locator('.game-page')).toBeVisible()
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    })
  }
})

test.describe('CSS-only games interactions', () => {
  test('toggle puzzle detects the solved cross pattern', async ({ page }) => {
    await page.goto('/games/toggle-puzzle')

    for (const cell of [2, 4, 5, 6, 8]) {
      await page.locator(`label[for="toggle-${cell}"]`).click()
    }

    await expect(page.getByText('The board matches the CSS-declared cross pattern.')).toBeVisible()
    await page.getByRole('button', { name: 'Reset board' }).click()
    await expect(page.getByText('The board matches the CSS-declared cross pattern.')).toBeHidden()
  })

  test('tic-tac-toe detects an X row win', async ({ page }) => {
    await page.goto('/games/tic-tac-toe')

    for (const cell of [1, 2, 3]) {
      await page.locator(`label[for="ttt-x-${cell}"]`).click()
    }

    await expect(page.getByText('X wins.')).toBeVisible()
  })

  test('memory cards detects all pairs opened', async ({ page }) => {
    await page.goto('/games/memory-cards')

    for (const card of [1, 2, 3, 4, 5, 6, 7, 8]) {
      await page.locator(`label[for="memory-card-${card}"]`).click()
    }

    await expect(page.getByText('All matching pairs are open.')).toBeVisible()
  })

  test('minesweeper detects mine hit and solved field', async ({ page }) => {
    await page.goto('/games/mine-sweeper')

    await page.locator('label[for="mine-r-5"]').click()
    await expect(page.getByText('Mine hit. Reset the field.')).toBeVisible()

    await page.getByRole('button', { name: 'New field' }).click()

    for (const cell of [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 24, 25]) {
      await page.locator(`label[for="mine-r-${cell}"]`).click()
    }

    await expect(page.getByText('Field cleared without revealing a mine.')).toBeVisible()
  })

  test('snake plays a CSS-only move sequence with food and collision states', async ({ page }) => {
    await page.goto('/games/snake')

    await page.locator('label[for="snake-step-1"]').click()
    await page.locator('label[for="snake-step-2"]').click()
    await page.locator('label[for="snake-step-3"]').click()
    await expect(page.getByText('Food collected')).toBeVisible()

    await page.locator('label[for="snake-step-4"]').click()
    await page.locator('label[for="snake-step-5"]').click()
    await expect(page.locator('.snake-overlay--win strong')).toHaveText('Run complete')
    await expect(page.locator('.snake-overlay--win')).toBeVisible()

    await page.getByRole('button', { name: 'Reset snake' }).click()
    await page.locator('label[for="snake-crash"]').first().click()
    await expect(page.locator('.snake-overlay--lost strong')).toHaveText('Collision')
    await expect(page.locator('.snake-overlay--lost')).toBeVisible()
  })

  test('icy tower exposes win and fall states', async ({ page }) => {
    await page.goto('/games/icy-tower')

    await page.locator('label[for="icy-lane-right"]').click()
    await page.locator('label[for="icy-height-5"]').click()
    await expect(page.getByText('Top floor')).toBeVisible()

    await page.locator('label[for="icy-height-4"]').click()
    await expect(page.getByText('Slip')).toBeVisible()
  })

  test('doom maze completes key, reactor, and exit run', async ({ page }) => {
    await page.goto('/games/doom')

    await page.locator('label[for="doom-room-exit"]').click()
    await expect(page.getByText('Exit locked. Need keycard and reactor clear.')).toBeVisible()

    await page.locator('label[for="doom-room-armory"]').click()
    await page.locator('label[for="doom-key"]').click()
    await page.locator('label[for="doom-shells"]').click()
    await page.locator('label[for="doom-armor"]').click()
    await page.locator('label[for="doom-room-reactor"]').click()
    await expect(page.getByText('Reactor demon is live. Fire to clear the room.')).toBeVisible()
    await page.locator('label[for="doom-enemy-defeated"]').click()
    await page.locator('label[for="doom-room-exit"]').click()

    await expect(page.getByText('Exit open. CSS-only run complete.')).toBeVisible()
  })

  test('games remain usable on a 360px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 })
    await page.goto('/games/memory-cards')
    await expect(page.locator('.memory-board')).toBeVisible()
    await expect(page.locator('.memory-card')).toHaveCount(8)
  })
})
