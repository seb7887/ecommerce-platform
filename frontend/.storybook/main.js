const path = require("path")

module.exports = {
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-a11y/register',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register'
  ],
  stories: ['../stories/**/*.stories.tsx'],
  presets: [path.resolve(__dirname, './next-preset.js')],
}
