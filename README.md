# King of France
Course: Experimental Psychology Lab SS 2018

This repository is created as part of a group project during the course of Experimental Psychology Lab, SS 2018, University of Osnabrück.  

## An online experiment based on the paper:
Abrusán, M., & Szendroi, K. (2013). Experimenting with the King of France--Topics, verifiability and definite descriptions. Semantics and Pragmatics, 6(10), 1-43.

We replicated the experiment initially conducted by Abrusán et. al (2013) and now present our documentation in this repository. 

## Cloning and running the experiment

```
# clone the repo, e.g.:
git clone https://github.com/mbakharzi/king_of_france

# go to 'king_of_france'

# open 'index.html' in the browser to see the experiment
```

## Documentation

+ All the documentation available is stored and organised in this repository.

+ The final report is to be found in the file named `Report.html`.

## File Organisation

+ `index.html` - starting point; to be loaded in the browser

+ `views`/     - file with a collection of views of the experiment
	+ `view.js`            - definition of how individual trials look, which data to collect etc.; main work happens here

+ `scripts`/   - files for main functionality
	+ `experiment.js`       - initializes the experiment (trial structure, input data etc.)
	+ `main.js`             - main functionality to run experiment
    + `helpers.js`          - helper functions specific to each particular experiment
	+ `submit_to_server.js` - functions to process, send or store data

+ `config`/    - file(s) with user-supplied information
	+ `config_deploy.js`    - information about how to deploy (=run, collect data for) the experiment
   
+ `images`       - images shown in this experiment

+ `styles/styles.css`  - style files

+ `libraries`    - external libraries

+ `Report.html`  - file with the final report of the project

+ `README.md`
+ `LICENSE`



## Views & trials

The experiment begins with a set of instructions, followed by the two parts of which it consists - practice part and main part. In the practice part, participants are given the chance to familiarise themselves with the task. The main part is divided into two block of trials, separated by a pause, the length of which can be decided individually based on individual needs and preferences. Before all trials, subjects are instructed to remain focus and answer as fast and accurate as possible. 



## Experiment

The experiment itself is realized as a Javascript object. It contains four keys that are particularly important for customizing your experiment:

+ `views` - array of view-objects in the order in which they are to occur

+ `trial_info` - any information the user may wish to specify to realize particular trials (e.g., test sentences)

+ `trial_data` - data gathered from each particular trial (this is the main experimental data you collect)

+ `global_data` - data that is collected only once, such as MTurk userID, starting time, total experiment time etc.



## Configuration of deployment

The deploy configuration file `config_deploy.js` contains **information about how to deploy** (i.e., run, recruit participants & store data) an experiment. Here, we simply use the `debug` mode in which the experiment runs locally in our own browser and outputs the data collected on the last slides as one huge and unstructured blob of text. Other modes of deployment are possible.
