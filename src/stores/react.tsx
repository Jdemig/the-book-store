'use client';

import { createContext, useContext, ReactNode } from 'react';
import rootStore, {RootStore} from "./index";

const StoreContext = createContext<RootStore | undefined>(undefined);

// create the provider component
export function RootStoreProvider({ children }: { children: ReactNode }): JSX.Element {
    //only create the store once ( store is a singleton)
    const root = rootStore ?? new RootStore()

    return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
}

// create the hook
export function useRootStore(): RootStore {
    const context = useContext(StoreContext)
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider")
    }

    return context
}
