import { renderAndWaitFor} from './testHelpers';
import App from './App';

test("doesn't blow up", async () => {
    await renderAndWaitFor(App);
});

test("matchesSnapshot", async () => {
    const { asFragment } = await renderAndWaitFor(App);
    expect(asFragment()).toMatchSnapshot();
});
