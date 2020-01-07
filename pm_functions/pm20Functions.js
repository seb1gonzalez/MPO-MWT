function pm20Data(mode, corr) {
    pm20_buffers(mode,corr);
    

}


function pm20_buffers(mode,corr) {

    let pm20data = {
        b_greatest: 0,
        b_greatestCounter: 0,
        b_address: 'beto',
        b_on_st: '',
        b_at_strt: 0,
        b_count: 0,

        w_greatest: 0,
        w_greatestCounter: 0,
        w_address: '',
        w_on_st: '',
        w_at_strt: 0,
        w_count: 0
    };

    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    let key = '';

    if (mode == 0 || mode == 1) {
        key = 'all_pm20B';
        data_for_php = { key: key };
    } else if (mode == 2) {
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 20.1, // 20.1 = buffer on corridor Handler 
            corridors_selected: corr,
            tableName: "pm20_station_buff"
        };
    }

    $.get(php_handler, data_for_php, function (data) {
        let color = "#1A237E"; // Blue
        console.log(data);
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let to_visualize = [];
            let address = data.shape_arr[index]['address'];
            let on_st = data.shape_arr[index]['on_st'];
            let at_strt = data.shape_arr[index]['at_strt'];
            let count_ = parseInt(data.shape_arr[index]['count_']);
            let type =data.shape_arr[index]['type'];

            //calculations
            if (type == "bike") {

                if (count_ == pm20data.b_greatest) {
                    pm20data.b_greatestCounter++;
                }
                if (count_ > pm20data.b_greatest) {
                    pm20data.b_greatest = count_;
                    pm20data.b_greatestCounter = 0;
                    pm20data.b_address = address;
                    pm20data.b_on_st = on_st;
                    pm20data.b_at_strt = at_strt;
                    pm20data.b_count = count_;
                }
            } else if (type == null) {
                if (count_ == pm20data.w_greatest) {
                    pm20data.w_greatestCounter++;
                }
                if (count_ > pm20data.w_greatest) {
                    pm20data.w_greatest = count_;
                    pm20data.w_greatestCounter = 1;
                    pm20data.w_address = address;
                    pm20data.w_on_st = on_st;
                    pm20data.w_at_strt = at_strt;
                    pm20data.w_count = count_;
                }
            }

      
            for (let i = 0; i < temp.length; i++) {
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

            if (currentType == "biking") {
                polyToErase.exist.push(polygon);
                polygon.setMap(map);
                polygons.push(polygon);
            } else if (currentType == "walking") {
                polyToErase.exist.push(polygon);
                polygon.setMap(map);
                polygons.push(polygon);
            }
         
        }

        if (mode == 0) {
            document.getElementById("").innerHTML = 0;
        } else if (mode == 1) {
            regionalText(pm20data);
        } else if (mode == 2) {
            let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?
            dynamicCorridorText(corr,pm20data);
        }
        loadpm20P(mode,corr);
    });
}
function loadpm20P(mode,corr) {
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    let image = "./img/markers/red.png";
    let key = 'all_pm20P';

    if (currentType == "biking") {
        image = "./img/markers/cyclist.png";
    } else if (currentType == "walking") {
        image = "./img/markers/ped.png";
    }

    if (mode == 0 || mode == 1) {
        data_for_php = { key: key };
    } else if (mode == 2) {
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 20, // 20 = points on corridor Handler 
            corridors_selected: corr,
            tableName: "pm20_crashes"
        };
    }


    $.get(php_handler, data_for_php, function (data) {
        for (index in data.shape_arr) {
            let holder = [];
         
            
            if (mode == 1 || mode == 2) { // mode 1 and 2 allows us to store points
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs
                console.log("printing point");
                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };
                let type = data.shape_arr[index]['type'];

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: '',
                    value: '',
                    icon: image
                });
                if (currentType == "biking" && type == "Pedcyclists" ) {
                    point.setMap(map);
                    points.push(point);
                } else if (currentType == "walking" && type == "Pedestrian") {
                    point.setMap(map);
                    points.push(point);
                }
            }
        }
        loadpm20Bus(mode,corr);
        
    });

}
function loadpm20Bus(mode,corr) {
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    let image = "./img/markers/yellow_small.png";
    let key = "all_pm20_bus";

    if (mode == 0 || mode == 1) {
        data_for_php = { key: key };
    } else if (mode == 2) {
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 20.2, // 20.2 = Bus points on corridor Handler 
            corridors_selected: corr,
            tableName: "pm20_stationsbus"
        };
    }

    $.get(php_handler, data_for_php, function (data) {
        console.log("in");
        console.log(data);
        for (index in data.shape_arr) {
            let holder = [];


            if (mode == 1 || mode == 2) { // mode 1 and 2 allows us to store points
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs
                console.log("printing point");
                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: '',
                    value: '',
                    icon: image
                });
                point.setMap(map);
                points.push(point);

            }
        }


    });

}