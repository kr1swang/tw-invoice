import React from 'react'
import PropTypes from 'prop-types'
import { Input, Select, Form, Card } from 'antd'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

InputArea.propTypes = {
  options: PropTypes.array,
  selectValue: PropTypes.object,
  selectOnChange: PropTypes.func,
  numberValue: PropTypes.string,
  numberOnChange: PropTypes.func
}

export default function InputArea({
  options = [],
  selectValue = {},
  selectOnChange = () => undefined,
  numberValue = '',
  numberOnChange = () => undefined
}) {
  return (
    <Card className={'inputArea'}>
      <Form>
        <Form.Item {...formItemLayout} label={'開獎月份'}>
          <Select
            disabled={options.length === 0}
            value={selectValue.cTitle}
            onChange={selectOnChange}
            placeholder={'載入中...'}
          >
            {options.map((item, index) => (
              <Select.Option key={index} value={item.cTitle}>
                {item.cTitle}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...formItemLayout} label={'發票末三碼'}>
          <Input
            disabled={options.length === 0}
            value={numberValue}
            onChange={numberOnChange}
            placeholder={'請輸入發票末三碼.'}
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
