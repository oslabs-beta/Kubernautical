import { createContext, Dispatch, SetStateAction } from 'react'
import { globalServiceObj } from '../../types/types'

interface GlobalContext {
    globalNamespaces?: string[]
    setGlobalNamesapces?: Dispatch<SetStateAction<string[]>>
    globalServices?: globalServiceObj[]
    setGlobalServices?: Dispatch<SetStateAction<globalServiceObj[]>>
    globalTimer?: number
    setGlobalTimer?: Dispatch<SetStateAction<number>>
}

export const GlobalContext = createContext<GlobalContext>({})


//const end = Date.now() + (duration * 1000);
    //print end - Date.now() / 1000 

    //all of global state is gone
    