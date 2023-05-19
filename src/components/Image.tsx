import React from 'react'

type ImageProps = {

} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export default function Image(props: ImageProps) {
  return (<img {...props}/>)
}