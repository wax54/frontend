import { useEffect, useState } from "react";

const useLocalStorageState = (storageName, init) => {
    const [state, setState] = useState(getState);

    function getState() {
        try {
            const storedState = localStorage[storageName];
            return storedState ? JSON.parse(storedState) : init;
        } catch (e) {
            console.error(e);
            return init
        }
    }

    useEffect(() => {
        localStorage[storageName] = JSON.stringify(state);
    }, [ state, storageName ]);

    return [ state, setState ]
};

export { useLocalStorageState }
