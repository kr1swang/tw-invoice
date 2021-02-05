import React, { useEffect, useState } from 'react'
import { Card, Divider } from 'antd'
import { getReceipt } from '../../services/getReceipt'
import Header from '../../components/Header'
import Invoice from '../../containers/Invoice'
import Footer from '../../components/Footer'
import './style.scss'

export default function App() {
  const [receipt, useReceipt] = useState([])
  const title = 'tw-invoice'
  const description = 'Easily Check Taiwan Invoice Lottery Tool.'
  const copyright = `Copyright © ${new Date().getFullYear()} by Kr1sWang.`
  const githubUrl = 'https://github.com/kr1swang/ac-guide'

  useEffect(() => {
    getReceipt({}).then((resp) => {
      const result = resp.data
      useReceipt(result)
      console.log(result)
    }).catch((err) => {
      console.log('Fail! ' + err)
      alert('載入失敗😥\n請嘗試重新整理！')
    })
  }, [])

  return (
    <Card className={'app'}>
      <Header
        title={title}
        description={description}
      />
      <Divider />
      <Invoice
        receipt={receipt}
      />
      <Divider />
      <Footer
        copyright={copyright}
        githubUrl={githubUrl}
      />
    </Card>
  )
}
