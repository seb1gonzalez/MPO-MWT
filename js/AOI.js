var AOI_STRING;
let active_pm_for_AOI;
//to delete user drawn shapes
function deleteUserShapes() {
    for (var i=0; i < all_overlays.length; i++)
    {
      all_overlays[i].overlay.setMap(null);
    }
    all_overlays = [];
  }

//returns geoJSON string
function createGeoJSON(poly_type,coords){
    let polygon,type;
    if (poly_type == "polygon") {
        type = "Polygon";
        polygon = [coords];
    }
    else{
        type = "LineString"
        polygon = coords;
    }
    let geo = {
          "type": type,
          "coordinates": polygon
      };
    return JSON.stringify(geo);
}
// turns on/off AOI controls
function switch_AOI(){
    console.log("switch AOI");
    if( drawingManager.drawingControl == true){
        drawingManager.drawingControl = false;
        drawingManager.setMap(map);
        console.log("switch AOI OFF");
    }
    else{
        drawingManager.drawingControl = true;
        drawingManager.setMap(map);
        console.log("switch AOI ON");
    }
    
}

//Options for AOI
/*
all_pm1                     	pm1	polygon
all_pm25                       	pm25d	line
all_pm26                       	pm26	point
all_pm13_14                    	pm14points	point
all_pm8P                       	pmt8keys	line
all_pm4                     pm4_bike	line
all_pm11                       	pm11_sidewalks	line
all_pm12                       	pm12	line
all_pm3                     pm3final	line
all_pm5                    	pm5	polygon
all_pm9                    	pmt5_9	polygon
all_pm7                    	pm7_buffer	polygon
all_pm21                       	pm21_polygons	polygon
all_pm21P                      	pm21_points	point
all_pm21L                      	pm21_lines	line
all_pm7P                       	pm7_planbrst	point
all_pm4W                       	pm4_walking	line
all_pm10                       	pmt6_10	polygon
all_pm7PK                      	pm7_plannedkey	point
all_pm8                     pmt8buffers	polygon
all_pm15_16_17                     	pm15_16_17p	point
all_pm20PC                      pm20_crashp	point
all_pm22                       	pm22txpoints	point
all_pm22nm                     	pm22nmpoints	point
all_pm18_19                    	pm18_19txdotall	point
all_pm18_19                    	pm18_19txdotall	point
all_pm20                       	pm20_buscrashesf	point
all_pm15_16_17g                    	pms_15_16_17_graph_data	point
*/

// main handler for AOI:
/**
 * get current pm ;
 * get intersection;
 * display general AOI
 */
function AOI(AOI_STRING){

    console.log("current active pm " + active_pm_for_AOI);
    let tables_reference = {
        //Points:
        'all_pm26': 'pm26',			//done
        'all_pm13_14': 'pm14points',			
        'all_pm21P': 'pm21_points', // does not exist in PM folder
        'all_pm7P': 'pm7_planbrst', //pending dynamic data
       'all_pm15_16_17':'pm15_16_17p',
        'all_pm7PK': 'pm7_plannedkey', //pending dynamic data
        'all_pm20PC': 'pm20_crashp',
        'all_pm22': 'pm22txpoints', 
        'all_pm22nm': 'pm22nmpoints',
        'all_pm18_19': 'pm18_19txdotall',
        'all_pm20': 'pm20_buscrashesf',
        //end points
        //Lines:
        'all_pm4B':'pm4_bike',
        'all_pm4W':'pm4_walking',
        'all_pm3':'pm3final',
        'all_pm11':'pm11_sidewalks',
        'all_pm12':'pm12'

    }
    let table_wanted = tables_reference[active_pm_for_AOI];
     let to_php = {
         "AOI": AOI_STRING,
         "PM_SOURCE":table_wanted
     }
     drawingManager.drawingControl = true;
     drawingManager.setMap(map);
     clearMetadata();

         if (table_wanted == 'pm26'){
            pm26Data(4,to_php);
          
        }  
        else if (table_wanted == 'pm3final'){
            pm3Data(4, to_php);
        }
        else if (table_wanted == 'pm4_bike' || table_wanted == 'pm4_walking'){
            pm4Data(4, to_php);
        }
      
        else if(table_wanted =='pm11_sidewalks'){
            pm11Data(4,to_php);
        }
        else if (table_wanted == 'pm18_19txdotall'){
            pm18Data(4, to_php);
        }
        else if (table_wanted == 'pm12'){
            pm12Data(4, to_php);
        }






    // console.log("AOI table to fetch: "+ table_wanted);
    // let to_php = {
    //     "AOI": AOI_STRING,
    //     "PM_SOURCE":table_wanted
    // }
    // $.get( "backend/AOI.php",to_php).done(function(data) {
    //     drawingManager.drawingControl = true;
    //     drawingManager.setMap(map);
    //     alert( "Retrieving AOI..." );
    //     clearMetadata();
    //     if (table_wanted == 'pm26'){
    //         pm26Data(4,data);
    //     }
    // })
    // .fail(function() {
    //     alert( "Error fetching AOI" );
    // });
  
}