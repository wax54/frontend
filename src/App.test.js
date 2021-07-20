import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';

test("doesn't blow up", () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
});
