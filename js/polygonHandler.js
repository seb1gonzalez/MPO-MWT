function polygonHandler(found) {
    clean();
    displaySpinner();

    if (found == "PM1") {
        currentType = "driving";
        currentPM = 1;
        pm1Data(1, '');
    }
    else if (found == "PM5") {
        currentType = "transit";
        currentPM = 5;
        pm5Data(1, '');
    } else if (found == "PM6") {
        currentType = "biking";
        currentPM = 6;
        pm6Data(1, '');
    } else if (found == "PM7") {
        currentType = "transit";
        currentPM = 7;
        pm7Data(1, '');
    }
    else if (found == "PM8") {
        console.log('2019');
        currentType = "biking";
        currentPM = 8;
        pm8Data(1, '');
    }else if (found == "PM9") {
        currentType = "transit";
        currentPM = 9;
        pm9Data(1, '');
    } else if (found == "PM10") {
        currentType = "transit";
        currentPM = 10;
        pm10Data(1, '');
    }
    else if (found == "pm4Walking" || found == "0pm4W") {
        currentType = "walking";
        currentPM = 4;
        if (found == "0pm4W") pm4Data(0, '');
        else pm4Data(1, '');
    } 

}