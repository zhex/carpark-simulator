import { Direction } from 'models/Bus';
import * as React from 'react';
import styled from 'styled-components';

export interface IBusProps {
    x: number;
    y: number;
    faceTo: Direction;
    className?: string;
    cellSize: number;
    width?: number;
    height?: number;
}

const Bus: React.SFC<IBusProps> = props => <div className={props.className} />;

const StyledBus = styled(Bus)`
    position: absolute;
    float: left;
    border-style: solid;
    border-width: 0 ${p => `${p.width! / 2}px`} ${p => `${p.height}px`};
    border-color: transparent transparent #dd4397 transparent;
    left: ${p => `${(p.cellSize - 20) / 2}px`};
    bottom: ${p => `${(p.cellSize - 15 / 2) / 2}px`};
    transform: translate(
            ${p => `${p.x * p.cellSize}px`},
            ${p => `${-1 * p.y * p.cellSize}px`}
        )
        rotate(${p => ((p.faceTo || 1) - 1) * 90}deg);
    transition: 0.3s all ease;
`;

StyledBus.defaultProps = {
    width: 20,
    height: 15,
};

export default StyledBus;
