export function callValue(supplier, defaultValue) {
  try {
    supplier();
  } catch(err) {
    console.error(supplier);
    return defaultValue;
  }
}
