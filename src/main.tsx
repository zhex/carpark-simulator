import * as React from 'react';
import { render } from 'react-dom';

import { Bus } from 'models/Bus';
import { Commander } from 'models/Commander';
import { Park } from 'models/Park';

import App from 'components/App';

const commandContent = `
PLACE 0,0,NORTH
RIGHT
MOVE
MOVE
LEFT
MOVE
MOVE
REPORT
`;

const park = new Park(5, 5);
const bus = new Bus(park);
const cmder = Commander.load(commandContent);

render(
    <App bus={bus} commands={cmder.commands} />,
    document.getElementById('app'),
);
