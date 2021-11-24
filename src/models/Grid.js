"use strict";
const Cell = require("./Cell");

module.exports = class Grid {
  constructor(rows, columns, grid = []) {
    this.rows = rows;
    this.columns = columns;
    this.grid = grid;
    this.celula = new Cell();
    this.vivas = 0;
  }

  createArray() {
    for (let fila = 0; fila < this.rows; fila++) {
      this.grid.push([]);
      for (let col = 0; col < this.columns; col++) {
        this.grid[fila][col] = this.celula.createCells();
      }
    }
  }

  killCells(fila, col, left = 0, right = 0) {
    this.grid[fila + left][col + right] == "." ? null : this.vivas++;
  }

  decreaseLength(x, col) {
    return (col >= x - x-1 || col <= x - 2);
  }
  
  mapita(valores, fila, col) {
    valores.map( (item) => this.killCells(fila, col, item[0], item[1]));
  }

  condiciones(condicion, valores, fila, col) {
    if (condicion[0]) 
      this.mapita(valores[0], fila, col);
    else if (condicion[1])
      this.mapita(valores[1], fila, col);
    else
      this.mapita(valores[2], fila, col);
  }
  
  newGrid() {
    // let valores = [];
    for (let fila = 0; fila < this.rows; fila++) {
      for (let col = 0; col < this.columns; col++) {
        if (fila == 0) 
          this.condiciones([false, this.decreaseLength(this.columns.length, col)], [[], [[0, -1], [0, 1], [1, 0], [1, -1], [1, 0]],[0, -1], [1, -1], [1, 0] ], fila, col);
        else if (this.decreaseLength(this.rows.length, fila)) 
          this.condiciones([col == 0, this.decreaseLength(this.columns.length, col)], [[[-1, 0], [-1, 1], [0, 1], [1, 1], [1,0]], [[-1, 0], [-1, -1], [-1, 1], [0, -1], [0, 1], [1, -1], [1,0], [1, 1]], [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0]]], fila, col);
        //Ultima fila del array (ESQUINA INFERIOR IZQUIERDA)
        else 
          this.condiciones([col == 0, this.decreaseLength(this.columns.length, col)], [[[0, 1], [-1, 1], [-1, 0]], [[0, -1], [0, 1], [-1, 1], [-1, -1], [-1, 0]], [0, -1], [-1, -1], [-1, 0]], fila, col);

        this.grid[fila][col] = this.celula.newGeneration(
          this.vivas,
          this.grid[fila][col]
        );
        console.log(this.vivas);
        this.vivas=0;
      }
    }
  }

  printGrid() {
    console.table(this.grid);
  }
};
