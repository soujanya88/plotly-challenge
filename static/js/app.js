function init() {
  var ul = d3.select("#selDataset");
  d3.json("data/samples.json").then((data) => {
    ul.selectAll('option')
      .data(data.names)
      .enter()
      .append('option')
      .text(function (d) {
        return d;
      })
  });

  ul.on("change", function () {
    var dropdownValue = this.value;
    d3.json("data/samples.json").then((data) => {
      buildMetadata(data, dropdownValue);
    });
  });
}

function buildGraph(sample_values, yLabel, otu_labels, otu_ids) {
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
      sizeref: 2
    },
    mode: 'markers',
    text: otu_labels,
  };

  // Define our plot layout
  var layout_h = {
    title: "Number of OTU's in the belly button",
    xaxis: { title: "Number of OTU's" },
    yaxis: { title: "OTU ids" },
  };

  var layout_b = {
    title: 'OTU ids and values',
    showlegend: false,
  };

  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar", [trace_h], layout_h);
  Plotly.newPlot("bubble", [trace_b], layout_b);
}

function buildMetadata(data, dropdownValue) {
  var metadata = data.metadata;
  var metadataForId = metadata.filter(item => item.id === parseInt(dropdownValue));

  d3.select("#lbid")
    .html(function () {
      return `${"Id:"} ${metadataForId[0].id}`;
    });
  d3.select("#lblEthnicity")
    .html(function () {
      return `${"Ethnicity:"} ${metadataForId[0].ethnicity}`;
    });
  d3.select("#lblGender")
    .html(function () {
      return `${"Gender:"} ${metadataForId[0].gender}`;
    });

  d3.select("#lblAge")
    .html(function () {
      return `${"Age:"} ${metadataForId[0].age}`;
    });

  d3.select("#lblBBtype")
    .html(function () {
      return `${"Bbtype:"} ${metadataForId[0].bbtype}`;
    });

  d3.select("#lblwfreq")
    .html(function () {
      return `${"Wfreq:"} ${metadataForId[0].wfreq}`;
    });

  var info = data.samples.filter(item => item.id === dropdownValue)
  var yLabel = [], otu_ids = info[0].otu_ids;;
  otu_ids.forEach(id => {
    yLabel.push("OTU " + id);
  });

  buildGraph(info[0].sample_values, yLabel, info[0].otu_labels, info[0].otu_ids);
}

init();