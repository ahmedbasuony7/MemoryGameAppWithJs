
document.querySelector(".control-buttons").onclick = function(){
    let yourName = prompt("Whats your Name ? ");
    
    if(yourName == null || yourName == "" ){
        document.querySelector(".name span").innerHTML =` UnKnown`;  
    }else{
        document.querySelector(".name span").innerHTML =` ${yourName}`; 
    }
    document.querySelector(".control-buttons").remove();
}

let duration = 1000;

let blcksContainer = document.querySelector(".memory-game-blocks");

//  create array from game blocks 
let blocks = Array.from(blcksContainer.children);

//  create range of keyes 
let orderRange = [...Array(blocks.length).keys()];

console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

//  Add order css property to game blocks 
blocks.forEach((block , index) => {
    //console.log(index);
    block.style.order = orderRange[index];

    // add click event 
    block.addEventListener("click" , function(){
        // trigger flipBlock function 
        flipBlock(block);
    });

});

// flip block function 

function flipBlock (selectedBlock) {
    // add class is-fliped
    selectedBlock.classList.add('is-fliped');

    // collect all fliped card 
    let allFlipedBlocks = blocks.filter( flipedBlock => 
        flipedBlock.classList.contains('is-fliped'));

    //  if theres selected blocks
    if(allFlipedBlocks.length === 2){
        
        // stop clicking function 
        stopClicking();

        // check matched function 
        checkMatchedBlocks(allFlipedBlocks[0], allFlipedBlocks[1]);
    }
}

// stopClicking function 
function stopClicking(){
    // add class no clicking on main container
    blcksContainer.classList.add('no-clicking');

    //  settime out
    setTimeout(() => {
        // remove class to clicking after the duration 
        blcksContainer.classList.remove('no-clicking');
    },duration);
}

// check matched Block 
function checkMatchedBlocks(firstBlock , secondBlock){
    let tries = document.querySelector('.tries span');
    
    if(firstBlock.dataset.techonolgy === secondBlock.dataset.techonolgy){
        
        firstBlock.classList.remove('is-fliped');
        secondBlock.classList.remove('is-fliped'); 
        
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        setTimeout(()=> {
            let winele = document.querySelector('.win');
            winele.style.display = 'block';
        },duration);

    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(()=> {
            firstBlock.classList.remove('is-fliped');
            secondBlock.classList.remove('is-fliped');
        },duration);

    }
}

//  shuffle function 

function shuffle(array){
    //  settings Variables 
    let current = array.length; // 20
    let temp ;
    let random;
    while(current > 0){

        //  get random number 
        random = Math.floor(Math.random() *current);

        // decrease length by one 
        current --;

        //  [1]- save current element in stash 
        temp =array[current];

        // [2]- current element = random element 
        array[current] = array[random];

        // [3]- random element = get element from stash
        array[random] = temp;
    }

    return array;
}

