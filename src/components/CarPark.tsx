import { Direction } from 'models/Bus';
import { IPosition } from 'models/interfaces/IPosition';
import * as React from 'react';
import styled from 'styled-components';

export interface ICarParkProps {
    rows: number;
    cols: number;
    position?: IPosition;
    faceTo?: Direction;
    className?: string;
    cellSize: number;
}

export interface ICellProps {
    size: number;
    className?: string;
}

export interface IRowProps {
    className?: string;
}

function createArray(n: number): any[] {
    return Array.from(new Array(n));
}

const Cell: React.SFC<ICellProps> = props => (
    <div className={props.className} />
);

export const StyledCell = styled(Cell)`
    position: relative;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: ${p => p.size + 'px'};
    flex: 1;
`;

const Row: React.SFC<IRowProps> = props => (
    <div className={props.className}>{props.children}</div>
);

export const StyledRow = styled(Row)`
    display: flex;
`;

const CarPark: React.SFC<ICarParkProps> = props => {
    const { faceTo, position, rows, cols, className, cellSize } = props;
    return (
        <div className={className}>
            {createArray(rows).map((row, idx) => (
                <StyledRow key={idx}>
                    {createArray(cols).map((col, colIdx) => (
                        <StyledCell key={colIdx} size={cellSize} />
                    ))}
                </StyledRow>
            ))}
            {props.children}
        </div>
    );
};

const StyledCarPark = styled(CarPark)`
    position: relative;
    width: ${p => `${p.cellSize! * p.cols}px`};
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
`;

export default StyledCarPark;
