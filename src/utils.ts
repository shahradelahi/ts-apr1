/**
 * Concatenates multiple Uint8Arrays into a single Uint8Array.
 *
 * @param arrays Array of Uint8Arrays to concatenate.
 * @returns A new Uint8Array containing the concatenated data.
 */
export function concat(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((acc, curr) => acc + curr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
