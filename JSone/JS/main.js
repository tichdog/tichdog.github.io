const text = ['Hello my friend, shall we play a game? ',
    'Great, I knew it. Dont you value your life? ',
    'The game begins! Who didnt have time...Hes DEAD. ',
    'Congratulations, you win! '
];

let line = 0;
let count = 0;
let result = '';
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function typeLine() {
    let interval = setTimeout(
        () => {
            result += text[line][count]
            document.querySelector('p').innerHTML =result +'|';
            count++;

            if (count >= text[line].length) {
                count = 0;
                line++;
                sleep(2000);
                document.querySelector('p').innerHTML = '';
                result = '';

                if (line === text.length) {
                    clearTimeout(interval);
                    document.querySelector('p').innerHTML ='Come back again! ';
                    return true;
                }
            }

            typeLine();

        }, getRandomInt(getRandomInt(100*2.5)))
}

typeLine();
