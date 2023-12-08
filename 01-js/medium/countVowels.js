/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {

  str = str.toLowerCase()
    // Your code here
    let vowels = ['a', 'e', 'i', 'o', 'u']
    let counter = 0

    if (str.length === 0){
      return 0
    }

    for(let i=0;i<str.length;i++){
      if(vowels.includes(str[i])){
        counter += 1
      }
    }
    return counter
}

module.exports = countVowels;