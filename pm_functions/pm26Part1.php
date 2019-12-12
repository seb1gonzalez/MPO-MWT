<?php
/*------------------- For PM 26 -----------------------*/
//Get all tables
$pm26_texas_2018 = getFullTable($conn,"texas_pm26");
$pm26_new_mex_2018 = getFullTable($conn,"new_mex_pm26");

//TEXAS
$deck_cond_TX18= getCol($pm26_texas_2018,"deck_cond_");
$superstruc_TX18= getCol($pm26_texas_2018,"superstruc");
$substruc_c_TX18= getCol($pm26_texas_2018,"substruc_c");
$pm26_texas_2018 = 0;
//New Mexico
$deck_cond_NM18= getCol($pm26_new_mex_2018,"dkrating");
$superstruc_NM18= getCol($pm26_new_mex_2018,"suprating");
$substruc_c_NM18= getCol($pm26_new_mex_2018,"subrating");
$pm26_new_mex_2018 = 0;
$lowest_rating = array();

//Change N to 999 TEEEEXAS
$texas_lowest_pm26_rating = [];
for($x = 0; $x < count($deck_cond_TX18); $x++ ){
    if ($deck_cond_TX18[$x] == "N"){
        $deck_cond_TX18[$x] = 999;
    }
    if ($superstruc_TX18[$x] == "N"){
        $superstruc_TX18[$x] = 999;
    }
    if ($substruc_c_TX18[$x] == "N"){
        $substruc_c_TX18[$x] = 999;
    }
    //if they are all equal
    if($deck_cond_TX18[$x] == $superstruc_TX18[$x] && $deck_cond_TX18[$x] == $substruc_c_TX18[$x]){
        array_push($lowest_rating, intval($deck_cond_TX18[$x]));
        array_push($texas_lowest_pm26_rating, $deck_cond_TX18[$x]);
    }
    //if a < b && a < c {a is the lowest}
    else if ($deck_cond_TX18[$x] < $superstruc_TX18[$x] && $deck_cond_TX18[$x] < $substruc_c_TX18[$x]){
        array_push($lowest_rating, intval($deck_cond_TX18[$x]));
        array_push($texas_lowest_pm26_rating, $deck_cond_TX18[$x]);
    }
    //if we reach this line, then we know that a is not the lowest. Is it b or c?
    else if($superstruc_TX18[$x] < $substruc_c_TX18[$x]){
        array_push($lowest_rating, intval($superstruc_TX18[$x]));
        array_push($texas_lowest_pm26_rating, $superstruc_TX18[$x]);
    }
    //if we reach this point it means that neither a or b are the lowest
    else{
        array_push($lowest_rating, intval($substruc_c_TX18[$x]));
        array_push($texas_lowest_pm26_rating, $substruc_c_TX18[$x]);
    }
}

//Change N to 999 New Mexico
$newMex_lowest_pm26_rating = [];
for($x = 0; $x < count($deck_cond_NM18); $x++ ){
    if ($deck_cond_NM18[$x] == "N"){
        $deck_cond_NM18[$x] = 999;
    }
    if ($superstruc_NM18[$x] == "N"){
        $superstruc_NM18[$x] = 999;
    }
    if ($substruc_c_NM18[$x] == "N"){
        $substruc_c_NM18[$x] = 999;
    }
    //if they are all equal
    if($deck_cond_NM18[$x] == $superstruc_NM18[$x] && $deck_cond_NM18[$x] == $substruc_c_NM18[$x]){
        array_push($lowest_rating, intval($deck_cond_NM18[$x]));
        array_push($newMex_lowest_pm26_rating, $deck_cond_NM18[$x]);
    }
    //if a < b && a < c {a is the lowest}
    else if ($deck_cond_NM18[$x] < $superstruc_NM18[$x] && $deck_cond_NM18[$x] < $substruc_c_NM18[$x]){
        array_push($lowest_rating, intval($deck_cond_NM18[$x]));
        array_push($newMex_lowest_pm26_rating, $deck_cond_NM18[$x]);
    }
    //if we reach this line, then we know that a is not the lowest. Is it b or c?
    else if($superstruc_NM18[$x] < $substruc_c_NM18[$x]){
        array_push($lowest_rating, intval($superstruc_NM18[$x]));
        array_push($newMex_lowest_pm26_rating, $superstruc_NM18[$x]);
    }
    //if we reach this point it means that neither a or b are the lowest
    else {
        array_push($lowest_rating, intval($substruc_c_NM18[$x]));
        array_push($newMex_lowest_pm26_rating, $substruc_c_NM18[$x]);
    }
}

