function pm21Data(mode, ex) {
    alert("BETO");
    loadpm21H(mode, ex);

}


function loadpm21P(mode,ex) {
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm21_p';
        data_for_php = { key: key };
    } else if (mode == 2) { // if we want corridors
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
    }

    
    $.get(php_handler, data_for_php, function (data) {
        let image = "./img/markers/yellow.png";
        for (index in data.shape_arr) {
            let holder = [];
            let project_name = data.shape_arr[index]['project_id'];
            console.log(project_name);
            if (mode == 1 || mode == 2) { // mode 1 and 2 allows us to store points
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs

                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: project_name,
                    value: project_name,
                    icon: image
                });
                point.setMap(map);
                points.push(point);
            
            }
        }

        if (mode == 1) {
            regionalText("");
        }
        else if (mode == 2 || mode == 3) {
            let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?
            dynamicCorridorText(corr, pm20Data); // Send graph data and current corridor to dynamic text for corridors
        }
    });

}

//heat
function loadpm21H(mode, ex) {
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm21_h';
        data_for_php = { key: key };
    } else if (mode == 2) { // if we want corridors
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
    }

    $.get(php_handler, data_for_php, function (data) {

        let color = "#039BE5";//blue
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let to_visualize = [];
            let pattern = data.shape_arr[index]['pattern'];
            
            // if the status of a shape exists, push to visualize
            for (let i = 0; i < temp.length; i++) {
                to_visualize.push(temp[i]);
                polyToErase.exist.push();
            }

            if (pattern == "Intensifying Hot Spot") {
                color = '#d50000';
            } else if (pattern == "New Hot Spot") {
                color = '#FFA726';
            } else if (pattern == "Not Emerging") {
                color = '#9E9E9E';
            } else if (pattern == "Oscillating Hot Spot") {
                color = "#FF5722";
            } else if (pattern == "Persistent Cold Spot") {
                color = "#9C27B0";
            } else if (pattern == "Sporadic Cold Spot") {
                color = "#1A237E";
            } else if (pattern == "Sporadic Hot Spot") {
                color = "#3F51B5";
            } else if (pattern == "Diminishing Cold Spot") {
                color = "#80D8FF";
            } else if (pattern == "Consecutive Hot Spot") {
                color = "#FF4081";
            }else {
                color = "#8BC34A";
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
                title: pattern,

            });

            polyToErase.exist.push(polygon);

            // Hover Effect for Google API Polygons
            google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
            google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

            polygon.setMap(map);
            polygons.push(polygon);
        }

        loadpm21P(mode, ex);
    });
}

function loadpm21Projected(mode, ex) {
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm21_pj';
        data_for_php = { key: key };
    } else if (mode == 2) { // if we want corridors
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
    }
    console.log("about to leave");
    console.log(php_handler);
    console.log(data_for_php);
    console.log(mode);
    $.get(php_handler, data_for_php, function (data) {
        console.log("returned from uterp");
        let color = "#E91E63";
        for (index in data.shape_arr) {
            console.log("in here");
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let pattern = wktFormatter(data.shape_arr[index]['pattern']);
            let to_visualize = [];


            // if the status of a shape exists, push to visualize
            for (let i = 0; i < temp.length; i++) {
                if (pattern == 'Intensifying Hot Spot') {
                    color = '';
                } else if (pattern == 'New Hot Spot') {

                } else if (pattern == 'Not Emerging') {

                } else if (pattern == 'Oscillating Hot Spot') {

                } else if (pattern == 'Persistent Cold Spot') {

                } else if (pattern == 'Sporadic Cold Spot') {

                } else if (pattern == 'Sporadic Hot Spot') {

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
                title: "Testing",

            });

            polyToErase.exist.push(polygon);

            // Hover Effect for Google API Polygons
            google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
            google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

            polygon.setMap(map);
            polygons.push(polygon);
        }


    });
}