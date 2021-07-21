import { validUserContext, renderWithUserContext } from './testHelpers';
import Home from './Home';

test("doesn't blow up", () => {
    renderWithUserContext(Home);
    renderWithUserContext(Home, {context: validUserContext});
});

test("matchesSnapshot", () => {
    const { asFragment } = renderWithUserContext(Home);
    expect(asFragment()).toMatchSnapshot();
});

test("matchesSnapshot with valid user", () => {
    const { asFragment } = renderWithUserContext(Home, {context: validUserContext});
    expect(asFragment()).toMatchSnapshot();
});