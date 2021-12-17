const { test } = require('@playwright/test');
const {
  VisualGridRunner,
  ClassicRunner,
  Eyes,
  Target,
  Configuration,
  BatchInfo,
  BrowserType,
  DeviceName,
  ScreenOrientation,
  StitchMode,
  RectangleSize
} = require('@applitools/eyes-playwright');
const fs = require('fs')

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


test.describe('ShoppingCart', () => {
  let eyes, runner;
  
  test.beforeEach(async () => {

     runner = new VisualGridRunner({
       testConcurrency: 5
     });
    eyes = new Eyes(runner);

    const configuration = new Configuration();

    configuration.setBatch(new BatchInfo('Shopping Cart (Playwright)'));
    configuration.addBrowser(1200, 900, BrowserType.CHROME);
    configuration.addBrowser(657, 900, BrowserType.CHROME);
    configuration.setDisableBrowserFetching(false)
    configuration.setViewportSize({width:1200,height:1200})

    eyes.setConfiguration(configuration);

  });

  test('Main Menu', async ({ page }) => {
  

    await eyes.open(page, 'Shopping Cart (Playwright) app', 'Shopping Cart (Playwright) test');


    // Go to http://j2store.net/demo/index.php
    await page.goto('http://j2store.net/demo/index.php');


    //await page.evaluate(rFile('test/aligncenter.js'))
    await page.evaluate(rFile('test/replaceValue.js'))


    await eyes.check('Step 1', Target.window().fully());
    // Click #t3-mainnav >> text=Hats
    await page.hover('#t3-mainnav > div > div > div.col-sm-4.col-xs-4.col-md-4 > div.t3-navbar.navbar-collapse.collapse > div > ul > li:nth-child(2)')
    await eyes.check('Step 2', Target.window().fully());
    await page.click('#t3-mainnav >> text=Hats');
    await page.waitForLoadState('networkidle');
    await eyes.check('Step 3', Target.window().fully());
    // Click text=Add to cart
    await page.click('text=Add to cart');
    await page.waitForTimeout(2000)
    await eyes.check('Step 4', Target.window().fully());
    // Click #t3-mainnav >> text=Kettles
    await page.hover('#t3-mainnav > div > div > div.col-sm-4.col-xs-4.col-md-4 > div.t3-navbar.navbar-collapse.collapse > div > ul > li:nth-child(2)')
    await eyes.check('Step 5', Target.window().fully());
    await page.click('#t3-mainnav >> text=Kettles');
    await eyes.check('Step 6', Target.window().fully());
    // Click text=Add to cart
    await page.click('text=Add to cart');
    await page.waitForTimeout(3000)
    await eyes.check('Step 7', Target.window().fully());
    // Click #j2store_cart_item_123 >> text=Checkout
    await page.hover('#t3-mainnav > div > div > div.col-sm-4.col-xs-8.col-md-4 > div > div.j2store_cart_module_123 > div > div.j2store-cart-info > div')
    await page.waitForTimeout(3000)
    await eyes.check('Step 8', Target.window().fully());
    await page.click('#j2store_cart_item_123 >> text=Checkout');
    await page.waitForTimeout(3000)
    await eyes.check('Step 9', Target.window().fully());
    // Click text=Continue



   // await page.evaluate(rFile('test/aligncenter.js'))
   await page.evaluate(rFile('test/replaceValue.js'))


    await page.click('text=Continue');
    await page.waitForTimeout(3000)
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
    await page.waitForTimeout(3000)
    await eyes.check('Step 12', Target.window().fully());
    // Click text=Shipping & Payment Methods Select a payment method Cash on Delivery Money Order  >> input[type="button"]
    await page.click('text=Shipping & Payment Methods Select a payment method Cash on Delivery Money Order  >> input[type="button"]');
    await page.waitForTimeout(3000)
    await eyes.check('Step 13', Target.window().fully());
    // Click text=Place order
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://j2store.net/demo/index.php/checkout/confirmPayment?orderpayment_type=payment_cash&amp;paction=display' }*/),
      page.click('text=Place order')
    ]);
    // Click text=Go to order history
    await page.waitForTimeout(3000)
    await eyes.check('Step 14', Target.window().fully());
    await page.click('text=Go to order history');
    // Click text=Downloads
    await page.click('text=Downloads');
    // Click text=Address
    await page.click('text=Address');

    await eyes.check('Step 15', Target.window().fully());
    
    await page.waitForTimeout(3000)
    await page.evaluate('var h = document.createElement("H1");h.style.cssText = "font-family:Arial,Helvetica,sans-serif;position:absolute;top:300px;left:450px;z-index:100";var t = document.createTextNode("Wait for Applitools render");h.appendChild(t);document.body.appendChild(h);')

    await eyes.close(false);


  });

  test.afterEach(async () => {
    await eyes.abort();
    const results = await runner.getAllTestResults(false);
    console.log('Applitools Results', results);
  });
});