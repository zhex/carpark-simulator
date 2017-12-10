import * as React from 'react';
import { render } from 'react-dom';

import { Bus } from 'models/Bus';
import { Commander } from 'models/Commander';
import { Park } from 'models/Park';

import App from 'components/App';

const park = new Park(5, 5);
const bus = new Bus(park);

render(
    <App bus={bus}/>,
    document.getElementById('app'),
);
