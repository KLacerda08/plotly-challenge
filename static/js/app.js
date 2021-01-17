// Identify sample IDs and append to html dropdown element    
d3.json('samples.json').then(function(response) {
    var sampleId = response.names;
    var dropDown = d3.select("#selDataset");
    Object.entries(sampleId).forEach(function([key, value]) {
        dropDown.append("option").text(value);
    })
})

function buildPlots(patientId){
    // Read json data 
    d3.json("samples.json").then(function(response) {
        var sampleData = response.samples;
        console.log(sampleData);
        // identify index of patient ID for use chart-building
        var patientIndex = sampleData.map(function(record) {
            return record.id
            }).indexOf(patientId);

//      // Build demographic info
        // read the metadata from the json response
        var patientData = response.metadata;
        // identify the html element and clear it from it's previous load
        var sampleMeta = d3.select("#sample-metadata");
        sampleMeta.html("");
        // Get demographic data associated with patientIndex 
        // add a new paragraph to the html element for each key value pair
        Object.entries(patientData[patientIndex]).forEach(function([key, value]) {
            var p = sampleMeta.append("p");
            p.text(`${key}: ${value}`);
        });

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
        
        // Get top ten from each array for bar plot; data came in descending order
        var valuesTopTen = otuValues[patientIndex].slice(0,10).reverse();
        var idsTopTen = otuIds[patientIndex].slice(0,10).reverse();
        var yAxisIds = idsTopTen.map(function(record) {
                return `OTU-` + `${record}`
                });
        var labelsTopTen = otuLabels[patientIndex].slice(0,10).reverse();

        // Assign variables for bubble plot
        var otuValues2 = otuValues[patientIndex];
        var otuIds2 = otuIds[patientIndex];
        var otuLabels2 = otuLabels[patientIndex];
        var colorBub = otuIds2;
        var colorScale = "Portland";
        var markerSize = otuValues2.map(function(record) {
            return record*10
        });

        // Build bubble plot: 
        var traceBub = { 
            x: otuIds2,
            y: otuValues2,
            text: otuLabels2,
            mode: "markers",
            marker: {
                color: colorBub,
                colorscale: colorScale,
                size: markerSize,
                sizemode: "area",
            }
        };
        var dataBub = [traceBub];

        var layoutBub = {
            xaxis:{

                title: {
                    text: "Species (OTU ID)"
                    }
            },
            yaxis:{
                title: {
                    text: "Number of Species Present"
                }
            },
        };
        Plotly.newPlot("bubble", dataBub, layoutBub);   

        // Build bar plot: 
        var traceBar = {
            x: valuesTopTen,
            y: yAxisIds,
            text: labelsTopTen,
            type: "bar",
            orientation: "h",
        };

        var dataBar = [traceBar];

        var layoutBar = {
        title: "Top 10 Microbial Species",
        xaxis: { title: "Number of Species Present" },
        yaxis: { 
            title: "Species (OTU ID)",
            tickmode: "linear" }
        };

        // Plot the chart to the tag with the id "bar"
        Plotly.newPlot("bar", dataBar, layoutBar);
    });
}

function init() {
    // Read json data 
    d3.json("samples.json").then(function(response) {
        var sampleData = response.samples;
        var patientId = sampleData.map(function(record) {
            return record.id
            })[0];

    buildPlots(patientId)
    }); 
}

// change charts with dropdown selection
function optionChanged(newPatient) {
    buildPlots(newPatient);
}

init();
buildPlots();