function backh() {
  window.history.back();
}



var depthArr = document.getElementById('depthArr').value;

var newDepthArr = depthArr.split(',');

var gammaArr = document.getElementById('gammaArr').value;
newGamaArr = gammaArr.split(',')

newGamaArr.splice(0,10);
newDepthArr.splice(0,10);
console.log(newGamaArr);


var RLA1 = document.getElementById('RLA1').value;
console.log(RLA1);
/*
//Scrolling effect
var gammaContainer = document.getElementById('gamma-container'),
    vshaleContainer = document.getElementById('vshale-container')



function linkTwo() {
  var linkbtn = document.getElementById('linkbtn');
  if (linkbtn.textContent === 'Link') {
    linkbtn.textContent = 'Unlink';
    linkbtn.style.backgroundColor = ' #EA4335';

    gammaContainer.onscroll = ()=> {
      vshaleContainer.scrollTop = gammaContainer.scrollTop;
    }

    vshaleContainer.onscroll = ()=> {
      gammaContainer.scrollTop = vshaleContainer.scrollTop;
    }
  }
  else {
    linkbtn.textContent = 'Link';
    linkbtn.style.backgroundColor = '#4285F4';

    gammaContainer.onscroll = ()=> {
      vshaleContainer.scrollTop != gammaContainer.scrollTop;
    }

    vshaleContainer.onscroll = ()=> {
      gammaContainer.scrollTop != vshaleContainer.scrollTop;
    }
  }

}

*/
//var spArr = document.getElementById('spArr').value;

//var newSpArr = spArr.split(',');


// Delete text values

var startTrim;
for (startTrim = 0; startTrim < newGamaArr.length; startTrim++) {
  if (parseFloat(newGamaArr[startTrim]) >= 0) {
    break;
  }
}

for (var x = 0; x < startTrim; x++) {
  newDepthArr.shift();
  newGamaArr.shift();
}


// delete -999 values
/*
var i;
for (i = 0; i < newGamaArr.length; i++) {
  if (newGamaArr[i] !== '-999') {
  newGamaArr[i] = '';
  }
}
*/

// Max and Min val of gamma and depth
var minValGamma = 0,
    maxValGamma = Math.max.apply(Math, newGamaArr),
    minValDepth = Math.min.apply(Math, newDepthArr),
    maxValDepth = Math.max.apply(Math, newDepthArr);


var trace1 = {
  x: newGamaArr,
  y: newDepthArr,
  mode: 'lines',
  fillcolor: '#b30000',
  line: {
      color: '#333'
    }
  //fill: 'tozeroy'
};

//xaxis: {range: [minValGamma, maxValGamma]},
var layout = {
  title: "GammaRay",
  autosize: true,
  xaxis: {
    range: [minValGamma, maxValGamma],
    showgrid: true,
    showline: true,
    mirror: 'ticks',
    gridcolor: '#bdbdbd',
    gridwidth: 1,
    side: 'top'
  },
  yaxis: {range: [maxValDepth, minValDepth],
    showgrid: true,
    showline: true,
    mirror: 'ticks',
    gridcolor: '#bdbdbd',
    gridwidth: 1
  }
}

var data = [trace1];

Plotly.newPlot('gamma', data, layout);
