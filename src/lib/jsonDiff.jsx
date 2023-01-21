import React from 'react'
import { JsonDiffObject } from './jsonDiffObject';


export const JsonDiff = (props) => {
 
  return (
    <>
    <JsonDiffObject
      baseJson={props.baseJson} compareJson={props.compareJson}
      level={["."]}
      isLastEntry={true}
      />
      </>
  )
}
