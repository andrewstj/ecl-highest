# Overview
Requirements can be found [here](requirements.md)

# Running
This is written in Javascript and requires Node 11 or higher (I tested on Node 14.12.0).

Example: `node highest.js example_input_data_3.data 10`

# Considerations
I went with using Javascript array's build in sort algorithm, as it's Time Complexity is `Θ(n log(n))` and space complexity is `Θ(log(n))`.