
d3.json('samples.json').then(({names})=>{
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    showData();
});

function showData() {
  var sel = d3.select('select').property('value');

  d3.json('samples.json').then(({metadata, samples})=>{
    var metadata = metadata.filter(obj=>obj.id == sel)[0];
    var sample = samples.filter(obj=>obj.id == sel)[0];
    var { otu_ids, sample_values, otu_labels } = sample;

    d3.select('.panel-body').html('');
    Object.entries(metadata).forEach(([key,val])=>{
        d3.select('.panel-body').append('h5').text(key.toUpperCase() +': '+ val)
    });

    var data = [
        {
          x: sample_values.slice(0,10).reverse(),
          y: otu_ids.slice(0,10).reverse().map(x=>'OTU ' + x),
          text: otu_labels.slice(0,10).reverse(),
          type: 'bar',
          orientation: 'h'
        }
      ];
      
      Plotly.newPlot('bar', data);

      var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values
        }
      };
      
      var data = [trace1];
      
      Plotly.newPlot('bubble', data);

  });
  
};


function optionChanged() {
    showData();
};