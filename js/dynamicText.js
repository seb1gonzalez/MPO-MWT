/*
This method is similar to buttonswitch. This is call when the user changes corridors,
as the corridor changes the text inside changes.
*/

function dynamicCorridorText(currentCorridor, data) {
    removeAllElementsLegend();
	 console.log("Current PM");
    console.log(currentPM);
    console.log("graph values for corridors");
    console.log(data);
    console.log("Current corridor");
    console.log(currentCorridor);


    try {
        turnOffSpinner();
        removeAllElementsBar(); 
      
        if (currentPM == 18) {
            pm18DynamicText(currentCorridor, data);
        } else if (currentPM == 19) {
            pm19DynamicText(currentCorridor, data);
        } else if (currentPM == 20) {
            console.log("about to send");
            pm20DynamicText(currentCorridor, data);
        } else if (currentPM == 25) {
            pm25DynamicText(currentCorridor, data);
        } else if (currentPM == 26) {
            pm26DynamicText(currentCorridor, data);
        } else if (currentPM == 11) {
            pm11DynamicText(currentCorridor, data);
        } else if (currentPM == 2) {
            pm2DynamicText(currentCorridor);
        } else if (currentPM == 3) {
            pm3DynamicText(currentCorridor, data);
        } else if (currentPM == 4) {
            pm4DynamicText(currentCorridor, data);
        } else if (currentPM == 5) {
            //pm4BDynamicText(currentCorridor);
        } else if (currentPM == 12) {
            pm12DynamicText(currentCorridor, data);
        } else if (currentPM == 1) {
            pm1DynamicText(currentCorridor, data);
        }
    } catch (err) {
        console.log("Skip a turn");
    }

}
/*
function pm2DynamicText(currentCorridor) {
    // No Clean() call needed
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');

    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    pm2chart2(ctx2);

    if (currentType == 'transit') {
        pm2chart1(ctx, count_list);
        headerAdder("Percent of Workers Commuting by Transit", "title");
    } else if (currentType == 'walking') {
        pm2chart1(ctx, count_list);
        headerAdder("Percent of Workers Commuting by Walking", "title");
    } else {
        pm2chart1(ctx, count_list);
        headerAdder("Percent of Workers Commuting by Biking", "title");
    }

        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("During 2012-2016 __% of workers living within the " + wordFix(corridor)+" corridor reported to walk ", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2012-2016 5-year average estimates", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        anchorAdder("American Community Survey 5-Year Estimates", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
        anchorAdder("TIGER/Line Shapefiles", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2017.html");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        imageAdder('./img/performance_measures/pm2/transEqn.PNG', 'calc-title');
        imageAdder('./img/performance_measures/pm2/walkEqn.PNG', 'calc-title');
        imageAdder('./img/performance_measures/pm2/bikingEqn.PNG', 'calc-title');

        //Legend elements
        let names = ['No Data', 'Below mean', 'Above Mean'];
        let colors = ['background:#C0C0C0;', 'background:#00CCFF;', 'background:#0066CC;'];

        legendMaker("Legend", names, colors);
        openNav();

        no_data_num = 0;
        low_num = 0;
        high_num = 0;
        count_list[0] = 0; count_list[1] = 0; count_list[2] = 0;


}
*/

