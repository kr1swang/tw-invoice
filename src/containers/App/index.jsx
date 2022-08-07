import React, { useEffect, useState } from 'react'
import { Card, Divider } from 'antd'
import Header from '../../components/Header'
import Invoice from '../../containers/Invoice'
import Footer from '../../components/Footer'
import { getPrizeSpce, getReceiptByApi } from '../../services/getReceipt'
import './style.scss'

export default function App() {
  const [spec, setSpec] = useState([])
  const [receipt, setReceipt] = useState([])
  const title = 'tw-invoice'
  const description = 'Easily Check Taiwan Invoice Lottery Tool.'
  const copyright = `Copyright © ${new Date().getFullYear()} by Kr1sWang.`
  const githubUrl = 'https://github.com/kr1swang/tw-invoice'

  useEffect(async () => {
    // always get spec
    setSpec(await getPrizeSpce())
    // try get receipt
    setReceipt(await getReceiptByApi())
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
