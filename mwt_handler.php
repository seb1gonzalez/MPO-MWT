<?php
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 30000); //300 seconds = 5 minutes
//conection to utep database
require_once("./conn_mwt.php"); //file needed to make connection to DB, "$conn" variable originates from there

$key = $_GET['key']; // key sent from front-end, from the object defined at the ajax call
//global array that will return requested data
$toReturn = array();
$tables = array(); // used to store where the pm will be found ("found_in_table")
$query = "select * from pms where pms_key = '$key';"; // return all the information for ONE pm, because $key is unique
$result = mysqli_query($conn, $query); 			// do the query, store in result

while($temporal = mysqli_fetch_assoc($result)){ // loops through $result array, stores into $temporal
	array_push($tables, $temporal); 			// pushes $temporal to our desired array
}
$pm_table = $tables[0]['found_in_table']; 		// table name where we will find the data for our particular pm
$corridor_key = explode("_", $key); 			// extract the corridor key into an array
$corridor_key = $corridor_key[0]; 				// following our DB and naming conventions, the $corridor_key will be found at the 0 index
												// $corridor_key can be either mn, al, do, dy, hn, ms, yr, zr, or mw
$shape = array();								// for the data that will be returned, shape and value

// ! some repetition needs to be addressed 

if($key == "all_pm1"){ 
	$query = "select astext(SHAPE) as shape,b08301e1,b08301e3,b08301m1,b08301m3,nonsov_e,nonsov_m,b08301e10,b08301m10,b08301e18,b08301m18,b08301e19,b08301m19,ratio_area from $pm_table where corridor_key = '$key'";
}else if($key == "all_pmbridge"){ 
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm26"){ 
	$query = "select superstruc,substruc_c,region,astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm3"){
	$query = "select AVG_ridership, routeName, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; // temporal note: find an elegant way to generalize this
}else if($key == "all_pm4"){
	$query = "select tactcnt, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm4W"){
	$query = "select tactcnt, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm7"){
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm7P"){
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm7PK"){
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm8_b"){
	$query = "select status, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm8P"){
	$query = "select name, status, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm9"){ // Pm5 and PM9 share table both have all_pm9
	$query = "select status, b00001e1, ratio_prim, prcnt_prim, ratio_pop,prim_jobs_, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm10"){ // Pm6 and pm10 share table
	$query = "select status, b00001e1, ratio_pop, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm11"){
	$query = "select length, status, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm12"){
	$query = "select status, bikepath, mile, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm18_19"){
	$query = "select OGR_FID,unknown_in,loc, type,year,fatalities,non_injuri,suspected_, non_incapa, possible_i, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm21_h"){
	$query = "select pattern, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm21_pj"){
	$query = "select pattern, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm21_p"){ // special case pm21 has points, lines, polygons 
	$query = "select project_id, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm22"){ 
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm22nm"){ 
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm25"){
	$query = "select state_code,year,iri_vn, miles, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm13_14"){
	
	$query = "select port_of_en, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm15_16_17"){
	$query = "select station_na, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm15_16_17g"){
	$query = "select Station, g2014,g2015,g2016,g2017,g2018,Pollutant from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm20_p"){
	$query = "select type, OGR_FID, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm20_s"){
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; // ! repetition
}else if($key == "all_pm20_b"){
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; // ! repetition
}
else{
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; // temporal note: find an elegant way to generalize this
}


// another temporal note: not all lines will be pavement that will fetch "iri as value"
$result = mysqli_query($conn, $query); 

while($temporal = mysqli_fetch_assoc($result)){ 
	array_push($shape, $temporal);
}

$toReturn['shape_arr'] = $shape; // store it in an index on our array, by name == more significant

header('Content-Type: application/json'); //specifies how the data will return 
echo json_encode($toReturn); //encodes our array to json, which lets us manipulate in front-end
$conn->close();
?>

