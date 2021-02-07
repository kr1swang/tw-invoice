import React, { useEffect, useState } from 'react'
import { Card, Divider } from 'antd'
import Header from '../../components/Header'
import Invoice from '../../containers/Invoice'
import Footer from '../../components/Footer'
import { getReceipt } from '../../services/getReceipt'
import receiptBackup from '../../assets/receipt.json'
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
      console.log('Success! ' + resp)
    }).catch((err) => {
      useReceipt(receiptBackup)
      console.log('Fail! ' + err)
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
