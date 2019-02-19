const readline = require('readline-sync');
//create empty board
board = [];
for(var i = 0; i < 9; i++){
    board.push(' _ ');
}
print(board);
//user becomes equal to what the user was prompted for
user = selectside();
//basic game logic(turn order)
if(user == ' x '){
    computer = ' o ';
    while(true){
        board = usermove(board);
        console.log(getbestmove(board, ' o '));
        completness(board);
        break;
        if(complete){
            console.log(getgamevalue(board))
            break;
        }
        board = computermove(board);
        print(board);
        completness(board);
        if(complete){
            console.log(getgamevalue(board))
            break;
        }
    }
}
//returns array with possible moves
function completness(array){
    complete = false;
    if(array[0] == array [1] && array[2] == array[0] && array[0] != ' _ '){
        complete = true;
    }
    if(array[3] == array [4] && array[5] == array[3] && array[3] != ' _ '){
        complete = true;
    }
    if(array[6] == array [7] && array[8] == array[6] && array[6] != ' _ '){
        complete = true;
    }
    if(array[0] == array [3] && array[6] == array[0] && array[0] != ' _ '){
        complete = true;
    }
    if(array[1] == array [4] && array[7] == array[1] && array[1] != ' _ '){
        complete = true;
    }
    if(array[2] == array [5] && array[8] == array[2] && array[2] != ' _ '){
        complete = true;
    }
    if(array[0] == array [4] && array[8] == array[0] && array[0] != ' _ '){
        complete = true;
    }
    if(array[2] == array [4] && array[6] == array[2] && array[2] != ' _ '){
        complete = true;
    }
    return complete;
}
//returns new array after computer moves randomly given possible moves
function computermove(array){
    possiblemoves = avaliblemoves(array);
    move = Math.floor(Math.random()*possiblemoves.length);
    array[possiblemoves[move]] = computer;
    return array;
}
//prompts user to move then returns new array with the users move in it
function usermove(array){
    move = readline.question('What position would you like?');
    possiblemoves = avaliblemoves(array);
    movegood = false;
    for(var i = 0; i < possiblemoves.length; i++){
        if(move == possiblemoves[i]){
            movegood = true;
        }
    }
    if(movegood){
        array[move] = user;
        return array;
    }else{return usermove(array);}
}
//returns ' x ' if x and ' o ' if o
function selectside(){
    user = readline.question("x or o? \n");
    if(user.toLowerCase() == 'x'||user.toLowerCase() == 'o'){
        user = ' ' + user.toLowerCase() + ' ';
        return user;
    }else{
        return selectside();
    }
}
//prints board neatly
function print(array){
    for(var i = 0; i < 9; i++){
        if(i%3 == 0){
            console.log();
        }

        process.stdout.write(array[i]);
        if(i == 8){
            console.log()
        }
    }
}
//returns array with all avaliblemoves
function avaliblemoves(array){
    var result = []
    for(var i = 0; i <9; i++){
        if(array[i] == ' _ '){
            result.push(i);
        }
    }
    return result;
}
function getbestmove(array, player){
    var complete = completness((array));
    //check if gamestate is complete
    if(complete||avaliblemoves(array).length == 0){
        //set value = 0 then change based on who wins
        value = 0;
        winner = getgamevalue(array);
        if(winner = ' x '){
            value = 1;
        }else if(winner = ' o '){
            value = -1;
        }else{
            print(array);
        }
        return value;
    }
    //possible moves is now equal to array of all possible moves
    possiblemoves = avaliblemoves(array);
    if(player == ' x '){
        //set default bestmovevalue = something that will always be changed
        bestmovevalue = -2;
        //check all avalible moves
        for(var i = 0; i < possiblemoves.length; i ++){
            //create a copy 
            copyarray = array.splice(0);
            console.log(copyarray);
            copyarray[possiblemoves[i]] = ' o ';
            val = getbestmove(copyarray, ' o ');
            if(val > bestmovevalue){
                bestmovevalue = val;
            };
        }
        return bestmovevalue;
    }else{
        bestmovevalue = 2;
        for(var i = 0; i < possiblemoves.length; i ++){
            copyarray = array.splice(0);
            console.log(copyarray);
            copyarray[possiblemoves[i]] = ' x ';
            val = getbestmove(copyarray, ' x ');
            if(val < bestmovevalue){
                bestmovevalue = val;
            };
        }
        return bestmovevalue;
    }
}
function getgamevalue(array){
    winner = 'draw';
    if(array[0] == array [1] && array[2] == array[0] && array[0] != ' _ '){
        winner = array[0];
    }
    if(array[3] == array [4] && array[5] == array[3] && array[3] != ' _ '){
        winner = array[3];
    }
    if(array[6] == array [7] && array[8] == array[6] && array[6] != ' _ '){
        winner = array[6];
    }
    if(array[0] == array [3] && array[6] == array[0] && array[0] != ' _ '){
        winner = array[0];
    }
    if(array[1] == array [4] && array[7] == array[1] && array[1] != ' _ '){
        winner = array[1];
    }
    if(array[2] == array [5] && array[8] == array[2] && array[2] != ' _ '){
        winner = array[2];
    }
    if(array[0] == array [4] && array[8] == array[0] && array[0] != ' _ '){
        winner = array[0];
    }
    if(array[2] == array [4] && array[6] == array[2] && array[2] != ' _ '){
        winner = array[2];
    }
    return winner;
}
