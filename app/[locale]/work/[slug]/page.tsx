import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCopy, getProject, getProjectSlugs } from "@/lib/i18n";
import { homeHref } from "@/lib/paths";
import { isLocale, site } from "@/lib/site";

const ProjectShowcase = dynamic(() =>
  import("@/components/ProjectShowcase").then((mod) => ({ default: mod.ProjectShowcase })),
);

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const project = getProject(locale, slug);
  if (!project) {
    return {};
  }
  const path = `/${locale}/work/${slug}/`;
  const title = `${project.name} — ${site.name}`;
  return {
    title,
    description: project.summary,
    alternates: {
      canonical: path,
      languages: {
        id: `/id/work/${slug}/`,
        en: `/en/work/${slug}/`,
        "x-default": `/id/work/${slug}/`,
      },
    },
    openGraph: {
      title,
      description: project.summary,
      url: path,
      siteName: site.name,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "article",
      images: [{ url: project.images[0].src, alt: project.images[0].caption }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [project.images[0].src],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const copy = getCopy(locale);
  const project = getProject(locale, slug);
  if (!project) {
    notFound();
  }
  const index = copy.projects.findIndex((item) => item.slug === slug);

  return (
    <div className="mx-auto max-w-6xl px-3.5 py-12 sm:px-8 sm:py-16">
      <Link
        href={homeHref(locale, "projects")}
        className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-ink"
      >
        ← {copy.work.back}
      </Link>
      <div className="mt-8">
        <ProjectShowcase project={project} index={index} work={copy.work} />
      </div>
    </div>
  );
}
