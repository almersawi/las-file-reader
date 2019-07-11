const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('fast-csv');
const upload = require('express-fileupload');

var filename,
    dataArr = [],
    depthArr = [],
    depthRow =[],
    spArr =[],
    finalData = [],
    startFrom,
    gammaStart,
    data,
    finalDataRow,
    allData,
    gammaArr = [],
    sp = [],
    cali = [],
    cbvwe = [],
    ho24 = [],
    ho60 = [],
    ho90 = [],
    mbvi = [],
    mperm = [],
    mphi = [],
    mswe = [],
    nphi = [],
    pe = [],
    phit = [],
    rhob = [],
    temp  = [],
    bs = [];

app.use(upload());

app.listen(4000, () => {
  console.log('Now listening to port 4000');
});

app.use('/assets',express.static('assets'));

// Setting View Engine
app.set('view engine', 'ejs');


app.post('/', (req, res) => {
  if (req.files) {
    var file = req.files.filename;
        filename = file.name;
        //console.log(filename);
    file.mv('./upload/' + filename , (err) => {
      if (err) {
        console.log(err);
        res.send('error occured!');
      }
      else {

        //file uploaded here

                // Create read stream
                var myReadStream = fs.createReadStream(__dirname + '/upload/' + filename )
                    .pipe(csv(myReadStream,{headers : true}))
                    .on('data', (data)=> {
                      dataArr.push(data);
                    }).on('end', ()=> {
                      //dataArr.splice(0,30);
                      for (var i = 1; i < dataArr.length; i++) {
                        var depthRow = dataArr[i];
                        var depthText = depthRow[0];
                        depthText = depthText.replace(/()\t/g, ' ');
                        depthText = depthText.replace(/\s\s+/g, ' ');
                        var arrRow = depthText.split(' ');
                        finalData.push(arrRow);
                      }
                      for ( startFrom = 0; startFrom < finalData.length; startFrom++) {
                        var checkRow = finalData[startFrom];
                        var checkCol = checkRow[0];

                        if (checkCol === '#' || checkCol ==='~A') {
                          break;
                        }

                      }

                      // Check for header
                        var headerRow = finalData[startFrom +1];
                        var checkForDepth = headerRow[1];

                if (checkForDepth === 'DEPTH') {
                  finalData.shift();
                }
                    finalData.splice(0,startFrom );
                    finalDataRow = finalData[100];
                var finalDataVal = finalDataRow[0];
                var depthStartFrom,
                    gammaStartFrom;

                if (finalDataVal !== '') {
                  depthStartFrom = 0;
                }
                else {
                  depthStartFrom = 1;
                }

                for (var i = 1; i < finalData.length; i++) {
                  depthRow = finalData[i];
                  var inserItem = depthRow[depthStartFrom];
                  depthArr.push(inserItem)
                }
                      //General Equation
                        function findArr(arr, keyword) {
                          //console.log(finalData
                          var dataRow = finalData[0];
                          gammaStart = dataRow.indexOf(keyword);
                          if (gammaStart == -1) {
                            gammaStart = dataRow.indexOf('GR_CAL')
                          }

                          // for some diffrenet files

                          if (finalDataVal !== '') {
                            gammaStartFrom = gammaStart - 1;
                          }
                          else {
                              gammaStartFrom = gammaStart;
                          }

                          for (var i = 1; i < finalData.length; i++) {
                            depthRow = finalData[i];
                            var inserItem = depthRow[gammaStartFrom];
                            arr.push(inserItem)
                          }

                        }

                        findArr(sp, 'SP');
                        findArr(gammaArr, 'GR');
                        findArr(cali, 'CALI');
                        findArr(bs, 'BS');
                        findArr(cbvwe, 'CBVWE');
                        findArr(ho24, 'HO24');
                        findArr(ho60, 'HO60');
                        findArr(ho90, 'HO90');
                        findArr(mbvi, 'MBVI');
                        findArr(mperm, 'MPERM');
                        findArr(mphi, 'MPHI');
                        findArr(mswe, 'MSWE');
                        findArr(nphi, 'NPHI');
                        findArr(pe, 'PE');
                        findArr(phit, 'PHIT');
                        findArr(rhob, 'RHOB');
                        findArr(temp, 'TEMP');


                    data = {
                         depthArr: depthArr,
                         sp: sp,
                         cali: cali,
                         bs: bs,
                         gammaArr: gammaArr,
                         cbvwe: cbvwe,
                         ho24: ho24,
                         ho60: ho60,
                         ho90: ho90,
                         mbvi: mbvi,
                         mperm: mperm,
                         mphi: mphi,
                         mswe: mswe,
                         nphi: nphi,
                         pe: pe,
                         phit: phit,
                         rhob: rhob,
                         temp: temp
                       }
                       console.log(data);
                       var header = {
                          header: finalData[0]
                       }

                       finalData[0].splice(0,2);
                       res.render('logs', {data: header});

                   });

      // End is here

      }
    });
  }
});

app.get('/calc-area', (req, res) => {
  res.render('calc-area', {data: data});
})


app.get('/GR', (req, res)=> {
  res.render('GR', {data: data});
});

app.get('/GR_CAL', (req, res)=> {
  res.render('GR_CAL', {data: data});
});

app.get('/file', (req, res) => {
var myReadStream = fs.createReadStream(__dirname + '/upload/' + filename);
myReadStream.pipe(res);
});

app.post('/new', (req, res)=> {
res.render('home');
depthArr.splice(0, depthArr.length);
gammaArr.splice(0, gammaArr.length);

    dataArr = [];
    depthArr = [];
    depthRow =[];
    gammaArr = [];
    spArr =[];
    finalData = [];
    finalTestArr = [];
    testArr = [];
    finalTestCol = [];
});


app.get('/', (req, res)=> {
  res.render('home');
});

app.get('*', function(req, res){
  res.status(404).render('404');
});
