<?php
// Note the db used is mpo_new
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 30000); //300 seconds = 5 minutes
require_once("./conn_corridors.php"); //file needed to make connection to DB, "$conn" variable originates from there

$all_corridors = array();

$all_corridors['ALAMEDA'] = getFullTable($conn,"alameda_buffer");
$all_corridors['DONIPHAN'] = getFullTable($conn,"doniphan_buffer");
$all_corridors['DYER'] = getFullTable($conn,"dyer_buffer");
$all_corridors['HORIZON'] = getFullTable($conn,"horizon_buffer");
$all_corridors['MESA'] = getFullTable($conn,"mesa_buffer");
$all_corridors['MONTANA'] = getFullTable($conn,"montana_buffer");
$all_corridors['MONTWOOD'] = getFullTable($conn,"montwood_buffer");
$all_corridors['YARBROUGH'] = getFullTable($conn,"yarbrough_buffer");
$all_corridors['ZARAGOZA'] = getFullTable($conn,"zaragoza_buffer");
$all_corridors['ARTCRAFT'] = getFullTable($conn,"artcraft_buffer");
$all_corridors['EASTLAKE'] = getFullTable($conn,"eastlake_buffer");
$all_corridors['MCNUTT'] = getFullTable($conn,"mcnutt_buffer");
$all_corridors['SOCORRO'] = getFullTable($conn,"socorro_buffer");

echo "Data Retrieved... Generating JSON\n";
createJSONFile($all_corridors);
echo "all done\n";


function getFullTable($conn, $tableName){
    $toReturn = [];
    $query = "SELECT astext(SHAPE) as shape FROM $tableName;";
    $result = mysqli_query($conn, $query); // do the query, store in result
//    $arr_1 = array();
    while($row = mysqli_fetch_assoc($result)){
        array_push($toReturn,$row);
    }
    return $toReturn;
}

function createJSONFile($file_to_json){
	echo json_encode($file_to_json,128);
    $fp = fopen('corridors_buffers.json', 'w');
    fwrite($fp,json_encode($file_to_json,128));
    fclose($fp);
}

$conn->close();
?>

