import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import UserContext from './UserContext';

const validUserContext = {
    user: {
        username: "wax54",
        firstName: "Sam",
        lastName: "Crewe-Sullam",
        email: "wax654@gmail.c om",
        isAdmin: false,
        applications: [1, 2, 3]
    },
    isLoggedIn: true
}

function preRender(options={}) {
    const defaultOptions = {
        initialEntries: ['/'],
        context: {
            user: {},
            isLoggedIn: false
        }
    }
    const newOptions = {
        initialEntries: 
            [...(options.initialEntries || []), ...defaultOptions.initialEntries],
        context: 
            { ...defaultOptions.context, ...(options.context || {}) }
    }
    //console.log('options: ', options, 'newOptions', newOptions);
    return newOptions;
}

function renderWithRouter(Component, options) {
    options = preRender(options);
    return render(
        <MemoryRouter initialEntries={options.initialEntries}>
            <Component />
        </MemoryRouter>
    );
}

async function renderAndWaitFor(Component, options) {
    options = preRender(options);
    return await waitFor(() => render(
        <MemoryRouter initialEntries={options.initialEntries}>
            <Component />
        </MemoryRouter>
    ));
}


function renderWithUserContext(Component, options) {
    options = preRender(options);
    return render(
        <MemoryRouter initialEntries={options.initialEntries}>
            <UserContext.Provider value={options.context} >
                <Component />
            </UserContext.Provider>
        </MemoryRouter>
    );
}

async function renderWithUserContextAndWait(Component, options) {
    options = preRender(options);
    return await waitFor(() => render(
        <MemoryRouter initialEntries={options.initialEntries}>
            <UserContext.Provider value={options.context} >
                <Component />
            </UserContext.Provider>
        </MemoryRouter>
    ));
}



export { validUserContext, 
    renderWithRouter, 
    renderAndWaitFor, 
    renderWithUserContext, 
    renderWithUserContextAndWait }