import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import type { CaseStudy, Locale } from "@/data/site";

export type LocalizedCaseGalleryImage = {
  src: string;
  alt: string;
  label: string;
};

const caseImageExtensionPreference = [".avif", ".webp", ".jpg", ".jpeg", ".png"];
const caseImageExtensions = new Set(caseImageExtensionPreference);
const caseImageExtensionRank = new Map(
  caseImageExtensionPreference.map((extension, index) => [extension, index]),
);

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

  const fileByBaseName = getPreferredImageFilesByBaseName(location.directory);

  const galleryFiles: Array<{ file: string; label: string }> = [];
  const previewRec = fileByBaseName.get("preview_rec");

  if (previewRec) {
    galleryFiles.push({ file: previewRec, label: "preview_rec" });
  }

  Array.from(fileByBaseName.values())
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
  const previewRec = location ? getImageByBaseName(location, "preview_rec") : null;
  const previewSq = location ? getImageByBaseName(location, "preview_sq") : null;

  return previewRec ?? previewSq ?? item.coverImage;
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
  const file = getPreferredImageFilesByBaseName(location.directory).get(
    lowerBaseName,
  );

  return file ? `${location.publicPath}/${file}` : null;
}

function getPreferredImageFilesByBaseName(directory: string) {
  const files = readdirSync(directory).filter((file) => {
    return caseImageExtensions.has(path.extname(file).toLowerCase());
  });

  const fileByBaseName = new Map<string, string>();

  for (const file of files) {
    const baseName = path.basename(file, path.extname(file)).toLowerCase();
    const current = fileByBaseName.get(baseName);

    if (!current || compareImagePreference(file, current) < 0) {
      fileByBaseName.set(baseName, file);
    }
  }

  return fileByBaseName;
}

function compareImagePreference(left: string, right: string) {
  const leftRank =
    caseImageExtensionRank.get(path.extname(left).toLowerCase()) ??
    caseImageExtensionPreference.length;
  const rightRank =
    caseImageExtensionRank.get(path.extname(right).toLowerCase()) ??
    caseImageExtensionPreference.length;

  if (leftRank !== rightRank) {
    return leftRank - rightRank;
  }

  return left.localeCompare(right);
}
