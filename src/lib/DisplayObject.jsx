import React from "react";
import { ArrayDifference } from "./ArrayDifference";
import { ArrayView } from "./ArrayView";
import { isNumOrStringOrBoolean } from "./constants";
import { JsonViewer } from "./JsonViewer";

export const DisplayObject = (props) => {
    const { value, keyValue,hideComma,action,level,isLastEntry } = props;
    console.log("DisplayObject",props);
    
    return (
        <div style={{ display: "flex" ,marginLeft:`${level.length*10}px` }}>
            <div style={{ minWidth:"16px"}}>{action?action==="added"?"+":"-":null}</div>
            {isNumOrStringOrBoolean(value) ? (
                <div style={{ display: "flex" }}>
                    
                    {keyValue&& <div className="json-viewer-title">{keyValue} :</div>}
                    
                    <div>{value}</div>
                    
                    <div>{!hideComma && <>,</>}</div>
                </div>
            ) : Array.isArray(value) ? (
                <ArrayView
                    array={value}
                    hideComma={hideComma}
                    keyValue={keyValue}
                    action={action}
                    level={level}
                    isLastEntry={isLastEntry}
                />
            ) : typeof value === "object" ? (
                <div>
                    <JsonViewer
                        json={value}
                        hideComma={hideComma}
                        keyValue={keyValue}
                        action={action}
                        level={level}
                        isLastEntry={isLastEntry}
                    />
                </div>
            ) : null}
        </div>
    );
};
