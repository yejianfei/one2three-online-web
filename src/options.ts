export const CancelRuleOptions: {id: number, name: string}[] = [
  {
    id: 0,
    name: '无须审核'
  },
  {
    id: 1,
    name: '提交时间'
  },
  {
    id: 2,
    name: '预约时间'
  },
]

export const BooleanOptions: {id: number, name: string}[] = [
  {
    id: 0,
    name: '否'
  },
  {
    id: 1,
    name: '是'
  }
]

export const BooleanFilter: {[key: number]: string} = {
  0: '否',
  1: '是'
}