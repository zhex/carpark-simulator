import { IPosition } from './interfaces/IPosition';
import { Park } from './Park';

export enum Direction {
    North = 1,
    East,
    South,
    West,
}

const directionText = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

export class Bus {
    public position: IPosition;
    public faceTo: Direction;

    constructor(public park: Park) {}

    public place(
        x: number | string,
        y: number | string,
        faceTo: Direction | string,
    ): Bus {
        this.position = {
            x: typeof x === 'string' ? parseInt(x, 10) : x,
            y: typeof y === 'string' ? parseInt(y, 10) : y,
        };

        if (typeof faceTo === 'string') {
            const idx = directionText.indexOf(faceTo);
            this.faceTo = idx + 1;
        } else {
            this.faceTo = faceTo;
        }

        return this;
    }

    public move(): Bus {
        const next = { ...this.position };

        switch (this.faceTo) {
            case Direction.North:
                next.y++;
                break;
            case Direction.East:
                next.x++;
                break;
            case Direction.South:
                next.y--;
                break;
            case Direction.West:
                next.x--;
                break;
        }
        if (this.park.inZone(next)) {
            this.position = next;
        }
        return this;
    }

    public left(): Bus {
        this.faceTo = this.faceTo - 1;
        if (this.faceTo < Direction.North) {
            this.faceTo = Direction.West;
        }
        return this;
    }

    public right(): Bus {
        this.faceTo = this.faceTo + 1;
        if (this.faceTo > Direction.West) {
            this.faceTo = Direction.North;
        }
        return this;
    }

    public report(): Bus {
        const msg = [
            this.position.x,
            this.position.y,
            directionText[this.faceTo - 1],
        ].join(',');
        console.log(msg);
        return this;
    }

    public command(cmd: string, args: any[] = []): Bus {
        (this as any)[cmd.toLowerCase()].apply(this, args);
        return this;
    }

    public clone(): Bus {
        const b = new Bus(this.park);
        b.position = { ...this.position };
        b.faceTo = this.faceTo;
        return b;
    }
}
