var can=document.querySelector('canvas');
can.width=window.innerWidth;
can.height=window.innerHeight;
var c=can.getContext('2d');

const XSTARTINGOFGAME=100;
const YSTARTINGOFGAME=100;
const WIDTHOFGAME=600;
const HEIGTHOFGAME=600;

function drawBackGround(){
    c.beginPath();
    c.moveTo(XSTARTINGOFGAME,YSTARTINGOFGAME);
    c.lineTo(XSTARTINGOFGAME+WIDTHOFGAME,YSTARTINGOFGAME);
    c.lineTo(XSTARTINGOFGAME+WIDTHOFGAME,YSTARTINGOFGAME+HEIGTHOFGAME);
    c.lineTo(XSTARTINGOFGAME,YSTARTINGOFGAME+HEIGTHOFGAME);
    c.lineTo(XSTARTINGOFGAME,YSTARTINGOFGAME);
    c.stroke();
}

const SIZEOFBLOCK=30; 

// 1 block
var blocksArray=[[150,150],[250,250],[400,400],[500,500]];

// size scales are given here
var blocksSizeArray=[[3,3],[2,2],[3,2],[1,1]];

function drawBlock(i){
    c.fillStyle="red";
    c.fillRect(blocksArray[i][0],blocksArray[i][1],blocksSizeArray[i][0]*SIZEOFBLOCK,blocksSizeArray[i][1]*SIZEOFBLOCK);
}


function drawBlocks(){
    for(let i=0;i<blocksArray.length;i++){
        drawBlock(i);
    }
}

function draw(){
    drawBackGround();
    drawBlocks();
}

// part 2

var X=undefined;var Y=undefined;

var readOnce=false;

var mousePosition=[undefined,undefined];

var clicked=undefined;
function onMouseClick(event){
    clicked=true;
    mousePosition[0]= event.clientX;
    mousePosition[1]=event.clientY;
}

function onMouseUp(){
    if(clicked==true){
        mousePosition=[undefined,undefined];
        clicked=false;
        movementStarted=false;
        X=undefined;Y=undefined;
       // readOnce=false;
    blockSelected=false;

    }
}

function insideBlock(i){
    // 
    if(blocksArray[i][0] < mousePosition[0] &&
        (blocksArray[i][0] + SIZEOFBLOCK*blocksSizeArray[i][0]) >  mousePosition[0]){
            if(blocksArray[i][1] < mousePosition[1] &&
                (blocksArray[i][1] + SIZEOFBLOCK*blocksSizeArray[i][1]) >  mousePosition[1]){
                   // console.log("inside");
                    return i;
        }
    }
    return undefined;
}


function insideAnyBlock(){
    var whichBlockInside=undefined;
    for(let i=0;i<blocksArray.length;i++){
        whichBlockInside=insideBlock(i);
        if(whichBlockInside!=undefined){
            //console.log("hello");
            return i;
        }
    }

    return undefined;
}

// DRAGGING A BLOCK

var movementStarted=false;
function moveBlock(blockId){
    if(blockId!=undefined){
        console.log(blocksArray);
                blocksArray[blockId][0] = mousePosition[0]-X
                blocksArray[blockId][1] = mousePosition[1]-Y
           

    }
}

function checkMovement(){
    var blockId=insideAnyBlock();
    if(blockId!=undefined){
         if(movementStarted==false){
            X= mousePosition[0] - blocksArray[blockId][0];
            Y= mousePosition[1] - blocksArray[blockId][1];
        movementStarted=true;
        }
    }
    console.log(blockId);
    
    return blockId;    
}


var blockSelected=false;
var blockIdfound=undefined;
function update(){
    c.clearRect(0,0,can.width,can.height);
    if(mousePosition[0]!=undefined && mousePosition[1]!=undefined){
       // if(blockSelected==false){
            blockIdFound=checkMovement();
            if(blockIdfound!=undefined){
                   blockSelected=true;
                   console.log("hey");
            }
        //}
       //else if(blockSelected==true){
            console.log(blockIdFound);
            moveBlock(blockIdFound);
        //}

    }}


        // if(readOnce==false){
        //     blockIdFound=checkMovement();
           
        //     if(blockIdfound!=undefined){
        //         readOnce=true;
        //     }

        // }
        // else{
        //    // console.log(blockIdfound);
            
           
        //    moveBlock(0);
        // }

    
    

document.addEventListener('mousemove', (event) => {
    if(clicked==true){
        mousePosition[0]= event.clientX;
        mousePosition[1]=event.clientY
        readOnce=true;
    }
    });
function main(){
    //console.log(blocksArray);
    //console.log(mousePosition);
    requestAnimationFrame(main);
    update();
    draw();
    
}
main();

