import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'

import { getReceipt } from '@/api/receiptService'

export default function Home() {
  const { t } = useTranslation()
  const { data, error } = useSWR({}, getReceipt)

  error && console.error(error)

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={'p-4'}>
      <div className={'flex flex-col items-center gap-2'}>
        <h1 className={'text-2xl font-bold text-gray-600'}>{t('title')}</h1>
        <h6 className={'text-base text-gray-600'}>{t('subTitle')}</h6>

        {data && (
          <motion.code
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={'whitespace-pre rounded bg-gray-600 p-2 text-white'}
          >
            {JSON.stringify(data[0], null, 2)}
          </motion.code>
        )}
      </div>
    </motion.main>
  )
}
