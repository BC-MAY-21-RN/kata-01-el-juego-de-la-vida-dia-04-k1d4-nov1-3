"use strict";
/*Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any live cell with two or three live neighbours lives on to the next generation.
Any dead cell with exactly three live neighbours becomes a live cell.*/

const object = require("../states");
const { ALIVE, DEAD } = object;

module.exports = class Cell {
  constructor() {
    this.ALIVE = ALIVE;
    this.DEAD = DEAD;
    this.NumLifeCells = 0;
  }

  createCells() {
    //Randomizamos las celulas vivas y muertas
    let estado;
    let porcentaje = Math.floor(Math.random() * 10) + 1;
    //Si el porcentaje es de 1 a 6 la celula estara muerta ".", si es de 7 a 10 estara viva "O"
    if (porcentaje >= 1 && porcentaje <= 6) {
      // "." -> muertos 60%
      // "O" -> vivos   40%
      estado = this.DEAD;
    } else {
      estado = this.ALIVE;
    }
    return estado;
  }

  newGeneration(NumLifeCells, celula) {
    let estado;
    (celula == "O" && NumLifeCells < 2) ||
    (celula == "O" && NumLifeCells > 3) ||
    (celula == "." && NumLifeCells != 3)
      ? (estado = DEAD)
      : (estado = ALIVE);
    return estado;
  }
};
//CICLO INFINITO
//for (var i = 0; i < Infinity; i++) {}


