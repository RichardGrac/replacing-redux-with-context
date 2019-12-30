import {useState, useEffect} from 'react'

let globalState = {}
let listeners = []
let actions = {}

export const useStore = () => {
    const setState = useState(globalState)[1]

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload)
        globalState = {...globalState, ...newState}
    }

    for (const listener of listeners) {
        listener(globalState)
    }

    useEffect(() => {
        // A listener will be registered each time a new instance is created
        listeners.push(setState)

        return () => {
            // Listener will be removed when a component is unmounted
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
