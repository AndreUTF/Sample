const { expect, test } = require('@playwright/test')

test.describe('Tester Assessment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      process.env.BASE_URL ?? 'https://nearform.github.io/tester-assessment/'
    )
  });

  test('should render submit button', async ({ page }) => {
    await expect(page.locator('form>button')).toHaveText('Submit')
  });

  test('User should be able to enter and submit a valid user for <domain>.com', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@gmail.com");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();
    await page.waitForTimeout(6000);
    var logoutLink = await page.locator('[data-testid="logout-button"]').first()
    await expect(logoutLink).toBeVisible();
  });

  test('User should be able to enter and submit a valid user for .co.uk', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@google.co.uk");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();
    await page.waitForTimeout(6000);
    var logoutLink = await page.locator('[data-testid="logout-button"]').first()
    await expect(logoutLink).toBeVisible();
  });

  test('User should be able to enter and submit a valid user for .it', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@google.it");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();
    await page.waitForTimeout(3000);
    var logoutLink = await page.locator('[data-testid="logout-button"]').first()
    await expect(logoutLink).toBeVisible();
  });

  test('User should not be able to login when the email is invalid', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@test");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var errorModal = await page.locator('[id="email-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Allowed email domain extensions: .com, .co.uk, .it");
  });

  test('User should not be able to login when the email is missing the @ symbol', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andretest.com");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var errorModal = await page.locator('[id="email-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Enter a valid email");
  });

  test('User should not be able to login when the email domain extension is not allowed', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@test.org");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var errorModal = await page.locator('[id="email-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Allowed email domain extensions: .com, .co.uk, .it");
  });

  test('User should not be able to login when the email is empty', async ({ page }) => {
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var errorModal = await page.locator('[id="email-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Email is required");
  });

  test('User should not be able to login when the password is too short', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@gmail.com");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("Ab1@");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var errorModal = await page.locator('[id="password-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Password should be of minimum 8 characters length");
  });

  test('User should not be able to login when the password has no uppercase letter', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@gmail.com");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("abcdefgh1@");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var errorModal = await page.locator('[id="password-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Password should contain a mix of upper and lower case letters, numbers and at least one special character");
  });

  test('User should not be able to login when the password has no lowercase letter', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@gmail.com");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("ABCDEFGH1@");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var errorModal = await page.locator('[id="password-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Password should contain a mix of upper and lower case letters, numbers and at least one special character");
  });

  test('User should not be able to login when the password has no number', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@gmail.com");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("Abcdefgh@");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var errorModal = await page.locator('[id="password-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Password should contain a mix of upper and lower case letters, numbers and at least one special character");
  });

  test('User should not be able to login when the password has no special character', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@gmail.com");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("Abcdefgh1");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var errorModal = await page.locator('[id="password-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Password should contain a mix of upper and lower case letters, numbers and at least one special character");
  });

  test('User should not be able to login when the password is empty', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@gmail.com");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var errorModal = await page.locator('[id="password-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Password is required");
  });

  test('User should see both validation messages when email and password are empty', async ({ page }) => {
    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var emailErrorModal = await page.locator('[id="email-helper-text"]').first();
    var passwordErrorModal = await page.locator('[id="password-helper-text"]').first();
    await expect(emailErrorModal).toBeVisible();
    await expect(emailErrorModal).toHaveText("Email is required");
    await expect(passwordErrorModal).toBeVisible();
    await expect(passwordErrorModal).toHaveText("Password is required");
  });

  test('User should be able to submit valid credentials by pressing ENTER', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@gmail.com");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    await passwordField.press('Enter');

    var logoutLink = await page.locator('[data-testid="logout-button"]').first();
    await expect(logoutLink).toBeVisible();
    var welcomeMessage = await page.locator('h1').first();
    await expect(welcomeMessage).toHaveText("Welcome andre@gmail.com!");
  });

  test('User should not be able to login with invalid credentials by pressing ENTER', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@test");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    await passwordField.press('Enter');

    var errorModal = await page.locator('[id="email-helper-text"]').first();
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText("Allowed email domain extensions: .com, .co.uk, .it");
  });

  test('User should return to the login form after logging out', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@gmail.com");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var logoutLink = await page.locator('[data-testid="logout-button"]').first();
    await expect(logoutLink).toBeVisible();
    await logoutLink.click();

    await expect(page.locator('[id="email"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="logout-button"]')).toHaveCount(0);
  });

  test('User should see a personalized welcome message after a successful login', async ({ page }) => {
    var emailField = await page.locator('[id="email"]').first();
    await emailField.fill("andre@gmail.com");
    var passwordField = await page.locator('[id="password"]').first();
    await passwordField.fill("2j3ww9tz@Cc");

    var submitField = await page.locator('[data-testid="submit-button"]').first();
    await submitField.click();

    var welcomeMessage = await page.locator('h1').first();
    await expect(welcomeMessage).toBeVisible();
    await expect(welcomeMessage).toHaveText("Welcome andre@gmail.com!");
  });
});