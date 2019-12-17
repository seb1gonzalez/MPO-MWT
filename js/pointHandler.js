/*
 * This class aids in determining 2 things: The current Type & current PM. 
 * After Finding that info-> call the PM class
 * Those 2 things are used for other methods, this class CRUCIAL 
 * This class is used immediately after a user clicks on a PM button regarding POINTS on regional only
 * 
 */

function pointHandler(found) {
    clean(); 
    displaySpinner();

    if (found == "pm15Driving") {
        currentType = "driving";
        currentPM = 15;
        active_pm_for_AOI = "all_pm15_16_17";
        pm15Data(1);
    } else if (found == "pm16Driving") {
        currentType = "driving";
        currentPM = 16;
        active_pm_for_AOI = "all_pm15_16_17";
        pm16Data(1);
    }
    else if (found == "pm17Driving") {
        currentType = "driving";
        currentPM = 17;
        active_pm_for_AOI = "all_pm15_16_17";
        pm17Data(1);
    }
    else if (found == "pm18Driving") {
        currentType = "driving";
        currentPM = 18;
        active_pm_for_AOI = "all_pm18_19";
        pm18Data(1, "a");
       
    }
    else if (found == "pm18Freight") {
        currentType = "freight";
        currentPM = 18;
        active_pm_for_AOI = "all_pm18_19";
        pm18Data(1, "a");
    }
    else if (found == "pm18Walking") {
        currentType = "walking";
        currentPM = 18;
        active_pm_for_AOI = "all_pm18_19";
        pm18Data(1, "a");
    }
    else if (found == "pm18Biking") {
        currentType = "biking";
        currentPM = 18;
        active_pm_for_AOI = "all_pm18_19";
        pm18Data(1, "a");
    }
    else if (found == "pm19Driving") {
        currentPM = 19;
        active_pm_for_AOI = "all_pm18_19";
        currentType = "driving";
        pm19Data(1, "");
    }
    else if (found == "pm19Freight") {
        currentPM = 19;
        active_pm_for_AOI = "all_pm18_19";
        currentType = "freight";
        pm19Data(1, "a");
    }
    else if (found == "pm19Walking") {
        currentPM = 19;
        active_pm_for_AOI = "all_pm18_19";
        currentType = "walking";
        pm19Data(1, "a");
    }
    else if (found == "pm19Biking") {
        currentPM = 19;
        active_pm_for_AOI = "all_pm18_19";
        currentType = "biking";
        pm19Data(1, "a");
    }
    else if (found == "PM20W") {
        currentPM = 20;
        //active_pm_for_AOI = "all_pm18_19";
        currentType = "walking";
        pm20Data(1, "a");
    }
    else if (found == "PM20B") {
        currentPM = 20;
        //active_pm_for_AOI = "all_pm18_19";
        currentType = "biking";
        pm20Data(1, "a");
    }
    else if (found == "pm26") {
        currentPM = 26;
        active_pm_for_AOI = "all_pm26";
        currentType = "driving";
        pm26Data(1, "a");
    }
}