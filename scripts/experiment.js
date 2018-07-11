// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {

    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();

    // specify view order
    this.views_seq = [intro,
                     instructions,
                     practice,
                     beginMainExp,
                     main,
                     mainBreak,             // Dobaveno
                     mainPart2,             // Dobaveno
                     /*loop([practice,
                     beginMainExp,
                     main], 2),*/
                     postTest,
                     thanks];

    // prepare information about trials (procedure)
    // randomize main trial order, but keep practice trial order fixed

    // Get all trials
    var all_trials = _.shuffle(main_trials); // Dobaveno
    // Find how many is half (round down the number if all_trials is of odd length... so first part of "main" gets one less trial)
    var half_questions = Math.floor(all_trials.length/2); // Dobaveno

    // Define trials for the first part of the test
    this.trial_info.main_trials = all_trials.slice(0,half_questions); // Dobaveno
    // ...and for the second part
    this.trial_info.main_trials_part_2 = all_trials.slice(half_questions); // Dobaveno

    this.trial_info.practice_trials = practice_trials;

    this.responses = _.shuffle(["true", "false", "cantsay"]);



    // adds progress bars to the views listed
    // view's name is the same as object's name
    this.progress_bar_in = ['main','mainPart2']; // Dobaveno
    // this.progress_bar_in = ['practice', 'main'];
    // styles: chunks, separate or default
    this.progress_bar_style = 'default';
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 100;
};
