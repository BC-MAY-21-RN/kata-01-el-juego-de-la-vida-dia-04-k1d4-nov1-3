const Cell = require("../src/models/Cell");

describe("Generate a random value between O and .", () => {
    test("it should generate O or .", () => {
        const cell = new Cell();
        const value1 = "O";
        const value2 = ".";
        expect(cell.createCells()).toEqual(value1 || value2);
    });
});