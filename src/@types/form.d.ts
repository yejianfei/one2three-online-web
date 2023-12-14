declare type LoginForm = {
  email: string
  pass: string
}

declare type Question = {
  id: string
  title: string
  options: string[]
}

declare type Organization = {
  id: string
  parent_id: string
  path: string
  type: string
  name: string
  code: string
  desc: string
  address: string
  extra?: {
    appointment_confirm?: number
    doctor_option?: number
    cancel_rule?: number
    cancel_rule_hour?: number
    doctor_schedule?: number
  }
}