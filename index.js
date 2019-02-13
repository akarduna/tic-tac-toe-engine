const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  //create empty board
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
    ]
user = null;
computer = null;
gamestate = 'incomplete';
//prompt user to select side
selectside(board);

//function that has user selectside
function selectside(temp){
    console.log(temp);
    rl.question(`X or O \n`, (response) => {
        rl.close();
        if(response == 'X' || response == 'O' || response == 'x' || response == 'o'){
            user = response.toLowerCase();
            if(response == 'X' || response == 'x'){
                computer = 'o';
            }else{
                computer = 'x';
            }
            console.log(temp);
            val = usermove(temp);
            temp = val;
            console.log('test ' + val);
            // val = computermove(temp);
            // temp = val;
            // console.log(temp);
        }else{selectside()}
    })
}

function move(temp){
    moves = avaliblemoves(temp);
    if(isEven(moves.length)){
        if(user == 'o'){
            temp = usermove(temp);
        }else{
            temp = computermove(temp);
        }
    }else{
        if(user == 'x'){
            temp = usermove(temp);
        }else{
            temp = computermove(temp);
        }
    }
    function avaliblemoves(temp){
        moves = [];
        for(row = 0; row <3; row++){
            for(collom = 0; collom < 3; collom++){
                if(temp[row][collom] === ''){
                    moves.push([row+1,collom+1]);
                }
            }
        }
        return moves;
    }
    return temp;
}
//returns new array with user move
function usermove(temp){
        x = getx();
        y = gety();
        function gety(){
            rl.question('select y cordinate: ', (x) =>{
                if(isNaN(x)){
                    console.log('Not a number');
                }else{
                    return x;
                }
            });
        }
        function getx(){
            rl.question('select x cordinate: ', (x) =>{
                if(isNaN(x)){
                    console.log('Not a number');
                }else{
                    return x;
                }
            });
        }
}
//returns new array with computer move
function computermove(temp){
    moves = avaliblemoves(temp);
    val = Math.floor(Math.random()*(moves.length+1));
    move = moves[val-1];
    temp[move[0]-1][move[1]-1] = computer;
    console.log('computer move' + temp);
    return temp;
    function avaliblemoves(temp){
                moves = [];
                for(row = 0; row <3; row++){
                    for(collom = 0; collom < 3; collom++){
                        if(temp[row][collom] === ''){
                            moves.push([row+1,collom+1]);
                        }
                    }
                }
                return moves;
            }
    
}

function checkgamestate(temp){
            //defualt rerturn set to incomplete
            value = 'incomplete';
            //check rows for victory
            for(row = 0; row < 3; row++){
                if(temp[row][1]){
                    if(temp[row][0] == temp[row][1] && temp[row][0] == temp[row][2]){
                        value = temp[row][0];
                    }
                }
            }
            //check colloms for victory
            for(collom = 0; collom < 3; collom++){
                if(temp[0][collom] != '' && temp[1][collom] != '' && temp[2][collom] != ''){
                    if(temp[0][collom] == temp[1][collom] && temp[0][collom] == temp[2][collom]){
                        value = temp[0][collom];
                    }
                }
            }
            draw = false;
            //get possible moves
            moves = avaliblemoves(temp)
            //if no more moves
            if(moves.length == 0){
                for(row = 0; row < 3; row++){
                    //if a collom is the same
                    if(temp[row][0] == temp[row][1] && temp[row][0] == temp[row][2]){
                        //if collom not empty
                        if(temp[row][0] != ''){
                            draw = true;
                        }
                    }
                    //if a row is the same
                    if(temp[0][row] == temp[1][row] && temp[0][row] == temp[2][row]){
                        //if row is not empty
                        if(temp[0][row] != ''){
                            draw = true;
                        }
                    }
                }
            }
            if(draw){
                value = 'draw';
            }
            return value;
            function avaliblemoves(temp){
                moves = [];
                for(row = 0; row <3; row++){
                    for(collom = 0; collom < 3; collom++){
                        if(temp[row][collom] === ''){
                            moves.push([row+1,collom+1]);
                        }
                    }
                }
                return moves;
            }
        }




