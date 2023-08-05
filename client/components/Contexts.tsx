import { createContext, Dispatch, SetStateAction } from 'react'

interface GlobalContext {
    globalNamespaces?: string[]
    setGlobalNamesapces?: Dispatch<SetStateAction<string[]>>
}

export const GlobalContext = createContext<GlobalContext>({})