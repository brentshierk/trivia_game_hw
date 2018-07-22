$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax();
    $('.tooltipped').tooltip({
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() {

    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;




    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }



    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }



    var questions = [
        // question 1
        {
            "q": "Where was Dalaran originally located in the Eastern Kingdoms?",
            "c": ["silberpine forest", "tirisfal glades", "hillsbrad foothills"],
            "answer": 0
        },

        {
            "q": "What is the highest rank that can be bestowed on a night elf Watcher?",
            "c": ["Warden", "Sentinel", "keeper"],
            "answer": 0
        },

        {
            "q": "Which of the following is not a possible result from drinking a Noggenfogger Elixir?",
            "c": ["Slow fall", "Shrink", "you breathe fire"],
            "answer": 2
        },

        {
            "q": "What Pandaria creatures are the embodiments of negative emotions including doubt, despair, and anger?",
            "c": ["Mantid", "sha", "Hozen"],
            "answer": 2
        },

        {
            "q": "Who became the Lich King after Arthas was defeated?",
            "c": ["Bolvar Fordragon", "Darion Mograine", "Tirion Fordring"],
            "answer": 0
        },


    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame();
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum');
            userChoice = parseInt(userChoice);


            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
              

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});
