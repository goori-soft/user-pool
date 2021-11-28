const op1 = {value: 'a'}
const op2 = {value: 'b'}
const op3 = {...op2, ...op1}

console.log(op3)