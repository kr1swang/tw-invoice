import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const versionInfo = `ver ${process.env.version} (${process.env.buildId})`
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL
  const currentYear = new Date().getFullYear()

  return (
    <footer className={'flex flex-col flex-wrap items-center justify-between gap-4 sm:flex-row'}>
      <span className={'text-xs'}>{versionInfo}</span>

      <Link
        className={'text-xs underline-offset-2 hover:underline'}
        href={githubUrl!}
        target={'_blank'}
        rel={'noreferrer'}
      >
        {`Copyright © ${currentYear} by Kr1sWang`}
      </Link>
    </footer>
  )
}
