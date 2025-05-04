/** @type {import('tailwindcss').Config['plugins']} */
const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    '.animate-in': {
      animationName: 'enter',
      animationDuration: '150ms',
      animationTimingFunction: 'cubic-bezier(0.1, 0.99, 0.1, 0.99)',
      animationFillMode: 'both',
    },
    '.animate-out': {
      animationName: 'exit',
      animationDuration: '150ms',
      animationTimingFunction: 'cubic-bezier(0.1, 0.99, 0.1, 0.99)',
      animationFillMode: 'both',
    },
    '@keyframes enter': {
      from: { opacity: 'var(--enter-opacity, 1)', transform: 'translate3d(var(--enter-translate-x, 0), var(--enter-translate-y, 0), 0) scale3d(var(--enter-scale, 1), var(--enter-scale, 1), var(--enter-scale, 1)) rotate(var(--enter-rotate, 0))' },
    },
    '@keyframes exit': {
      to: { opacity: 'var(--exit-opacity, 1)', transform: 'translate3d(var(--exit-translate-x, 0), var(--exit-translate-y, 0), 0) scale3d(var(--exit-scale, 1), var(--exit-scale, 1), var(--exit-scale, 1)) rotate(var(--exit-rotate, 0))' },
    },
    '.fade-in': { '--enter-opacity': '0' },
    '.fade-out': { '--exit-opacity': '0' },
    '.fade-in-80': { '--enter-opacity': '0.8' },
    '.fade-out-80': { '--exit-opacity': '0.8' },
  })
}); 