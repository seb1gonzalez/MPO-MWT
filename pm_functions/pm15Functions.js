
function pm15Data(mode) {
    var pm15Data = [];
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

    //for calculations
    let greathestNum8 = 0;
    let greathestStat8 = '';
    let year8 = 0;

    let greathestNum1 = 0;
    let greathestStat1 = '';
    let year1 = 0;

    //store graph data
    $.get('mwt_handler.php', example, function (data) {
        for (index in data.shape_arr) {
            stationName = data.shape_arr[index]['Station'];
            category = data.shape_arr[index]['Pollutant'];
            g2014 = data.shape_arr[index].g2014;
            g2015 = data.shape_arr[index].g2015;
            g2016 = data.shape_arr[index].g2016;
            g2017 = data.shape_arr[index].g2017;
            g2018 = data.shape_arr[index].g2018;

            if (category == "Ozone 1 hr" || category == "Ozone 8 hr") {
                if (g2014 == '0') {
                    g2014 = null;
                }
                if (g2015 == '0') {
                    g2015 = null;
                }
                if (g2016 == '0') {
                    g2016 = null;
                }
                if (g2017 == '0') {
                    g2017 = null;
                }
                if (g2018 == '0') {
                    g2018 = null;
                }

                pm15Data[index] = {
                    name: stationName,
                    category: category,
                    graphData: [g2014, g2015, g2016, g2017, g2018]
                };

                if (category == "Ozone 1 hr") {
                    if (greathestNum1 < g2014) {
                        greathestNum1 = g2014;
                        year1 = 2014;
                        greathestStat1 = stationName;
                    }
                    if (greathestNum1 < g2015) {
                        greathestNum1 = g2015;
                        year1 = 2015;
                        greathestStat1 = stationName;
                    }
                    if (greathestNum1 < g2016) {
                        greathestNum1 = g2016;
                        year1 = 2016;
                        greathestStat1 = stationName;
                    }
                    if (greathestNum1 < g2017) {
                        greathestNum1 = g2017;
                        year1 = 2017;
                        greathestStat1 = stationName;
                    }
                    if (greathestNum1 < g2018) {
                        greathestNum1 = g2018;
                        year1 = 2018;
                        greathestStat1 = stationName;
                    }
                } else if (category == "Ozone 8 hr") {
                    if (greathestNum8 < g2014) {
                        greathestNum8 = g2014;
                        year8 = 2014;
                        greathestStat8 = stationName;
                    }
                    if (greathestNum8 < g2015) {
                        greathestNum8 = g2015;
                        year8 = 2015;
                        greathestStat8 = stationName;
                    }
                    if (greathestNum8 < g2016) {
                        greathestNum8 = g2016;
                        year8 = 2016;
                        greathestStat8 = stationName;
                    }
                    if (greathestNum8 < g2017) {
                        greathestNum8 = g2017;
                        year8 = 2017;
                        greathestStat8 = stationName;
                    }
                    if (greathestNum8 < g2018) {
                        greathestNum8 = g2018;
                        year8 = 2018;
                        greathestStat8 = stationName;
                    }
                }
            }
        }

        //adding dynamic variables to last element of our data 
        pm15Data[pm15Data.length] = {
            num8: greathestNum8,
            station8: greathestStat8,
            year_8: year8,
            num1: greathestNum1,
            station1: greathestStat1,
            year_1: year1
        };
        
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

                    let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                    let point = new google.maps.Marker({
                        position: to_visualize,
                        title: stationName,
                        value: '0',
                        icon: images[index]
                    });

                        point.setMap(map);
                        points.push(point);
               
                }
            });
        }
    
        //menu text
        if (mode == 0) {
            document.getElementById("pm15Text").innerHTML = pm15Data[pm15Data.length - 1].num8 + " ppb";
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
                label: data[5].name,
                data: data[5].graphData,
                backgroundColor: "red",
                borderColor: "red",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[6].name,
                data: data[6].graphData,
                backgroundColor: "orange",
                borderColor: "orange",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[7].name,
                data: data[7].graphData,
                backgroundColor: "pink",
                borderColor: "pink",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[8].name,
                data: data[8].graphData,
                backgroundColor: "lightblue",
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[9].name,
                data: data[9].graphData,
                backgroundColor: "gray",
                borderColor: "gray",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[10].name,
                data: data[10].graphData,
                backgroundColor: "green",
                borderColor: "green",
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
    var data = {
        labels: ['2014', '2015', '2016', '2017', '2018'],
        datasets: [
            {
                label: data[0].name,
                data: data[0].graphData,
                backgroundColor: "yellow",
                borderColor: "yellow",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[1].name,
                data: data[1].graphData,
                backgroundColor: "purple",
                borderColor: "purple",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[2].name,
                data: data[2].graphData,
                backgroundColor: "blue",
                borderColor: "blue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[3].name,
                data: data[3].graphData,
                backgroundColor: "lightgreen",
                borderColor: "lightgreen",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[4].name,
                data: data[4].graphData,
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

