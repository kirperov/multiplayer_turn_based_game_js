//Generate random number based on num parameter
    export default function generateRandomNumber(num) {
    let randNumber = Math.floor((Math.random() * num));
    if (randNumber !== -1) {
        return Math.floor((Math.random() * num));
    }
}