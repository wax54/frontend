import { validUserContext, renderWithUserContext } from './testHelpers';
import NavBar from './NavBar';

test("doesn't blow up", () => {
    renderWithUserContext(NavBar);
    renderWithUserContext(NavBar, { context: validUserContext });
});

test("matchesSnapshot", () => {
    const { asFragment } = renderWithUserContext(NavBar);
    expect(asFragment()).toMatchSnapshot();
});

test("matchesSnapshot with valid user", () => {
    const { asFragment } = renderWithUserContext(NavBar, { context: validUserContext });
    expect(asFragment()).toMatchSnapshot();
});