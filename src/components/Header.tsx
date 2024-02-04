import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className={'flex flex-wrap items-baseline justify-start gap-4'}>
      <h1 className={'inline-block text-2xl font-bold'}>{t('title')}</h1>
      <p className={'inline-block text-xs'}>{'Easily Check Taiwan Invoice Lottery Tool.'}</p>
    </header>
  )
}
