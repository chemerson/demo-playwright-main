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

    let branchName = 'branch 123'
    let batchName = 'test batch'

    configuration = new Configuration();
    configuration.setBatch(new BatchInfo(batchName));
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
    configuration.setBranchName(branchName)
    configuration.setBaselineBranchName(branchName)
    configuration.setApiKey('IVATJb9JJqGfzLDJ6p3eWtU4hUsOO5rAFmciVSi4qtk110')
    eyes.setConfiguration(configuration);

    eyes.setLogHandler(new FileLogHandler(true));

  });

  ////////////////////////////////////////////////////////////
  test('test 1', async ({ page }) => {
    await theTest(page, 0)
  });

  test.skip('cross browser compare 1', async ({ page }) => {
    // compare all previous runs to Chrome 1200x900
    configuration.setBaselineEnvName('Chrome1200')
    configuration.setMatchLevel(MatchLevel.Layout2);
    eyes.setConfiguration(configuration);
    await theTest(page, 2)
  });
  ////////////////////////////////////////////////////////////

  async function theTest(page, changes) {
    // Open the eyes test and pass in a reference to the bwoser
    await eyes.open(page, 'app', 'test');

    await page.goto('https://demo.applitools.com/');
    // await page.goto('https://demo.applitools.com/app.html');

    await evalChange(page, changes) // inject page change to simulate A/B tessting or diff

    await eyes.check('Step 1', Target.window().fully());

    //await eyes.check('Step 1', Target.window().fully().variationGroupId('id1'));
    
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