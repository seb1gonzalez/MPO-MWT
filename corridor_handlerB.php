<?php
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 30000); //300 seconds = 5 minutes
$user = "ctis";
$db = "mpo_all";
$ps = "19691963";
$host = "irpsrvgis35.utep.edu";
$conn = mysqli_connect($host, $user, $ps, $db);

$key = $_GET['key'];
$corridors_selected = $_GET['corridors_selected'];//"mesa_buffer"; 
$active_pm = $_GET['active_pm'];	 //"pm22txpoints";// // key sent from front-end, from the object defined at the ajax call

$toReturn = array();//global array that will return requested data
$shape = array(); // for the data that will be returned, shape and value

if($key == 18 || $key ==19) {
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT OGR_FID,unknown_in,loc, type,year,fatalities,non_injuri,suspected_, non_incapa, possible_i, ST_AsText(SHAPE) FROM " . $active_pm ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}
else if($key == 26){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "select superstruc,substruc_c,region, ST_AsText(SHAPE) FROM ". $active_pm ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 6), p.SHAPE ) and OGR_FID >0;";

	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}
else if($key == 3){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT AVG_ridership, ST_AsText(SHAPE),routeName FROM " . $active_pm ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}

else if($key == 4 || $key == 4.1){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT tactcnt, ST_AsText(SHAPE) FROM " . $active_pm ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 7), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}

else if($key == 25){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT state_code,year,iri_vn, miles, ST_AsText(SHAPE) FROM " . $active_pm ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}
else if($key == 11){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT ST_AsText(SHAPE) FROM " . $active_pm ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 8), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}else if($key == 12){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT status, bikepath, mile, ST_AsText(SHAPE) FROM " . $active_pm ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}


$toReturn['shape_arr'] = $shape; // store it in an index on our array, by name == more significant

header('Content-Type: application/json'); //specifies how the data will return 
echo json_encode($toReturn); //encodes our array to json, which lets us manipulate in front-end
$conn->close();

/*
SET @mesa_buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM mesa_buffer WHERE OGR_FID = 1);
SELECT * FROM mpo_all.pm3final as p WHERE ST_INTERSECTS( st_geomfromtext(st_astext(@mesa_buff), 4), p.SHAPE ) and OGR_FID >0;

*/
?>

