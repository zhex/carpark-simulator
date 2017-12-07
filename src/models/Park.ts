import { IPosition } from './interfaces/IPosition';

export class Park {
    constructor(public row: number, public col: number) {}

    public inZone(pos: IPosition): boolean {
        return pos.x >= 0 && pos.x < this.row && pos.y >= 0 && pos.y < this.col;
    }
}
