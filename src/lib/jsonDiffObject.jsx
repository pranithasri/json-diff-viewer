import React from "react";
import { ArrayDifference } from "./ArrayDifference";
import { ArrayView } from "./ArrayView";
import {
  closeFlower,
  closeSquare,
  openFlower,
  openSquare,
  isNumOrStringOrBoolean,
} from "./constants";
import { DisplayObject } from "./DisplayObject";
import { JsonDiffViewer } from "./JsonDiffViewer";
import { JsonViewer } from "./JsonViewer";
import "./jsonViewer.css";

export const JsonDiffObject = (props) => {
  const { baseJson, compareJson, keyValue, level, isLastEntry } = props;
  console.log("PROPSSS",props)
  const keysInBaseJson = Object.keys(baseJson);
  const keysInComapreJson = Object.keys(compareJson);
  const keysOnlyInBase = keysInBaseJson.filter(
    (a) => !keysInComapreJson.includes(a)
  );
  const keysOnlyInCompare = keysInComapreJson.filter(
    (a) => !keysInBaseJson.includes(a)
  );
  const changedFields = keysInBaseJson.filter(
    (a) => compareJson[a] && baseJson[a] !== compareJson[a]
  );
  const unChangedFields = keysInBaseJson.filter((a) => {
    console.log(
      "compareJson[a] && baseJson[a] && baseJson[a] === compareJson[a]",
      a,
      compareJson[a],
      baseJson[a],
      compareJson[a] && baseJson[a] && baseJson[a] === compareJson[a]
    );
    return compareJson[a] && baseJson[a] && baseJson[a] === compareJson[a];
  });

  console.log(
    "Props",
    keysInBaseJson,
    keysInComapreJson,
    keysOnlyInBase,
    unChangedFields,
    changedFields,
    keysOnlyInCompare
  );
  // const keysList = Object.keys(json);
  return (
    <>
    {
      typeof baseJson !=="object" || typeof compareJson!=="object"?
      <div>Invalid Json Formats</div>:
      (typeof baseJson ==="object" && Array.isArray(compareJson))||(
        typeof compareJson ==="object" && Array.isArray(baseJson)
      )?
      <JsonDiffViewer
      compareJson={compareJson}
      baseJson={baseJson}/>:
      (Array.isArray(baseJson) && Array.isArray(compareJson))?
      <ArrayDifference
      baseArray={baseJson}
      compareArray={compareJson}
      />:
      
    <>
      <div
        style={{ display: "flex", marginLeft: `${level.length * 10}px` }}
        className="object-start"
      >
        <div style={{ marginLeft: "16px" }}>
          {" "}
          {keyValue && <>{keyValue} : &nbsp;</>} {openFlower}
        </div>
      </div>
      {unChangedFields.length > 0 && (
        <div
          className="json-viewer"
          style={{ marginLeft: `${level.length * 10}px` }}
        >
          {unChangedFields.map((keyValue, index) =>
            [baseJson[keyValue]].map((value, indexOfCompare) => {
              
              return (
               
                <>
                 
                  <DisplayObject
                    value={value}
                    keyValue={keyValue}
                    index={index}
                    hideComma={
                     index === unChangedFields.length-1 && !(changedFields.length > 0 ||
                      keysInBaseJson.length > 0 ||
                      keysInComapreJson.length > 0)
                    }
                    level={level.concat(keyValue)}
                    isLastEntry={
                      changedFields.length === 0 &&
                      keysInBaseJson.length === 0 &&
                      keysInComapreJson.length === 0
                    }
                  />
                </>
              );
            })
          )}
        </div>
      )}
      {changedFields.length > 0 && (
        <div
          className="json-viewer"
          style={{ marginLeft: `${level.length * 10}px` }}
        >
          {changedFields.map((keyValue, index) =>
            Array.isArray(baseJson[keyValue]) &&
            Array.isArray(compareJson[keyValue]) ? (
              <div style={{ display: "flex" }}>
                {/* <div className='json-viewer-title'>{keyValue} :</div> */}
                <div>
                  <ArrayDifference
                    baseArray={baseJson[keyValue]}
                    compareArray={compareJson[keyValue]}
                    keyValue={keyValue}
                    level={level.concat(keyValue)}
                    isLastEntry={index === changedFields.length - 1 &&  (keysInBaseJson.length === 0 &&
                      keysInComapreJson.length === 0)}
                    
                  />
                </div>
              </div>
            ) : !Array.isArray(baseJson[keyValue]) &&
              typeof baseJson[keyValue] === "object" &&
              !Array.isArray(compareJson[keyValue]) &&
              typeof compareJson[keyValue] === "object" ? (
              <div style={{ display: "flex" }}>
                {/* <div className='json-viewer-title'>{keyValue} :</div> */}
                <div>
                  {console.log("KEYYYY,keyValue===", keyValue)}
                  <JsonDiffObject
                    baseJson={baseJson[keyValue]}
                    compareJson={compareJson[keyValue]}
                    keyValue={keyValue}
                    level={level.concat(keyValue)}
                    isLastEntry={
                      index === changedFields.length - 1 &&  (keysInBaseJson.length === 0 &&
                        keysInComapreJson.length === 0)
                    }

                  />
                </div>
              </div>
            ) : (
              [baseJson[keyValue], compareJson[keyValue]].map(
                (value, indexOfCompare) => {
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          backgroundColor:
                            indexOfCompare === 1 ? "#A9FAFD" : "#FAAFD7",
                        }}
                      >
                        <DisplayObject
                          value={value}
                          keyValue={keyValue}
                          index={index}
                          hideComma={index === changedFields.length - 1 &&  (keysInBaseJson.length === 0 &&
                            keysInComapreJson.length === 0)}
                          action={indexOfCompare === 1 ? "added" : "removed"}
                          level={level.concat(keyValue)}
                          isLastEntry={
                            keysInBaseJson.length === 0 &&
                            keysInComapreJson.length === 0
                          }
                        />
                      </div>
                    </>
                  );
                }
              )
            )
          )}
        </div>
      )}
      {keysOnlyInBase.length > 0 && (
        <div
          className="json-viewer"
          style={{ marginLeft: `${level.length * 10}px`,backgroundColor: "#FAAFD7" }}
        >
          {keysOnlyInBase.map((keyValue, index) => {
            console.log("keyValuee",keyValue,index,keysInComapreJson.length)
            return (
              <>
            
               
                <DisplayObject
                  value={baseJson[keyValue]}
                  keyValue={keyValue}
                  index={index}
                  hideComma={index === keysOnlyInBase.length - 1 && keysInComapreJson.length === 0}
                  level={level.concat(keyValue)}
                  isLastEntry={keysInComapreJson.length === 0}
                />
              </>
            );
          })}
        </div>
      )}
      {keysOnlyInCompare.length > 0 && (
        <div
          className="json-viewer"
          style={{ marginLeft: `${level.length * 10}px` }}
        >
          {keysOnlyInCompare.map((keyValue, index) => {
            return (
              <>
               
                <div style={{ backgroundColor: "#A9FAFD" }}>
                  <DisplayObject
                    value={compareJson[keyValue]}
                    keyValue={keyValue}
                    index={index}
                    hideComma={index === keysOnlyInCompare.length - 1}
                    action={"added"}
                    level={level.concat(keyValue)}
                    isLastEntry={true}
                  />
                </div>
              </>
            );
          })}
        </div>
      )}
      <div
        style={{ display: "flex", marginLeft: `${level.length * 10}px` }}
        className="object-end"
      >
        {closeFlower}
        {isLastEntry !== true && <>,</>}
      </div>
      </>}
    </>
  );
};
