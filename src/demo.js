import React, { useState } from 'react'
import { fromEvent } from 'rxjs'
import { mergeMap, pluck, debounceTime } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

const Demo = () => {

    const[name,setName]=useState('')
    const onChangeName=({target})=>{
        setName(target.value)
    }

    const url='http://localhost:9898/api/person/get'
    const click$=fromEvent(document,'click')

    click$.pipe(
        debounceTime(5000),
        mergeMap(()=>ajax({
            url:url,
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:{name}
        }).pipe(
            pluck('response','result')
        ))
    ).subscribe(console.log)

    return (
     <div>
         <h1>Hello World</h1>
         <hr/>
         <input
            value={name}
            onChange={onChangeName}
         />
     </div>
    )
}

export default Demo
