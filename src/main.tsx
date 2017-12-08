import * as React from 'react';
import { render } from 'react-dom';

import Bus from 'components/Bus';
import CarPark from 'components/CarPark';

render(
    <CarPark rows={5} cols={5} cellSize={50}>
        <Bus x={4} y={4} cellSize={50} faceTo={1} />
    </CarPark>,
    document.getElementById('app'),
);
