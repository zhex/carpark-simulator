import 'jest-styled-components';
import * as React from 'react';
import { create } from 'react-test-renderer';
import { Direction } from '../../models/Bus';

import Bus from '../Bus';

it('Bus Component', () => {
    const tree = create(<Bus x={5} y={5} cellSize={50} faceTo={Direction.North} />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('left', '15px');
    expect(tree).toHaveStyleRule('bottom', '21.25px');
    expect(tree).toHaveStyleRule('transform', 'translate( 250px, -250px ) rotate(0deg)');
});
