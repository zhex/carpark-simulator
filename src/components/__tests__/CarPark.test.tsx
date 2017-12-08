import 'jest-styled-components';
import * as React from 'react';
import { create } from 'react-test-renderer';

import CarPark, { StyledCell, StyledRow } from '../CarPark';

it('CarPark Component', () => {
    const tree = create(<CarPark cols={5} rows={5} cellSize={50} />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', '250px');
});

it('Cell Component', () => {
    const tree = create(<StyledCell size={50} />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('height', '50px');
    expect(tree).toHaveStyleRule('flex', '1');
});

it('Row Component', () => {
    const tree = create(<StyledRow />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('display', 'flex');
});
