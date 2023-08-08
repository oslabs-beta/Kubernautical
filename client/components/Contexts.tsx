import { createContext, Dispatch, SetStateAction } from 'react'
import { globalServiceObj, ClusterData } from '../../types/types'

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
    globalClusterData?: ClusterData
    setGlobalClusterData?: Dispatch<SetStateAction<ClusterData>>
}

export const GlobalContext = createContext<GlobalContext>({})