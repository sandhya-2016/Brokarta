export default async function sitemap() {
  const baseUrl = "https://brokarta.com";
  const routes = ["", "/about-us", "/what-we-offer", "/become-a-user", "/connect-now", "/privacy-policy", "/terms-of-service"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
