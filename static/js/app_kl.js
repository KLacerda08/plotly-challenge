
// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    // Read the json data
    d3.json("samples.json").then(function(response) {
        console.log(response.metadata);
        
        // Assign a variable to filter the data, to get the sample's metadata (value)
        // based on the sample id (key). convert the sample id field to an integer
        // get the metadata for the first sample using index [0]
        var filteredData = response.metadata.filter(record => record.id === parseInt(record.id))[0];
        console.log(filteredData);
    
        // the filtered data returns an array of objects, but we want to get object out of array
        // first, define a variable for the html element (here, an id) 
        var sampleMeta = d3.select("#sample-metadata");
    
        // add a new paragraph to the html element for each key value pair
        Object.entries(filteredData).forEach(function([key, value]) {
            var p = sampleMeta.append("p");
            //add the text of the key value pair to each new paragraph
            p.text(`${key}: ${value}`);
        // Specify the location of the metadata and update it
        });
    });
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
    // Read the json data
    d3.json("samples.json").then(function(response) {
        // console.log(response.metadata);
        
        // Select the input element and get the raw HTML node
        // var inputElement = d3.select("#selDataset");
        var inputElement = d3.select("#selDataset");
        // var inputElement = d3.select("#selDataset").select("option");
        // Get the value property of the input element
        var inputValue = inputElement.property("value");
        // console.log(inputValue);
        // d3.event.preventDefault();
        // create a filtered data set 
        // var filteredData = ufoRecords.filter(record => record.datetime === inputValue);
        // console.log(filteredData);

        var filteredData = response.metadata.filter(record => record.id === parseInt(inputValue))[0];
        console.log(filteredData);
     
        var sampleMeta = d3.select("#sample-metadata");
        sampleMeta.html("");
        // var p = sampleMeta.append("p");
        //clear the Demographic Info table 
        // p.html("");

        // add a new paragraph to the html element for each key value pair
        Object.entries(filteredData).forEach(function([key, value]) {
            var p = sampleMeta.append("p");
            //add the text of the key value pair to each new paragraph
            p.text(`${key}: ${value}`);

        // Assign a variable to filter the data, to get the sample's metadata (value)
        // based on the sample id (key). convert the sample id field to an integer
        // get the metadata for the first sample using index [0]
        
        
        // var filteredData = response.metadata.filter(record => record.id === parseInt(record.id));
        // console.log(filteredData);
    
        // the filtered data returns an array of objects, but we want to get object out of array
        // first, define a variable for the html element (here, an id) 
        // var sampleMeta = d3.select("#sample-metadata");
    
        // add a new paragraph to the html element for each key value pair
        // Object.entries(filteredData).forEach(function([key, value]) {
        //     var p = sampleMeta.append("p");
        //     //add the text of the key value pair to each new paragraph
        //     p.text(`${key}: ${value}`);
        // Specify the location of the metadata and update it
        });
    });
}

    // Update metadata with newly selected sample
    // console.log(newSample)
    // Update charts with newly selected sample



// Initialize dashboard on page load
init();
buildMetadata();
// optionChanged(newSample);

