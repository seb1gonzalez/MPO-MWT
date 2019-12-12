/**
 * There are 4 types of mode
 * Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
 * Mode 1: Regional Performance Points and data
 * Mode 2: Corridor Performance Points and data
 * Mode 3: Corridor Data only, data for benchmark
 *  * Mode 4: AOI
 */

function pm3Data(mode, data_for_php) {

    let pm3TextData = {
        highAvg: 0,
        lowAvg: 1000000000,
        highRoute: 0,
        lowRoute: 0
    }

    let color = '#03A9F4';  // default
    let php_handler = "mwt_handler.php";
    let shape = "shape";
    if (mode == 0 || mode == 1) {
        let key = 'all_pm3';
        data_for_php = { key: key };
    }

     else   if (mode == 3 || mode == 2) {
        php_handler = "corridor_handlerB.php";
        shape = 'ST_AsText(SHAPE)';
    }
    else   if (mode == 4) {
        php_handler = "./backend/AOI.php";
    }

    $.get(php_handler, data_for_php, function (data) { // ajax call to populate pavement lines
        console.log('back');
        let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
        for (index in data.shape_arr) { // iterates through every index in the returned element (data['shape_arr'])
            let shp = data.shape_arr[index][shape]; // shape is LINESTRING or MULTILINESTRING 
            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
            let to_visualize = []; // used to populate the map (latitude & longitude)
            //let coord; // will be an object to push coordinates to populate the map
            //let ln = r.getCoordinates(); // parses the shape into lat & lng

            //PMS Data/Columns
            let route = parseInt(data.shape_arr[index].routeName); // used to color code line
            let avg = parseInt(data.shape_arr[index].AVG_ridership);

            //Draw Line(s)
            if (mode == 1 || mode == 2 || mode == 4) {
                to_visualize = pm3_polyline_geojson_formatter(r);
                // filter colors 
                if (avg > 2776.666667 && avg < 107271.682952) {
                    color = '#8BC34A';
                } else if (avg > 107271.682951 && avg < 388321.351849) {
                    color = '#FFCA28';
                } else if (avg > 388321.351848 && avg < 1144232.200000) {
                    color = '#f44336';
                }
                for (i in to_visualize) {
                    let line = new google.maps.Polyline({ // it is a POLYLINE
                        path: to_visualize[i], // polyline has a path, defined by lat & lng 
                        strokeColor: color,
                        strokeOpacity: .50,
                        strokeWeight: 4,
                        zIndex: 99 // on top of every other shape
                    });
                                              // Hover Effect for Google API Polygons
            google.maps.event.addListener(line, 'mouseover', function (event) { injectTooltip(event,commafy(avg)); });
            google.maps.event.addListener(line, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(line, 'mouseout', function (event) { deleteTooltip(event); });

                    line.setMap(map);
                    polylines.push(line);

                }

            }

            //update highest average and Route
            if (avg > pm3TextData.highAvg) {
                pm3TextData.highAvg = avg;
                pm3TextData.highRoute = route;
            }
            //update lowest Average and Route
            if (avg < pm3TextData.lowAvg) {
                pm3TextData.lowAvg = avg;
                pm3TextData.lowRoute = route;
            }
        }

        let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?
        if (mode == 0) {
            let stpm3 = "";
            stpm3 = commafy(pm3TextData.highAvg);
            document.getElementById("pm3Text").innerHTML = stpm3;
        }
        else if (mode == 1) {
            regionalText(pm3TextData);
        } 
        else if (mode == 2) {
            dynamicCorridorText(corr, pm3TextData);
        }
        else if (mode == 4) {
            dynamicCorridorText('AOI', pm3TextData);
        }

    });
    


}

function pm3_line_geojson_formatter(data) {
    let res = [];
    let shape = data.points.coordinates; //reduced to the array of points.
    for (let point in shape) {
        let formatted_point = {
            lat: parseFloat(shape[point].y),
            lng: parseFloat(shape[point].x),
        };
        res.push(formatted_point);
    }
    return res;
}

function pm3_polyline_geojson_formatter(data) {
    let res = [];
    let shape = data.geometries; // reduce to a anrry of linestrings
    for (let item in shape) {
        let segment = line_geojson_formatter(shape[item]);
        res.push(segment);
    }
    return res;
}
    
    
