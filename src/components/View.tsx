/*
 * @Author: yejianfei
 * @Date: 2023-04-03 10:38:56
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-03 23:33:37
 * @Description: 
 * @Developer: 
 */
import React from 'react'

type ViewProps = {

} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export default function View(props: ViewProps) {
  return (<div {...props}/>)
}