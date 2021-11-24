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
  corner(fila, col, left = 1, right = 1) {
    this.killCells(fila, col, 0, right);
    this.killCells(fila, col, left, right);
    this.killCells(fila, col, left, 0);
  }
  
  mid(fila, col, value = 1) {
    this.killCells(fila, col, 0, -1);
    this.killCells(fila, col, 0, 1);
    this.killCells(fila, col, value, 1);
  }
  
  decreaseLength(x, col) {
    return (col >= x - x-1 || col <= x - 2);
  }
  
  newGrid() {
    for (let fila = 0; fila < this.rows; fila++) {
      for (let col = 0; col < this.columns; col++) {

        if (fila == 0) {
          //Primera fila
          this.corner(fila, col);
          if (col == 0) {
            //Primera ESQUINA SUPERIOR izquierda LISTO
          } else if (this.decreaseLength(this.columns.length, col)) {
            //(VERTICALES DEL MEDIO))
            this.mid(fila, col);
            this.grid[fila + 1][col - 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col] == "." ? null : this.vivas++;
          } //ESQUINA SUPERIOR DERECHA LISTO
          else {
            this.corner(fila, col, 1, -1);
          }
        } 
        
        
        else if (this.decreaseLength(this.rows.length, fila)) {
          if (col == 0) {
            //Primera columna (VERTICAL 0)
            this.killCells(fila, col, -1);
            this.killCells(fila, col, -1, 1);
            this.killCells(fila, col, 0, 1);
            this.killCells(fila, col, 1, 1);
            this.killCells(fila, col, 1);
          } else if (this.decreaseLength(this.columns.length, col)) {
            //(VERTICALES DEL MEDIO))
            this.killCells(fila, col, -1);
            this.killCells(fila, col, -1, -1);
            this.killCells(fila, col, -1, 1);
            this.killCells(fila, col, 0, -1);
            this.killCells(fila, col, 0, 1);
            this.killCells(fila, col, 1, -1);
            this.killCells(fila, col, 1);
            this.killCells(fila, col, 1, 1);
          } //ultima columnna (VERTICAL 7)
          else {
            this.killCells(fila, col, -1);
            this.killCells(fila, col, -1, -1);
            this.killCells(fila, col, 0, -1);
            this.killCells(fila, col, 1, -1);
            this.killCells(fila, col, 1);
          }
        }

        //Ultima fila del array (ESQUINA INFERIOR IZQUIERDA)
        else {
          if (col == 0) {
            //Primera ESQUINA INFERIOR IZQUIERDA LISTO
            this.corner(fila, col, -1);
          } else if (this.decreaseLength(this.columns.length, col)) {
            //(VERTICALES DEL MEDIO))
            this.mid(fila, col, -1);
            this.killCells(fila, col, -1, -1);
            this.killCells(fila, col, -1);
          } //ESQUINA INFERIOR DERECHA LISTO
          else {
            this.corner(fila, col, -1, -1);
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
