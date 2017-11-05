export function callValue(supplier, defaultValue) {
  try {
    const value = supplier();
    return value || defaultValue;
  } catch(err) {
    console.error(supplier);
    return defaultValue;
  }
}
