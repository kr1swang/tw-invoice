import { Noto_Sans_TC, Work_Sans } from 'next/font/google'

export const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

export const WorkSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})
