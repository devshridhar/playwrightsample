import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.lambdatest.com/selenium-playground';

test.describe.parallel('LambdaTest Playwright Automation', () => {

    test('Simple Form Demo Test', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.click('text=Simple Form Demo');
        await expect(page).toHaveURL(/.*simple-form-demo/);

        const inputMessage = 'Welcome to LambdaTest';
        await page.fill('#user-message', inputMessage);
        await page.click('#showInput');

        const displayedMessage = await page.locator('#message').textContent();
        expect(displayedMessage?.trim()).toBe(inputMessage);
    });

    test('Click to Move Slider Test', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.click('text=Drag & Drop Sliders');

        // Locate the slider
        const slider = page.locator('xpath=(//input[@class="sp__range"])[3]');
        const outputValue = page.locator('#rangeSuccess');

        // Get slider bounding box
        const sliderBox = await slider.boundingBox();
        if (!sliderBox) throw new Error('Slider not found');

        // Get initial slider value
        let currentValue = parseInt(await outputValue.textContent() || '0', 10);

        // **Slightly Decrease Click Position to Reach 95**
        const targetX = sliderBox.x + sliderBox.width * 0.925;
        const targetY = sliderBox.y + sliderBox.height / 2;

        // Click on the new position
        await page.mouse.click(targetX, targetY);

        // Wait for UI update
        await page.waitForTimeout(10000);

        // Get updated value
        currentValue = parseInt(await outputValue.textContent() || '0', 10);

        // Ensure it reaches **95**
        await expect(outputValue).toHaveText('95', { timeout: 5000 });
    });

    test('Input Form Submit Test', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.click('text=Input Form Submit');

        // Try to submit without filling fields
        await page.click('button:has-text("Submit")');

        // Capture native validation message
        const nameField = page.locator('#name');
        const validationMessage = await nameField.evaluate((el) => el.validationMessage);

        // Validate error message
        expect(validationMessage).toBe('Please fill out this field.');

        // Fill the form correctly
        await page.fill('#name', 'John Doe');
        await page.fill('#inputEmail4', 'john.doe@example.com');
        await page.fill('#inputPassword4', 'SecurePass123');
        await page.fill('#company', 'LambdaTest Inc.');
        await page.fill('#websitename', 'https://www.lambdatest.com');
        await page.selectOption('select[name="country"]', { label: 'United States' });
        await page.fill('#inputCity', 'San Francisco');
        await page.fill('#inputAddress1', '123 Main St');
        await page.fill('#inputAddress2', 'Suite 400');
        await page.fill('#inputState', 'California');
        await page.fill('#inputZip', '94107');

        // Submit the form
        await page.click('button:has-text("Submit")');

        // **✅ Wait until the success message is visible**
        const successMessage = page.locator("xpath=//p[@class='success-msg hidden']");
        await successMessage.waitFor({ state: "visible", timeout: 5000 });

        // Get success message text
        const successMsgText = await successMessage.textContent();
        expect(successMsgText?.trim()).toBe('Thanks for contacting us, we will get back to you shortly.');
    });
});
