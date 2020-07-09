
function buildMetadata() {
  d3.json("samples.json").then((data) => {
    var ul = d3.select("#selDataset");
    ul.selectAll('option')
      .data(data.names)
      .enter()
      .append('option')
      .text(function (d) {
        return d;
  
      })

      

    ul.on("change", function (optionChanged) {
      d3.select("#lbid").text("");
      d3.select("#lblEthnicity").text("");
      d3.select("#lblGender").text("");
      d3.select("#lblAge").text("");
      d3.select("#lblLocation").text("");
      d3.select("#lblBBtype").text("");
      d3.select("#lblwfreq").text("");
      var metadata = data.metadata;
      var dValue = this.value
      console.log(dValue);

    var metadataForId = metadata.filter(item => item.id === parseInt(dValue));
    console.log(metadataForId);  

    d3.select("#lbid")
      .append('text')
      .text(function(d) {
        return `${"Id:"} ${metadataForId[0].id}`;
      })
    d3.select("#lblEthnicity")
      .append('text')
      .text(function(d) {
        return `${"Ethnicity:"} ${metadataForId[0].ethnicity}`;
      })
    d3.select("#lblGender")
      .append('text')
      .text(function(d) {
        return `${"Gender:"} ${metadataForId[0].gender}`;
    
    })

    d3.select("#lblAge")
      .append('text')
      .text(function(d) {
        return `${"Age:"} ${metadataForId[0].age}`;
    
    })
    
    d3.select("#lblBBtype")
      .append('text')
      .text(function(d) {
        return `${"Bbtype:"} ${metadataForId[0].bbtype}`;
    
    })
    
    
    d3.select("#lblwfreq")
      .append('text')
      .text(function(d) {
        return `${"Wfreq:"} ${metadataForId[0].wfreq}`;
    
    });
    
    
    var testSample = data.samples;
    console.log(testSample);
    var sampleInfo = testSample.filter(item => item.id === dValue)
    console.log(sampleInfo[0].sample_values);
    console.log(sampleInfo[0].otu_labels);
    console.log(sampleInfo[0].otu_ids);

    
    var sample_values = sampleInfo[0].sample_values;
    var otu_labels = sampleInfo[0].otu_labels;
    var otu_ids = sampleInfo[0].otu_ids;
    

    var yLabel = [];
    otu_ids.forEach(id => {
      yLabel.push("OTU " + id);
    });



    //Create a trace for the bar graph
    var trace_h = {
      x: sample_values,
      y: yLabel,
      type: "bar",
      orientation: "h",
      text: otu_labels
    };


    //create a trace for the bubble chart

    var trace_b = {
      x: otu_ids,
      y: sample_values,
      type: "scatter",
      marker: {
        size: sample_values,
        color: otu_ids,
        sizeref:2
      },
      mode: 'markers',
      text: otu_labels,
     
    };

    // Create the data array for our plot
    var data_h = [trace_h];
    var data_b = [trace_b];

    // Define our plot layout
    var layout_h = {
      title: "Number of OTU's in the belly button",
      xaxis: { title: "Number of OTU's" },
      yaxis: { title: "OTU ids" },
    };

    var layout_b = {
      title: 'OTU ids and values',
      showlegend: false,
      // height: 10000,
      // width: 1000
    };

    



    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data_h, layout_h);
    Plotly.newPlot("bubble", data_b, layout_b);






    

      
    });

    




  })};



buildMetadata();
