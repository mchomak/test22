import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import type { CaseStudy, Locale } from "@/data/site";

export type LocalizedCaseGalleryImage = {
  src: string;
  alt: string;
  label: string;
};

const caseImageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

type CaseImageLocation = {
  directory: string;
  publicPath: string;
};

export function localizeCaseImages(locale: Locale, cases: CaseStudy[]) {
  return cases.map((item) => ({
    ...item,
    coverImage: getCaseCoverImage(locale, item),
  }));
}

export function getCaseGalleryImages(
  locale: Locale,
  item: CaseStudy,
): LocalizedCaseGalleryImage[] {
  const location = getCaseImageLocation(locale, item.slug);
  const fallbackCover = getCaseCoverImage(locale, item);

  if (!location) {
    return [{ src: fallbackCover, alt: item.coverAlt, label: "preview_sq" }];
  }

  const files = readdirSync(location.directory).filter((file) => {
    return caseImageExtensions.has(path.extname(file).toLowerCase());
  });

  const fileByBaseName = new Map(
    files.map((file) => [path.basename(file, path.extname(file)).toLowerCase(), file]),
  );

  const galleryFiles: Array<{ file: string; label: string }> = [];
  const previewRec = fileByBaseName.get("preview_rec");

  if (previewRec) {
    galleryFiles.push({ file: previewRec, label: "preview_rec" });
  }

  files
    .map((file) => {
      const baseName = path.basename(file, path.extname(file));
      return /^\d+$/.test(baseName)
        ? { file, label: baseName, order: Number(baseName) }
        : null;
    })
    .filter((file): file is { file: string; label: string; order: number } =>
      Boolean(file),
    )
    .sort((left, right) => left.order - right.order)
    .forEach(({ file, label }) => galleryFiles.push({ file, label }));

  if (galleryFiles.length === 0) {
    const previewSq = fileByBaseName.get("preview_sq");
    if (previewSq) {
      galleryFiles.push({ file: previewSq, label: "preview_sq" });
    }
  }

  if (galleryFiles.length === 0) {
    return [{ src: fallbackCover, alt: item.coverAlt, label: "preview_sq" }];
  }

  return galleryFiles.map(({ file, label }) => ({
    src: `${location.publicPath}/${file}`,
    alt: `${item.coverAlt} - ${label}`,
    label,
  }));
}

function getCaseCoverImage(locale: Locale, item: CaseStudy) {
  const location = getCaseImageLocation(locale, item.slug);
  const previewSq = location ? getImageByBaseName(location, "preview_sq") : null;

  return previewSq ?? item.coverImage;
}

function getCaseImageLocation(locale: Locale, slug: string): CaseImageLocation | null {
  const localized = getCaseImageLocationCandidate(
    [locale, slug],
    `/cases/${locale}/${slug}`,
  );

  if (localized) return localized;

  return getCaseImageLocationCandidate(
    [slug],
    `/cases/${slug}`,
  );
}

function getCaseImageLocationCandidate(
  segments: string[],
  publicPath: string,
): CaseImageLocation | null {
  const directory = path.join(process.cwd(), "public", "cases", ...segments);

  if (!existsSync(directory)) return null;

  const hasImages = readdirSync(directory).some((file) =>
    caseImageExtensions.has(path.extname(file).toLowerCase()),
  );

  return hasImages ? { directory, publicPath } : null;
}

function getImageByBaseName(location: CaseImageLocation, baseName: string) {
  const lowerBaseName = baseName.toLowerCase();
  const file = readdirSync(location.directory).find((item) => {
    return (
      path.basename(item, path.extname(item)).toLowerCase() === lowerBaseName &&
      caseImageExtensions.has(path.extname(item).toLowerCase())
    );
  });

  return file ? `${location.publicPath}/${file}` : null;
}
