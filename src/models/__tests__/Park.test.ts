import { Park } from '../Park';

describe('Park', () => {
    let park: Park;

    beforeEach(() => {
        park = new Park(5, 6);
    });

    it('should have cols and rows attrs', () => {
        expect(park.rows).toBe(5);
        expect(park.cols).toBe(6);
    });

    it('should check the position is in zone or not', () => {
        expect(park.inZone({x: 3, y: 5})).toBeTruthy();
        expect(park.inZone({x: 6, y: 5})).toBeFalsy();
    });
});

