import { join } from 'path';
import { Bus } from '../src/models/Bus';
import { Commander } from '../src/models/Commander';
import { Park } from '../src/models/Park';

const park = new Park(5, 5);
const bus = new Bus(park);

try {
    const cmder = Commander.loadFile(join(__dirname, 'commands.txt'));
    cmder.execute(bus);
} catch (err) {
    console.log(err.message);
}
