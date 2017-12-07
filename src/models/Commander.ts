import { readFileSync } from 'fs';
import { Bus } from './Bus';
import { ICmd } from './interfaces/ICmd';

export class Commander {
    public static load(content: string): Commander {
        const commander = new Commander();
        commander.commands = content
            .split('\n')
            .filter(c => c !== '')
            .map(c => commander.parse(c));
        return commander;
    }

    public static loadFile(filePath: string): Commander {
        const content = readFileSync(filePath).toString();
        return Commander.load(content);
    }

    public commands: ICmd[];

    public execute(bus: Bus): void {
        this.commands.forEach(cmd => bus.command(cmd.name, cmd.args));
    }

    public parse(cmdStr: string): ICmd {
        const tmp = cmdStr.split(' ');
        return {
            name: tmp[0],
            args: tmp[1] ? tmp[1].split(',') : [],
        };
    }
}
