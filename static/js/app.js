// Define a function that will create metadata for given sample
function buildMetadata(inputValue) {
    // Read the json data
    d3.json("samples.json").then(function(response) {
        // console.log(response.metadata);
        // Assign a variable to filter the data, to get the sample's metadata (value)
        // based on the sample id (key). convert the sample id field to an integer
        // get the metadata for the first sample using index [0]
        // Select the input element and get the raw HTML node
        var inputElement = d3.select("#selDataset");
        // // Get the value property of the input element
        var inputValue = inputElement.property("value");
        var sampleData = response.metadata.filter(record => record.id === parseInt(inputValue))[0];
        // identify the html element and clear it from it's previous load
        var sampleMeta = d3.select("#sample-metadata");
        sampleMeta.html("");
        // Get object out of filteredData array, and 
        // add a new paragraph to the html element for each key value pair
        // add the text of the key value pair to each new paragraph
        Object.entries(sampleData).forEach(function([key, value]) {
            var p = sampleMeta.append("p");
            p.text(`${key}: ${value}`);
        });
    });
}

// Define a function that will create charts for given patient sample
function buildCharts1(inputValue) {
    // Read the json data
    d3.json("samples.json").then(function(response) {
        // Select the input element and get the value to correspond to the sample ID
        var inputElement = d3.select("#selDataset");
        var inputValue = inputElement.property("value");
        // Assign variable to json response 
        var sampleData = response.samples;
        
        // Get data for charts: sample values (OTU Values), OTU IDs, and OTU labels    
        var sampleId = sampleData.map(function(record) {
            return record.id
            }).indexOf(inputValue);       
        var otuValues = sampleData.map(function(record) {
            return record.sample_values
            });
        var otuIds = sampleData.map(function(record) {
            return record.otu_ids
            });
        var otuLabels = sampleData.map(function(record) {
            return record.otu_labels
            });
        // Get top ten from each array for plotting; data is already sorted in descending order
        var valuesTopTen = otuValues[sampleId].slice(0,10).reverse();
        var idsTopTen = otuIds[sampleId].slice(0,10).reverse();
        var yAxisIds = idsTopTen.map(function(record) {
                return `OTU-` + `${record}`
                });
        var labelsTopTen = otuLabels[sampleId].slice(0,10).reverse();

        // var otuIds = sampleData.map(function(record) {
        //     return `OTU + ${record.otu_ids}`
        //     });

        // identify the html tag and clear it from it's previous load
        var barChart = d3.select("#bar");
        barChart.html("");

        // Create the Trace
        var trace1 = {
            x: valuesTopTen,
            y: yAxisIds,
            text: labelsTopTen,
            type: "bar",
            orientation: "h",
        };

        // Create the data array for the plot
        var data = [trace1];

        // Define the plot layout
        var layout = {
        title: "Top 10 Microbial Species",
        xaxis: { title: "Number of Species Present" },
        yaxis: { 
            title: "Species (OTU ID)",
            tickmode: "linear" }
        };

        // Plot the chart to the tag with the id "bar"
        Plotly.newPlot("bar", data, layout);


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

// function to change output based on dropdown selection
function optionChanged(newSampleId) {
    buildMetadata(newSampleId);
    buildCharts1(newSampleId);
}

    // Update metadata with newly selected sample
    // console.log(newSample)
    // Update charts with newly selected sample

// Initialize dashboard on page load
init();
buildMetadata();
// buildCharts();
buildCharts1();
// optionChanged(newSample);
