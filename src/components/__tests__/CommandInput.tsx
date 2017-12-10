import 'jest-styled-components';
import * as React from 'react';
import { create } from 'react-test-renderer';

import CommandInput from '../CommandInput';

it('CommandList Component', () => {
    const tree = create(<CommandInput />).toJSON();
    expect(tree).toMatchSnapshot();
});
