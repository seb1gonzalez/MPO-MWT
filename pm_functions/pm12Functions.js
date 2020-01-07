

function pm12Data(mode, example) {
    console.log('12.1');
    var pm12Info = {
        pm12existing: 0, pm12proposed: 0, pm12tot: 0, coep_prop: 0,
        coep_exist: 0, pdn_prop: 0, pdn_exist: 0, sun_prop: 0,
        sun_exist: 0, s_e_prop: 0, s_e_exist: 0, tot: 0
    };
    let caller = "mwt_handler.php";
    let color = '#03A9F4';  
    let shape = 'shape';

    if (mode == 0 || mode == 1) {
        let key = 'all_pm12';
        example = { key: key };
    } else if (mode == 2) {
        caller = "corridor_handlerB.php";
        shape = 'ST_AsText(SHAPE)';
    }
    else if (mode == 4) {
        caller =" ./backend/AOI.php";
    }
    console.log('12.2');
    console.log(example);
    console.log(caller);
    $.get(caller, example, function (data) { 
        console.log('12.3');
        for (index in data.shape_arr) { 
            let shp = data.shape_arr[index][shape]; 
            let reader = new jsts.io.WKTReader(); 
            let r = reader.read(shp);
            let to_visualize = []; 
            let coord; 
            let ln = r.getCoordinates(); 
    

            //PMS Data
            let pm12Status = data.shape_arr[index].status; // used to color code lines
            let pm12bikepath = data.shape_arr[index].bikepath;
            let pm12mile = data.shape_arr[index].mile;

            if (mode == 1 || mode == 2 || mode == 4) {
                for (let i = 0; i < ln.length; i++) {
                    coord = { lat: ln[i]['y'], lng: ln[i]['x'] };
                    to_visualize.push(coord); 
                }

                if (pm12Status.toLowerCase() == 'proposed') {
                    color = '#81C784';
                } else if (pm12Status.toLowerCase() == 'existing' && pm12Status.toLowerCase() == 'existing/proposed') {
                    color = '#3949AB';
                } else {
                    color = '#3949AB';
                }

                let line = new google.maps.Polyline({ 
                    path: to_visualize, 
                    strokeColor: color,
                    strokeOpacity: .50,
                    strokeWeight: 4,
                    zIndex: 99 
                });
                line.setMap(map);
                polylines.push(line);
            }


            if (pm12Status == 'PROPOSED' || pm12Status == 'Proposed') {
                pm12Info.pm12proposed += parseFloat(pm12mile);
                pm12Info.tot += parseFloat(pm12mile)
                if (pm12bikepath == "COEP") {
                    pm12Info.coep_prop += parseFloat(pm12mile);
                } else if (pm12bikepath == "PDN Trail") {
                    pm12Info.pdn_prop += parseFloat(pm12mile);
                } else if (pm12bikepath == "San Elizario") {
                    pm12Info.s_e_prop += parseFloat(pm12mile);
                } else if (pm12bikepath == "Sunland Park") {
                    pm12Info.sun_prop += parseFloat(pm12mile);
                }
            } else if (pm12Status == 'EXISTING' || pm12Status == 'Existing') {
                pm12Info.pm12existing += parseFloat(pm12mile);
                pm12Info.tot += parseFloat(pm12mile)
                if (pm12bikepath == "COEP") {
                    pm12Info.coep_exist += parseFloat(pm12mile);
                } else if (pm12bikepath == "PDN Trail") {
                    pm12Info.pdn_exist += parseFloat(pm12mile);
                } else if (pm12bikepath == "San Elizario") {
                    pm12Info.s_e_exist += parseFloat(pm12mile);
                } else if (pm12bikepath == "Sunland Park") {
                    pm12Info.sun_exist += parseFloat(pm12mile);
                }
            }
        }
        console.log('12.4');
        let corr = translateCorridor(example.corridors_selected); // what corridor are we on?

        if (mode == 0) {
            document.getElementById("pm12Text").innerHTML = pm12Info.pm12existing.toFixed(2);
        } else if (mode == 1) {
            console.log('12.5');
            regionalText(pm12Info);
        } else if (mode == 2) {
            dynamicCorridorText(corr, pm12Info);
        }
        else if (mode == 4) {
            dynamicCorridorText('AOI', pm12Info);
        }
    });           
}

function pm12StackedChart(ctx,data) {
    //prettyBlue = 'rgba(25, 118, 210, 1)';
    //prettyGreen = 'rgba(29, 231, 130, 1)';
    console.log('12 updated');
    var barChartData = {
        labels: ['City of El Paso Bike Plan', 'PDN Paso del Norte Trial', 'Sunland Park Bike Trail', 'San Elizario'],
        datasets: [{
            label: 'Existing',
            backgroundColor: 'rgba(57,73,171 ,1)',
            data: [ data.coep_exist.toFixed(2),  data.pdn_exist.toFixed(2),  data.sun_exist.toFixed(2), data.s_e_exist.toFixed(2)]
        }, {
            label: 'Proposed',
            backgroundColor: 'rgba(129,199,132 ,1)',
            data: [data.coep_prop.toFixed(2),  data.pdn_prop.toFixed(2), data.sun_prop.toFixed(2),data.s_e_prop.toFixed(2)]
        }]

    };
    /*
    backgroundColor: '#1976D2',
            data: [10,5,20,14]
        }, {
            label: 'Proposed',
            backgroundColor: '#FF5722',
            data: [5,6,8,12]*/ 
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
                /*display: true,
                text: '2013-2017'*/
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
                    scaleLabel: {
                    display: true,
                    fontSize: 10,
                    labelString: 'Number of Miles of Bikeways in the El Paso MPO Region'},
                    stacked: true,
                    ticks: {
                        //max:45000
                    }
                }]
            }
        }
    });

}
