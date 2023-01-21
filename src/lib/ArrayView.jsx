import React from 'react'
import { openSquare, closeSquare, isNumOrStringOrBoolean } from './constants'
import { DisplayObject } from './DisplayObject'
import { JsonViewer } from "./JsonViewer"


export const ArrayView = (props) => {
    const { array, hideComma, keyValue,level,isLastEntry } = props
    return ( 
        <div >

            <div style={{ display: "flex" }} className="array-start">{keyValue && <div>{keyValue} : &nbsp;</div>}{openSquare}</div>
            <div  >
                {
                    array.map((a, index) => {
                        return (
                            <>
                                <div >
                                <DisplayObject value={a}  index={index} hideComma={index === array.length - 1}  level={level} isLastEntry={index === array.length - 1}/>
                                    
                                </div>

                            </>
                        )
                    }
                    )
                }

            </div>

            <div style={{ display: "flex" }} className="array-end">{closeSquare}{isLastEntry !== true && <>,</>}</div>
        </div>
    )
}
