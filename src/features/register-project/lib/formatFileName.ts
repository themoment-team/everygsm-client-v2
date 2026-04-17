export const formatFileName = (name: string, maxLength = 36) => {
  if (name.length <= maxLength) return name;
  const lastDotIndex = name.lastIndexOf('.');
  if (lastDotIndex === -1) return `${name.slice(0, 36)}...`;
  const extension = name.slice(lastDotIndex);
  const front = name.slice(0, 36);
  return `${front} ... ${extension}`;
};
