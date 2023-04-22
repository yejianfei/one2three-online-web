/*
 * @Author: yejianfei
 * @Date: 2023-04-22 16:23:26
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-22 16:24:07
 * @Description: 
 * @Developer: 
 */
import React from 'react'

type TextProps = {

} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export default function Text(props: TextProps) {
  return (<span {...props}/>)
}