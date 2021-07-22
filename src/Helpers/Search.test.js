import { render, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search Tests', ()=>{
    test("doesn't blow up", () => {
        render(<Search search={() => undefined}/>);
    });

    test("matchesSnapshot", () => {
        const { asFragment } = render(<Search search={ () => undefined }/>);
        expect(asFragment()).toMatchSnapshot();
    });

    test("matchesSnapshot", () => {
        let result = false;
        const { getByPlaceholderText } = render(<Search search={(term) => result=term} />);
        const searchBox = getByPlaceholderText('Search');

        expect(result).toBe(false);

        fireEvent.change(searchBox, { target: { value: 'test' } });

        expect(result).toEqual('test');
    });
});
