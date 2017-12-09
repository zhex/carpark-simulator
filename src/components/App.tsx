import * as React from 'react';

import { Bus } from 'models/Bus';
import { ICmd } from 'models/interfaces/ICmd';

import Box, { Container } from 'components/Box';
import BusComp from 'components/Bus';
import Button, { PrimaryButton } from 'components/Button';
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
        return (
            <div style={{ width: 800, margin: '40px auto' }}>
                <h1>Car Park Simulator</h1>
                <Container>
                    {this.renderLeft()}
                    {this.renderRight()}
                </Container>
            </div>
        );
    }

    private renderLeft(): JSX.Element {
        const { bus } = this.state;
        return (
            <Box>
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
            </Box>
        );
    }

    private renderRight(): JSX.Element {
        const { commands } = this.props;
        const { cmdIdx, started } = this.state;
        return (
            <Box>
                <CmdList commands={commands} currentIdx={cmdIdx} />
                <PrimaryButton onClick={this.run} disabled={started}>
                    RUN
                </PrimaryButton>
                <Button onClick={this.reset} disabled={started}>
                    RESET
                </Button>
            </Box>
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
