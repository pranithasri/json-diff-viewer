import React from 'react'
import { ArrayView } from './ArrayView';
import { closeSquare, isNumOrStringOrBoolean, openSquare } from './constants';
import { DisplayObject } from './DisplayObject';
import { JsonDiffObject } from './jsonDiffObject';
import { JsonViewer } from './JsonViewer';

export const ArrayDifference = (props) => {
  const { baseArray,
    compareArray, hideComma, keyValue,level,isLastEntry } = props
  const getNewlyAddedIndexes = () => {
    const array = []
    for (let index = 0; index < compareArray.length; index++) {
      if (index > baseArray.length - 1) {
        array.push(index);
      }
    }
    return array;
  }

  const getRemovedIndexes = () => {
    const array = []
    for (let index = 0; index < baseArray.length; index++) {
      if (index > compareArray.length - 1) {
        array.push(index);
      }
    }
    return array;
  }

  const getChangedIndexes = () => {
    const array = []
    for (let index = 0; index < baseArray.length; index++) {
      if (compareArray[index] && baseArray[index] !== compareArray[index]) {
        array.push(index);
      }
    }
    return array;
  }

  const getUnChangedIndexes = () => {
    const array = []
    for (let index = 0; index < baseArray.length; index++) {
      if (compareArray[index] && baseArray[index] === compareArray[index]) {
        array.push(index);
      }
    }
    return array;
  }

  const newlyAddedIndexes = getNewlyAddedIndexes();
  const removedIndexes = getRemovedIndexes();
  const changedIndexes = getChangedIndexes();
  const unchangedIndexes = getUnChangedIndexes();
  console.log(baseArray, newlyAddedIndexes, "newlyAddedIndexes", removedIndexes, compareArray, changedIndexes, unchangedIndexes)
  return (
    <div style={{marginLeft:`${level.length*10}px`}}>

      <div style={{ display: "flex",marginLeft:"16px" }} className="array-start">{keyValue && <div>{keyValue} : &nbsp;</div>}{openSquare}</div>
      <div style={{marginLeft:`${level.length*10}px`}}>
        {
          unchangedIndexes.map((a, index) =>
          
            <>
       
              <div>
              <DisplayObject value={baseArray[a]}  index={index} hideComma={index === unchangedIndexes.length - 1 && (changedIndexes.length===0 && removedIndexes.length===0 && newlyAddedIndexes.length===0)}  level={level} isLastEntry={ changedIndexes.length===0 && removedIndexes.length===0 && newlyAddedIndexes.length===0}/>
               
              </div>

            </>


          )

        }
        {
          changedIndexes.map((a, index) => {
            return (
              <>

                {
                  Array.isArray(baseArray[a]) && Array.isArray(compareArray[a]) ?


                    <div style={{ display: "flex" }}>


                      <div>
                        <ArrayDifference
                          baseArray={baseArray[a]}
                          compareArray={compareArray[a]}
                          level={level}
                          isLastEntry={ changedIndexes.length===0 && (removedIndexes.length===0 && newlyAddedIndexes.length===0)}
                        />
                      </div>
                    </div>


                    :
                    (!Array.isArray(baseArray[a]) && typeof baseArray[a] === 'object') && (!Array.isArray(compareArray[a]) && typeof compareArray[a] === 'object') ?


                      <div style={{ display: "flex" }}>


                        <div>
                          <JsonDiffObject
                            baseJson={baseArray[a]}
                            compareJson={compareArray[a]}
                            level={level}
                            isLastEntry={ changedIndexes.length===0 && removedIndexes.length===0 && newlyAddedIndexes.length===0}
                          />
                        </div>
                      </div> :



                      [baseArray[a], compareArray[a]].map((value, indexOfValue) =>



                        <div style={{ backgroundColor: indexOfValue === 0 ? "#FAAFD7" : "#A9FAFD" }}>
                         
                          <DisplayObject value={value}  index={index} hideComma={index===changedIndexes.length - 1 &&(removedIndexes.length===0 && newlyAddedIndexes.length===0)}  level={level} action={indexOfValue === 0 ? "added" : "removed"} isLastEntry={ changedIndexes.length===0 && removedIndexes.length===0 && newlyAddedIndexes.length===0}/>
                         
                        </div>


                      )
                }

              </>
            )
          }
          )

        }

        {
          removedIndexes.map((a, index) => {
            return (
              <>
              
                <div style={{ backgroundColor: "#FAAFD7" }}>
                <DisplayObject value={baseArray[a]} index={index} hideComma={index === removedIndexes.length - 1 && newlyAddedIndexes.length===0}  level={level} action="removed" isLastEntry={index === removedIndexes.length - 1 && newlyAddedIndexes.length===0} />
                 
                </div>

              </>
            )
          }
          )

        }
        {
          newlyAddedIndexes.map((a, index) => {
            return (
              <>
                <div style={{ backgroundColor: "#A9FAFD" }}>
                <DisplayObject value={compareArray[a]} index={index} hideComma={index === newlyAddedIndexes.length - 1}  level={level} action="added" isLastEntry={index === newlyAddedIndexes.length - 1}/>
                  
                </div>

              </>
            )
          }
          )

        }


      </div>

      <div style={{ display: "flex" }} className="array-end">{closeSquare}{!isLastEntry&& <>,</>}</div>
    </div>

  )
}
