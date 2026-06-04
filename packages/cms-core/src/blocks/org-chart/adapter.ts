import type { OrgChartBlockProps, DepartmentItem } from './types'

export function adaptOrgChartBlock(raw: unknown): OrgChartBlockProps {
  const data = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>

  const chartImage = data['chartImage'] as Record<string, unknown> | null | undefined
  const chartImageUrl = chartImage && typeof chartImage['url'] === 'string' ? chartImage['url'] : undefined

  const rawDepts = Array.isArray(data['departments']) ? data['departments'] : []
  const departments: DepartmentItem[] = rawDepts
    .filter((d): d is Record<string, unknown> => typeof d === 'object' && d !== null)
    .map((d) => ({
      name: typeof d['name'] === 'string' ? d['name'] : '',
      ...(typeof d['head'] === 'string' && d['head'] ? { head: d['head'] } : {}),
      ...(typeof d['description'] === 'string' && d['description'] ? { description: d['description'] } : {}),
    }))
    .filter((d) => d.name)

  const rawMode = data['renderMode']
  const renderMode: OrgChartBlockProps['renderMode'] =
    rawMode === 'image' || rawMode === 'list' ? rawMode : 'image'

  return {
    renderMode,
    ...(typeof data['heading'] === 'string' && data['heading'] ? { heading: data['heading'] } : {}),
    ...(chartImageUrl ? { chartImageUrl } : {}),
    ...(typeof data['chartImageAlt'] === 'string' && data['chartImageAlt'] ? { chartImageAlt: data['chartImageAlt'] } : {}),
    ...(departments.length > 0 ? { departments } : {}),
  }
}
