import React from 'react'
import PropTypes from 'prop-types'
import { Card, Statistic } from 'antd'

WinRate.defaultProps = {
  winState: []
}

WinRate.propTypes = {
  winState: PropTypes.array
}

export default function WinRate({ winState }) {
  const totalCount = winState.length
  const winnigCount = winState.filter((item) => item.isWinng).length
  const subTitle = totalCount > 0 ? `( ${winnigCount} / ${totalCount} )` : ''
  const rate = totalCount > 0 ? (winnigCount / totalCount * 100) : 0

  return (
    <Card className={'winRate'}>
      <Statistic
        title={`中獎機率 ${subTitle}`}
        value={rate}
        precision={1}
        suffix={'%'}
        valueStyle={{ textAlign: 'center', fontSize: '2em' }}
      >
      </Statistic>
    </Card>
  )
}