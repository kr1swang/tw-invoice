import React from 'react'
import PropTypes from 'prop-types'
import { Card, Table } from 'antd'

PrizeDesc.defaultProps = {
  prizeList: [],
  winNumbers: {}
}

PrizeDesc.propTypes = {
  prizeList: PropTypes.array,
  winNumbers: PropTypes.object
}

export default function PrizeDesc({ prizeList, winNumbers }) {
  const dataSource = prizeList.map((item) => (
    { ...item, number: Array.isArray(winNumbers[item.mapping]) ? winNumbers[item.mapping].join(', ') : winNumbers[item.mapping] }
  ))

  return (
    <Card className={'prizeDesc'}>
      <h3 className={'title'}>{winNumbers.cTitle || '中獎號碼'}</h3>
      <Table
        dataSource={dataSource}
        rowKey={'prize'}
        scroll={{ y: '40vh' }}
        pagination={false}
        size={'small'}
      >
        <Table.Column width={'100px'} title={'獎別'} dataIndex={'name'} />
        <Table.Column title={'中獎號碼'} render={(_text, record) => (
          <>
            {record.number && <h4>{record.number}</h4>}
            <h5>{record.rule}</h5>
          </>
        )} />
      </Table>
    </Card>
  )
}