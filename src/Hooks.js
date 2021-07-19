import { useState } from "react";

const useLocalStorageState = (storageName, init) => {

    const [state, setState] = useState(getState());
    storeState(state);

    function getState () {
        const storedState = localStorage[storageName]
        return  storedState ? JSON.parse(storedState) : init;
    }

    function storeState(currState) {
        localStorage[storageName] = JSON.stringify(currState);
    }

    function  updateState (newState) {
        setState(newState);
        storeState(newState)
    }

    return [state, updateState]
};

export { useLocalStorageState }
