import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import useSelectMonths from '../../hooks/useSelectMonths'
import useInputNumber from '../../hooks/useInputNumber'
import useWinState from '../../hooks/useWinState'
import InputArea from './InputArea'
import WinRate from './WinRate'
import PrizeDesc from './PrizeDesc'
import WinHistory from './WinHistory'
import { checkWinng } from '../../services/utils'
import './style.scss'

Invoice.propTypes = {
  prizeSpce: PropTypes.array,
  receipt: PropTypes.array
}

export default function Invoice({ prizeSpce = [], receipt = [] }) {
  const [options, setOptions, selectValue, selectOnChange] = useSelectMonths()
  const [numberValue, numberOnChange, numberSetValue] = useInputNumber()
  const [winState, addRecord] = useWinState()

  useEffect(() => {
    setOptions(receipt)
  }, [receipt])

  useEffect(() => {
    if (numberValue.length >= 3) {
      addRecord(checkWinng(selectValue, numberValue))
      numberSetValue('')
    }
  }, [numberValue])

  return (
    <div className={'invoice'}>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <InputArea
            options={options}
            selectValue={selectValue}
            selectOnChange={selectOnChange}
            numberValue={numberValue}
            numberOnChange={numberOnChange}
          />
        </Col>

        <Col span={8}>
          <WinRate winState={winState} />
        </Col>

        <Col span={12}>
          <PrizeDesc prizeList={prizeSpce} winNumbers={selectValue} />
        </Col>

        <Col span={12}>
          <WinHistory winState={winState} />
        </Col>
      </Row>
    </div>
  )
}
