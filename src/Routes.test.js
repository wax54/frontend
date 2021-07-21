import { validUserContext, renderWithUserContext, renderWithUserContextAndWait } from './testHelpers';
import Routes from './Routes';

test("doesn't blow up", () => {
    renderWithUserContext(Routes);
    renderWithUserContext(Routes, {context: validUserContext});
});

test("matchesSnapshot", () => {
    const { asFragment } = renderWithUserContext(Routes);
    expect(asFragment()).toMatchSnapshot();
});

test("matchesSnapshot with valid user", () => {
    const { asFragment } = renderWithUserContext(Routes, { context: validUserContext });
    expect(asFragment()).toMatchSnapshot();
})

test("can navigate to different routes", () => {
    const { queryByText } = renderWithUserContext(
        Routes, {
        initialEntries: ['/login']
    });
    expect(queryByText('Login')).toBeInTheDocument();

});

test("can access protected Routes when logged in", () => {
    const { queryByText } = renderWithUserContext(
        Routes, { 
            context: validUserContext, 
            initialEntries: ['/companies'] 
        });
    expect(queryByText('Loading Companies...')).toBeInTheDocument();
});

test("can't access protected Routes when not logged in", () => {
    const { queryByText} = renderWithUserContext(
        Routes, 
        {initialEntries: ['/companies'] }
    );
    expect(queryByText('Loading Companies...')).not.toBeInTheDocument();
});

test("protected Route companies redirects to Home when not logged in", async () => {
    const { queryByText } = await renderWithUserContextAndWait(
        Routes,
        { initialEntries: ['/companies'] }
    );
    expect(queryByText('Please Login or Signup above!')).toBeInTheDocument();
});