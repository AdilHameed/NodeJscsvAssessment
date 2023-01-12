const findAllPossiblePlacesOfKnight = (a,b) => {
    const row = 8;
    const col = 8;
    if(a>row || b> row){
        console.log("Positions should be less than or equal to 8 ")
        return;
    }
    let arr = new Array(row);
    for (let i = 0; i < row; i++) {
      arr[i] = new Array(col); // make each element an array
    }
    const arrPos= [];


//checking horizontally right 2 steps and vertically down 1 step
let count1 = 0;
let j1;
for(let i = a; i<row; i++){

    for(j1 = b; j1<col; j1++){ 
     
     if(count1 == 2){
        break;
     }
     count1++;
    }
    if(j1 == col){
        break;
    }
    if(count1 == 2){
        count1 = 0;
    }else{
        break;
    }
    if(i==(a+1)){
       arrPos.push(`(${i}, ${j1})`);
       break;
    }
}

//checking horizontally right 2 steps and vertically up 1 step
let count3 = 0;
let j3;
for(let i = a; i>=0; i--){

    for(j3 = b; j3<col; j3++){ 
     
     if(count3 == 2){
        break;
     }
     count3++;
    }
    if(j3 == col){
        break;
    }
    if(count3 == 2){
        count3 = 0;
    }else{
        break;
    }
    if(i==(a-1)){
       arrPos.push(`(${i}, ${j3})`);
       break;
    }
}

//checking horizontally left  2 steps and vertically down 1 step
let count2 = 0;
let j2;
for(let i = a; i<row; i++){

    for(j2 = b; j2>0; j2--){ 
     
     if(count2 == 2){
        break;
     }
     count2++;
    }
    if(count2 == 2){
        count2 = 0;
    }else{
        break;
    }
    if(i==(a+1)){
       arrPos.push(`(${i}, ${j2})`);
       break;
    }
}


//checking horizontally left 2 steps and vertically up 1 step
let count4 = 0;
let j4;
for(let i = a; i>=0; i--){

    for(j4 = b; j4>0; j4--){ 
     
     if(count4 == 2){
        break;
     }
     count4++;
    }
    if(count4 == 2){
        count4 = 0;
    }else{
        break;
    }
    if(i==(a-1)){
       arrPos.push(`(${i}, ${j4})`);
       break;
    }
}



// //checking vertically down 2 steps and  horizontally right 1 step
let count5 = 0;
let check1 = 0;
let j5;
for(let i = b; i<row; i++){

  if(check1 == 1){
    for(j5 = a; j5<col; j5++){ 
     
        if(count5 == 2){
           break;
        }
        count5++;
       }
  }
    check1++;
    if(j5== col){
        break;
    }
    if(count5 == 2){
        arrPos.push(`(${j5}, ${i})`);
          break;
       }
}


//checking vertically down 2 steps and  horizontally left 1 step
let count6 = 0;
let check2 = 0;
let j6;
for(let i = b; i>=0; i--){

  if(check2 == 1){
    for(j6 = a; j6<col; j6++){ 
     
        if(count6 == 2){
           break;
        }
        count6++;
       }
  }
  check2++;
  if(j6== col){
    break;
}
    if(count6 == 2){
        arrPos.push(`(${j6}, ${i})`);
          break;
       }
}

// //checking vertically up 2 steps and  horizontally left 1 step
let count7 = 0;
let check3 = 0;
let j7;
for(let i = b; i>=0; i--){

  if(check3 == 1){
    for(j7 = a; j7>0; j7--){ 
     
        if(count7 == 2){
           break;
        }
        count7++;
       }
  }
  check3++;
    if(count7 == 2){
        arrPos.push(`(${j7}, ${i})`);
          break;
       }
}


//checking vertically up 2 steps and  horizontally right 1 step
let count8 = 0;
let check4 = 0;
let j8;
for(let i = b; i<row; i++){

  if(check4 == 1){
    for(j8 = a; j8>0; j8--){ 
     
        if(count8 == 2){
           break;
        }
        count8++;
       }
  }
  check4++;
    if(count8 == 2){
        arrPos.push(`(${j8}, ${i})`);
          break;
       }
}

    console.log(arrPos);

}

findAllPossiblePlacesOfKnight(7,3)