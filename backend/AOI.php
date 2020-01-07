<?php

/**
 *initial configuration
 */
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 120); //120 seconds = 2 minutes
require_once("./../conn_mwt.php");


/**
*Initialize return variables and fetch request
*/ 
$toReturn = array();								//global array that will return requested data
$shape = array(); 									// for the data that will be returned, shape and value
$AOI_SHAPE = $_GET['AOI'];
$active_pm = $_GET['PM_SOURCE'];

/**
*Initialize special MySQL variable
*/ 
$query = "SET @poly =  ST_GeomFromGeoJSON('$AOI_SHAPE');";
$result = mysqli_query($conn, $query); 

/**
 * Select query to be run in database
 */
if($active_pm == "pm22txpoints" || $active_pm == "pm22nmpoints"){
	$query = "SELECT ST_AsText(SHAPE) as shape FROM (SELECT SHAPE FROM pm22txpoints UNION SELECT SHAPE FROM pm22nmpoints ) as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );";
}
else if($active_pm =="pm14points"){ 
	$query = "SELECT port_of_en,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 6), p.SHAPE );";

	
}
else if($active_pm =="pm15_16_17p"){ 
	$query = "SELECT station_na,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 6), p.SHAPE );";

}
else if($active_pm =="pm18_19txdotall"){ 
	$query = "SELECT OGR_FID,unknown_in,loc, type,year,fatalities,non_injuri,suspected_, non_incapa, possible_i,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );";

}
else if($active_pm =="pm20_buscrashesf"){ 
	$query = "SELECT ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 6), p.SHAPE );"; 
}
else if($active_pm =="pm26"){ 
	$query = "SELECT deck_cond_,superstruc,substruc_c,region,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 6), p.SHAPE );";
}
else if($active_pm =="pm4_bike"){ 
	$query = "SELECT tactcnt,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly),7), p.SHAPE );";
}
else if($active_pm =="pm4_walking"){ 
	$query = "SELECT tactcnt,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly),7), p.SHAPE );";
}
else if($active_pm =="pm3final"){ 
	$query = "SELECT AVG_ridership, routeName,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly),4), p.SHAPE );";
}
else if($active_pm == "pm11_sidewalks"){
	$query = "SELECT length, status, astext(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly),8), p.SHAPE );"; 
}
else if($active_pm == "pm12"){
	$query = "SELECT status, bikepath, mile, astext(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly),4), p.SHAPE );"; 
	
}
else{
	$query = "SELECT ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 6), p.SHAPE );";
}

/**
 *Run selected query
 */
$result = mysqli_query($conn, $query); 

/**
 *Save results into indexed Array
 */
while($temporal = mysqli_fetch_assoc($result)){ 
	array_push($shape, $temporal);
}




/**
 *Respond request to Front-end with JSON
 */
$toReturn['shape_arr'] = $shape; 					// store it in an index on our array, by name == more significant
header('Content-Type: application/json'); 			//specifies how the data will return 
echo json_encode($toReturn); 						//encodes our array to json, which lets us manipulate in front-end
$conn->close();
?>

