import * as React from 'react';

import { Bus } from 'models/Bus';
import { ICmd } from 'models/interfaces/ICmd';

import BusComp from 'components/Bus';
import CarPark from 'components/CarPark';
import CmdList from 'components/CommandList';

export interface IAppProps {
    commands: ICmd[];
    bus: Bus;
    commandInterval?: number;
}

interface IAppStates {
    cmdIdx: number;
    bus: Bus;
}

export default class App extends React.Component<IAppProps, IAppStates> {
    public static defaultProps = {
        commandInterval: 500,
    };

    private cellSize = 50;

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            cmdIdx: -1,
            bus: props.bus.clone(),
        };
    }

    public render() {
        const { commands } = this.props;
        const { bus, cmdIdx } = this.state;

        return (
            <div style={{ display: 'flex', width: 800, margin: '40px auto' }}>
                <div style={{ flex: 1 }}>
                    <CarPark
                        cols={bus.park.cols}
                        rows={bus.park.rows}
                        cellSize={this.cellSize}>
                        {bus.position && (
                            <BusComp
                                x={bus.position.x}
                                y={bus.position.y}
                                cellSize={this.cellSize}
                                faceTo={bus.faceTo}
                            />
                        )}
                    </CarPark>
                </div>
                <div style={{ flex: 1 }}>
                    <CmdList commands={commands} currentIdx={cmdIdx} />
                    <button onClick={this.run}>RUN</button>
                    <button onClick={this.reset}>RESET</button>
                </div>
            </div>
        );
    }

    private run = () => {
        const { commands, commandInterval } = this.props;
        const { bus } = this.state;

        const idx = this.state.cmdIdx + 1;
        if (idx >= commands.length) {
            return;
        }

        const cmd = commands[idx];
        bus.command(cmd.name, cmd.args);
        this.setState({ cmdIdx: idx }, () =>
            setTimeout(this.run, commandInterval),
        );
    };

    private reset = () => {
        this.setState({
            bus: this.props.bus.clone(),
            cmdIdx: -1,
        });
    };
}
