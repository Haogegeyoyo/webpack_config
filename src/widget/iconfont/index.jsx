
import React ,{Component} from 'react'

const IconFont =(props)=> {
  // 可以设置 src className style 属性
  let { src="",className,style} = props
  return (
    //  类名为 组件属性与 icon 类型 进行拼接  style 直接等于 组件设置的 style
    <svg className={[ "icon",className ].join(" ")}  style={style} aria-hidden="true">
        {/* icon 名 ,与 # 拼接*/}
        <use xlinkHref={"#"+src}></use>
    </svg>
  )
}
export default IconFont