import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';

test("doesn't blow up", async () => {
    await waitFor(() => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
    });
});
