

function pm11Data(mode, php_data) {
    let php_handler = "mwt_handler.php";
    let shape = "shape";
    let key = 'all_pm11';

    let color = '#0D47A1';
    pmdata = {
        pm11Slength:0
    }
    if (mode == 0 || mode == 1) {
        php_data = { key: key };
    } else if (mode == 2) {
        php_handler = "corridor_handlerB.php";
        shape = 'ST_AsText(SHAPE)';
    }
    else if(mode == 4){
        php_handler = "./backend/AOI.php";
    }
    $.get(php_handler, php_data, function (data) { // ajax call to populate pavement lines
        let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
        for (index in data.shape_arr) { // iterates through every index in the returned element (data['shape_arr'])
            let shp = data.shape_arr[index][shape]; // shape is LINESTRING or MULTILINESTRING
            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
            let to_visualize = []; // used to populate the map (latitude & longitude)

            pmdata.pm11Slength += parseFloat(data.shape_arr[index].length);

            if (mode == 1 || mode == 2 || mode == 4) {

                if ('geometries' in r) { //multilinestrings
                    to_visualize = pm3_polyline_geojson_formatter(r);
                    console.log(to_visualize);

                    for (i in to_visualize) {
                        let line = new google.maps.Polyline({ // it is a POLYLINE
                            path: to_visualize[i], // polyline has a path, defined by lat & lng 
                            strokeColor: color,
                            strokeOpacity: .50,
                            strokeWeight: 4,
                            zIndex: 99 // on top of every other shape
                        });
                        line.setMap(map);
                        polylines.push(line);
                    }
                } else if ('points' in r){ //linestrings
                    to_visualize = pm3_line_geojson_formatter(r);

                        let line = new google.maps.Polyline({ // it is a POLYLINE
                            path: to_visualize, // polyline has a path, defined by lat & lng 
                            strokeColor: color,
                            strokeOpacity: .50,
                            strokeWeight: 4,
                            zIndex: 99 // on top of every other shape
                        });
                        line.setMap(map);
                        polylines.push(line);     
                }
            }
        }


        let corr = translateCorridor(php_data.corridors_selected); // what corridor are we on?
        //convert feet to miles
        pmdata.pm11Slength = pmdata.pm11Slength * 0.000189393939;

        if (mode == 0) {
            document.getElementById("pm11WText").innerHTML = pmdata.pm11Slength.toFixed(2);
        } else if (mode == 1) {
            regionalText(pmdata);
        } else if (mode == 2) {
            dynamicCorridorText(corr, pmdata);
        }
        else if (mode == 4) {
            dynamicCorridorText("AOI", pmdata);
        }

    });

}
    