function pm1DynamicText(corridor, data) {
	canvasMaker('chart1', 'myChart');
    var ctx2pm1 = document.getElementById('myChart').getContext('2d');
    pieChartpm1(ctx2pm1,data);
    headerAdder("Percent of non-single occupancy vehicle (SOV) commute", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder(data.SOV.toFixed(2) + "% of workers living within the " + wordFix(corridor) + "  corridor reported to drive alone during their commute to work,"
        + "therefore only " + data.NonSOV.toFixed(2) + "% of workers commute via non-SOV modes, which includes carpooled via car, truck, or van. Workers"
        + "used Public Transport means such as bus or trolley bus, streetcar or trolley car, subway or elevated railroad, railroad,"
        + " and ferryboat. Some workers also used a taxicab, motorcycle, bicycle, walking, and other means to go to work or they worked"
        + " at home.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2012-2016 5-year average estimates", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("American Community Survey 5-Year Estimates", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2017.html");
    anchorAdder("TIGER/Line Shapefiles and TIGER/Line Files ", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("PM1 is calculated as:", "paragraph", "calc-info");
    imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG', 'calc-info');
    openNav();
}
function pm3DynamicText(corridor, data) {
    console.log("earth");
    console.log(data.highRoute);
    console.log(corridor);
    headerAdder("Transit ridership", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Within " + wordFix(corridor) + " corridor. The route " + data.highRoute + " has the highest ridership with an average of " + commafy(data.highAvg) + " passengers. The route " + data.lowRoute + " has the lowest ridership with an average of " + commafy(data.lowAvg) + "  (5 years average).", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Data provided by Sun Metro", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The received data was separated by years and routes. The average of the 5 years was calculated to create the symbology; 2,777-107,272 (Green), 107,272-388,321 (Orange), 388,321-1,144,232 (Red). Since Sun Metro stopped using route 204 in 2014 data was not included. Route 205 from BRIO was included in the map. ", "paragraph", "calc-info");
    openNav();
    names = ['2,777 - 107,272', '107,273 - 388,321', '388,321 - 1,144,232'];
    colors = ['background:#8BC34A;', 'background:#FFCA28;', 'background:#f44336', 'background:#e53935;'];
    legendMaker("Passengers", names, colors);
}
function pm4DynamicText(corridor, data) {
    let names = "";
    if (currentType == 'biking') {
        headerAdder("Number of Biking Trips Recorded by Strava", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        if(corridor == "AOI"){
            paragraphAdder("In 2018, a total of " + commafy(data) + " bike trips were recorded by Strava in the AOI. ", "paragraph", "summary-info");

        }
        else {
            paragraphAdder("In 2018, a total of " + commafy(data) + " bike trips were recorded by Strava in the " + wordFix(corridor) + " corridor.", "paragraph", "summary-info");

        }
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2018 data licensed by Strava", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Strava Metro data provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measure reflects the total number of bike trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2018. Trips recorded on Interstate 10 were removed from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
        names = ['5 - 30', '30 - 479', '479 - 6,460'];


    } else if (currentType == 'walking') {
        headerAdder("Number of Walking Trips Recorded by Strava", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("In 2017, a total of " + commafy(data) + " walk trips were recorded by Strava in the " + wordFix(corridor) + " corridor.", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2017 data from Strava Metro.", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Strava Metro (2017) provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measure reflects the total number of walk trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2017. Trips recorded on the Interstate 10 were removes from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
        names = ['5 - 15', '16 - 129', '130 -1,305'];
    }

    let colors = ['background:#f44336;', 'background:#64DD17;', 'background:#9C27B0', 'background:#e53935;'];
    legendMaker("Trips", names, colors);

}
function pm5DynamicText(corridor) {
    headerAdder("Percent of jobs within ½ mile of high-quality rapid transit ", "title");
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm5chart(ctx);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("In the " + wordFix(corridor) + " corridor, there are a total of __ jobs. In a half-mile of high-quality rapid transit ", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2015 LEHD files, 2017 Tigerline shapefile, bikeway data from 2018. ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("TIGER/Line Shapefiles & Longitudinal Employer-Household Dynamics (LEHD) files.", "paragraph", "data-info");
    paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro.  ", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("LEHD workplace area characteristics (WAC) data was analysed on a census block group-level in order to estimate the population within ½ mile of high-quality rapid transit, assuming a homogenous distribution of population each the block group.", "paragraph", "calc-info");
}

function pm11DynamicText(corridor,data) {
    headerAdder("Length of Sidewalks per Mile", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    if(corridor == "AOI"){
        paragraphAdder("There are 3,012 miles of sidewalks along " + data.pm11Slength.toFixed(2)+"miles of roadways within the AOI", "paragraph", "summary-info");
    }
    else{    paragraphAdder("There are 3,012 miles of sidewalks along " + data.pm11Slength.toFixed(2)+"miles of roadways within the " + wordFix(corridor) + " corridor.", "paragraph", "summary-info");
}
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Sidewalk GIS layer was provided in 2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("City of El Paso", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Mileage of roadway network (stcent, without limited access roadways such as the Interstate 10, US 54, Loop 375, Cesar Chavez Memorial Highway, Spur 601) was compared with mileage of sidewalks. Only sidewalks with status ‘complete’, ‘pre-existing’, ‘private’ or ‘scheduled’ were included in the analysis. Sidewalks with no information about status, or status ‘removed’, ‘unfeasible’, or ‘awaiting assessment’ were not included in this performance measure. ", "paragraph", "calc-info");
    paragraphAdder("Note: A GIS sidewalk layer was at the time of analysis available only from the City of El Paso. GIS data from other municipalities will be added as it becomes available.", "paragraph", "calc-info");
}
function pm12DynamicText(corridor,data) {
    headerAdder("Bikeway Buildout", "title");
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm12StackedChart(ctx,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    if(corridor == "AOI"){
        paragraphAdder("In the AOI corridor, there are a total of  " + data.pm12existing.toFixed(2) + " miles of existing bikeways. There are " + data.pm12proposed.toFixed(2) + " miles of proposed bikeways. If all proposed bikeways are completed, there would be a total of  " + data.tot.toFixed(2) + " miles in the AOI.", "paragraph", "summary-info");
   
    }
    else{   paragraphAdder("In the " + wordFix(corridor) + " corridor, there are a total of " + data.pm12existing.toFixed(2) + " miles of existing bikeways. There are " + data.pm12proposed.toFixed(2) + " miles of proposed bikeways. If all proposed bikeways are completed, there would be a total of  " + data.tot.toFixed(2) + " miles in the " + wordFix(corridor) + " corridor.", "paragraph", "summary-info");
}   
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018 bikeway data provided.", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario and the City of El Paso. ", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The data inside the layer package had contained columns that have its status, proposed or existing, which were filtered to make a distinction between the two. The files containing existing bikeways were placed into a new, individual layer. The miles were then calculated for both existing and all bikeways.", "paragraph", "calc-info");
}
function pm18DynamicText(corridor,data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');

    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
	
   ////http://ctis.utep.edu/MPO_Projects/merger/index-dev-b.php#pms-modal
    pm18StackedChart(ctx2,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    
    if (currentType == 'driving') {

        headerAdder("Number of Fatalities - Driving", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCountD) + " crashes occurred in the " + wordFix(corridor) + " corridor and " + data.dtextPercent.toFixed(2) + "% of those crashes resulted in fatalities. " + data.dtot18 + " people were killed.", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }
    else if (currentType == 'freight') {

        headerAdder("Number of Fatalities - Freight", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCountF) + " crashes that involved a commercial motor vehicle (CMV) occurred in the " + wordFix(corridor) + " corridor and " + data.dtextPercent.toFixed(2) + "% of those crashes resulted in fatalities. " + data.ftot18 +" people were killed in CMV-related crashes. ", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }
    else if (currentType == 'walking') {

        headerAdder("Number of Fatalities - Walking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCountW) + " crashes that involved a pedestrian occurred in the " + wordFix(corridor) + " corridor and " + data.dtextPercent.toFixed(2) + "% of those crashes resulted in fatalities. " + data.wtot18 + " pedestrians were killed.", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }
    else if (currentType == 'biking') {

        headerAdder("Number of Fatalities - Biking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCountB) + " crashes that involved a bicyclist occurred in the " + wordFix(corridor) + " corridor and " + data.dtextPercent.toFixed(2) + "% of those crashes resulted in fatalities. " + data.btot18 + " bicyclists were killed.", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }

    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2013 – 2017", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The total number of crashes includes crashes of all severities: fatal, suspected serious injury, non-incapacitating injury, possible injury, and non-injury*. ", "paragraph", "calc-info");
    paragraphAdder("*Note: Crash severities classified by TxDOT as ‘non-injury’ or ‘unknown injury’ are here shown as ‘non-injury’. Crash severity classified by NMDOT as ‘unhurt’ is shown here as ‘non-injury’. ", "paragraph", "calc-info");
    openNav();
}
function pm19DynamicText(corridor, data) {
    //clean();

    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');

    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    pm19StackedChart(ctx2, data);

    if (currentType == "driving") {
        headerAdder("Number serious injuries - Driving", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + data.crashCountD + " crashes occurred in the " + wordFix(corridor) + " corridor and " + data.dtextpercent.toFixed(2) + "% of those crashes resulted in serious injuries. " + data.dtextinjured + " people were seriously injured.", "paragraph", "summary-info");
  
    }
    else if (currentType == "freight") {
        headerAdder("Number serious injuries - Freight", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + data.crashCountF + " crashes occurred in the " + wordFix(corridor) + " corridor and " + data.dtextpercent.toFixed(2) + "% of those crashes resulted in serious injuries. " + data.dtextinjured + " people were seriously injured.", "paragraph", "summary-info");
  
    }
    else if (currentType == "walking") {
        headerAdder("Number serious injuries - Walking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + data.crashCountW + " crashes occurred in the " + wordFix(corridor) + " corridor and " + data.dtextpercent.toFixed(2) + "% of those crashes resulted in serious injuries. " + data.dtextinjured + " people were seriously injured.", "paragraph", "summary-info");
  
    }
    else if (currentType == "biking") {
        headerAdder("Number serious injuries - Biking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + data.crashCountB + " crashes occurred in the " + wordFix(corridor) + " corridor and " + data.dtextpercent.toFixed(2) + "% of those crashes resulted in serious injuries. " + data.dtextinjured + " people were seriously injured.", "paragraph", "summary-info");
  
    }

    pm19chartLine(ctx, data);

    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2013 – 2017", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The total number of crashes includes crashes of all severities: fatal, suspected serious injury, non-incapacitating injury, possible injury, and non-injury*.", "paragraph", "calc-info");
    paragraphAdder("*Note: Crash severities classified by TxDOT as ‘non-injury’ or ‘unknown injury’ are here shown as ‘non-injury’. Crash severity classified by NMDOT as ‘unhurt’ is shown here as ‘non-injury’. ", "paragraph", "calc-info");
    openNav();
}
function pm20DynamicText(corridor, data) {
    console.log("inside 20 dyNAMIC");
    headerAdder("Number of crashes between motorized vehicles and pedestrians/bicyclists nearby bus stops.", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("62.69% of all pedestrian crashes and 48.80% of all bicycle crashes " + wordFix(corridor) + " corridor occurred within 200 feet of transit stops. Majority of the crashes near bus stops occurred in downtown area, Mesa St.Dyer St.and Hondo Pass. The highest observed number of crashes within 200 ft.from a bus stop is " + data.w_greatest + " for pedestrian (on " + data.w_address + " " + data.w_on_st + ") and " + data.b_greatest + " for bicycle(" + data.b_greatestCounter + " locations have the same number).", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Crashes 2013-2017, SunMetro bus stops as of 2019", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data from TxDOT, location of bus stops from Sun Metro ", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("A buffer of 200 ft. was created from the bus stops to identify how many crashes occurred within that distance.The crashes are from 2013 to 2017, and the bus stop locations are as of 2019. ", "paragraph", "calc-info");
    openNav();
}
function pm25DynamicText(corridor, data) {
    headerAdder("Percentage of pavements in poor condition Corridor", "title");
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm25StackedChart(ctx,data);
    pm25chartLine(ctx2,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    if(corridor == "AOI"){
        paragraphAdder("HPMS reports 2017 pavement condition for " + data.tot_miles + " miles within the AOI, out of that " + data.poor_mi_perc + "% is in poor condition. ", "paragraph", "summary-info");

    }
    else{
	paragraphAdder("HPMS reports 2017 pavement condition for " + data.tot_miles + " miles within the " + wordFix(corridor) + " corridor, out of that " + data.poor_mi_perc + "% is in poor condition. ", "paragraph", "summary-info");
    }
    
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2013-2017", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("Highway Performance Monitoring System (HPMS) Public Release of Geospatial Data in Shapefile Format", "https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm");
    anchorAdder("https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm ","https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Pavement condition was based on International Roughness Index (IRI) as defined by:", "paragraph", "calc-info");
    anchorAdder("Federal Highway Administration", "https://www.fhwa.dot.gov/policy/2013cpr/chap3.cfm#1");
    paragraphAdder("Good condition (IRI < 95), fair condition (IRI 95-170), and poor condition (IRI > 170). In this analysis, any sections with IRI = 0 are considered as entries with no data. ", "paragraph", "calc-info");
    openNav();
    //legend elements
    names = ['Good Condition', 'Fair Condition', 'Poor Condition'];
    colors = ['background:#8BC34A;', 'background:#F57C00;', 'background:#d50000'];
    legendMaker("Legend", names, colors);
}
function pm26DynamicText(corridor, data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');

    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    chart_pm26(ctx, data);
    chart_pm26_2(ctx2, data);

    headerAdder("Bridge & Culvert Condition", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    if(corridor == "AOI"){
        paragraphAdder("Out of " + data.dynamicTot + " bridges in the AOI, (" + data.dynamicPoor + " %) are in poor condition. ", "paragraph", "summary-info");
        paragraphAdder("Condition data was not available for " + data.tnodatabridges + " bridges within  the AOI.", "paragraph", "summary-info");

    }
    else{    paragraphAdder("Out of " + data.dynamicTot + " bridges in the " + wordFix(corridor) + " corridor, (" + data.dynamicPoor + " %) are in poor condition. ", "paragraph", "summary-info");
    paragraphAdder("Condition data was not available for " + data.tnodatabridges + " bridges within " + wordFix(corridor) + " corridor.", "paragraph", "summary-info");

}
    //  paragraphAdder("Within the Texas portion of the El Paso MPO area, there are " + data.tx_good_count + " bridges(" + data.goodTX + "%) in Good condition, " + data.tx_fair_count + " bridges(" + data.fairTX + "%) in Fair condition, " + data.tx_poor_count + " bridges(" + data.poorTX + "%) in Poor condition.", "paragraph", "summary-info");
    //  paragraphAdder("Within the New Mexico portion of the El Paso MPO area, there are " + data.nm_good_count + " bridges(" + data.goodNM + "%) in Good conditions, " + data.nm_fair_count + " bridges(" + data.fairNM + "%) in Fair condition, " + data.nm_poor_count + " bridge(" + data.poorNM + "%) in Poor condition.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Bridges condition data as of 2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Bridge condition data was provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Bridge condition rating is based on the lowest condition rating from the following components: deck, substructure, superstructure or culvert.", "paragraph", "calc-info");
    paragraphAdder("Following the FHWA guidance, bridges with lowest rating between 7 and 9 are classified as Good, those rated 6 or 5 are classified as Fair and bridges with lowest rating 4 or below are classified as Poor.", "paragraph", "calc-info");
    paragraphAdder("More information about Bridge Condition Performance can be found at this FHWA website: ", "paragraph", "calc-info");
    anchorAdder(1, "https://www.fhwa.dot.gov/bridge/britab.cfm");
    openNav();
}

