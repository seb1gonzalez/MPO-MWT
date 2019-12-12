/*
 Adds Toggle to Polygon PMS 5 to 10
 */ 

var PM_existing_shown = {
    'PM5': [],
    'PM6': [],
    'PM7': [],
    'PM8': [],
    'PM9': [],
    'PM10': []
}

var PM_existing_selected = {
    'PM5': false,
    'PM6': false,
    'PM7': false,
    'PM8': false,
    'PM9': false,
    'PM10': false
}

var PM_planned_shown = {
    'PM5': [],
    'PM6': [],
    'PM7': [],
    'PM8': [],
    'PM9': [],
    'PM10': []
}

var PM_planned_selected = {
    'PM5': false,
    'PM6': false,
    'PM7': false,
    'PM8': false,
    'PM9': false,
    'PM10': false
}

//for pms 5 to 9
function turnOff_Switches() {
    for (var index in PM_planned_selected) {
        PM_planned_selected[index] = false;
    }
    for (var index in corridors_selected) {
        corridors_selected[index] = false;
    }
}

//existing
$("#toggle1").on('change', function () {

    if ($(this).is(':checked')) { //when TRUE
        removeAllElementsBar();
        displaySpinner();
        if (currentPM == 5) {
            PM_existing_selected.PM5 = true;
            pm5Data(1,"e"); // 5 & 9 share table
        } else if (currentPM == 9) {
            PM_existing_selected.PM9 = true;
            pm9Data(1, "e"); // 5 & 9 share table
        } else if (currentPM == 6) {
            PM_existing_selected.PM6 = true;
            console.log('line handleling');
            pm6Data(1, "e");
        } else if (currentPM == 7) {
            PM_existing_selected.PM7 = true;
            get_exist_plan("all_pm7", "e");
        } else if (currentPM == 8) {
            PM_existing_selected.PM8 = true;
            pm8Data(1, "e");
        } else if (currentPM == 10) {
            PM_existing_selected.PM10 = true;
            pm10Data(1, "e");
        }
    } else {

        if (currentPM == 5) {
            PM_existing_selected.PM5 = false;
            clear_Exist();
        } else if (currentPM == 9) {
            PM_existing_selected.PM9 = false;
            clear_Exist();
        }else if (currentPM == 6) {
            PM_existing_selected.PM6 = false;
            clear_Exist();
        } else if (currentPM == 7) {
            PM_existing_selected.PM7 = false;
            clear_Exist();
        } else if (currentPM == 8) {
            PM_existing_selected.PM8 = false;
            clear_Exist();
            clearMetadata(); //points
        } else if (currentPM == 10) {
            PM_existing_selected.PM10 = false;
            clear_Exist();
        }
    }
});
//planned
$("#toggle2").on('change', function () {
    if ($(this).is(':checked')) { //when TRUE
        removeAllElementsBar();
        displaySpinner();
        if (currentPM == 5) {
            PM_planned_selected.PM5 = true;
            pm5Data(1, "p"); // 5 & 9 share table
        } else if (currentPM == 9) {
            PM_planned_selected.PM5 = true;
            pm9Data(1, "p"); // 5 & 9 share table
        } else if (currentPM == 6) {
            PM_planned_selected.PM6 = true; 
            pm6Data(1, "p");
        } else if (currentPM == 7) {
            PM_planned_selected.PM7 = true;
            get_exist_plan("all_pm7", "p");
        } else if (currentPM == 8) {
            PM_planned_selected.PM8 = true;
            pm8Data(1, "p");
        } else if (currentPM == 10) {
            PM_planned_selected.PM10 = true;
            pm10Data(1, "p");
        }
    } else {
        if (currentPM == 5) {
            PM_planned_selected.PM5 = false;
            clear_Planned();
        } else if (currentPM == 9) {
            PM_planned_selected.PM9 = false;
            clear_Planned();
        }  else if (currentPM == 6) {
            PM_planned_selected.PM6 = false;
            clear_Planned();
        } else if (currentPM == 7) {
            PM_planned_selected.PM7 = false;
            clear_Planned();
        } else if (currentPM == 8) {
            PM_planned_selected.PM8 = false;
            clearMetadata();
            clear_Planned();
        } else if (currentPM == 10) {
            PM_planned_selected.PM10 = false;
            clear_Planned();
        }
    }
});
//Handles 2 toggles of Exist/Plan for Polygons.
function get_exist_plan(key, condition) {
    let example = { key: key };
    $.get('mwt_handler.php', example, function (data) {
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index]['shape']);
            let to_visualize = [];
            let pm5_9status = data.shape_arr[index].status;
            let title = "";

            //filter values on polygons
            if (currentPM == 9) {
                let ratioPop = parseFloat(data.shape_arr[index].ratio_pop);
                title = ratioPop;
            } else if (currentPM == 5) { // PM5 
                let prctprim = parseFloat(data.shape_arr[index].prcnt_prim);
                title = prctprim;
            }
            let color = "#039BE5";

            // if the status of a shape exists, push to visualize
            for (let i = 0; i < temp.length; i++) {
                if (pm5_9status == "exist" && condition == "e") {
                    color = "#039BE5";//blue
                    to_visualize.push(temp[i]);
                    polyToErase.exist.push();
                } else if (pm5_9status == "planned" && condition == "p") {
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
                title: title.toFixed(1) + "%",
            });
            if (condition == "e") polyToErase.exist.push(polygon);
            if (condition == "p") polyToErase.plan.push(polygon);
            // Hover Effect for Google API Polygons
            google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
            google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

            polygon.setMap(map);
            polygons.push(polygon);
        }
    });
}