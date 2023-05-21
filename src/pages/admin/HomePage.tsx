/*
 * @Author: yejianfei
 * @Date: 2023-04-03 13:49:48
 * @LastEditors: yejianfei
 * @LastEditTime: 2023-05-21 22:04:58
 * @Description: 
 * @Developer: 
 */
import React from 'react'
import View from '../../components/View'
import Text from '../../components/Text'

export default class AdminHomePage extends React.Component {
  render(): React.ReactNode {
    return (
      <View 
        style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%', 
          height: '100%',
          background: 'url(/images/welcome-bg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        }}
      >
        <View>
          <Text style={{'fontSize': 24, fontWeight: 'normal', color: '#666666'}}>{`欢迎使用万图随预约随访运营系统 ${ENV.application.version}`}</Text>
        </View>
        
      </View>
    )
  }
}