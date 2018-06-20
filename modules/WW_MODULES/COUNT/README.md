# COUNT module
This simple module allow us to delay the execution of other modules. Is like a timer, each time the node is executed it will incresse a internal counter and when the counter reachs the maximum then the node will end his execution and pass all his input parameters to the output parameters.

### Variables
* **_COUNT**: Counter
* **_COUNT_TO**: Maximum value of the counter. When the counter reachs this value the node will end.