import { weightedLetterSet } from "./data/weightedLetterSet";

const lib = {
    e:1, a:1, i:1, o:1, n:1, r:1, t:1, l:1, s:1, u:1,
    d:2, g:2,
    b:3, c:3, m:3, p:3,
    f:4, h:4, v:4, w:4, y:4,
    k:5,
    j:8, x:8,
    q:10, z:10
}

const sumScoreFromArr = (arr) => {
    let text = arr.join("");
    let score = 0;
    text = text.toLowerCase();
    for (let ch of text) {
        score += lib[ch];
    }
    return score;
}

const weighting = 1;

const difficultyOfLetterSet = (arr) => {

    let difficultyRating = 0;
    let delta = weighting / (arr.length - 6)

    // first 6 letters are evenly weighted
    for (let i=0; i<6; i++) {
        difficultyRating += lib[arr[i].toLowerCase()] * weighting;
    }
    for (let j=6; j<arr.length; j++){
        difficultyRating += lib[arr[j].toLowerCase()] * (weighting - (delta * (j-5)));
    }
    return difficultyRating
}



// const difficultyOfLetterSet = (arr) => {

//     let weightedLetterSetAsc = weightedLetterSet.slice(0,arr.length).sort((a, b) => lib[a.toLowerCase()] - lib[b.toLowerCase()]);
//     let weightedLetterSetDesc = weightedLetterSet.slice(-arr.length).sort((a, b) => lib[b.toLowerCase()] - lib[a.toLowerCase()]);

//     let difficultyRating = 0;
//     let difficultyRatingEasiest = 0;
//     let difficultyRatingHardest = 0;

//     let delta = weighting / (arr.length - 6)
//     // first 6 letters are evenly weighted
//     for (let i=0; i<6; i++) {
//         difficultyRating += lib[arr[i].toLowerCase()] * weighting;
//         difficultyRatingEasiest += lib[weightedLetterSetAsc[i].toLowerCase()] * weighting;
//         difficultyRatingHardest += lib[weightedLetterSetDesc[i].toLowerCase()] * weighting;
//     }
//     for (let j=6; j<arr.length; j++){
//         difficultyRating += lib[arr[j].toLowerCase()] * (weighting - (delta * (j-5)));
//         difficultyRatingEasiest += lib[weightedLetterSetAsc[j].toLowerCase()] * (weighting - (delta * (j-5)));
//         difficultyRatingHardest += lib[weightedLetterSetDesc[j].toLowerCase()] * (weighting - (delta * (j-5)));
//     }
  
//     let d = (difficultyRating - difficultyRatingEasiest)*100 / (difficultyRatingHardest - difficultyRatingEasiest)
//     return Math.round(d)
//   // return [Math.round(difficultyRating*10)/10, Math.round(difficultyRatingEasiest*10)/10, Math.round(difficultyRatingHardest*10)/10]
//     // return [letterSets[1],"---",weightedLetterSetAsc,"---",weightedLetterSetDesc]
// }