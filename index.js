const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
    ]
user = null;
computer = null;
gamestate = 'incomplete';
console.log(board);
selectside();
function selectside(){
rl.question(`X or O \n`, (response) => {
    if(response == 'X' || response == 'O' || response == 'x' || response == 'o'){
        user = response.toLowerCase();
        if(response == 'X' || response == 'x'){
            computer = 'o'
        }else{computer = 'x'}
        console.log(`ok you selected ${user}`);
        usermove();
    }else{selectside()}
  })
}
function usermove(){
    console.log('test')
    if(user == 'x'){
        rl.question('Select move x \n' , (x) =>{
            if (isNaN(x)) {
                console.log('Not a Number!');
            }else if(x < 4){
                rl.question('Select move y \n' , (y) =>{
                    if (isNaN(y)) {
                        console.log('Not a Number!');
                    }else if(y < 4){
                        if( board[y-1][x-1] === ''){
                            board[y-1][x-1] = user;
                            console.log(board)
                            computermove();
                        }else{
                            console.log('please select an empty square');
                            usermove();
                        }
                    }
            });
            }
        });
    }
}

function computermove(){
    function copyboard(temp){
        copy = [];
        for(row = 0; row < 3; row++){
            copy.push([])
            for(collom = 0; collom<3; collom++){
                copy[row][column] = temp[row][column]
            }
        }   
        return copy;
    }


    function avaliblemoves(temp){
        avaliblemoves = [];
        for(row = 0; row <3; row++){
            for(collom = 0; collom < 3; collom++){
                if(temp[row][collom] === ''){
                    avaliblemoves.push([row+1,collom+1]);
                }
            }
        }
        return avaliblemoves;
    }
    

    function checkgamestate(temp){
        value = 'incomplete';
        for(row = 0; row < 3; row++){
            if(temp[row][0] != '' && temp[row][1] != '' && temp[row][2] != ''){
                if(temp[row][0] == temp[row][1] && temp[row][0] == temp[row][2]){
                    value = temp[row][0];
                }
            }
        }
        for(collom = 0; collom < 3; collom++){
            if(temp[0][collom] != '' && temp[1][collom] != '' && temp[2][collom] != ''){
                if(temp[0][collom] == temp[1][collom] && temp[0][collom] == temp[2][collom]){
                    value = temp[0][collom];
                }
            }
        }
        draw = true
        for(row = 0; row < 3; row++){
            for(collom = 0; collom < 3; collom++){
                if(temp[row][collom] == ''){
                    draw = true;
                }
            }
        }
        if(draw){
            value = 'draw';
        }
        return value;
    }


    function move(x,y,temp, value){
        temp[x-1][y-1] = value;
        return temp;
    }

    function getbestmove(temp){
        avaliblemoves = avaliblemoves(temp);
        if(avaliblemoves.length == 0){
            value = gamestatevalue(temp);
            return value;
        }else{
            for(i = 0; i < avaliblemoves.length; i++){
                supertemp = copyboard(temp);
                supertemp = move(avaliblemoves[i][0], avaliblemoves[i][1], supertemp, computer);
                getbestmove(supertemp);
            }
        }
    }
    

    function gamestatevalue(temp){
        winner = checkgamestate(temp);
            if(winner == computer){
                return 1;
            }else if(winner == user){
                return -1;
            }else if(winner = 'draw');{
                return 0
            }
    }
}