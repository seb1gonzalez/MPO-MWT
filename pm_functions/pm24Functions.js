
function pm24Data(mode, php_data) {
    console.log("inside 24");
    let php_handler = "mwt_handler.php";
    let shape = "shape";
    let key = 'all_pm24';

    let color = '#2196F3';
    pm24data = {
       ttiAvg:0
    }
    if (mode == 0 || mode == 1) {
        php_data = { key: key };
    } else if (mode == 2) {
        php_handler = "corridor_handlerB.php";
        shape = 'ST_AsText(SHAPE)';
    }
    else if (mode == 4) {
        php_handler = "./backend/AOI.php";
    }
    let ttiCount = 0;
    let ttiLength = 0;
    $.get(php_handler, php_data, function (data) {
        ttiLength = data.shape_arr.length;
        console.log(ttiLength);
        console.log(data);
        for (index in data.shape_arr) {
            let shp = data.shape_arr[index][shape];
            let reader = new jsts.io.WKTReader();
            let r = reader.read(shp);
            let to_visualize = [];
            let coord;
            let ln = r.getCoordinates();

            let tti = parseFloat(data.shape_arr[index].tti);

            ttiCount += tti;

            if (mode == 1 || mode == 2 || mode == 4) {
                for (let i = 0; i < ln.length; i++) {
                    coord = { lat: ln[i]['y'], lng: ln[i]['x'] };
                    to_visualize.push(coord);
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
        //calculations

        pm24data.ttiAvg = (ttiCount / ttiLength).toFixed(2);

        let corr = translateCorridor(php_data.corridors_selected); // what corridor are we on?


        if (mode == 0) {
           // document.getElementById("pm24dtext").innerHTML = pmdata.pm11Slength.toFixed(2);
        } else if (mode == 1) {
            regionalText(pm24data);
        } else if (mode == 2) {
            dynamicCorridorText(corr, pm24data);
        }
        else if (mode == 4) {
            dynamicCorridorText("AOI", pm24data);
        }

    });

}

function pm24BarGraph(ctx,data) {

    var barChartData = {
        labels: ['2013', '2014', '2015', '2016', '2017'],
        datasets: [{
            label: 'Fatalities',
            backgroundColor: 'rgba(30,136,229 ,1)',
            data: [
                1,2,3,4,5
            ]
        }]

    };
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
                    boxWidth: 6
                }
            },
            title: {
                display: true,
                text: 'pm24 tester',
                fontSize: 10
                //fontColor: "#111"
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
                    ticks: {
                        //max:45000
                    }
                }]
            }
        }
    });

}