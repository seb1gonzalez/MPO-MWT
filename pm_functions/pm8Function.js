function pm8Data(mode, condition) {
 
    let pm8Data = {
        jobs: 1,
        ratioPrim: 2,
        ratioPrimTot: 3
    };

    let key = 'all_pm8';
    let example = { key: key };
    let color = "#039BE5";

    console.log("about to enter 1st");
    $.get('mwt_handler.php', example, function (data) {
        console.log("returning from 1st");
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index]['shape']);
            let to_visualize = [];
            let status = data.shape_arr[index].status;
            let title = "";

            //filter by status
            for (let i = 0; i < temp.length; i++) {
                console.log('this is i ' + i);
                if (status == "existing" && condition == "e") {
                    color = "#039BE5";//blue
                    to_visualize.push(temp[i]);
                    polyToErase.exist.push();
                
                } else if (status == "planned_existing" && condition == "p") {
                    color = "#9E9E9E"; //gray
                    to_visualize.push(temp[i]);
                    polyToErase.plan.push();
                }

            }
            let polygon = new google.maps.Polygon({
                description: "",
                description_value: '',
                paths: to_visualize,
                strokeColor: 'black',
                strokeOpacity: 0.60,
                strokeWeight: 0.70,
                fillColor: color,
                fillOpacity: 0.60,
                zIndex: -1,
                title: "",
            });

            if (condition == "e") {
                polyToErase.exist.push(polygon);
            }
            if (condition == "p") polyToErase.plan.push(polygon);

            // Hover Effect for Google API Polygons
            google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
            google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

            polygon.setMap(map);
            polygons.push(polygon);
        }

        //   pm8Data.ratio_pop = ((pm9TxtData.ratio_pop / pm9TxtData.pop) * 100);
        //   pm8Data.ratio_popTot = ((pm9TxtData.ratio_popTot / pm9TxtData.pop) * 100);
        if (mode == 0) {
            document.getElementById("pm8Text").innerHTML = String(pm8Data.ratioPrim.toFixed(2)) + "%"; // menu text
        } else if (mode == 1) {
            console.log("migrating");
            pm8DataP(1, condition);
            //regionalText(pm8Data);
        }
    });
}

function pm8DataP(mode, condition) {
    console.log('en puntos');
    let pm8Data = {
        jobs: 1,
        ratioPrim: 2,
        ratioPrimTot: 3
    };
    let key = 'all_pm8P';
    let example = { key: key };
    let color = "#039BE5";

    p = [];

    $.get('mwt_handler.php', example, function (data) {
        let image = "./img/markers/crash.png";
        for (index in data.shape_arr) { // Organize information into dictionaries
            //hold info of 1 point at a time
            let holder = [];
            let status = data.shape_arr[index].status;
            let name = data.shape_arr[index].name;

            if (mode == 1 || mode == 2) { // mode 1 and 2 allows us to store points 
                holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                holder = holder[0][0]; // Fixes BLOBs

                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: name, 
                    icon: image
                });

                if (status == "existing" && condition == "e") {
                    p.push(point);
                } else if (status == "planned_existing" && condition == "p") {
                    p.push(point);
                }
          
            }
        } // at this point all data is organized by dictionaries

        for (index in p) {
            p[index].setMap(map);
            points.push(p[index]);
        }

        if (mode == 0) { // menu text, this is only done once
            // Send to menu Text
            document.getElementById("pm19DrivingText").innerHTML = "val";
        }

        let corr = translateCorridor(example.corridors_selected); // what corridor are we on?
        if (mode == 1) {
            regionalText(pm8Data);
        }
        else if (mode > 1) {
            dynamicCorridorText(corr, pm8Data); // Send graph data and current corridor to dynamic text for corridors
        }
    });
}
function pm8HorizontalBar(ctx){
    var myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels:["Millitary Base","Airport","University/College", "Transit Center", "Shelter", "Prison/jail", "Nursing Home", "Natural and heritage", "Mall", "Leisure Time Activity", "Hospital"],
            datasets:[
                {
                    label:"Number of Key Destinations in El Paso MPO Region",
                    data:[1,5,8,5,6,7,8,9,4,6,11],
                    fill: false,
                    backgroundColor:['rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)' ],
                    borderColor:['rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)'],
                    borderWidth:1
                },
                {
                    label:"Number of Key Destinations in 0.5 mi of high-quality rapid transit",
                    data:[1,5,8,4,8,9,6,3,4,7,8],
                    fill: false,
                    backgroundColor:['rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)'],
                    borderColor:['rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)'],
                    borderWidth:1
                },

            ]
        },
                
        options:{
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: 11, //changes the two little boxes' text on the bottom of the graph
                    boxWidth:15
                }
            },
             title: {
                display: true,
                text: 'Key Destinations in the El Paso MPO region in 0.5 mi of existing high-quality rapid transit'
            },
            scales:{
                xAxes:[{
                    ticks:{
                        beginAtZero:true
                    }
                }
            ]}
        }
                       
    
        
    });
}

function pm8HorizontalBar2(ctx){
    var myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels:["Millitary Base","Airport","University/College", "Transit Center", "Shelter", "Prison/jail", "Nursing Home", "Natural and heritage", "Mall", "Leisure Time Activity", "Hospital"],
            datasets:[
                {
                    label:"Number of Key Destinations in El Paso MPO Region",
                    data:[1,5,8,5,6,7,8,9,4,6,11],
                    fill: false,
                    backgroundColor:['rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)' ],
                    borderColor:['rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)'],
                    borderWidth:1
                },
                {
                    label:"Number of Key Destinations in 0.5 mi of high-quality rapid transit",
                    data:[1,5,8,4,8,9,6,3,4,7,8],
                    fill: false,
                    backgroundColor:['rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)'],
                    borderColor:['rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)'],
                    borderWidth:1
                },

            ]
        },
                
        options:{
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: 11, //changes the two little boxes' text on the bottom of the graph
                    boxWidth:15
                }
            },
             title: {
                display: true,
                text: 'Key Destinations in the El Paso MPO region'
            },
            scales:{
                xAxes:[{
                    ticks:{
                        beginAtZero:true
                    }
                }
            ]}
        }
                       
    
        
    });
}