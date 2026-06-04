import type { CompanyProfileTableBlockProps, ProfileTableRow } from './types'
import { extractRichText } from '../../lib/extract-rich-text'

export function adaptCompanyProfileTableBlock(raw: unknown): CompanyProfileTableBlockProps {
  const data = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>

  const rawRows = Array.isArray(data['rows']) ? data['rows'] : []
  const rows: ProfileTableRow[] = rawRows
    .filter((row): row is Record<string, unknown> => typeof row === 'object' && row !== null)
    .map((row) => ({
      label: typeof row['label'] === 'string' ? row['label'] : '',
      value: extractRichText(row['value']),
      isHighlighted: typeof row['isHighlighted'] === 'boolean' ? row['isHighlighted'] : false,
    }))
    .filter((row) => row.label)

  const rawStyle = data['tableStyle']
  const tableStyle: CompanyProfileTableBlockProps['tableStyle'] =
    rawStyle === 'bordered' || rawStyle === 'striped' || rawStyle === 'clean' ? rawStyle : 'striped'

  const rawWidth = data['labelWidth']
  const labelWidth: CompanyProfileTableBlockProps['labelWidth'] =
    rawWidth === 'narrow' || rawWidth === 'medium' || rawWidth === 'wide' ? rawWidth : 'medium'

  return {
    rows,
    tableStyle,
    labelWidth,
    ...(typeof data['heading'] === 'string' && data['heading'] ? { heading: data['heading'] } : {}),
  }
}
