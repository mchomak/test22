const localSiteUrl = "http://localhost:3000";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const isPlaceholder =
    !configuredUrl || /^https?:\/\/(?:www\.)?example\.com\/?$/i.test(configuredUrl);

  return (isPlaceholder ? localSiteUrl : configuredUrl).replace(/\/$/, "");
}

