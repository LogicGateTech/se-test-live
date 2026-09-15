import { test, expect } from '@playwright/test';

// The app keeps its state in memory for as long as the mock server is running, so we
// reset it before each test to start from a clean slate. See the mock server's
// POST /api/v1/test/reset route for what this actually does.
test.beforeEach(async ({ page }) => {
  await page.request.post('/api/v1/test/reset');
  await page.goto('/');
});

test('adding an animal creates a barn for it and shows it in the list', async ({ page }) => {
  await page.getByTestId('animal-name-input').fill('Wilbur');
  await page.getByTestId('animal-color-select').selectOption('RED');
  await page.getByTestId('add-animal-button').click();

  await expect(page.getByText('RED Barn')).toBeVisible();
  await expect(page.getByText('Wilbur')).toBeVisible();
});

test('removing an animal takes it out of the list', async ({ page }) => {
  // TODO
});

test('adding a 21st animal of the same color creates a second barn', async ({ page }) => {
  // TODO -- this reproduces the first worked example in the mock server's farmService.ts
  // comment (a full barn getting a new arrival). You'll need to add animals faster than
  // clicking 21 times -- consider whether the UI is really the right layer to set this
  // scenario up through.
});

// TODO (this is the interesting one): what happens end-to-end -- in the actual rendered page,
// not just the API -- when enough animals are removed that the backend consolidates two barns
// of the same color back into one? Is there a gap between what the API did and what the page
// shows? How would you find out without guessing?
