import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import Homepage from '../Pages/Homepage/Homepage'
import Detail from '../Pages/Detail/Detail'

export const myContext = createContext()

export default function Context({ children }) {

    const [mode, setMode] = useState(true)


    return (
        <div>
            <myContext.Provider value={{ mode, setMode }}>
                {children}
            </myContext.Provider>
        </div>
    )
}