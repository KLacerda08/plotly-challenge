
// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    // Read the json data
    // var sampleMeta = d3.json("samples.json").then((response) => {
    //     console.log(sampleMeta);
    // });

    // var sampleData = d3.json("samples.json").then((response) => {
    //     console.log(sampleData);
    // });

    // var sampleData = d3.json("samples.json").then(function(response) {
    //     console.log(sampleData);
    // });

    d3.json("samples.json").then(function(response) {
        console.log(response.metadata);
    
    // Assign a variable to filter the data, to get the sample's metadata (value)
    // based on the sample id (key). convert the sample id field to an integer
    // get the metadata for the first sample using index [0]

    // *** this line is not working, creates an uncaught reference error
    // *** response is not defined. ??? ***
    // var filteredData = response.metadata.filter(record => record.id === parseInt(sample))[0];
    // console.log(filteredData);

    // Let's try other things
        var filteredData = response.metadata.filter(record => record.id === parseInt(record.id))[0];
        console.log(filteredData);
    
    });
    //tried assigning a variable to the response, let's call that 
    // var filteredData = sampleMeta.filter(record => record.id === parseInt(sample))[0];
    // console.log(filteredData);  
    
    
            // the filtered data returns an array of objects, but we want to get object out of array
    // first, define a variable for appending the filtered data to the html element (here, an id) 
    // var sampleMeta = d3.select("#sample-metadata");

    
    // Object.values()
    // Specify the location of the metadata and update it
    // });
}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data

    // Parse and filter the data to get the sample's OTU data
    // Pay attention to what data is required for each chart

    // Create bar chart in correct location

    // Create bubble chart in correct location

}

// Define function that will run on page load
function init() {
    // Read json data - the response only exists within the promise
    d3.json("samples.json").then((response) => {
        // console.log(response.names);
        // array name will be response.names 
        // add dropdown for this array; set variable equal to html element of the dropdown
        var dropDown = d3.select("#selDataset");
        response.names.forEach(function (record) {
            var option = dropDown.append("option");
            // entries and values are the same thing. object.whatever iterates thru dict
            // don't need Object here because resonse.names is just an array. 
            option.text(record);
            option.property("value", record);
        });
    });
    // buildMetadata("940")
    // buildMetadata("940")
}
// Parse and filter data to get sample names


//   });

// Add dropdown option for each sample

// Use first sample to build metadata and initial plots


function optionChanged(newSample) {

    // Update metadata with newly selected sample
    // console.log(newSample)
    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();
buildMetadata();

