import * as React from 'react';
import { render } from 'react-dom';

import CarPark from 'components/CarPark';

render(
    <CarPark rows={5} cols={5} cellSize={50} />,
    document.getElementById('app'),
);
