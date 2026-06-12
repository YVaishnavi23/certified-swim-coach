/**
 * SVG icon definitions matching the reference site.
 * Used for dynamic icon injection when needed.
 */
const ICON_ATTRS = {
  width: 18,
  height: 18,
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  viewBox: '0 0 24 24',
};

const ICON_PATHS = {
  shield: '<path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  badge: '<circle cx="12" cy="9" r="6"/><path d="m8 14-2 7 6-3 6 3-2-7"/>',
  group: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M15 20c0-2 2-3.5 4-3.5s2 .5 2 .5"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2Z"/><path d="M4 17h14"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m21 8-5 4 5 4Z"/>',
  cert: '<circle cx="12" cy="9" r="5"/><path d="m8 13-2 8 6-3 6 3-2-8"/>',
  check: '<path d="m5 12 5 5 9-11"/>',
  star: '<path d="m12 3 2.6 6 6.4.6-4.8 4.2 1.4 6.2L12 17l-5.6 3 1.4-6.2L3 9.6 9.4 9Z"/>',
  wave: '<path d="M2 12c2 0 2-2 5-2s3 2 5 2 2-2 5-2 3 2 5 2"/><path d="M2 17c2 0 2-2 5-2s3 2 5 2 2-2 5-2 3 2 5 2"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  wa: '<path d="M20.5 3.5A11 11 0 0 0 3.2 17.2L2 22l4.9-1.3A11 11 0 1 0 20.5 3.5Zm-8.5 18a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.8.8-2.8-.2-.3A9 9 0 1 1 12 21.5Zm5-6.6c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6 0-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 .9-1 2.2 0 1.3 1 2.6 1.1 2.7.1.2 2 3 4.7 4.1 1.6.7 2.3.7 3.1.6.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L7.9 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/>',
  pin: '<path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
};

/**
 * Create an SVG icon element.
 * @param {string} name - Icon name from ICON_PATHS
 * @returns {SVGElement}
 */
function createIcon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  Object.entries(ICON_ATTRS).forEach(([key, value]) => {
    svg.setAttribute(key, String(value));
  });

  if (name === 'wa') {
    svg.setAttribute('fill', 'currentColor');
    svg.removeAttribute('stroke');
    svg.removeAttribute('stroke-width');
    svg.removeAttribute('stroke-linecap');
    svg.removeAttribute('stroke-linejoin');
  }

  const wrapper = document.createElement('div');
  wrapper.innerHTML = ICON_PATHS[name] || '';
  while (wrapper.firstChild) {
    svg.appendChild(wrapper.firstChild);
  }

  return svg;
}

window.Icons = { createIcon, ICON_PATHS };
