
function pm16Data(mode) {
    var pm16Data = [];
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
    let greathestNum = 0;
    let greathestStat = '';
    let year = 0;
    let i = 0; //helps on index of CO 



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
           

            if (category == "CO") {
                console.log("inside Updated");
                pm16Data[i] = {
                    name: stationName,
                    graphData: [g2014, g2015, g2016, g2017, g2018]
                };
                console.log(i);
                i++;
                console.log(i);
                if (greathestNum < g2014) {
                    greathestNum = g2014;
                    year = 2014;
                    greathestStat = stationName;
                }
                if (greathestNum < g2015) {
                    greathestNum = g2015;
                    year = 2015;
                    greathestStat = stationName;
                }
                if (greathestNum < g2016) {
                    greathestNum = g2016;
                    year = 2016;
                    greathestStat = stationName;
                }
                if (greathestNum < g2017) {
                    greathestNum = g2017;
                    year = 2017;
                    greathestStat = stationName;
                }
                if (greathestNum < g2018) {
                    greathestNum = g2018;
                    year = 2018;
                    greathestStat = stationName;
                }
           
            }
        }
        console.log("**********************************");
        console.log(pm16Data);
        //adding dynamic variables to last element of our data 
        pm16Data[pm16Data.length] = {
            num: greathestNum,
            station: greathestStat,
            year: year,
 
        };
        console.log(pm16Data);

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
                    if (stationName == pm16Data[0].name || stationName == pm16Data[1].name) {
                        point.setMap(map);
                        points.push(point);
                    }

                 

                }
            });
        }

        //menu text
        if (mode == 0) {
            document.getElementById("pm16Text").innerHTML = pm16Data[pm16Data.length - 1].num + " ppb";
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
                    label: data[0].name,
                    data: [null, null, null, null, data[0].graphData[4]],
                    backgroundColor: "orange",
                    borderColor: "orange",
                    fill: false,
                    lineTension: 0,
                    radius: 5
                },
                {
                    label: data[1].name,
                    data: data[1].graphData,
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
  


    
