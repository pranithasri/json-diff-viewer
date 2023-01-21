import React from 'react'
import { ArrayView } from './ArrayView';
import { closeFlower, closeSquare, openFlower, openSquare, isNumOrStringOrBoolean } from './constants';
import { DisplayObject } from './DisplayObject';
import "./jsonViewer.css"

export const JsonViewer = (props) => {
    const { json, hideComma, keyValue,level,isLastEntry } = props;
    const keysList = Object.keys(json);
    return (
        <div className="json-viewer">
            <div style={{ display: "flex" }} className="object-start">{keyValue && <div>{keyValue} : &nbsp;</div>}<div>{openFlower}</div></div>
            {keysList.map((keyValue, index) => {
                return (
                    <>
                    <DisplayObject value={json[keyValue]} keyValue={keyValue} index={index} hideComma={index===keysList.length - 1} level={level.concat(keyValue)} isLastEntry={index===keysList.length - 1}/>
                       

                    </>
                )
            }

            )

            }
            <div style={{ display: "flex" }} className="object-end">{closeFlower}{!isLastEntry && <>,</>}</div>
        </div>
    )
}
