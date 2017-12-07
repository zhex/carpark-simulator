import { Bus, Direction } from '../Bus';
import { Park } from '../Park';

describe('Bus', () => {
    let bus: Bus;

    beforeEach(() => {
        const park = new Park(5, 5);
        bus = new Bus(park);
    });

    it('should has a carpark as property', () => {
        expect(bus.park).toBeInstanceOf(Park);
    });

    describe('placed', () => {
        beforeEach(() => {
            bus.place(0, 1, Direction.North);
        });

        it('should place in position and faceTo one of the direction', () => {
            expect(bus.position.x).toBe(0);
            expect(bus.position.y).toBe(1);
            expect(bus.faceTo).toBe(Direction.North);
        });

        it('should turn left', () => {
            bus
                .left()
                .left()
                .left();
            expect(bus.faceTo).toBe(Direction.East);
            bus.left();
            expect(bus.faceTo).toBe(Direction.North);
        });

        it('should turn right', () => {
            bus
                .right()
                .right()
                .right();
            expect(bus.faceTo).toBe(Direction.West);
            bus.right();
            expect(bus.faceTo).toBe(Direction.North);
        });

        it('should move toward the face-to direction', () => {
            bus.move();
            expect(bus.position.y).toBe(2);
            bus.right().move();
            expect(bus.position.x).toBe(1);
        });

        it('should move within park boundary', () => {
            bus.left().move();
            expect(bus.position.x).toBe(0);
        })

        it('should report the current status', () => {
            const log = console.log;
            const mockLog = console.log = jest.fn();
            bus.move().move().report();
            expect(mockLog.mock.calls.length).toBe(1);
            expect(mockLog.mock.calls[0][0]).toEqual('0,3,NORTH');
            console.log = log;
        });
    });

    it('should run command with given name and args', () => {
        bus
            .command('PLACE', [0, 1, Direction.North])
            .command('RIGHT')
            .command('MOVE');
        expect(bus.faceTo).toBe(Direction.East);
        expect(bus.position.x).toBe(1);
    });
});
