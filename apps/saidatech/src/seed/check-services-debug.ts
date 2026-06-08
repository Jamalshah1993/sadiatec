import { getPayload } from 'payload'
import config from '../../payload.config'

async function check() {
  const payload = await getPayload({ config })
  
  const services = await payload.find({ collection: 'services', limit: 50, locale: 'ja' })
  console.log('\n=== SERVICE SLUGS IN DB ===')
  services.docs.forEach((s: any) => console.log(`  slug="${s.slug}" active=${s.active}`))
  
  const header = await payload.findGlobal({ slug: 'header', locale: 'ja', depth: 0 }) as any
  console.log('\n=== HEADER NAV HREFS ===')
  const nav = header.navItems ?? []
  function printItems(items: any[], indent = '  ') {
    for (const item of items) {
      console.log(`${indent}href="${item.href}"`)
      if (item.children?.length) printItems(item.children, indent + '  ')
      if (item.megaColumns?.length) {
        for (const col of item.megaColumns) {
          if (col.items?.length) printItems(col.items, indent + '  ')
        }
      }
    }
  }
  printItems(nav)
  process.exit(0)
}

check().catch((e: unknown) => { console.error(e); process.exit(1) })
