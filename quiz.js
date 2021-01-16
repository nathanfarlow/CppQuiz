
//Spoilers below! If you haven't taken the quiz yet,
//I recommend you do that before coming here.

const MAX_ANSWERS = 5;

let currentQuestion = 0;

let numCorrect = 0;
let questions = [{"code": "#include <iostream>\n\nclass MyClass {\n    int val_ = 1;\n};\n\nstruct MyStruct : MyClass {};\n\nint main() {\n    MyStruct m;\n    std::cout << m.val_ << std::endl;\n\n    return 0;\n}", "prompt": "Welcome to the C++ quiz! (Although some of the peculiarities have their origins in C) Let's start easy. What does the above code print? All of the C++ examples in this quiz will be compiled with g++ -std=c++17. (If undefined, select 'Undefined behavior'. If the code would not compile, select 'Compilation error')\n", "answers": [0, 1, -1, "Undefined behavior", "Compilation error"], "correct": 4, "explanation": "It is possible for C++ structs to inherit from C++ classes. In fact, the only difference between structs and classes is the fact that member variables are private by default in a class and public by default in a struct. Because val_ was private in MyClass, it will remain private in whatever class/struct inherits from it, leading to a compilation issue by trying to access it in main."}, {"code": "#include <iostream>\n\nstruct Object {\n    Object() {\n        std::cout << \"A \";\n    }\n\n    Object(const Object &o) {\n        std::cout << \"B \";\n    }\n\n    Object& operator=(const Object &o) {\n        std::cout << \"C \";\n        return *this;\n    }\n};\n\nint main() {\n    Object a, b = a;\n}", "prompt": "Let's review constructors and operators. What does the above code print?\n", "answers": ["A C", "A A C", "A B", "Undefined behavior", "Compilation error"], "correct": 2, "explanation": "When declaring and initializing an object in the same statement, the copy constructor is invoked, not the assignment operator. In other words, Object b = a is the same as Object b{a}."}];

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

        $('#question-name').text(`Your score is ${numCorrect}/${questions.length}. Nice job! I hope you learned something new. Isn't C++ crazy?`)

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

        numCorrect = 0;

        setCurrentQuestion(0);
    })

    setCurrentQuestion(0);

});

hljs.initHighlightingOnLoad();
