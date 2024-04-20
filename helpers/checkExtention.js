export function checkExtention(fileName) {
  const EXTENTIONS = ["js", "doc", "txt", "json", "jsx"];
  const details = fileName.split('.');
  const lastElement = details[details.length - 1];
  return { extention: lastElement, isValid: EXTENTIONS.includes(lastElement) };
}