//Now we have two arrays without the N values
//next step: merge TX and NM because MPO boundary is (TX + NM)
// $mpo_pm26_2018 = array_merge(
//     $texas_lowest_pm26_rating,
//     $newMex_lowest_pm26_rating
// );
// next step -> filter results by good[7 - 9], fair[5,6], poor[0 - 4] conditions and 'no_data'

$pm26_tx_good_count = 0;
$pm26_tx_fair_count = 0;
$pm26_tx_poor_count = 0;
$pm26_tx_no_data_count = 0;

$pm26_nm_good_count = 0;
$pm26_nm_fair_count = 0;
$pm26_nm_poor_count = 0;
$pm26_nm_no_data_count = 0;

for($x = 0; $x < count($texas_lowest_pm26_rating); $x++ ) {
    if($texas_lowest_pm26_rating[$x] >= 7 && $texas_lowest_pm26_rating[$x] <= 9 ){
        $pm26_tx_good_count++;
    }
    else if($texas_lowest_pm26_rating[$x] >= 5 && $texas_lowest_pm26_rating[$x] <= 6 ){
        $pm26_tx_fair_count++;
    }
    else if($texas_lowest_pm26_rating[$x] >= 0 && $texas_lowest_pm26_rating[$x] <= 4 ){
        $pm26_tx_poor_count++;
    }
    else if($texas_lowest_pm26_rating[$x] == 999){
        $pm26_tx_no_data_count++;
    }
}

for($x = 0; $x < count($newMex_lowest_pm26_rating); $x++ ) {
    if($newMex_lowest_pm26_rating[$x] >= 7 && $newMex_lowest_pm26_rating[$x] <= 9 ){
        $pm26_nm_good_count++;
    }
   else if($newMex_lowest_pm26_rating[$x] >= 5 && $newMex_lowest_pm26_rating[$x] <= 6 ){
        $pm26_nm_fair_count++;
    }
    else if($newMex_lowest_pm26_rating[$x] >= 0 && $newMex_lowest_pm26_rating[$x] <= 4 ){
        $pm26_nm_poor_count++;
    }
   else if($newMex_lowest_pm26_rating[$x] == 999){
        $pm26_nm_no_data_count++;
    }
}

$PM26_TX_GOOD_FAIR_BAD_totals = array(
    array(
        'Good_total_2018'=>$pm26_tx_good_count,
        'Fair_total_2018'=>$pm26_tx_fair_count,
        'Poor_total_2018'=>$pm26_tx_poor_count,
        'No_data_total_2018'=>$pm26_tx_no_data_count
    )
);

$PM26_NM_GOOD_FAIR_BAD_totals = array(
    array(
        'Good_total_2018'=>$pm26_nm_good_count,
        'Fair_total_2018'=>$pm26_nm_fair_count,
        'Poor_total_2018'=>$pm26_nm_poor_count,
        'No_data_total_2018'=>$pm26_nm_no_data_count
    )
);

addCalculationName("PM26_Tx_Good_Fair_Bad_2018");
addCalculationArray($PM26_TX_GOOD_FAIR_BAD_totals);

addCalculationName("PM26_NM_Good_Fair_Bad_2018");
addCalculationArray($PM26_NM_GOOD_FAIR_BAD_totals);

/* Uncomment if you want seperate JSON ratings for Tx and NM */
// addCalculationName("PM26_Tx_Lowest_Rating");
// addCalculationArray($texas_lowest_pm26_rating);

// addCalculationName("PM26_NM_Lowest_Rating");
// addCalculationArray($newMex_lowest_pm26_rating);

addCalculationName("PM26_Lowest_Value_2018");
addCalculationArray($lowest_rating);

?>