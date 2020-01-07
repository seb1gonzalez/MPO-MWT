function pm7Data(mode, status) {

    let pm7Data = {
        jobs: 1,
        ratioPrim: 2,
        ratioPrimTot: 3
    };
    pm7DataBuffer(mode,status);
    regionalText(pm7Data);
}


function pm7DataBuffer(mode,status) {
    let key = 'all_pm7B';
    let data_for_php = { key: key };
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    $.get(php_handler, data_for_php, function (data) {
        let color = "#039BE5";//blue
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let to_visualize = [];
       
            for (let i = 0; i < temp.length; i++) {
                if (status =="") {

                } else if () {

                }
                to_visualize.push(temp[i]);
                polyToErase.exist.push();
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

            polyToErase.exist.push(polygon);

            // Hover Effect for Google API Polygons
            google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
            google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

            polygon.setMap(map);
            polygons.push(polygon);
        }
        pm7DataP();
    });
}
function pm7DataP() {
    let key = 'all_pm7S';
    let example = { key: key };
    let color = "#039BE5";

    p = [];

    $.get('mwt_handler.php', example, function (data) {
        let image = "./img/markers/yellow.png";
        for (index in data.shape_arr) { // Organize information into dictionaries
            //hold info of 1 point at a time
            let holder = [];


           // if (mode == 1 || mode == 2) { // mode 1 and 2 allows us to store points 
                holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                holder = holder[0][0]; // Fixes BLOBs

                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    icon: image
                });

              //  if (status == "existing" && condition == "e") {
                    //p.push(point);
                //} else if (status == "planned_existing" && condition == "p") {
             //       p.push(point);
               // }
                point.setMap(map);
                points.push(point);
            //}
        } 
        pm7DataPKey();
        /*
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
            regionalText(pm7Data);
        }
        else if (mode > 1) {
            dynamicCorridorText(corr, pm7Data); // Send graph data and current corridor to dynamic text for corridors
        }*/
    });
}
function pm7DataPKey() {
    let key = 'all_pm7K';
    let example = { key: key };
    let color = "#039BE5";

    p = [];

    $.get('mwt_handler.php', example, function (data) {
        let image = "./img/markers/red.png";
        for (index in data.shape_arr) { // Organize information into dictionaries
            //hold info of 1 point at a time
            let holder = [];


            // if (mode == 1 || mode == 2) { // mode 1 and 2 allows us to store points 
            holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
            holder = holder[0][0]; // Fixes BLOBs

            let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

            let point = new google.maps.Marker({
                position: to_visualize,
                icon: image
            });

            //  if (status == "existing" && condition == "e") {
            //p.push(point);
            //} else if (status == "planned_existing" && condition == "p") {
            //       p.push(point);
            // }
            point.setMap(map);
            points.push(point);
            //}
        }
        /*
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
            regionalText(pm7Data);
        }
        else if (mode > 1) {
            dynamicCorridorText(corr, pm7Data); // Send graph data and current corridor to dynamic text for corridors
        }*/
    });
}
function pm7HorizontalBar(ctx){
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
function pm7HorizontalBar2(ctx){
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
