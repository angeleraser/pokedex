export function getDocumentScrollPercentage() {
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;
  const scrollY = window.scrollY;
  const maxScrollHeight = bodyHeight - windowHeight;
  return Math.ceil((scrollY * 100) / maxScrollHeight);
}