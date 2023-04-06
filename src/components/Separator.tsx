/*
 * @Author: yejianfei
 * @Date: 2023-04-03 23:32:37
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-06 13:00:16
 * @Description:
 * @Developer: 
 */
import React from 'react'
import View from './View'

type SeparatorProps = {
  size: number
  direction?: 	'vertical' | 'horizontal'
}

export default function Separator(props: SeparatorProps) {
  return (
    !props.direction || props.direction === 'vertical'
      ? <View style={{width: '100%', height: props.size}}/>
      : <View style={{width: props.size, height: '100%'}}/>
  )
}