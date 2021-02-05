import { message } from 'antd'

export const checkWinng = (winNumbers, number) => {
  let result = {}

  if (winNumbers.cCode_1.slice(-3).includes(number)) {
    result = { number, isWinng: true }
    message.warning('請確認！與特別獎末三碼相同！')
  } else if (winNumbers.cCode_2.slice(-3).includes(number)) {
    result = { number, isWinng: true }
    message.warning('請確認！與特獎末三碼相同！')
  } else if (winNumbers.cCode_3.map((item) => item.slice(-3)).includes(number)) {
    result = { number, isWinng: true }
    message.success('恭喜中獎！與頭獎末三碼相同！')
  } else if (winNumbers.cCode_4.map((item) => item.slice(-3)).includes(number)) {
    result = { number, isWinng: true }
    message.success('恭喜中獎！與增開六獎相同！')
  } else {
    result = { number, isWinng: false }
    message.error('沒有中獎！再接再厲！')
  }

  return result
}