/*
 * Determines: The current Type & current PM. 
 * After determining that info-> call current performance 
 * This class is used immediately after a user clicks on a PM button regarning LINES
 * This class helps guide program after the index is clicked OR if regional corridor is clicked
 */

function lineHandler(found) {
    clean();
    displaySpinner();
    if (found == "PM3") {
        currentType = "transit";
        currentPM = 3;
        active_pm_for_AOI = 'all_pm3';
        pm3Data(1, '');

    } else if (found == "pm4Walking" || found == "0pm4W") {
        currentType = "walking";
        currentPM = 4;
        active_pm_for_AOI = 'all_pm4W';
        if (found == "0pm4W") {
            pm4Data(0, '');
        }
        else {
            pm4Data(1, '');
         }
    } else if (found == "pm4Biking" || found == "0pm4B") {
        currentType = "biking";
        currentPM = 4;
        active_pm_for_AOI = 'all_pm4B';

            if (found == "0pm4B"){
                 pm4Data(0, '');
                }
            else {
                pm4Data(1, '');
            }
    } else if (found == "pm11Walking") {
        currentType = "walking";
        currentPM = 11;
        active_pm_for_AOI = 'all_pm11';
        pm11Data(1, '');

    } else if (found == "pm12Biking") {
        //console.log('12 is handled');
        currentType = "biking";
        currentPM = 12;
        active_pm_for_AOI = 'all_pm12';
        pm12Data(1, '');

    } else if (found == "PM25") {
        //console.log('mier');
        currentType = "driving";
        currentPM = 25;
        active_pm_for_AOI = 'all_pm25';
        pm25Data(1, '');
    }
  
}