const Cell = require("../src/models/Cell");

describe("Generate a random value between O and .", () => {
    test("it should generate O or .", () => {
        const cell = new Cell();
        const result = cell.createCells();
        expect(result == "O" || result == ".").toBeTruthy();
    });
});