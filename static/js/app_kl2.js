
// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    // Read the json data
    d3.json("samples.json").then(function(response) {
        console.log(response.metadata);
        // Assign a variable to filter the data, to get the sample's metadata (value)
        // based on the sample id (key). convert the sample id field to an integer
        // get the metadata for the first sample using index [0]
        // Select the input element and get the raw HTML node
        var inputElement = d3.select("#selDataset");
        // Get the value property of the input element
        var inputValue = inputElement.property("value");
        
        // var filteredData = response.metadata.filter(record => record.id === parseInt(record.id))[0];
        var filteredData = response.metadata.filter(record => record.id === parseInt(inputValue))[0];
        // identify the html tag and clear it from it's previous load
        var sampleMeta = d3.select("#sample-metadata");
        sampleMeta.html("");
        //this works
        console.log(filteredData);
        // the filtered data returns an array of objects, but we want to get object out of array
        // first, define a variable for the html element (here, an id) 
        var sampleMeta = d3.select("#sample-metadata");
        // add a new paragraph to the html element for each key value pair
        Object.entries(filteredData).forEach(function([key, value]) {
            var p = sampleMeta.append("p");
            //add the text of the key value pair to each new paragraph
            p.text(`${key}: ${value}`);
        });
    });
}

// Define a function that will create charts for given sample
function buildCharts(sample) {
    // Read the json data
    d3.json("samples.json").then(function(response) {
        //this works
        console.log(response.samples);
        // Select the input element and get the raw HTML node
        var inputElement = d3.select("#selDataset");
        // Get the value property of the input element
        var inputValue = inputElement.property("value");
        // create the filtered data set 
        // var filteredData = response.metadata.filter(record => record.id === parseInt(inputValue))[0];
        // var filteredData = response.samples.filter(record => record.id == parseInt(record.id))[0];
        // var filteredData = response.samples.filter(record => record.id)[0];
        var filteredData = response.samples.filter(record => parseInt(record.id) == parseInt(sample));
        console.log(sample);
        console.log(response.samples), 
        console.log(response.samples[0].id)
        // console.log(filteredData);
        // identify the html tag and clear it from it's previous load
        // var barChart = d3.select("#bar");
        // barChart.html("");
        // add a new bar chart to the html element for the selected patient
        // Object.entries(filteredData).forEach(function([key, value]) {
        //     var p = sampleMeta.append("p");
        //     //add the text of the key value pair to each new paragraph
        //     p.text(`${key}: ${value}`);
    
        // var 
        // var topTen = 
    // Parse and filter the data to get the sample's OTU data
    // Pay attention to what data is required for each chart

    // Create bar chart in correct location

    // Create bubble chart in correct location
    });

    // this works to build the un-sliced arrays, but I found a cleaner way:  

    var otuValues2 = []
    var otuIds = []
    var otuLabels = []

    filteredData.forEach(function(record) {
        Object.entries(record).forEach(function([key, value]) {
            if (key === "sample_values") {
                //try a for each with index 0,10 here - could not get to work
                otuValues2.push(value)
            }
            else if (key === "otu_ids") {
                otuIds.push(value);
            }
            else if (key === "otu_labels") {
                otuLabels.push(value);
            }
        });

        // Define a function that will create charts for given patient sample
        // Note, here for some reason there is an issue using inputValue for the function parameter
        // and with calling the input elements after the d3.select. I have no idea why.  
        // function buildCharts1(inputValue) {
        function buildCharts1(sampleID) {
            // Read the json data
            d3.json("samples.json").then(function(response) {
                // Select the input element and get the value to correspond to the sample ID
                // var inputElement = d3.select("#selDataset");
                // var inputValue = inputElement.property("value");
        
                // Assign variable to json response 
                var sampleData = response.samples;
                console.log(sampleData);
                
                // might use this
                var otuValues2 = []
                var otuIds = []
                var otuLabels = []
            
                sampleData.forEach(function(record) {
                    Object.entries(record).forEach(function([key, value]) {
                        if (key === "sample_values") {
                            otuValues2.push(value)
                        }
                        else if (key === "otu_ids") {
                            otuIds.push(value);
                        }
                        else if (key === "otu_labels") {
                            otuLabels.push(value);
                        }
                    });
                });
        

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
}
// Parse and filter data to get sample names

// Use first sample to build metadata and initial plots

function optionChanged(Sample) {
    buildMetadata(Sample);
}


// function optionChanged(newSample) {
    // // Read the json data
    // d3.json("samples.json").then(function(response) {
    //     // Select the input element and get the raw HTML node
    //     var inputElement = d3.select("#selDataset");
    //     // Get the value property of the input element
    //     var inputValue = inputElement.property("value");
    //     // create the filtered data set 
    //     var filteredData = response.metadata.filter(record => record.id === parseInt(inputValue))[0];
    //     // identify the html tag and clear it from it's previous load
    //     var sampleMeta = d3.select("#sample-metadata");
    //     sampleMeta.html("");
    //     // add a new paragraph to the html element for each key value pair
    //     Object.entries(filteredData).forEach(function([key, value]) {
    //         var p = sampleMeta.append("p");
    //         //add the text of the key value pair to each new paragraph
    //         p.text(`${key}: ${value}`);
    //     });

        //update charts 

    // });
// }

    // Update metadata with newly selected sample
    // console.log(newSample)
    // Update charts with newly selected sample

            // Get data for charts: sample values (OTU Values), OTU IDs, and OTU labels
            var otuValues = sampleData.map(function(record) {
                return record.sample_values
            });
            var otuIds = sampleData.map(function(record) {
                return record.otu_ids
            });
            var otuLabels = sampleData.map(function(record) {
                return record.otu_labels
            });
    
            // this sort of works - I think it returns the top ten values in 153 separate arrays 
            otuValues.forEach(function(record) {
                console.log (record.slice(0,10))
            })
        // add a new bar chart to the html element for the selected patient
        // Object.entries(filteredData).forEach(function([key, value]) {
        //     var p = sampleMeta.append("p");
        //     //add the text of the key value pair to each new paragraph
        //     p.text(`${key}: ${value}`);

// // Initialize dashboard on page load
// init();
// buildMetadata();
// buildCharts();
// // optionChanged(newSample);