// function computermove(){
//     //print best move
//     console.log(getbestmove(board));
//     //function returns copy of board
//     function copyboard(temp){
//         copy = [];
//         for(row = 0; row < 3; row++){
//             copy.push([])
//             for(collom = 0; collom<3; collom++){
//                 copy[row][collom] = temp[row][collom]
//             }
//         }   
//         return copy;
//     }

//     //function returns who won or if draw or incomplete
//     function checkgamestate(temp){
//         //defualt rerturn set to incomplete
//         value = 'incomplete';
//         //check rows for victory
//         for(row = 0; row < 3; row++){
//             if(temp[row][0] != '' && temp[row][1] != '' && temp[row][2] != ''){
//                 if(temp[row][0] == temp[row][1] && temp[row][0] == temp[row][2]){
//                     value = temp[row][0];
//                 }
//             }
//         }
//         //check colloms for victory
//         for(collom = 0; collom < 3; collom++){
//             if(temp[0][collom] != '' && temp[1][collom] != '' && temp[2][collom] != ''){
//                 if(temp[0][collom] == temp[1][collom] && temp[0][collom] == temp[2][collom]){
//                     value = temp[0][collom];
//                 }
//             }
//         }
//         draw = false;
//         //get possible moves
//         moves = avaliblemoves(temp)
//         console.log('check game state '+ moves.length)
//         //if no more moves
//         if(moves.length == 0){
//             for(row = 0; row < 3; row++){
//                 //if a collom is the same
//                 if(temp[row][0] == temp[row][1] && temp[row][0] == temp[row][2]){
//                     //if collom not empty
//                     if(temp[row][0] != ''){
//                         draw = true;
//                     }
//                 }
//                 //if a row is the same
//                 if(temp[0][row] == temp[1][row] && temp[0][row] == temp[2][row]){
//                     //if row is not empty
//                     if(temp[0][row] != ''){
//                         draw = true;
//                     }
//                 }
//             }
//         }
//         if(draw){
//             value = 'draw';
//         }
//         return value;
//     }

//     //returns new board with selected move
//     function move(x,y,temp, value){
//         temp[x-1][y-1] = value;
//         return temp;
//     }
//     //returns value of result and best move
//     function getbestmove(temp, movex, movey){
//         //get all possible moves
//         moves = avaliblemoves(temp);
//         //if gamestate is not incomplete 
//         if(checkgamestate(temp) != 'incomplete'){
//             //check if win or loss or draw
//             value = gamestatevalue(temp);
//             console.log('result ' + checkgamestate(temp))
//             return value;

//         }else{
//             currentplayer = '';
//             if(isEven(moves.length)){
//                 currentplayer = 'o';
//             }else{
//                 currentplayer = 'x';
//             }
//                 value = -Infinity;
//                 bestmove = [];
//                 for(i = 0; i < moves.length; i++){
//                     copy = copyboard(temp);
//                     copy = move(moves[i][0], moves[i][1], copy, currentplayer);
//                     console.log('bestmove ' + moves.length)
//                     results = getbestmove(copy, moves[i][0], moves[0][i]);
//                     test = results[0]
//                     if(value >= test){
//                         value = test;
//                         bestmove = [moves[i][0], moves[0][i]]
//                     }
//                 }
//                 return [value, bestmove[0], bestmove[1]];
//         }
//     }

//     function gamestatevalue(temp){
//         winner = checkgamestate(temp);
//             if(winner == 'o'){
//                 return 1;
//             }else if(winner == 'x'){
//                 return -1;
//             }else if(winner = 'draw');{
//                 return 0
//             }
//     }
//     function avaliblemoves(temp){
//         moves = [];
//         for(row = 0; row <3; row++){
//             for(collom = 0; collom < 3; collom++){
//                 if(temp[row][collom] === ''){
//                     moves.push([row+1,collom+1]);
//                 }
//             }
//         }
//         return moves;
//     }


    function isEven(n) {
        return n % 2 == 0;
     }
     
     function isOdd(n) {
        return Math.abs(n % 2) == 1;
     }