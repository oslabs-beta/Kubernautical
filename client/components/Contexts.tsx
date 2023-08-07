import { createContext, Dispatch, SetStateAction } from 'react'
import { globalServiceObj } from '../../types/types'

interface GlobalContext {
    globalNamespaces?: string[]
    setGlobalNamesapces?: Dispatch<SetStateAction<string[]>>
    globalServices?: globalServiceObj[]
    setGlobalServices?: Dispatch<SetStateAction<globalServiceObj[]>>
}

export const GlobalContext = createContext<GlobalContext>({})