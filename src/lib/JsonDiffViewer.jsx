import React from 'react'
import { DisplayObject } from './DisplayObject'


export const JsonDiffViewer = (props) => {
 const {baseJson,compareJson}=props
  return (
    [baseJson,compareJson].map((value,index)=>{
    
   return <div style={{backgroundColor:index === 1?"#A9FAFD":"#FAAFD7"}}>
   <DisplayObject
    value={value}
  
    index={index}
    hideComma={
     true
    }
    level={["."]}
    isLastEntry={
      true
    }
    action={index === 1 ? "added" : "removed"}
  />
  </div>
}
    )
  )
}

