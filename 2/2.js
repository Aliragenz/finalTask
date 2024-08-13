function sortArray(arr) {
    const target = "Dumbways is awesome".split('');
    let result = [];

    // mengcopy array untuk menghindari mutasi dari input asli
    let inputArray = arr.slice();

    // ==============

    // Looping array target (dari const target) dan menghapus chars yang tidak digunakan / tidak sama dengan yang ada di target (const target)
    for (let chars of target) {
        let index = inputArray.indexOf(chars);
        if (index !== -1) {
            result.push(inputArray.splice(index, 1)[0]);
        }
    }

    // ==============

    // Join hasil dari array untuk membuat string akhir
    return result.join('');
}

// ==============

// Array yang di input
const inputArray = ['u', 'D', 'm', 'w', 'b', 'a', 'y', 's', 'i', 's', 'w', 'a', 'e', 's', 'e', 'o', 'm', ' ', ' '];

// ==============

// Sort Array yang di input agar sesuai dengan const target
const sortedSentence = sortArray(inputArray);

// ==============

// manggil output / memanggil sortedSentence
console.log(sortedSentence); 

// ==============