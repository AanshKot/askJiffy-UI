'use client'

import { Provider } from 'jotai'
import { ReactNode } from 'react'

interface Props{
    children: ReactNode
}

export const JotaiProvider = ({children} : Props) => {
    return(
        <Provider>
            {children}
        </Provider>
    )
}