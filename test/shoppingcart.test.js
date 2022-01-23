const { test } = require('@playwright/test');
const {
  VisualGridRunner,
  ClassicRunner,
  Eyes,
  Target,
  Configuration,
  BatchInfo,
  BrowserType,
  MatchLevel,
  DeviceName,
  ScreenOrientation,
  StitchMode,
  RectangleSize,
  FileLogHandler
} = require('@applitools/eyes-playwright');
const fs = require('fs')


test.use({ headless: false });

test.describe('ShoppingCart', () => {
  let eyes, runner, configuration;

  test.beforeEach(async () => {

    // Prepare the Eyes object
    runner = new VisualGridRunner({ testConcurrency: 100 });
    eyes = new Eyes(runner);

    configuration = new Configuration();
    configuration.setBatch(new BatchInfo('Shopping Cart (Playwright)'));
    configuration.addBrowser(1200, 900, BrowserType.CHROME);
    configuration.addBrowser(657, 900, BrowserType.CHROME);
    configuration.addBrowser(1200, 900, BrowserType.CHROME_ONE_VERSION_BACK);
    configuration.addBrowser(657, 900, BrowserType.CHROME_ONE_VERSION_BACK);
    configuration.addBrowser(1200, 900, BrowserType.FIREFOX);
    configuration.addBrowser(657, 900, BrowserType.FIREFOX);
    configuration.addBrowser(1200, 900, BrowserType.SAFARI);
    configuration.addBrowser(657, 900, BrowserType.SAFARI);
    configuration.setDisableBrowserFetching(true)
    configuration.setIgnoreDisplacements(true)
    configuration.setViewportSize({ width: 1200, height: 1393 })
    configuration.setBranchName('Shopping Cart (Playwright) 9')
    configuration.setBaselineBranchName('Shopping Cart (Playwright) 9')
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY)
    eyes.setConfiguration(configuration);

    eyes.setLogHandler(new FileLogHandler(true));

  });

  async function theTest(page, changes) {
    // Open the eyes test and pass in a reference to the bwoser
    await eyes.open(page, 'Shopping Cart (Playwright) app', 'Shopping Cart (Playwright) test');

    // Go to http://j2store.net/demo/index.php
    await page.goto('http://j2store.net/demo/index.php');

    await evalChange(page, changes)

    await eyes.check('Step 1', Target.window().fully());
    // Click #t3-mainnav >> text=Hats
    await page.hover('#t3-mainnav > div > div > div.col-sm-4.col-xs-4.col-md-4 > div.t3-navbar.navbar-collapse.collapse > div > ul > li:nth-child(2)')
    await eyes.check('Step 2', Target.window().fully());
    await page.click('#t3-mainnav >> text=Hats');
    await page.waitForLoadState('networkidle');
    await eyes.check('Step 3', Target.window().fully());
    // Click text=Add to cart
    await page.click('text=Add to cart');
    await page.waitForTimeout(1500)
    await eyes.check('Step 4', Target.window().fully());
    // Click #t3-mainnav >> text=Kettles
    await page.hover('#t3-mainnav > div > div > div.col-sm-4.col-xs-4.col-md-4 > div.t3-navbar.navbar-collapse.collapse > div > ul > li:nth-child(2)')
    await eyes.check('Step 5', Target.window().fully());
    await page.click('#t3-mainnav >> text=Kettles');
    await eyes.check('Step 6', Target.window().fully());
    // Click text=Add to cart
    await page.click('text=Add to cart');
    await page.waitForTimeout(2500)
    await eyes.check('Step 7', Target.window().fully());
    // Click #j2store_cart_item_123 >> text=Checkout
    await page.hover('#t3-mainnav > div > div > div.col-sm-4.col-xs-8.col-md-4 > div > div.j2store_cart_module_123 > div > div.j2store-cart-info > div')
    await page.waitForTimeout(2500)
    await eyes.check('Step 8', Target.window().fully());
    await page.click('#j2store_cart_item_123 >> text=Checkout');
    await page.waitForTimeout(2500)
    await eyes.check('Step 9', Target.window().fully());
    // Click text=Continue

    await evalChange(page, changes)

    await page.click('text=Continue');
    await page.waitForTimeout(2500)
    await eyes.check('Step 10', Target.window().fully());
    // Click input[name="first_name"]
    await page.click('input[name="first_name"]');
    // Fill input[name="first_name"]
    await page.fill('input[name="first_name"]', 'John');
    // Click input[name="last_name"]
    await page.click('input[name="last_name"]');
    // Fill input[name="last_name"]
    await page.fill('input[name="last_name"]', 'Smith');
    // Press Tab
    await page.press('input[name="last_name"]', 'Tab');
    // Fill text=*First name *Last name *Email Phone *Mobile Set Password*Enter password *Confirm >> input[name="email"]
    let email = 'john.smith' + getRandomInt(10000) + '@gmail123.com'
    await page.fill('text=*First name *Last name *Email Phone *Mobile Set Password*Enter password *Confirm >> input[name="email"]', email);
    // Press Tab
    await page.press('text=*First name *Last name *Email Phone *Mobile Set Password*Enter password *Confirm >> input[name="email"]', 'Tab');
    // Press Tab
    await page.press('input[name="phone_1"]', 'Tab');
    // Fill input[name="phone_2"]
    await page.fill('input[name="phone_2"]', '4124449999');
    // Click text=*First name *Last name *Email Phone *Mobile Set Password*Enter password *Confirm >> input[name="password"]
    await page.click('text=*First name *Last name *Email Phone *Mobile Set Password*Enter password *Confirm >> input[name="password"]');
    // Fill text=*First name *Last name *Email Phone *Mobile Set Password*Enter password *Confirm >> input[name="password"]
    await page.fill('text=*First name *Last name *Email Phone *Mobile Set Password*Enter password *Confirm >> input[name="password"]', 'password');
    // Click input[name="confirm"]
    await page.click('input[name="confirm"]');
    // Fill input[name="confirm"]
    await page.fill('input[name="confirm"]', 'password');
    // Click input[name="address_1"]
    await page.click('input[name="address_1"]');
    // Fill input[name="address_1"]
    await page.fill('input[name="address_1"]', '123 Here Street');
    // Click input[name="city"]
    await page.click('input[name="city"]');
    // Fill input[name="city"]
    await page.fill('input[name="city"]', 'New York');
    // Click input[name="zip"]
    await page.click('input[name="zip"]');
    // Fill input[name="zip"]
    await page.fill('input[name="zip"]', '10019');
    // Select 3655
    await page.selectOption('select[name="zone_id"]', '3655');
    await eyes.check('Step 11', Target.window().fully());
    // Click input:has-text("Continue")
    await page.click('input:has-text("Continue")');
    // Fill input[name="payment_plugin"]
    await page.click('#onCheckoutPayment_wrapper > label.payment-plugin-image-label.payment_cash > input');
    // Click input[name="payment_plugin"]
    await page.click('input[name="payment_plugin"]');
    await page.waitForTimeout(2500)
    await eyes.check('Step 12', Target.window().fully());
    // Click text=Shipping & Payment Methods Select a payment method Cash on Delivery Money Order  >> input[type="button"]
    await page.click('text=Shipping & Payment Methods Select a payment method Cash on Delivery Money Order  >> input[type="button"]');
    await page.waitForTimeout(2500)
    await eyes.check('Step 13', Target.window().fully());
    // Click text=Place order
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://j2store.net/demo/index.php/checkout/confirmPayment?orderpayment_type=payment_cash&amp;paction=display' }*/),
      page.click('text=Place order')
    ]);
    // Click text=Go to order history
    await page.waitForTimeout(2500)
    await eyes.check('Step 14', Target.window().fully());
    await page.click('text=Go to order history');
    // Click text=Downloads
    await page.click('text=Downloads');
    // Click text=Address
    await page.click('text=Address');

    await eyes.check('Step 15', Target.window().fully());

    // Please Wait page
    page.goto('https://chemerson.github.io/utility-webpages/applitools_is_working.html')

    // clear cookies for next test
    let context = page.context()
    context.clearCookies()

    await eyes.close(false);

    const results = await runner.getAllTestResults(false);
    await console.log('Applitools Results', results);

  }

  test.afterEach(async () => {
    console.log('Done')
  });

  test.afterAll(async () => {

  })

  ////////////////////////////////////////////////////////////
  test.skip('Check out', async ({ page }) => {
    await theTest(page, 0)
  });

  test.skip('Check out Cross Browser', async ({ page }) => {
    // compare all previous runs to Chrome 1200x900
    configuration.setBaselineEnvName('Chrome1200')
    configuration.setMatchLevel(MatchLevel.Layout2);
    eyes.setConfiguration(configuration);
    await theTest(page, 2)
  });

  test.skip('Check out 2', async ({ page }) => {
    await theTest(page, 1)
  });

  test.skip('Check out 3', async ({ page }) => {
    await theTest(page, 2)
  });
  ////////////////////////////////////////////////////////////

  async function evalChange(page, change) {
    switch (change) {
      case 1:
        await page.evaluate(rFile('test/changers/aligncenter.js'))
        break
      case 2:
        await page.evaluate(rFile('test/changers/replaceValue.js'))
        break
      default:

    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function rFile(fname) {
    try {
      const data = fs.readFileSync(fname, 'utf8')
      return data
    } catch (err) {
      console.error(err)
    }
  }


});
