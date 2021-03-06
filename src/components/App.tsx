import * as React from 'react';

import { Bus } from 'models/Bus';
import { Commander } from 'models/Commander';
import { ICmd } from 'models/interfaces/ICmd';

import Box, { Container } from 'components/Box';
import BusComp from 'components/Bus';
import Button, { PrimaryButton } from 'components/Button';
import CarPark from 'components/CarPark';
import CommandInput from 'components/CommandInput';
import CmdList from 'components/CommandList';

export interface IAppProps {
    bus: Bus;
    commandInterval?: number;
}

interface IAppStates {
    cmdIdx: number;
    bus: Bus;
    started: boolean;
    inSetting: boolean;
    commands: ICmd[];
    commandText?: string;
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
            commands: [],
            inSetting: true,
        };
    }

    public render() {
        const { inSetting } = this.state;
        return (
            <div style={{ width: 800, margin: '40px auto' }}>
                <h1>Car Park Simulator</h1>
                <Container>
                    {this.renderCarPark()}
                    {inSetting ? this.renderSetting() : this.renderList()}
                </Container>
            </div>
        );
    }

    private renderCarPark(): JSX.Element {
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
                            speed={this.props.commandInterval}
                        />
                    )}
                </CarPark>
            </Box>
        );
    }

    private renderList(): JSX.Element {
        const { cmdIdx, started, commands } = this.state;
        return (
            <Box>
                <CmdList commands={commands} currentIdx={cmdIdx} />
                <PrimaryButton onClick={this.run} disabled={started}>
                    RUN
                </PrimaryButton>
                <Button onClick={this.gotoSetting} disabled={started}>
                    Setting
                </Button>
            </Box>
        );
    }

    private renderSetting(): JSX.Element {
        return (
            <Box>
                <CommandInput
                    value={this.state.commandText}
                    placeholder="please enter your commands here"
                    onChange={this.onTextChange}
                />
                <PrimaryButton onClick={this.save}>SAVE</PrimaryButton>
            </Box>
        );
    }

    private onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ commandText: e.target.value });
    }

    private save = () => {
        const { commandText } = this.state;
        if (commandText === '') {
            return;
        }
        const cmder = Commander.load(commandText!);
        this.setState({ commands: cmder.commands, inSetting: false });
    };

    private gotoSetting = () => {
        this.reset();
        this.setState({ inSetting: true });
    };

    private run = () => {
        const { commandInterval } = this.props;
        const { bus, commands, cmdIdx, started } = this.state;

        if (
            (cmdIdx === -1 || cmdIdx >= commands.length - 1) &&
            started === false
        ) {
            this.reset();
            this.setState({ started: true }, this.run);
            return;
        }

        const idx = cmdIdx + 1;
        if (idx >= commands.length) {
            this.setState({ started: false });
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
