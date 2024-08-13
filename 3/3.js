function createPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        var output = '';
        for (let b = 0; b < i; b++) output += ' '; // ngasih spasi di awal
        for (let a = 0; a < (rows - i); a++) output += ' * ';
        console.log(output);
    }
}

createPyramid(5);

