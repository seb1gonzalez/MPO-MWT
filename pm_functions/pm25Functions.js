/*
 * Note that PM25 is on progress. The graph values are hardcoded, Only 2017 is loaded. 
 * This class only calculates the values for graph
 */
 
function pm25Data(mode, example) { 

    //graph values
    pm25Data = {
        good: [0.0, 0.0, 0.0, 0.0, 0.0],
        fair: [0.0, 0.0, 0.0, 0.0, 0.0],
        poor: [0.0, 0.0, 0.0, 0.0, 0.0]
    }
    
    let color = '#03A9F4';  // default
    let caller = "mwt_handler.php";
    let shape = "shape";

    if (mode == 0 || mode == 1) {
        let key = 'all_pm25';
        example = { key: key };
    } else {
        caller = "corridor_handlerB.php";
        shape = 'ST_AsText(SHAPE)';
    }    

    $.get('mwt_handler.php', example, function (data) { // ajax call to populate pavement lines
        for (index in data.shape_arr) { // iterates through every index in the returned element (data['shape_arr'])
            let shp = data.shape_arr[index]['shape']; // shape is LINESTRING or MULTILINESTRING
            let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
            let to_visualize = []; // used to populate the map (latitude & longitude)
            let coord; // will be an object to push coordinates to populate the map
            let ln = r.getCoordinates(); // parses the shape into lat & lng
            

            //PMS Data
            let iri = data.shape_arr[index].iri_vn;
            let year = data.shape_arr[index].year;
            var miles = parseFloat(data.shape_arr[index].miles);

            //miles = miles.toFixed(2);;
            //filter graph Data by Year, add counts on 3 conditions
            if (year == 2013) {
                if (iri < 95) { //condition
                    pm25Data.good[0] += miles; //year 0 or 2013
                } else if (iri > 94 && iri < 171) {
                    pm25Data.fair[0]+=miles;
                } else if (iri > 170) {
                    pm25Data.poor[0]+=miles;
                }
            } else if (year == 2014) {
                if (iri < 95) {
                    pm25Data.good[1] += miles;
                } else if (iri > 94 && iri < 171) {
                    pm25Data.fair[1] += miles;
                } else if (iri > 170) {
                    pm25Data.poor[1] += miles;
                }
            } else if (year == 2015) {
                if (iri < 95) {
                    pm25Data.good[2] += miles;
                } else if (iri > 94 && iri < 171) {
                    pm25Data.fair[2] += miles;
                } else if (iri > 170) {
                    pm25Data.poor[2] += miles;
                }
            } else if (year == 2016) {
                if (iri < 95) {
                    pm25Data.good[3] += miles;
                } else if (iri > 94 && iri < 171) {
                    pm25Data.fair[3] += miles;
                } else if (iri > 170) {
                    pm25Data.poor[3] += miles;
                }
            } else if (year == 2017) {
                if (iri < 95) {
                    pm25Data.good[4] += miles;
                } else if (iri > 94 && iri < 171) {
                    pm25Data.fair[4] += miles;
                } else if (iri > 170) {
                    pm25Data.poor[4] += miles;
                }
            }

            //Draw latest year
            if (year == 2017) {
                if (mode == 1 || mode == 2) {
                    for (let i = 0; i < ln.length; i++) {
                        coord = { lat: ln[i]['y'], lng: ln[i]['x'] }; // this is how lat & lng is interpreted by the tool
                        to_visualize.push(coord); // pushing the interpretation to our to_visualize array
                    }
                    // filter colors 
                    if (iri < 95) {
                        color = '#8BC34A';
                    } else if (iri > 94 && iri < 171) {
                        color = '#F57C00';
                    } else if (iri > 170) {
                        color = '#d50000';
                    }
                    let line = new google.maps.Polyline({ // it is a POLYLINE
                        path: to_visualize, // polyline has a path, defined by lat & lng 
                        strokeColor: color,
                        strokeOpacity: .50,
                        strokeWeight: 4,
                        zIndex: 99 // on top of every other shape
                    });
                    line.setMap(map);
                    polylines.push(line);
                }
            }
      
 
        }

        let corr = translateCorridor(example.corridors_selected); // what corridor are we on?
        if (mode == 0) {
            //document.getElementById("").innerHTML = 5;
        }
        else if (mode == 1) {
            regionalText(pm25Data);
        } else if (mode == 2) {
            dynamicCorridorText(corr, pm25Data);
        }
    });
         
}

function pm25StackedChart(ctx,data){
    var barChartData = {
		labels: ['2013', '2014', '2015', '2016', '2017'],
			datasets: [{
				label: 'Good',
				backgroundColor: 'rgba(139,195,74 ,1)',
                data: data.good
			}, {
				label: 'Fair',
				backgroundColor: 'rgba(239,108,0 ,1)',
				data: data.fair
			}, {
				label: 'Poor',
				backgroundColor: 'rgba(213,0,0 ,1)',
				data: data.poor
			}]

    };
    //
    var chartBar = new Chart(ctx, {
        type: "bar",
        data: barChartData,
        options: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 10,
                    boxWidth:6
                }
                },
            title: {
                display: true,
                text: 'Past 5 years'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Miles in all conditions'
                    }
                  }]
            }
        }
    });
	
}
function pm25chartLine(ctx,data){
    var data = {
        labels: ["2013", "2014", "2015", "2016", "2017"],
        datasets: [
            {
            label: "Poor Condition",
            data: data.poor,
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
            },
        ]
    };

     //options
    var options = {
        responsive: true,
        title: {
            display: true,
            text: 'Pavements in poor condition'
        },
        legend: {
        display: true,
        position: "bottom",
        labels: {
            fontColor: "#333",
            fontSize: 12,
            boxWidth:10
        }
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Number of miles on poor condition'
                }
              }]
        }
        
    };

    //create Chart class object
    var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options
    });
}
