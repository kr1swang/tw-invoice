import React, { useEffect, useState } from 'react'
import { Card, Divider } from 'antd'
import Header from '../../components/Header'
import Invoice from '../../containers/Invoice'
import Footer from '../../components/Footer'
import { getPrizeSpce, getReceiptByApi } from '../../services/getReceipt'
import './style.scss'

export default function App() {
  const [spec, useSpec] = useState([])
  const [receipt, useReceipt] = useState([])
  const title = 'tw-invoice'
  const description = 'Easily Check Taiwan Invoice Lottery Tool.'
  const copyright = `Copyright © ${new Date().getFullYear()} by Kr1sWang.`
  const githubUrl = 'https://github.com/kr1swang/tw-invoice'

  useEffect(async () => {
    // always get spec
    useSpec(await getPrizeSpce())
    // try get receipt
    useReceipt(await getReceiptByApi())
  }, [])

  return (
    <Card className={'app'}>
      <Header title={title} description={description} />
      <Divider />
      <Invoice prizeSpce={spec} receipt={receipt} />
      <Divider />
      <Footer copyright={copyright} githubUrl={githubUrl} />
    </Card>
  )
}
