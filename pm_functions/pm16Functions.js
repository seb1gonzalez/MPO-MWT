
    function pm16Data(mode) {
        var pm16Data = {
            c2014: [], c2015: [], c2016: [], c2017: [], c2018: [],
            cname:[]
        };
        let images = [];

        //store all colors for points
        images.push("./icons/redPin.png");
        images.push("./icons/orangePin.png");

        let key = 'all_pm15_16_17g';
        let example = { key: key };

        let image = "./img/markers/crash.png";

        //store graph data
        $.get('mwt_handler.php', example, function (data) {
            for (index in data.shape_arr) {
                stationName = data.shape_arr[index]['Station'];
                category = data.shape_arr[index]['Category'];
                g2014 = data.shape_arr[index].g2014;
                g2015 = data.shape_arr[index].g2015;
                g2016 = data.shape_arr[index].g2016;
                g2017 = data.shape_arr[index].g2017;
                g2018 = data.shape_arr[index].g2018;

                if (category == 'CO') {
                    pm16Data.cname.push(stationName);
                    pm16Data.c2014.push(g2014);
                    pm16Data.c2015.push(g2015);
                    pm16Data.c2016.push(g2016);
                    pm16Data.c2017.push(g2017);
                    pm16Data.c2018.push(g2018);
                } 
            }
         
            //print points 
            if (mode == 1) {
                key = 'all_pm15_16_17';
                example = { key: key };
                $.get('mwt_handler.php', example, function (data) {
                    for (index in data.shape_arr) {
                        let holder = [];
                        let stationName = [];

                        holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                        holder = holder[0][0]; // Fixes BLOB
                        stationName = data.shape_arr[index]['station_na'];
                        console.log(stationName);

                        let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                        let point = new google.maps.Marker({
                            position: to_visualize,
                            title: stationName,
                            value: '0',
                            icon: image//images[index]
                        });
                        point.setMap(map);
                        points.push(point);
                        console.log(point);
                    }
                });
            }
            //calculations


            //menu text
            if (mode == 0) {

            } else if (mode == 1) {
                regionalText(pm16Data);
            } 


        });
    }

    function pm16chartLine(ctx, data) {
        var data = {
            labels: ['2014', '2015', '2016', '2017', '2018'],
            datasets: [
                {
                    label: data.cname[0],
                    data: [null, null, null, null, data.c2018[1]],
                    backgroundColor: "orange",
                    borderColor: "orange",
                    fill: false,
                    lineTension: 0,
                    radius: 5
                },
                {
                    label: data.cname[1],
                    data: [data.c2014[4], data.c2015[4], data.c2016[4], data.c2017[4], data.c2018[4]],
                    backgroundColor: "pink",
                    borderColor: "pink",
                    fill: false,
                    lineTension: 0,
                    radius: 5
                }
            ]
        };

        //options
        var options = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Parts per Million (ppm)'
                    }
                }]
            },
            responsive: true,
            title: {

            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 12,
                    boxWidth: 10
                }
            }
        };

        //create Chart class object
        var chart = new Chart(ctx, {
            type: "line",
            data: data,
            options: options
        });
    }
  


    
