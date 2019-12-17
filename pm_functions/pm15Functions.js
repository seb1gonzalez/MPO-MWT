
function pm15Data(mode) {
    console.log("new update on 15");
    var pm15Data = {
        o8z2014: [], o8z2015: [], o8z2016: [], o8z2017: [], o8z2018: [], 
        o1z2014: [], o1z2015: [], o1z2016: [], o1z2017: [], o1z2018: [], 
        oz8Names:[], oz1Names:[]
    };

    let images = [];

    //store all colors for points
    images.push("./icons/redPin.png");
    images.push("./icons/orangePin.png");
    images.push("./icons/lightPink.png");
    images.push("./icons/lightbluePin.png");
    images.push("./icons/grayPin.png");
    images.push("./icons/greenPin.png");

    images.push("./icons/yellowPin.png");
    images.push("./icons/pinkPin.png");
    images.push("./icons/darkbluePin.png");
    images.push("./icons/lightgreenPin.png");
    images.push("./icons/lightgrayPin.png");

   

    let key = 'all_pm15_16_17g';
    let example = { key: key };

    console.log('entering 15');
    //store graph data
    $.get('mwt_handler.php', example, function (data) {
        console.log(data);
        console.log('returning 15');
        for (index in data.shape_arr) {
            stationName = data.shape_arr[index]['Station'];
            category = data.shape_arr[index]['Pollutant'];
            pm15Data.abc = [];
            pm15Data.abc.push(1);
            
            if (category == 'Ozone 8 hr') {
                pm15Data.stationName = [];
                pm15Data.stationName.push(index);
                pm15Data.oz8Names.push(stationName);
                pm15Data.o8z2014.push(data.shape_arr[index].g2014);
                pm15Data.o8z2015.push(data.shape_arr[index].g2015);
                pm15Data.o8z2016.push(data.shape_arr[index].g2015);
                pm15Data.o8z2017.push(data.shape_arr[index].g2017);
                pm15Data.o8z2018.push(data.shape_arr[index].g2018);
            } else if (category == 'Ozone 1 hr') {
                pm15Data.oz1Names.push(stationName);
                pm15Data.o1z2014.push(data.shape_arr[index].g2014);
                pm15Data.o1z2015.push(data.shape_arr[index].g2015);
                pm15Data.o1z2016.push(data.shape_arr[index].g2016);
                pm15Data.o1z2017.push(data.shape_arr[index].g2017);
                pm15Data.o1z2018.push(data.shape_arr[index].g2018);
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
                        icon: images[index]
                    });

                    if (pm15Data.oz8Names[index] == stationName || pm15Data.oz1Names[index] == stationName ) {
                        point.setMap(map);
                        points.push(point);
                    }
                }
            });
        }
        //calculations
   

        //menu text
        if (mode == 0) {

        } else if (mode == 1) {
            regionalText(pm15Data);
        }



    });
}



function pm15chartLine(ctx, data) {
    var data = {
        labels: ['2014', '2015', '2016', '2017', '2018'],
        datasets: [
            {
                label: data.oz8Names,
                data: data.o8z2014,
                backgroundColor: "red",
                borderColor: "red",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.oz8Names[1],
                data: data.o8z2015,
                backgroundColor: "orange",
                borderColor: "orange",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.oz8Names[2],
                data: data.o8z2016,
                backgroundColor: "pink",
                borderColor: "pink",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.oz8Names[3],
                data: data.o8z2017,
                backgroundColor: "lightblue",
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.oz8Names[4],
                data: data.o8z2018,
                backgroundColor: "gray",
                borderColor: "gray",
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
                    labelString: 'Parts per Billion (ppb)'
                }
            }]
        },
        responsive: true,
        title: {
            display: true,
            position: 'top',
            text: 'Ozone 8hr Emissions (2014-2018)'
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

function pm15chartLine2(ctx, data) {
    console.log(data);

    var data = {
        labels: ['2014', '2015', '2016', '2017', '2018'],
        datasets: [
            {
                label: data.oz1Names[0],
                data: data.o1z2014,
                backgroundColor: "yellow",
                borderColor: "yellow",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.oz1Names[1],
                data: data.o1z2015,
                backgroundColor: "purple",
                borderColor: "purple",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.oz1Names[2],
                data: data.o1z2016,
                backgroundColor: "blue",
                borderColor: "blue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.oz1Names[3],
                data: data.o1z2017,
                backgroundColor: "lightgreen",
                borderColor: "lightgreen",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.oz1Names[4],
                data: data.o1z2018,
                backgroundColor: "lightgray",
                borderColor: "lightgray",
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
            display: true,
            text: 'Ozone 1hr Emissions (2014-2018)'
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

