export const copy = async (text) => {
  if (!navigator?.clipboard) {
    console.warn("Clipboard not supported")
    return false
  }

  // Try to save to clipboard then save it in the state if worked
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.warn("Copy failed", error)
    return false
  }
}
