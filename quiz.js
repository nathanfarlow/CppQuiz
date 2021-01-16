
//Spoilers below! If you haven't taken the quiz yet,
//I recommend you do that before coming here.

const MAX_ANSWERS = 5;

let currentQuestion = 0;

let numCorrect = 0;

/*https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function shuffleAnswers() {
    for(let question of questions) {
        correct = question.answers[question.correct];
        shuffleArray(question.answers);
        question.correct = question.answers.findIndex((element) => element == correct);
    }
}

function getCurrentQuestion() {
    return questions[currentQuestion];
}

function setCurrentQuestion(index) {

    if(index >= questions.length) {
        //We are done. Hide all elements

        $('pre code').hide();
        $('#prompt').hide();

        for(let i = 0; i < MAX_ANSWERS; i++) {
            $('#b' + i).hide();
        }

        $('#next').hide();

        $('#question-name').text(`Your score is ${numCorrect}/${questions.length}. Nice job! I hope you learned something new.`)

        return;
    } 
    
    if(index == questions.length - 1) {
        $('#next').text('Finish');
    }

    currentQuestion = index;
    let question = questions[index];

    //Set question number
    $('#question-name').text(`Question ${currentQuestion + 1}/${questions.length}`);

    //Set code
    $('pre code').text(question.code);
    hljs.highlightBlock($('pre code')[0]);

    //Set prompt
    $('#prompt').text(question.prompt);

    //Set buttons
    for(let i = 0; i < question.answers.length; i++) {
        let btn = $('#b' + i);
        btn.removeAttr('style');
        btn.prop('disabled', false);
        btn.text(question.answers[i]);
        btn.show();
    }

    for(let i = question.answers.length; i < MAX_ANSWERS; i++) {
        $('#b' + i).hide();
    }
}

$(document).ready(function() {

    for(let i = 0; i < MAX_ANSWERS; i++) {

        let btn = $('#b' + i);

        btn.click(function() {
            let correct = getCurrentQuestion().correct == i;

            if(correct) {
                numCorrect++;
                btn.css('background-color', 'darkgreen');
            } else {
                btn.css('background-color', 'darkred');
            }

            //Disable answers and reenable next button
            for(let j = 0; j < MAX_ANSWERS; j++) {
                $('#b' + j).prop('disabled', 'true');
            }

            $('#next').prop('disabled', false);

            $('#explanation').show();
            $('#explanation').text((correct ? 'Correct! ' : 'Not quite. ') + getCurrentQuestion().explanation);
        });

    }

    $('#next').click(function() {
        $('#explanation').hide();
        $('#next').prop('disabled', true);
        setCurrentQuestion(currentQuestion + 1);
    });

    $('#restart').click(function() {
        
        //Unhide elements if on last screen

        $('pre code').show();
        $('#prompt').show();

        for(let i = 0; i < MAX_ANSWERS; i++) {
            $('#b' + i).show();
        }

        $('#next').show();

        $('#explanation').hide();

        $('#next').text('Next Question');

        numCorrect = 0;

        shuffleAnswers();
        setCurrentQuestion(0);
    })

    shuffleAnswers();
    setCurrentQuestion(0);

});

hljs.initHighlightingOnLoad();
