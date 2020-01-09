//calculates number display on multimodal Performance menu
/**
 * There are 4 types of mode
 * Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
 * Mode 1: Regional Performance Points and data
 * Mode 2: Corridor Performance Points and data
 * Mode 3: Corridor Data only, data for benchmark
 * Mode 4: AOI points and data only
 */
function pm4Data(mode, corr) {
    let count = 0; // PM4 Data
    let color = '#03A9F4'; 
    let caller = "mwt_handler.php";
    let shape = "shape";
    let key = 'all_pm4';
    let data_for_php = {};

    if (mode == 0 || mode == 1) {
        if (currentType == 'walking') key = 'all_pm4W';
        else if (currentType == 'biking') key = 'all_pm4';
        data_for_php = { key: key };
    } else  if(mode == 2){
        caller = "corridor_handlerB.php";
        shape = 'ST_AsText(SHAPE)';
        let key = "";

        if (currentType == "biking") {
            key = "pm4_bike";
        } else if (currentType == "walking") {
            key = "pm4_walking";
        }

        data_for_php = {
            key: 4,
            corridors_selected: corr,
            tableName: key
        };
    }
    else if (mode == 4) { 
        caller = "./backend/AOI.php";
    }

    $.get(caller, data_for_php, function (data) { // ajax call to populate pavement lines
        for (index in data.shape_arr) { // iterates through every index in the returned element (data['shape_arr'])
            let shp = data.shape_arr[index][shape]; // shape is LINESTRING or MULTILINESTRING
            let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
            let to_visualize = []; // used to populate the map (latitude & longitude)
            let coord; // will be an object to push coordinates to populate the map
            let ln = r.getCoordinates(); // parses the shape into lat & lng


            //PMS Data

            let pm4tct = data.shape_arr[index].tactcnt; // works for both walking and Biking

        
            count += parseInt(data.shape_arr[index].tactcnt); // count if total miles
            if (mode == 1 || mode == 2|| mode == 4) {
                for (let i = 0; i < ln.length; i++) {
                    coord = { lat: ln[i]['y'], lng: ln[i]['x'] }; // this is how lat & lng is interpreted by the tool
                    to_visualize.push(coord); // pushing the interpretation to our to_visualize array
                }
                // filter colors 
                if (currentType == "walking") {
                    if (pm4tct > 4 && pm4tct < 16) {
                        color = '#f44336';
                    } else if (pm4tct > 15 && pm4tct < 130) {
                        color = '#64DD17';
                    } else if (pm4tct > 129 && pm4tct < 1306) {
                        color = '#9C27B0';
                    }
                    let line = new google.maps.Polyline({ // it is a POLYLINE
                        path: to_visualize, // polyline has a path, defined by lat & lng 
                        strokeColor: color,
                        strokeOpacity: .50,
                        strokeWeight: 4,
                        zIndex: 99 // on top of every other shape
                    });
                          // Hover Effect for Google API Polygons
            google.maps.event.addListener(line, 'mouseover', function (event) { injectTooltip(event,pm4tct); });
            google.maps.event.addListener(line, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(line, 'mouseout', function (event) { deleteTooltip(event); });

                    line.setMap(map);
                    polylines.push(line);
                }
                else if (currentType == "biking") {
                    if (pm4tct > 4 && pm4tct < 31) {
                        color = '#f44336';
                    } else if (pm4tct > 31 && pm4tct < 481) {
                        color = '#64DD17';
                    } else if (pm4tct > 480 && pm4tct < 8461) {
                        color = '#9C27B0';
                    }

                    let line = new google.maps.Polyline({ // it is a POLYLINE
                        path: to_visualize, // polyline has a path, defined by lat & lng 
                        strokeColor: color,
                        strokeOpacity: .50,
                        strokeWeight: 4,
                        zIndex: 99 // on top of every other shape
                    });
                                       // Hover Effect for Google API Polygons
            google.maps.event.addListener(line, 'mouseover', function (event) { injectTooltip(event,pm4tct); });
            google.maps.event.addListener(line, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(line, 'mouseout', function (event) { deleteTooltip(event); });

                    line.setMap(map);
                    polylines.push(line);
                }
            }
        }

        let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?

        if (mode == 0) {
            if (currentType == "walking") {
                document.getElementById("pm4WText").innerHTML = commafy(count);
               // lineHandler('0pm4B'); 
            } else if (currentType == "biking") {
                document.getElementById("pm4BText").innerHTML = commafy(count);
            }
        } else if (mode == 1) {
            regionalText(count);
        } else if (mode == 2) {
            dynamicCorridorText(corr, count);
        }
        else if (mode == 4) {
            dynamicCorridorText("AOI", count); // Send graph data and current corridor to dynamic text for corridors
        }

 
        
    });


}

