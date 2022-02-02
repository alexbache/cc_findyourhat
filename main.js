const prompt = require('prompt-sync')({sigint: true});

// Game variables
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{
    constructor(grid){
    this.grid = Field.generateField(4,5)
    // this.grid = grid;
    this.gridCols = this.grid[0].length;
    this.gridRows = this.grid.length;
    console.log(`grid size: ${this.gridRows} x ${this.gridCols}`)


    // grid locations
    this.holes = this.locateChar(hole);
    this.path = this.locateChar(pathCharacter);
    this.hat = this.locateChar(hat);
    }

    help(){
        console.log('\n')
        console.log('holes:', this.holes)
        console.log('path:', this.path)
        console.log('hat: ',this.hat)
    }

    print(){
        console.log('\n---GRID---')
        for (const rowItem of this.grid){
            console.log(rowItem.join(''));
        }
        console.log('\n')
    }

    locateChar(search){
        let matchedCoords = []
        let currentCoords = []
        for(let i = 0; i<this.grid.length ; i++){
            for (let j = 0;j<this.grid[0].length;j++){
                currentCoords = [i,j]
                
                if(this.grid[i][j]==search){
                    matchedCoords.push(currentCoords)
                }
            }
        }
        // console.log(matchedCoords);
        return matchedCoords;
    }


    play(){
        this.path = this.move()

        if(this.holeChecker(this.path)){
            this.gameOver('you fell in a hole')
        }

        else if(this.outOfBounds(this.path)){
            this.gameOver('out of bounds')
        }

        else if(this.foundHat(this.path)){
            this.gameOver('found hat')
        }

        else {
            this.grid[this.path[0][0]][this.path[0][1]] = '*'
            console.log(this.grid)
            this.print()
            this.play()
        }

    }

    move(){
        // U D L R
        const move = prompt('Which way?').toLowerCase();
        console.log(this.path)


        if(move == 'd' | move == 'u'){
            let posShift = (move=='d'?1:-1)
            this.path[0][0]+=posShift
        }

        if (move =='l' | move =='r'){
            let posShift = (move =='l'?-1:1)
            this.path[0][1]+=posShift;
        }

        console.log(move)
        console.log(this.path)
        return this.path
    }

    holeChecker(pos){
        for (let i = 0 ; i<this.holes.length; i++){
            if(this.holes[i][0] == pos[0][0] && this.holes[i][1] == pos[0][1]){
                return true
           }
        }
        return false
    }

    outOfBounds(pos){
        if(pos[0][0]<0 || pos[0][1] <0 || pos[0][0] >this.gridRows || pos[0][1]>this.gridCols){
            return true
        }
    }


    foundHat(pos){
        if(pos[0][0] == this.hat[0][0] && pos[0][1] == this.hat[0][1]){
            return true
        }
    }

    gameOver(msg){
        console.log('\n---GAME OVER---')
        console.log(msg,'\n')
        return
    }

    static generateField(width, height){
        let field = [];
        let columns = new Array(width).fill(fieldCharacter)
        let rows = new Array(height);
        field.push(rows)

        for (let i=0;i<rows.length;i++){
            field[i] = columns
        }

        // first random hole
        let firstHole = [Math.floor(Math.random()*height),Math.floor(Math.random()*width)]
        console.log('hole coords',firstHole)
        console.log(field.length)
        console.log(field[0].length)
        field[0][1]="x"
        console.log(field)

        return field 

    }


}



const myField = new Field([
    ['*', '░', '░'],
    ['^', 'O', '░'],
    ['░', '░', '░'],
  ]);



// myField.help()
// console.log(myField.grid)
// myField.print()
// myField.play()




