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
  
  newGrid() {
    let valores = [];
    for (let fila = 0; fila < this.rows; fila++) {
      for (let col = 0; col < this.columns; col++) {
        if (fila == 0) {
          //Primera fila
          if (col == 0) {
            //Primera ESQUINA SUPERIOR izquierda LISTO
          } else if (this.decreaseLength(this.columns.length, col)) {
            //(VERTICALES DEL MEDIO))
            valores = [[0, -1], [0, 1], [1, 0], [1, -1], [1, 0]];
            this.mapita(valores, fila, col);
          } //ESQUINA SUPERIOR DERECHA LISTO
          else {
            valores = [[0, -1], [1, -1], [1, 0]];
            this.mapita(valores, fila, col);
          }
        } 
        else if (this.decreaseLength(this.rows.length, fila)) {
          if (col == 0) {
            //Primera columna (VERTICAL 0)
            valores = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1,0]];
            this.mapita(valores, fila, col);
          } else if (this.decreaseLength(this.columns.length, col)) {
            //(VERTICALES DEL MEDIO))
            valores = [[-1, 0], [-1, -1], [-1, 1], [0, -1], [0, 1], [1, -1], [1,0], [1, 1]];
            this.mapita(valores, fila, col);
          } //ultima columnna (VERTICAL 7)
          else {
            valores = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0]];
            this.mapita(valores, fila, col);
          }
        }
        //Ultima fila del array (ESQUINA INFERIOR IZQUIERDA)
        else {
          if (col == 0) {
            //Primera ESQUINA INFERIOR IZQUIERDA LISTO
            valores = [[0, 1], [-1, 1], [-1, 0]];
            this.mapita(valores, fila, col);
          } else if (this.decreaseLength(this.columns.length, col)) {
            //ESQUINA INFERIOR DERECHA LISTO
            valores = [[0, -1], [0, 1], [-1, 1], [-1, -1], [-1, 0]];
            this.mapita(valores, fila, col);           
          } //ESQUINA INFERIOR DERECHA LISTO
          else {
            valores = [[0, -1], [-1, -1], [-1, 0]];
            this.mapita(valores, fila, col);           
          }
        }
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
