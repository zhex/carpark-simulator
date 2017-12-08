import 'jest-styled-components';
import * as React from 'react';
import { create } from 'react-test-renderer';

import CommandList from '../CommandList';

const commands = [
    { name: 'PLACE', args: [0, 0, 'NORTH'] },
    { name: 'MOVE', args: [] },
    { name: 'RIGHT', args: [] },
    { name: 'REPORT', args: [] },
];

it('CommandList', () => {
    const tree = create(
        <CommandList commands={commands} currentIdx={2} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
