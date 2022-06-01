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

test.describe('test template', () => {
  let eyes, runner, configuration;

  test.beforeEach(async () => {

    // Prepare the Eyes object
    runner = new VisualGridRunner({ testConcurrency: 100 });
    eyes = new Eyes(runner);

    let branchName = 'Demo Batch Yum 123'
    let batchName = 'Yum'

    configuration = new Configuration();
    configuration
      .setBatch(new BatchInfo(batchName))
      .setDisableBrowserFetching(true)
      .setIgnoreDisplacements(true)
      .setViewportSize({ width: 1200, height: 1393 })
      .setBranchName(branchName)
      .setBaselineBranchName(branchName)
      .setApiKey(process.env.APPLITOOLS_API_KEY)
      .setWaitBeforeCapture(500)
      .setWaitBeforeScreenshots(500)


    // Define browsers for UFG by breakpoint
    let breakpoints = [1080, 896, 640, 530]
    breakpoints.forEach(element => {
      configuration
        .addBrowser(element, 800, BrowserType.CHROME)
        .addBrowser(element, 800, BrowserType.FIREFOX)
        .addBrowser(element, 800, BrowserType.SAFARI)
    })
    
    eyes.setConfiguration(configuration);

    eyes.setLogHandler(new FileLogHandler(true));

  });

  ////////////////////////////////////////////////////////////
  test('test 1', async ({ page }) => {
    await theTest(page, 0, 2)
  });

  test.skip('cross browser compare 1', async ({ page }) => {
    // compare all previous runs to Chrome 1200x900
    configuration.setBaselineEnvName('Chrome1200')
    configuration.setMatchLevel(MatchLevel.Layout2);
    eyes.setConfiguration(configuration);
    await theTest(page, 2, 1)
  });
  ////////////////////////////////////////////////////////////

  async function theTest(page, changes, baseurl) {
    // Open the eyes test and pass in a reference to the bwoser
    await eyes.open(page, 'Demo app', 'Login Page');

    let testurl = 'https://testprocess.coaliance.com/login/login#!/'

    await page.goto(testurl);

    await evalChange(page, changes) // inject page change to simulate A/B testing or diff

    await eyes.check('Step 1', Target.window().fully());

    // Click [placeholder="enter username"]
    await page.locator('[placeholder="enter username"]').click();

    // Fill [placeholder="enter username"]
    await page.locator('[placeholder="enter username"]').fill('txs4706');

    // Click [placeholder="enter password"]
    await page.locator('[placeholder="enter password"]').click();

    // Fill [placeholder="enter password"]
    await page.locator('[placeholder="enter password"]').fill('YumYum1@');

    // Click .layout-block.button >> nth=0
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://testprocess.coaliance.com/' }*/),
      page.locator('.layout-block.button').first().click()
    ]);

    // Go to https://testprocess.coaliance.com/#dashboard
    await page.goto('https://testprocess.coaliance.com/#dashboard');

    // Go to https://testprocess.coaliance.com/#manager%20workbook?orgUnitId=1&date=
    await page.goto('https://testprocess.coaliance.com/#manager%20workbook?orgUnitId=1&date=');

    // Go to https://testprocess.coaliance.com/#dashboard/dashboard?unitId=1&id=01d3992b-c3f7-452e-a930-48592f759140&date=2022-05-31
    await page.goto('https://testprocess.coaliance.com/#dashboard/dashboard?unitId=1&id=01d3992b-c3f7-452e-a930-48592f759140&date=2022-05-31');

    // Go to https://testprocess.coaliance.com/#manager%20workbook?orgUnitId=1&date=05/31/2022
    await page.goto('https://testprocess.coaliance.com/#manager%20workbook?orgUnitId=1&date=05/31/2022');

    // Click text=Log Search
    await page.locator('text=Log Search').click();

    // Click span:has-text("Manager Workbench")
    await page.locator('span:has-text("Manager Workbench")').click();

    // Click text=Log Search
    await page.locator('text=Log Search').click();

    // Click span:has-text("Manager Workbench")
    await page.locator('span:has-text("Manager Workbench")').click();

    // Click text=Log Search
    await page.locator('text=Log Search').click();

    // Click span:has-text("Manager Workbench")
    await page.locator('span:has-text("Manager Workbench")').click();


    await eyes.check('Step 2', Target.window().fully());


    // Please Wait page
    page.waitForTimeout(2500)
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

  async function evalChange(page, change) {
    switch (change) {
      case 1:
        await page.evaluate(rFile('test/aligncenter.js'))
        break
      case 2:
        await page.evaluate(rFile('test/replaceValue.js'))
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