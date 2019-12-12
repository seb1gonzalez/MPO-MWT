
function pm17Data(mode) {
    var pm17Data = {
        p2014: [], p2015: [], p2016: [], p2017: [], p2018: [],
        pname: []
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

            if (category == 'PM10') {
                if (g2014 != 0 || g2015 != 0 || g2016 != 0 || g2017 != 0 || g2018 != 0) { // if all years = 0 do not all
                    if (g2014 == 0) pm17Data.p2014.push(null); // add null if 0,  for graph
                    else pm17Data.p2014.push(g2014);

                    if (g2015 == 0) pm17Data.p2015.push(null);
                    else pm17Data.p2015.push(g2015);

                    if (g2016 == 0) pm17Data.p2016.push(null);
                    else pm17Data.p2016.push(g2016);

                    if (g2017 == 0) pm17Data.p2017.push(null);
                    else pm17Data.p2017.push(g2017);

                    if (g2018 == 0) pm17Data.p2018.push(null);
                    else pm17Data.p2018.push(g2018);

                    pm17Data.pname.push(stationName);
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
                        console.log(to_visualize);
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
        }


        //calculations


        //menu text
        if (mode == 0) {

        } else if (mode == 1) {
            regionalText(pm17Data);
        }


    });
}


function pm17chartLine(ctx,data) {
    var data = {
       labels: ['2014', '2015', '2016', '2017', '2018'],
       datasets: [
            {
               label: data.pname[0],
                data: [data.p2014[0],data.p2015[0],data.p2016[0],data.p2017[0],data.p2018[0]],
                backgroundColor: "orange",
                borderColor: "orange",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.pname[1],
                data: [data.p2014[1],data.p2015[1],data.p2016[1],data.p2017[1],data.p2018[1]],
                backgroundColor: "green",
                borderColor: "green",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.pname[2],
                data: [data.p2014[2], data.p2015[2], data.p2016[2],data.p2017[2],data.p2018[2]],
                backgroundColor: "yellow",
                borderColor: "yellow",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.pname[3],
                data: [data.p2014[3], data.p2015[3], data.p2016[3], data.p2017[3],data.p2018[3]],
                backgroundColor: "lightgreen",
                borderColor: "lightgreen",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data.pname[4],
                data: [data.p2014[4], data.p2015[4], data.p2016[4], data.p2017[4], data.p2018[4]],
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
            labelString: 'Micrograms per Cubic Meter (ug/cu meter)'
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
           boxWidth:10
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

