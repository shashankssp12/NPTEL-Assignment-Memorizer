# NPTEL Memorizer

This repository contains scripts and tools to assist with NPTEL quizzes.

## Features

1. Automates repetitive tasks in NPTEL quizzes
2. Provides solutions to common quiz challenges
3. Includes a script to break 3D text verification

## How to Use

1. Install a userscript manager like Tampermonkey or Greasemonkey
2. Add the provided script to the userscript manager
3. Save the script and navigate to any NPTEL quiz page

4. The script will automatically detect and break all 3D text verification elements

5. Once broken, the quiz will start immediately without requiring any manual intervention

## Notes

- This script is provided for educational purposes only
- Use at your own risk as it may violate NPTEL's terms of service
- Success rate may vary as NPTEL might update their verification methods

## Alternative Method (Chrome Console)

If you don't want to install a userscript, you can:

1. Open the NPTEL quiz page with the 3D text verification
2. Press F12 to open Developer Tools
3. Navigate to the Console tab
4. Copy and paste the following code to instantly break all 3D text and start the quiz:

```javascript
// This code breaks all 3D text verification to immediately proceed to the quiz
(function () {
  // Remove all 3D text and verification elements
  [
    "canvas",
    'iframe[src*="3dtext"]',
    'iframe[src*="captcha"]',
    "div.three-d-text-container",
    "div.captcha-container",
  ].forEach((selector) => {
    document.querySelectorAll(selector).forEach((elem) => elem.remove());
  });

  // Set verification flags to true
  ["captchaVerified", "verification3DComplete", "textCaptchaVerified"].forEach(
    (flag) => {
      if (typeof window[flag] !== "undefined") window[flag] = true;
    }
  );

  // Fill any verification inputs
  document
    .querySelectorAll('input[name*="captcha"], input[name*="verification"]')
    .forEach((input) => {
      input.value = "VERIFIED";
    });

  // Click any buttons to proceed
  setTimeout(() => {
    [
      'button:contains("Start")',
      'input[type="button"][value*="Start"]',
      "a.start-quiz",
      'button[type="submit"]',
      'input[type="submit"]',
    ].forEach((selector) => {
      try {
        document.querySelectorAll(selector).forEach((btn) => {
          btn.disabled = false;
          btn.click();
        });
      } catch (e) {
        console.log(e);
      }
    });
  }, 500);

  console.log("3D text broken - quiz should start immediately");
})();
```
