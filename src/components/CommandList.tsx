import { ICmd } from 'models/interfaces/ICmd';
import * as React from 'react';
import styled from 'styled-components';

export interface ICommandListProps {
    commands: ICmd[];
    className?: string;
    currentIdx?: number;
}

const ListItem = styled.li`
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 5px;
    font-size: 13px;
`;

const ListItemActive = ListItem.extend`
    background: lightgreen;
`;

const CommandList: React.SFC<ICommandListProps> = props => (
    <ul className={props.className}>
        {props.commands.map((cmd, idx) => {
            const Comp = props.currentIdx === idx ? ListItemActive : ListItem;
            return (
                <Comp key={idx}>
                    {cmd.name}
                    {cmd.args.length > 0 && <span> - {cmd.args.join(', ')}</span>}
                </Comp>
            );
        })}
    </ul>
);

const StyledList = styled(CommandList)`
    margin: 0 0 20px;
    padding: 0;
    list-style: none;
`;

export default StyledList;
