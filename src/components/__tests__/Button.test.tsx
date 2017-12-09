import 'jest-styled-components';
import * as React from 'react';
import { create } from 'react-test-renderer';

import Button, { PrimaryButton } from '../Button';

it('Button Component', () => {
    const tree = create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Primary Button Component', () => {
    const tree = create(<PrimaryButton />).toJSON();
    expect(tree).toMatchSnapshot();
});
