


class MemoryGame {

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.cardsNum = this.row * this.col;
        this.picsNum = (this.row * this.col) / 2;
        document.querySelector('#newGame').addEventListener('click', () => this.reset());
        this.moves = 0;
        this.matches = 0;
        this.firstOcc = undefined;
        this.totalNum = 0;
        this.initPallet();
        // document.querySelector('.card').addEventListener('click',()=>this.cardsFlipping()); // WHY NOT WORKING ??!!
        $('.card').click((e) => this.cardsFlipping(e));

    }



    initPallet() {

        for (let i = 0; i < this.row; i++) {
            var row = document.createElement('div');
            row.setAttribute('class', 'row');
            document.querySelector('#table').appendChild(row);
            for (let j = 0; j < this.col; j++) {
                var card = document.createElement('div');
                card.setAttribute('class', 'card hvr-shrink');
                card.setAttribute('id', `${((i * this.col) + j)}`);
                row.appendChild(card);

            }
        }

        var OccurancesArray = new Array(this.cardsNum);
        for (let i = 0; i < OccurancesArray.length; i++) {
            OccurancesArray[i] = 0;
        }

        for (let i = 0; i < this.picsNum; i++) {
            for (let j = 0; j < 2; j++) {
                let randomIndex = Math.floor(Math.random() * this.cardsNum);

                while (OccurancesArray[randomIndex] == 1) {
                    randomIndex = Math.floor(Math.random() * this.cardsNum);
                }

                OccurancesArray[randomIndex] = 1;
                let imageSrc = "./imgs/"+i + ".png";
                let img = document.createElement('img');
                img.setAttribute('src', imageSrc);
                // document.querySelector("#"+randomIndex).appendChild(img);
                $("#" + randomIndex).append(img);
            }



        }



    }

    reset() {
        $('.row').remove(); // eqvivalent to removeChuld() in js
        $("#matches").html(""); // eqvivalent to innerHTML in js
        $("#moves").html("");
        new MemoryGame(5, 6);

    }


    cardsFlipping(e) {

        var s = $("#" + e.target.id)[0].childNodes;
        if (s[0].getAttribute("class") != "show") {// if the same image is clickedd (match handler)
            this.moves++;
            $("#moves")[0].innerHTML = "Moves: " + this.moves;

            // comparing between the two pressed images
            if (this.firstOcc != undefined) {
                if (this.firstOcc.getAttribute("src") == s[0].getAttribute("src") && this.totalNum == 1) {

                    this.matches++;

                    $("#matches").html("matches: " + this.matches);

                    s[0].setAttribute("class", "showalways");
                    this.firstOcc.setAttribute("class", "showalways");
                    this.totalNum = 0;
                    this.firstOcc = undefined;
                    if (this.matches == this.picsNum) {

                        alert("Congratulations! YOU WIN :)");

                    }
                } else {


                    if (this.totalNum == 2) {

                        this.firstOcc = s[0];


                        $(".show").addClass("hide");
                        this.totalNum = 0;
                    }

                    s[0].setAttribute("class", "show");
                    this.totalNum++;


                }

            } else {

                s[0].setAttribute("class", "show");
                this.firstOcc = s[0];
                this.totalNum++;
            }
        }

    }


}

//--------------------THE END OF THE GAME CLASS------------------//
//////////////////////////////////////////////////////////////////


var Easy_btn = document.querySelector('#easy');
var Moderate_btn = document.querySelector('#moderate');
var Hard_btn = document.querySelector('#hard');



function dificulty(e) {
    $('.row').remove(); // eqvivalent to removeChuld() in js
    $("#matches").html(""); // eqvivalent to innerHTML in js
    $("#moves").html("");
    if (e.target.id === "easy") {
        const easy = new MemoryGame(3, 2);
    }
    else if (e.target.id === "moderate") {
        const mod = new MemoryGame(4, 3);

    }
    else {
        const memoryGame = new MemoryGame(5, 6);
    }

}

Easy_btn.addEventListener('click', dificulty);
Moderate_btn.addEventListener('click', dificulty);
Hard_btn.addEventListener('click', dificulty);




const memoryGame = new MemoryGame(5, 6);