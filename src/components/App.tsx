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
    started: boolean;
}

export default class App extends React.Component<IAppProps, IAppStates> {
    public static defaultProps = {
        commandInterval: 500,
    };

    private cellSize = 70;

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            cmdIdx: -1,
            bus: props.bus.clone(),
            started: false,
        };
    }

    public render() {
        const { commands } = this.props;
        const { bus, cmdIdx, started } = this.state;

        return (
            <div style={{ width: 800, margin: '40px auto' }}>
                <h1>Car Park Simulator</h1>
                <div style={{ display: 'flex' }}>
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
                        <button onClick={this.run} disabled={started}>
                            RUN
                        </button>
                        <button onClick={this.reset} disabled={started}>
                            RESET
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private run = () => {
        const { commands, commandInterval } = this.props;
        const { bus } = this.state;

        const idx = this.state.cmdIdx + 1;
        if (idx >= commands.length) {
            this.setState({ started: false });
            return;
        }

        const cmd = commands[idx];
        bus.command(cmd.name, cmd.args);
        this.setState({ cmdIdx: idx, started: true }, () =>
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
