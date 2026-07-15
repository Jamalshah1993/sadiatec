import { Container, Section } from '@saidatech/cms-core/components/ui'
import type { CaseStudyItem } from '@/lib/case-studies'
import { CaseStudyCard } from './CaseStudyCard'

interface CaseStudiesListGridProps {
  studies: CaseStudyItem[]
  locale: string
  defaultLocale: string
  viewLabel: string
}

export function CaseStudiesListGrid({
  studies,
  locale,
  defaultLocale,
  viewLabel,
}: CaseStudiesListGridProps) {
  if (studies.length === 0) return null

  const hrefFor = (slug: string) =>
    locale === defaultLocale ? `/case-studies/${slug}` : `/${locale}/case-studies/${slug}`

  return (
    <Section padding="lg">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
          {studies.map((study, index) => (
            <div key={study.slug} className={index % 2 === 1 ? 'sm:mt-20' : undefined}>
              <CaseStudyCard
                study={study}
                index={index}
                href={hrefFor(study.slug)}
                viewLabel={viewLabel}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
