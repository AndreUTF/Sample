module.exports = {
  reporter: [['html', { open: 'never' }]],
  use: {
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true
  }
}
