<?php
/**
 * Last Updated: 10/09/19
 * By: S.
 * Reason: To see if the AJAX call on web app loads pm22 data instead of JSON file
 */
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 15000); //15 seconds
//connection to utep database
require_once("../conn_mwt.php"); //file needed to make connection to DB, "$conn" variable originates from there

/*--------------- For PM22 --------------------- */
//texas data
$tx_pm22 = getFullTable($conn,"tx_pm22");

$pm22TX_year = getCol($tx_pm22,"Year");
$pm22TX_inj = getCol($tx_pm22,"Total");
//new mex data
$nm_pm22 = getFullTable($conn,"nm_pm22");
$pm22NM_year = getCol($nm_pm22,"CRASH_YEAR");
$pm22NM_inj = getCol($nm_pm22,"Total");

// all pm 22 data
$pm22_data = Array();
// add TX data
$pm22_data["TX_YEARS"] = $pm22TX_year;
$pm22_data["TX_INJURIES"] = $pm22TX_inj;

// add NM data

$pm22_data["NM_YEARS"] = $pm22NM_year;
$pm22_data["NM_INJURIES"] = $pm22NM_inj;



// CLEAR VARIABLES
$tx_pm22 = 0;
$pm22TX_lat = 0;
$pm22TX_long = 0;
$pm22TX_year = 0;
$pm22TX_inj = 0;

$nm_pm22 = 0;
$pm22NM_lat = 0;
$pm22NM_long = 0;
$pm22NM_year = 0;
$pm22NM_inj = 0;

$toReturn["PM22"] = $pm22_data ;
header('Content-Type: application/json'); //specifies how the data will return 
echo json_encode($toReturn); //encodes our array to json, which lets us manipulate in front-end
mysqli_close($conn);


//retrieves an array from a list of arrays
function getCol($source,$colName)
{
    $toReturn = array();
    for ($x = 0; $x < sizeof($source); $x++) {
        array_push($toReturn,$source[$x][$colName]);
    }
    return $toReturn;
}

//implemented functions:
/* 1. getFullTable(connection, table ): receives 2 inputs, outputs 1 array of type: $array = [];
 *Precondition:
 * @required (connection != False && table exists in database)
 */
function getFullTable($conn, $tableName){
    $toReturn = [];
    $query = "SELECT * FROM $tableName;";
    $result = mysqli_query($conn, $query); // do the query, store in result
    while($row = mysqli_fetch_assoc($result)){
        array_push($toReturn,$row);
    }
    return $toReturn;
}




/*
                                                 ,  ,
                                               / \/ \
                                              (/ //_ \_
     .-._                                      \||  .  \
      \  '-._                            _,:__.-"/---\_ \
 ______/___  '.    .--------------------'~-'--.)__( , )\ \
`'--.___  _\  /    |             Here        ,'    \)|\ `\|
     /_.-' _\ \ _:,_          Be Dragons           " ||   (
   .'__ _.' \'-/,`-~`                                |/
       '. ___.> /=,|  Abandon hope all ye who enter  |
        / .-'/_ )  '---------------------------------'
        )'  ( /(/
             \\ "
              '=='

This horrible monstrosity takes a medicare monstrosity and mangles it
into a data structure that can easily be used to create a medicare feed.
It's bloated, confusing, and pretty awful by necessity(for the most part).

May the force be with you both,
Chris S.
*/
?>
