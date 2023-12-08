/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {

  if(str === ""){
    return true
  }
  function removeSymbolsAndSpaces(str){
    let emptyString = ""
    for(let i=0;i<str.length;i++){
      emptyString += str[i].replace(/[ !@#$%^<>?:"&*(),.{}]/g,"")
    }
    return emptyString.toLowerCase()
  }

  function reverasString(str){
    let emptyString = [...str].reverse().join("")
    return emptyString
  }

  function normalizeString(str){
    let str1 = removeSymbolsAndSpaces(str)
    let res = reverasString(str1)
    return res
  }
  str1 = normalizeString(str)
  str2 = removeSymbolsAndSpaces(str)

  if (str.length === 0){
    return false
  }


  for (let i = 0;i < str.length;i++){
    if(str1[i]!=str2[i]){
      return false
    }
  }
  return true
}
module.exports = isPalindrome;
