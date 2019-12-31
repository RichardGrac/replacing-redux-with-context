import {useState, useEffect} from 'react'

let globalState = {}
let listeners = []
let actions = {}

export const useStore = (shouldListen = true) => {
    const setState = useState(globalState)[1]

    const dispatch = (actionIdentifier, payload) => {
        // Updating portion of global state
        const newState = actions[actionIdentifier](globalState, payload)
        globalState = {...globalState, ...newState}

        // Passing new global state to each component using store.js
        for (const listener of listeners) {
            listener(globalState)
        }
    }

    useEffect(() => {
        // A listener will be registered each time a new instance is created
        if (shouldListen) listeners.push(setState)

        return () => {
            // Listener will be removed when a component is unmounted
            if (shouldListen)
                listeners = listeners.filter(li => li !== setState)
        }
        // This scope will run just once, as React guarantees that setState is not going to change
    }, [setState])

    return [globalState, dispatch]
}

// Like combineActionCreators
export const initStore = (userActions, initialState) => {
    if (initialState){
        globalState = {...globalState, ...initialState}
    }
    actions = {...actions, ...userActions}
}
