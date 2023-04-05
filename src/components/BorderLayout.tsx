/*
 * @Author: yejianfei
 * @Date: 2023-04-03 10:37:15
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-04-03 12:50:16
 * @Description: 
 * @Developer: 
 */

import React from 'react'
import View from './View'

import './BorderLayout.scss'
import { type } from 'os'
import { isArray } from 'lodash'

type BorderLayoutProps = {
  children: any
}

type BorderCenterProps = {
  children: any
}

type BorderNorthProps = {
  height?: number
  children: any
}

type BorderSouthProps = {
  height?: number
  children: any
}

type BorderWestProps = {
  width?: number
  children: any
}

type BorderEastProps = {
  width?: number
  children: any
}

export function BorderCenter(props: BorderCenterProps) {
  return (
    <View className='center-panel'>{props.children}</View>
  )
}

export function BorderNorth(props: BorderNorthProps) {
  return (
    <View style={{height: props.height || 'auto'}} className='north-panel'>{props.children}</View>
  )
}

export function BorderSouth(props: BorderSouthProps) {
  return (
    <View style={{height: props.height || 'auto'}} className='south-panel'>{props.children}</View>
  )
}

export function BorderWest(props: BorderWestProps) {
  return (
    <View style={{width: props.width || 'auto'}} className='west-panel'>{props.children}</View>
  )
}

export function BorderEast(props: BorderEastProps) {
  return (
    <View style={{width: props.width || 'auto'}} className='east-panel'>{props.children}</View>
  )
}


//.north-pane

export default function BorderLayout(props: BorderLayoutProps) {
  const chidren = (isArray(props.children) ? props.children : [props.children])
    .reduce((previous, current) => {
      if (current.type === BorderCenter) {
        previous.center = current
      }

      if (current.type === BorderNorth) {
        previous.north = current
      }

      if (current.type === BorderSouth) {
        previous.south = current
      }

      if (current.type === BorderWest) {
        previous.west = current
      }

      if (current.type === BorderEast) {
        previous.east = current
      }
        

      return previous
    }, {} as any)



  console.log(chidren)

  return (
    <View className='boder-layout'>
        {chidren.north}
        <View className='center-container'>
          {chidren.west}
          {chidren.center}
          {chidren.east}
        </View>
        {chidren.south}
    </View>
  )
}