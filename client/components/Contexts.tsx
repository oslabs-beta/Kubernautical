import { createContext, type Dispatch, type SetStateAction } from 'react'
import { type globalServiceObj, type ClusterData } from '../../types/types'

export interface GlobalContextInterace {
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

  globalCrudChange?: boolean
  setGlobalCrudChange?: Dispatch<SetStateAction<boolean>>

  ongoingCrudChange?: boolean
  setOngoingCrudChange?: Dispatch<SetStateAction<boolean>>

  globalClusterContext?: string
  setGlobalClusterContext?: Dispatch<SetStateAction<string>>
}

export const GlobalContext = createContext<GlobalContextInterace>({})
