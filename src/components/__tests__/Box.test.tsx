import 'jest-styled-components';
import * as React from 'react';
import { create } from 'react-test-renderer';

import Box, { Container } from '../Box';

it('Container Component', () => {
    const tree = create(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Box Button Component', () => {
    const tree = create(<Box />).toJSON();
    expect(tree).toMatchSnapshot();
});
