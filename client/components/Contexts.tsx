import { createContext, Dispatch, SetStateAction } from 'react'
import { globalServiceObj } from '../../types/types'

interface GlobalContext {
    globalNamespaces?: string[]
    setGlobalNamesapces?: Dispatch<SetStateAction<string[]>>
    globalServices?: globalServiceObj[]
    setGlobalServices?: Dispatch<SetStateAction<globalServiceObj[]>>
    globalTimer?: number
    setGlobalTimer?: Dispatch<SetStateAction<number>>
    globalServiceTest?: string
    setGlobalServiceTest?: Dispatch<SetStateAction<string>>
    showEditModal?: boolean
    setShowEditModal?: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext<GlobalContext>({})