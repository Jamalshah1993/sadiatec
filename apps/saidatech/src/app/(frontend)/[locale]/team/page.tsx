import { notFound } from 'next/navigation'
import siteConfig from '../../../../../site.config'

export const revalidate = 300

export default function TeamPage() {
  if (!siteConfig.features.team) notFound()

  return (
    <main>
      <h1>Team</h1>
    </main>
  )
}
