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

  printArray() {
    console.log(this.grid);
  }

  newGrid() {
    for (let fila = 0; fila < this.rows; fila++) {
      for (let col = 0; col < this.columns; col++) {

        if (fila == 0) {
          //Primera fila
          if (col == 0) {
            //Primera ESQUINA SUPERIOR izquierda LISTO
            this.grid[fila][col + 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col + 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col] == "." ? null : this.vivas++;
          } else if (
            col >= this.columns.length - this.columns.length-1 ||
            col <= this.columns.length - 2
          ) {
            //(VERTICALES DEL MEDIO))
            this.grid[fila][col - 1] == "." ? null : this.vivas++;
            this.grid[fila][col + 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col + 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col - 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col] == "." ? null : this.vivas++;
          } //ESQUINA SUPERIOR DERECHA LISTO
          else {
            this.grid[fila][col - 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col - 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col] == "." ? null : this.vivas++;
          }
        } 
        
        
        else if (
          fila >= this.rows.length - this.rows.length - 1 ||
          fila <= this.rows.length - 2
        ) {
          if (col == 0) {
            //Primera columna (VERTICAL 0)
            this.grid[fila - 1][col] == "." ? null : this.vivas++;
            this.grid[fila - 1][col + 1] == "." ? null : this.vivas++;
            this.grid[fila][col + 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col + 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col] == "." ? null : this.vivas++;
          } else if (
            col >= this.columns.length - this.columns.length-1 ||
            col <= this.columns.length - 2
          ) {
            //(VERTICALES DEL MEDIO))
            this.grid[fila - 1][col] == "." ? null : this.vivas++;
            this.grid[fila - 1][col - 1] == "." ? null : this.vivas++;
            this.grid[fila - 1][col + 1] == "." ? null : this.vivas++;
            this.grid[fila][col - 1] == "." ? null : this.vivas++;
            this.grid[fila][col + 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col - 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col] == "." ? null : this.vivas++;
            this.grid[fila + 1][col + 1] == "." ? null : this.vivas++;
          } //ultima columnna (VERTICAL 7)
          else {
            this.grid[fila - 1][col] == "." ? null : this.vivas++;
            this.grid[fila - 1][col - 1] == "." ? null : this.vivas++;
            this.grid[fila][col - 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col - 1] == "." ? null : this.vivas++;
            this.grid[fila + 1][col] == "." ? null : this.vivas++;
          }
        }

        //Ultima fila del array (ESQUINA INFERIOR IZQUIERDA)
        else {
          if (col == 0) {
            //Primera ESQUINA INFERIOR IZQUIERDA LISTO
            this.grid[fila][col + 1] == "." ? null : this.vivas++;
            this.grid[fila - 1][col + 1] == "." ? null : this.vivas++;
            this.grid[fila - 1][col] == "." ? null : this.vivas++;
          } else if (
            col >= this.columns.length - this.columns.length - 1 ||
            col <= this.columns.length - 2
          ) {
            //(VERTICALES DEL MEDIO))
            this.grid[fila][col - 1] == "." ? null : this.vivas++;
            this.grid[fila][col + 1] == "." ? null : this.vivas++;
            this.grid[fila - 1][col + 1] == "." ? null : this.vivas++;
            this.grid[fila - 1][col - 1] == "." ? null : this.vivas++;
            this.grid[fila - 1][col] == "." ? null : this.vivas++;
          } //ESQUINA INFERIOR DERECHA LISTO
          else {
            this.grid[fila][col - 1] == "." ? null : this.vivas++;
            this.grid[fila - 1][col - 1] == "." ? null : this.vivas++;
            this.grid[fila - 1][col] == "." ? null : this.vivas++;
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
