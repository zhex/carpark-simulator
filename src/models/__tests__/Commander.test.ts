import { join } from 'path';
import { Bus, Direction } from '../Bus';
import { Commander } from '../Commander';
import { Park } from '../Park';

const content = `
PLACE 0,0,NORTH
MOVE`;

describe('Commander', () => {
    it('should load commands from content', () => {
        const cmder = Commander.load(content);
        expect(cmder.commands.length).toBe(2);
    });

    it('should load commands from file', () => {
        const cmder = Commander.loadFile(join(__dirname, 'cmd.txt'));
        expect(cmder.commands.length).toBe(3);
    });

    it('should parse the command via the string line', () => {
        const cmder = new Commander();
        const command = cmder.parse('PLACE 1,1,EAST');
        expect(command.name).toEqual('PLACE');
        expect(command.args.length).toBe(3);
    });

    it('should batch execute commands on target bus', () => {
        const park = new Park(10, 10);
        const bus = new Bus(park);
        const cmder = Commander.loadFile(join(__dirname, 'cmd.txt'));
        cmder.execute(bus);

        expect(bus.position!.x).toBe(0);
        expect(bus.position!.y).toBe(1);
        expect(bus.faceTo).toBe(Direction.East);
    });
});
