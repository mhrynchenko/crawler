In this test task I'm going to use BFS approach to build site tree.
In order to meet performance requirments I'll use RegExp and I'll assume that the html structure is valid.

In order to structure the code I want to create a class for Crawler. 
I want to make this class extandable, so developers can register their own tasks inside Crawler and controll the final input. 
Hovewer Crawler will have default task for looping throught the queue and building site tree. 

In order to improve performence I want to loop through the queue in parallel way, so I'll add async package.

TODO: 
1. I don't have enough time to fix RegExp for formatting search results. 
2. For taking user input I would use inquirer pkg but I need some additional time.
