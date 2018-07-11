var intro = {
    name: 'intro',
    // introduction title
    "title": "Welcome to our experiment !",
    // introduction text
    "text": "This experiment has two parts. Firstly, you will familiarise yourself with the practice trial part which prepares you for the main experiment. A short break follows, and then the main experiemnt will begin. The main experiment is devided into 2 parts with a short break in between.",
    // introduction's slide proceeding button text
    "buttonText": "Click to Start",
    // render function renders the view
    render: function() {

        viewTemplate = $('#intro-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var instructions = {
    name: 'instructions',
    // instruction's title
    "title": "Instructions",
    // instruction's text
    "text": "In this experiment, statements will apperar on your screen. If you think a statement is true, you should click on 'TRUE' button. If you think a statement is false, you should click on 'FALSE' button. Sometimes, it may happen that you can not decide. In those cases, you should click on the 'CAN'T SAY' button. Please do not dwell on your decision for too long. There is no right or wrong answer.",
    // instuction's slide proceeding button text
    "buttonText": "practice trial",
    render: function() {

        viewTemplate = $("#instructions-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
};

var practice = {
    name: 'practice',
    "title": "Practice trial",
    // render function renders the view
    render: function (CT) {

        viewTemplate = $("#practice-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
        title: this.title,
        question: exp.trial_info.practice_trials[CT].statements,
        option1: exp.responses[0],
        option2: exp.responses[1],
        option3:  exp.responses[2]
        }));
        startingTime = Date.now();
        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal to the answer is added to the trial object
        // as well as a readingTimes property with value - a list containing the reading times of each word
        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "practice",
                trial_number: CT+1,
                question: exp.trial_info.practice_trials[CT].statements,
                option1: exp.responses[0],
                option2: exp.responses[1],
                option3:  exp.responses[2],

                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data)
            exp.findNextView();
        });

    },
    trials: 5
};

var beginMainExp = {
    name: 'beginMainExp',
    "text": "When you are ready click on the button to start the main experiment.",
    // render function renders the view

    render: function() {

        viewTemplate = $('#begin-exp-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            text: this.text
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
};

var mainBreak = {
    name: 'mainBreak',
    "text": "You completed the first block of trials. Now you can take a short break. Continue with the next part when you are ready. This is the final part of the experiment.",
    // render function renders the view

    render: function() {

        viewTemplate = $('#break-exp-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            text: this.text
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
};

var main = {


    name: 'main',
    // render function renders the view
    render : function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#main-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            question: exp.trial_info.main_trials[CT].sentence,
            option1: exp.responses[0],
            option2: exp.responses[1],
            option3:  exp.responses[2]
        }));

        // update the progress bar based on how many trials there are in this round
        var filled = exp.currentTrialInViewCounter * (180 / exp.views_seq[exp.currentViewCounter].trials);
        $('#filled').css('width', filled);

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT + 5,
                question: exp.trial_info.main_trials[CT].sentence,
                option1: exp.responses[0],
                option2: exp.responses[1],
                option3:  exp.responses[2],
                condition: exp.trial_info.main_trials[CT].condition,
                expectedAnswer: exp.trial_info.main_trials[CT].expectedAnswer,
                type: exp.trial_info.main_trials[CT].type,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        // record trial starting time
        startingTime = Date.now();

    },
	trials : 82
};

// Dobaveno
var mainPart2 = {
    name: 'mainPart2',
    // render function renders the view
    render : function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#mainPart2-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            question: exp.trial_info.main_trials_part_2[CT].sentence,
            option1: exp.responses[0],
            option2: exp.responses[1],
            option3:  exp.responses[2]
        }));

        // update the progress bar based on how many trials there are in this round
        var filled = exp.currentTrialInViewCounter * (180 / exp.views_seq[exp.currentViewCounter].trials);
        $('#filled').css('width', filled);

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT + 5,
                question: exp.trial_info.main_trials_part_2[CT].sentence,
                option1: exp.responses[0],
                option2: exp.responses[1],
                option3: exp.responses[2],

                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        // record trial starting time
        startingTime = Date.now();
    },
    trials : 83
};



var postTest = {
    name: 'postTest',
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render : function() {

        viewTemplate = $('#post-test-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

    },
    trials: 1
};

var thanks = {
    name: 'thanks',
    "message": "Thank you for taking part in this experiment!",
    render: function() {

        viewTemplate = $('#thanks-view').html();

        // what is seen on the screen depends on the used deploy method
		//    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(viewTemplate, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

    },
    trials: 1
};
