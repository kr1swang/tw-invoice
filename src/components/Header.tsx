import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className={'flex flex-wrap items-baseline justify-start gap-4'}>
      <Link className={'text-2xl font-bold underline-offset-2 hover:underline'} href={'/'}>
        {t('title')}
      </Link>
      <p className={'inline-block text-xs'}>{'Easily Check Taiwan Invoice Lottery Tool.'}</p>
    </header>
  )
}
