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

export const HospitalGroupOptions: {id: string, name: string}[] = [
  {
    id: 'cn.com.one2three.hospital.doctor',
    name: '医生'
  },
  {
    id: 'cn.com.one2three.hospital.nurse',
    name: '护士'
  }
]

export const HospitalGroupFilter: {[key: string]: string} = {
  'cn.com.one2three.hospital.doctor': '医生',
  'cn.com.one2three.hospital.nurse': '护士'
}

export const UserTypeOptions: {id: number, name: string}[] = [
  {
    id: 0,
    name: '默认'
  },
  {
    id: 1,
    name: '医生端管理'
  }
]

export const UserTypeFilter: {[key: number]: string} = {
  0: '默认',
  1: '医生端管理'
}