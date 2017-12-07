import { IPosition } from './interfaces/IPosition';

export class Park {
    constructor(public rows: number, public cols: number) {}

    public inZone(pos: IPosition): boolean {
        return pos.x >= 0 && pos.x < this.rows && pos.y >= 0 && pos.y < this.cols;
    }
}
