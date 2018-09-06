//initialize characters attributes
var characters = defaultCharacters();

//holds characters data
function defaultCharacters() {
    //set of characters
    return [
        {//first character
            name: "Goku",
            charAttributes: {
                //health points
                hPoints: 100,
                //max health points
                maxHPoints: 100,
                //attack power
                attackPwr: 35,
                //base attack power
                baseAttackPwr: 35,
                //counter attack power
                counterAttPwr: 40
            },
            img: "http://webdnet.com/wp-content/uploads/2018/07/goku-1531912434329_1280w.jpg"
        },
        {//second character
            name: "Piccolo",
            charAttributes: {
                //health points
                hPoints: 120,
                //max health points
                maxHPoints: 120,
                //attack power
                attackPwr: 40,
                //base attack power
                baseAttackPwr: 40,
                //counter attack power
                counterAttPwr: 20
            },
            img: "https://i.pinimg.com/originals/2f/0b/af/2f0bafeb4da7461af74e07bc76eb6638.jpg"
        },
        {//third character
            name: "Vegeta",
            charAttributes: {
                //health points
                hPoints: 150,
                //max health points
                maxHPoints: 150,
                //attack power
                attackPwr: 60,
                //base attack power
                baseAttackPwr: 60,
                //counter attack power
                counterAttPwr: 40
            },
            img: "https://img00.deviantart.net/dfd8/i/2013/131/1/e/vegeta__scouter__by_sbddbz-d573nh6.png"
        },
        {//fourth character
            name: "Majin Buu",
            charAttributes: {
                //health points
                hPoints: 200,
                //max health points
                maxHPoints: 200,
                //attack power
                attackPwr: 70,
                //base attack power
                baseAttackPwr: 70,
                //counter attack power
                counterAttPwr: 80
            },
            img: "http://i.imgur.com/e1kKuYo.jpg"
        }
    ];
}

//initialize attacker
var attackerCharacter = null;

//initialize data for the attacker
var attackerData = null;

//reference initial attacker
var initAttCharacter = null;

//initialize defender
var defenderCharacter = null;

//initialize data for the defender
var defenderData = null;

//reference initial attacker
var initDefCharacter = null;

//wins count
var wins = 0;

//loss count
var looses = 0;

