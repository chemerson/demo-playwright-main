const { test, expect } = require('@playwright/test');

test.use({ headless: false });

test.skip('used car', async ({ page }) => {

  // Go to https://www.carfax.com/
  await page.goto('https://www.carfax.com/');

  // Click text=Find a Used Car
  await page.click('text=Find a Used Car');
  await expect(page).toHaveURL('https://www.carfax.com/cars-for-sale');

  // Select Tesla
  await page.click('[aria-label="Select Make"]');
  await page.selectOption('[aria-label="Select Make"]', 'Tesla');

  // Select Model 3
  await page.waitForTimeout(2000)
  await page.click('[aria-label="Search Model"]');
  await page.selectOption('[aria-label="Search Model"]', 'Model 3');

  // Click [placeholder="Zip Code"]
  await page.click('[placeholder="Zip Code"]');

  // Fill [placeholder="Zip Code"]
  await page.fill('[placeholder="Zip Code"]', '32940');

  // Click text=Next
  await page.click('text=Next');
  await expect(page).toHaveURL('https://www.carfax.com/cars-for-sale#step=2');

  // Click [aria-label="Toggle noAccidents"]
  await page.click('[aria-label="Toggle noAccidents"]');

  // Click [aria-label="Toggle oneOwner"]
  await page.click('[aria-label="Toggle oneOwner"]');

  // Click [aria-label="Toggle personalUse"]
  await page.click('[aria-label="Toggle personalUse"]');

  // Click [aria-label="Toggle serviceRecords"]
  await page.click('[aria-label="Toggle serviceRecords"]');

  // Click text=Show Me 13 Results
  await page.click('text=Show Me 13 Results');
  await expect(page).toHaveURL('https://www.carfax.com/Used-Tesla-Model-3_w9421');

  // Click img[alt="Blue Tesla Model 3 Sedan 2021"]
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.waitForNavigation(/*{ url: 'https://www.carfax.com/vehicle/5YJ3E1EA8MF989078' }*/),
    page.click('img[alt="Blue Tesla Model 3 Sedan 2021"]')
  ]);

});