export function setDefaultButtonType(element: HTMLElement) {
  if (element instanceof HTMLButtonElement && element.hasAttribute('type')) {
    element.setAttribute('type', 'button')
  }
}
