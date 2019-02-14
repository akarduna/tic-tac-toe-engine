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
        print(board);
        completness(board);
        if(complete){
            break;
        }
        board = computermove(board);
        print(board);
        completness(board);
        if(complete){
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
    return completness;
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
    array[move] = user;
    return array;
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