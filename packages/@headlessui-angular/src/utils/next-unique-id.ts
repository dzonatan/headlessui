export function nextUniqueIdFactory() {
  let id = 0
  return () => ++id
}
