import { NextResponse, type NextRequest } from "next/server";

const locales = ["ru", "en"] as const;
const defaultLocale = "en";
const localeCookieName = "site-locale";
const localeMaxAge = 60 * 60 * 24 * 365;

type Locale = (typeof locales)[number];

const cisCountryCodes = new Set([
  "AM",
  "AZ",
  "BY",
  "KZ",
  "KG",
  "MD",
  "RU",
  "TJ",
  "TM",
  "UZ",
]);

const countryHeaders = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
  "x-country-code",
  "x-appengine-country",
];

function isLocale(value: string | undefined | null): value is Locale {
  return locales.some((locale) => locale === value);
}

function getPathLocale(pathname: string) {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : null;
}

function getCountryCode(request: NextRequest) {
  for (const header of countryHeaders) {
    const value = request.headers.get(header)?.trim().toUpperCase();
    if (value && value !== "ZZ" && value !== "XX") {
      return value;
    }
  }

  return null;
}

function getLocaleFromAcceptLanguage(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const firstLanguage = acceptLanguage.split(",")[0]?.trim().toLowerCase();

  return firstLanguage?.startsWith("ru") ? "ru" : defaultLocale;
}

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;

  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const countryCode = getCountryCode(request);

  if (countryCode && cisCountryCodes.has(countryCode)) {
    return "ru";
  }

  return getLocaleFromAcceptLanguage(request);
}

function nextWithLocale(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathLocale = getPathLocale(pathname);

  if (pathLocale) {
    const response = nextWithLocale(request, pathLocale);
    const cookieLocale = request.cookies.get(localeCookieName)?.value;

    if (cookieLocale !== pathLocale) {
      response.cookies.set(localeCookieName, pathLocale, {
        maxAge: localeMaxAge,
        path: "/",
        sameSite: "lax",
      });
    }

    return response;
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
