import type { TimelineBlockProps } from './types'

export function adaptTimelineBlock(rawData: any): TimelineBlockProps {
  return {
    eyebrow: rawData?.eyebrow ?? '',
    heading: rawData?.heading ?? 'Our Latest Opening',
    processEyebrow: rawData?.processEyebrow ?? 'Recruitement Process',
    openings: (rawData?.openings || []).map((item: any) => ({
      title: item?.title || '',
      company: item?.company || '',
      location: item?.location || '',
      salary: item?.salary || '',
      postedDate: item?.postedDate || '',
      tag: item?.tag || undefined,
      applyHref: item?.applyHref || '#',
    })),
    processSteps: (rawData?.processSteps || []).map((step: any, index: number) => ({
      number: step?.number ?? (index + 1),
      title: step?.title || '',
      description: step?.description || '',
    })),
  }
}