//loads jQuery after the document is already loaded
$(document).ready(function () {
    //display all the characters to the user
    setCharacters();

    //remove click handler
    $("#attack-button").off("click");

    //the user clicks the attack button
    $("#attack-button").click(function () {
        console.log(attackerData);
        console.log(defenderData);

        //the attacker wounds the defender using their attack power and it turn reduce the defenders health points
        defenderData.charAttributes.hPoints -= attackerData.charAttributes.attackPwr;

        //increase attack power of the the attacker by its base attack power
        attackerData.charAttributes.attackPwr += attackerData.charAttributes.baseAttackPwr;

        //update value of progress bar for the defender
        var defProBar = (defenderData.charAttributes.hPoints / defenderData.charAttributes.maxHPoints) * 100;

        //assigns the health point values to be used by the progress bar
        $(defenderCharacter).find(".progress-bar")
            .text(defenderData.charAttributes.hPoints)
            .attr("aria-valuenow", defenderData.charAttributes.hPoints)
            .css("width", defProBar + "%");

        //set attacker data in html
        $("#attackerAttPow").text(attackerData.charAttributes.attackPwr);
        $("#attackerFightData").removeClass("invisible");

        //check if defender has been defeated
        if (defenderData.charAttributes.hPoints <= 0) {
            //attacker wins the round
            wins++;

            //removes the defender from the ui
            $("#defender").empty();

            //shows the character you have defeated
            $("#defender").append("<div class=\"alert alert-info\" role=\"alert\"\> You have defeated " + defenderData.name + ". Please choose another character.\<\/div\>");

            //choose if attacker has won
            if (wins === 3) {
                //lets the user they won
                $("#won").text("You have won! Game Over.");
                //hides the attack button
                $("#attack-button").addClass("invisible");
                //removes alert that indicates to the user to choose another character after the defender character was just defeated
                $("div").remove(".alert");
                //shows the last defender that was fought
                $("#defender").append("<div class=\"alert alert-info\" role=\"alert\"\> You have defeated " + defenderData.name + ".\<\/div\>");
            }
            //reset the defender information
            defenderCharacter = null;
            defenderData = null;
            $("#defenderFightData").addClass("invisible");

            //add a red x over character already chosen
            $(initDefCharacter).addClass("red-x");

            //remove click handler
            $(initDefCharacter).off("click");

            //choose the next character to fight against
            return;
        }

        //the defender defends themselves from the attacker with their counter attack power
        attackerData.charAttributes.hPoints -= defenderData.charAttributes.counterAttPwr;

        //update value of progress bar for the attacker
        var attProBar = (attackerData.charAttributes.hPoints / attackerData.charAttributes.maxHPoints) * 100;

        //set defender data in html
        $(".defenderName").text(defenderData.name);
        $("#defenderAttPow").text(defenderData.charAttributes.attackPwr);
        $("#defenderFightData").removeClass("invisible");

        //assigns the health point values to be used by the progress bar
        $(attackerCharacter).find(".progress-bar")
            .text(attackerData.charAttributes.hPoints)
            .attr("aria-valuenow", attackerData.charAttributes.hPoints)
            .css("width", attProBar + "%");

        //check if the attacker is still alive
        if (attackerData.charAttributes.hPoints <= 0) {
            //attacker looses the round
            looses++;
            //removes the attacker from the ui
            $("#attacker").empty();

            //shows that you have been defeated
            $("#attacker").append("<div class=\"alert alert-info\" role=\"alert\"\> You have been defeated " + attackerData.name + ".\<\/div\>");

            //add a red x over character already chosen
            $(initAttCharacter).addClass("red-x");

            //remove click handler
            $(initAttCharacter).off("click");

            //show restart button
            $("#restart-button").removeClass("invisible");

            //let the user know they need to reset the game
            $("#won").text("If you wish to play again press the Restart button.");

        }
    });
    //remove click handler
    $("#restart-button").off("click");

    //resets data
    $("#restart-button").click(function () {
        //removed fight data
        $(".start-empty").empty();

        //reset elements with invisible class
        $(".start-invisible").addClass("invisible");

        //reset fight container to not display
        $("#fightContainer").addClass("d-none");
        //reset attacker
        attackerCharacter = null;

        //reset data for the attacker
        attackerData = null;

        //reset reference to initial attacker
        initAttCharacter = null;

        //reset defender
        defenderCharacter = null;

        //reset data for the defender
        defenderData = null;

        //reset reference to initial attacker
        initDefCharacter = null;

        //reset wins count
        wins = 0;

        //reset loss count
        looses = 0;

        //initialize characters attributes back
        characters = defaultCharacters();

        //set characters html and styles back
        setCharacters();
    });
});
function setCharacters() {
    //targets each character class inside the html
    $(".character").each(function (index, element) {
        //resets the character styles back to unchosen state
        //removes red x's
        $(element).removeClass("red-x");

        //removes bg-white and bg-warning background classes while adding back dark background
        $(element).find(".card-body").addClass("bg-dark").removeClass("bg-white bg-warning");

        //removes text-white while adding back dark text
        $(element).find(".card-title").addClass("text-white").removeClass("text-dark");

        //handles initializing the list of characters to be shown to the user to pick from
        //initializes the first character of the array of characters to be the first character to be displayed to the user
        var character = characters[index];
        console.log(character);
        console.log(characters);
        console.log(index);
        //assigns the image to be used
        $(element).find(".card-img-top").attr("src", character.img);
        //assigns the name of the character to be used
        $(element).find(".card-title").text(character.name);
        //assigns the health point values to be used by the progress bar
        $(element).find(".progress-bar")
            .text(character.charAttributes.hPoints)
            .attr("aria-valuenow", character.charAttributes.hPoints)
            .attr("aria-value-max", character.charAttributes.hPoints);


        //remove click handler
        $(element).off("click");

        //handles the display of the characters chosen by the user in the fighting arena
        $(element).click(function () {
            //show fight section
            $("#fightContainer").removeClass("d-none");
            $(".fight").removeClass("invisible");

            //remove click handler
            $(element).off("click");

            //determines the attacker and defender characters
            if (attackerCharacter == null) {//set the first click to be the attacker character

                //make a copy of the clicked character and set it to attack
                attackerCharacter = $(element).clone();

                //saves initial attacker character
                initAttCharacter = $(element);

                //set the data from the character
                attackerData = character;

                //switch to the current name of the character in the html
                $(".attackerName").text(attackerData.name);

                //switch | to vs.
                $("#versus").text("vs.");

                //move the attacker character onto the field
                $("#attacker").append(attackerCharacter);

                //change colors of the chosen character
                $(element).find(".card-body").addClass("bg-white").removeClass("bg-dark");
                $(element).find(".card-title").addClass("text-dark").removeClass("text-white");

            } else if (defenderCharacter == null) {//set the second click to be the defender character
                //test if there has been a second click and if it has been assigned to the defender character console.log(defenderCharacter);
                if (character !== attackerData) {
                    //make a copy of the clicked character and set it to defend
                    defenderCharacter = $(element).clone();

                    //saves initial defender character
                    initDefCharacter = $(element);

                    //set the data from the character
                    defenderData = character;

                    //switch to the current name of the character
                    $(".defenderName").text(defenderData.name);

                    //if there was a defender already clear it 
                    $("#defender").empty();

                    //move the defender character onto the field
                    $("#defender").append(defenderCharacter);

                    //change colors of the chosen character
                    $(element).find(".card-body").addClass("bg-warning").removeClass("bg-dark");
                    $(element).find(".card-title").addClass("text-dark").removeClass("text-white");

                    //hide fight data
                    $("#attackerFightData").addClass("invisible");
                    $("#defenderFightData").addClass("invisible");

                } else {//if the user clicked the character twice alert them to choose another character
                    $("#defender").append("<div class=\"alert alert-info\" role=\"alert\"\> Please choose another character.\<\/div\>");
                }
                //show attack button
                $("#attack-button").removeClass("invisible");
            }
        });
    });
}