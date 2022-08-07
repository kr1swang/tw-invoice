import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Table, Space, Button } from 'antd'

WinHistory.propTypes = {
  winState: PropTypes.array
}

export default function WinHistory({ winState = [] }) {
  const [filter, setFilter] = useState('all')

  const dataSource = winState.filter((item) => {
    if ('all'.includes(filter)) {
      return item
    } else if ('isWin'.includes(filter)) {
      return item.isWinng
    } else {
      return !item.isWinng
    }
  })

  return (
    <Card className={'winHistory'}>
      <h3 className={'title'}>
        <Space>
          <span>{'對獎紀錄'}</span>
          <Button size={'small'} onClick={() => setFilter('all')}>
            {'全部'}
          </Button>
          <Button size={'small'} onClick={() => setFilter('isWin')}>
            {'中獎'}
          </Button>
          <Button size={'small'} onClick={() => setFilter('isLose')}>
            {'未中'}
          </Button>
        </Space>
      </h3>
      <Table dataSource={dataSource} rowKey={'index'} scroll={{ y: '40vh' }} pagination={false} size={'small'}>
        <Table.Column width={'150px'} dataIndex={'index'} title={'項次'} />
        <Table.Column
          title={'號碼'}
          dataIndex={'number'}
          render={(text, record) => (
            <span style={record.isWinng ? { color: 'red', fontWeight: 'bold' } : {}}>{text}</span>
          )}
        />
      </Table>
    </Card>
  )
}
