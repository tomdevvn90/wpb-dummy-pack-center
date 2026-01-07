export const decodePayload = (encoded: string) : object | null => {
  try {
    const reversed = decodeURIComponent(escape(atob(encoded)));
    const json = reversed.split('').reverse().join('');
    return JSON.parse(json);
  } catch (e) {
    console.error('Decode failed', e);
    return null;
  }
}