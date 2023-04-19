export const copyToClipBoard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {}
};
