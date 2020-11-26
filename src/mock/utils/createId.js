
window.idSeed = 100;

export default function createId(){
    window.idSeed = window.idSeed + 1;
    return window.idSeed;
}