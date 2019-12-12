/**
 * Handles Regional Text, Handles Spinner
 * Receives Data from PM then creates text and graphs from that Data
 */

function regionalText(data) {
    resetViewsBeforeSpinner(); 
    console.log(data);

    if (currentPM == 1) {
        pm1R(data);
    }
    else if (currentPM == 3) {
        pm3R(data);
    }
    else if (currentPM == 4) {
        pm4R(data);
    }
    else if (currentPM == 5) {
        pm5R(data);
    }
    else if (currentPM == 6) {
        pm6R(data);
    }
    else if (currentPM == 7) {
   
    }
    else if (currentPM == 8) {
        pm8R(data);
    }
    else if (currentPM == 9) {
        pm9R(data);
    }
    else if (currentPM == 10) {
        pm10R(data);
    }
    else if (currentPM == 11) {
        pm11R(data);
    }
    else if (currentPM == 12) {
        pm12R(data);
    }
    else if (currentPM == 15) {
        pm15R(data);
    }
    else if (currentPM == 16) {
        pm16R(data);
    }
    else if (currentPM == 17) {
        pm17R(data);
    }
    else if (currentPM == 18) {
        pm18R(data);
    }
    else if (currentPM == 19) {
        pm19R(data);
    }
    else if (currentPM == 25) {
       pm25R(data);
    }
    else if (currentPM == 26) {
        pm26R(data);
    }
}
function pm1R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx2pm1 = document.getElementById('myChart').getContext('2d');
    pieChartpm1(ctx2pm1);
    headerAdder("Percent of non-single occupancy vehicle (SOV) commute", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("% of workers living in the El Paso MPO area reported to drive alone during their commute to work,"
        + "therefore only " +  "% of workers commute via non-SOV modes, which includes carpooled via car, truck, or van. Workers"
        + "used Public Transport means such as bus or trolley bus, streetcar or trolley car, subway or elevated railroad, railroad,"
        + " and ferryboat. Some workers also used a taxicab, motorcycle, bicycle, walking, and other means to go to work or they worked"
        + " at home. �", "paragraph", "summary-info");
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
function pm18R(data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');

    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    pm18StackedChart(ctx2,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");

    if (currentType == 'driving') {
        headerAdder("Number of Fatalities - Driving", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.GEN_) + " crashes occurred in the El Paso MPO region and " + dtextPercent.toFixed(2) + "% of those crashes resulted in fatalities. " + data.dtot18 + " people were killed.", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }
    else if (currentType == 'freight') {
        headerAdder("Number of Fatalities - Freight", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.GEN_) + " crashes that involved a commercial motor vehicle (CMV) occurred in the El Paso MPO region and " + dtextPercent.toFixed(2) + "% of those crashes resulted in fatalities. " + data.ftot18 + " people were killed in CMV-related crashes. ", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }
    else if (currentType == 'walking') {
        headerAdder("Number of Fatalities - Walking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.GEN_) + " crashes that involved a pedestrian occurred in the El Paso MPO region and " + dtextPercent.toFixed(2) + "% of those crashes resulted in fatalities. " + data.wtot18 + " pedestrians were killed.", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }
    else if (currentType == 'biking') {
        headerAdder("Number of Fatalities - Biking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.GEN_) + " crashes that involved a bicyclist occurred in the El Paso MPO region and " + dtextPercent.toFixed(2) + " of those crashes resulted in fatalities. " + data.btot18 + " bicyclists were killed.", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }

    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2013 - 2017", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The total number of crashes includes crashes of all severities: fatal, suspected serious injury, non-incapacitating injury, possible injury, and non-injury*. ", "paragraph", "calc-info");
    paragraphAdder("*Note: Crash severities classified by TxDOT as 'non-injury' or 'unknown injury' are here shown as 'non-injury'. Crash severity classified by NMDOT as 'unhurt' is shown here as 'non-injury'. ", "paragraph", "calc-info");


    openNav();
}
function pm19R(data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    pm19StackedChart(ctx2,data);

    if (currentType == 'driving') {
        headerAdder("Number serious injuries - Driving", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.GEN_) + " crashes occurred in the El Paso MPO region and " + data.dtextpercent.toFixed(2) + "% of those crashes resulted in serious injuries. " + data.dtextinjured + " people were seriously injured.", "paragraph", "summary-info");
    }
    else if (currentType == 'freight') {
        headerAdder("Number serious injuries - Freight", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.GEN_) + " crashes that involved a commercial vehicle occurred in the El Paso MPO region and " + data.dtextpercent.toFixed(2) + "% of those crashes resulted in serious injuries. " + data.dtextinjured + " people were seriously injured in commercial vehicle-related crashes.", "paragraph", "summary-info");
    }
    else if (currentType == 'walking') {
        headerAdder("Number serious injuries - Walking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.GEN_) + " crashes that involved a pedestrian occurred in the El Paso MPO region and " + data.dtextpercent.toFixed(2) + "% of those crashes resulted in serious injuries. " + data.dtextinjured + " pedestrians were seriously injured.", "paragraph", "summary-info");
    }
    else if (currentType == 'biking') {
        headerAdder("Number serious injuries - Biking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.GEN_) + " crashes that involved a bicyclist occurred in the El Paso MPO region and " + data.dtextpercent.toFixed(2) + "% of those crashes resulted in serious injuries. " + data.dtextinjured + " bicyclits were seriously injured.", "paragraph", "summary-info");
    }

    pm19chartLine(ctx, data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2013 - 2017", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The total number of crashes includes crashes of all severities: fatal, suspected serious injury, non-incapacitating injury, possible injury, and non-injury*.", "paragraph", "calc-info");
    paragraphAdder("*Note: Crash severities classified by TxDOT as 'non-injury' or 'unknown injury' are here shown as 'non-injury'. Crash severity classified by NMDOT as 'unhurt' is shown here as 'non-injury'. ", "paragraph", "calc-info");
    openNav();
}
function pm25R(data) {
    headerAdder("Percentage of pavements in poor condition", "title");
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm25StackedChart(ctx,data);
    pm25chartLine(ctx2,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("HPMS reports 2017 pavement condition for 432.69 miles within the El Paso MPO area, out of that 21.47% is in poor condition. 78.45 miles (21.65%) of pavement in poor condition are located in Texas and 14.43 miles (20.52%) are in New Mexico. In 2017, 35.64 miles (12.55%) of freight network has pavements in poor condition and 70.78 miles (32.08%) of transit network has pavements in poor condition.", "paragraph", "summary-info");
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
function pm3R(data) {

    headerAdder("Transit ridership", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("The routes with most ridership in the city are mainly the ones that go from the far places (Eastside, North and Westside) to downtown. The route " + commafy(data.highRoute) + " has the highest ridership with an average of " + commafy(data.highAvg) + ". The route " + data.lowRoute + " has the lowest ridership with an average of " + commafy(data.lowAvg) + ".", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Data provided by Sun Metro", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The received data was separated by years and routes. The average of the 5 years was calculated to create the symbology; 2,777-107,272 (Green), 107,272-388,321 (Orange), 388,321-1,144,232 (Red). Since Sun Metro stopped using route 204 in 2014 data was not included. Route 205 from BRIO was included in the map. ", "paragraph", "calc-info");
    openNav();
    let names = ['2,777 - 107,272', '107,273 - 388,321', '388,321 - 1,144,232'];
    let colors = ['background:#8BC34A;', 'background:#FFCA28;', 'background:#f44336', 'background:#e53935;'];
    legendMaker("Passengers", names, colors);
}
function pm4R(data) {
    let names = "";
    if (currentType == 'biking') {
      
        headerAdder("Number of Biking Trips Recorded by Strava", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("In 2018, a total of " + commafy(data) + " bike trips were recorded by Strava in the El Paso MPO region. ", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2018 data licensed by Strava", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Strava Metro data provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measure reflects the total number of bike trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2018. Trips recorded on Interstate 10 were removed from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
        names = ['5 - 30', '30 - 479', '479 - 6,460'];
        //names = ['5.0 - 30.23', '30.24 - 479.04', '479.05 - 6,460.00'];
    }
   else if (currentType == 'walking') {
        headerAdder("Number of Walking Trips Recorded by Strava", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("In 2017, a total of " + commafy(data) + " walk trips were recorded by Strava in the El Paso MPO region. ", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2017 data from Strava Metro.", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Strava Metro (2017) provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measure reflects the total number of walk trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2017. Trips recorded on the Interstate 10 were removes from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
        names = ['5.00 - 15', '16 - 129', '130 - 1,305'];
    }
    let colors = ['background:#f44336;', 'background:#64DD17;', 'background:#9C27B0', 'background:#e53935;'];
    legendMaker("Trips", names, colors);
    openNav();
}
function pm11R(data) {
    headerAdder("Length of Sidewalks per Mile", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are a total of " + data.pm11Slength.toFixed(2)+ " miles of sidewalks along 2,692.873 miles of roadways within the City of El Paso city limits. Assuming that each roadway has a sidewalk on both sides, there are 2,373.390 miles of sidewalks missing.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Sidewalk GIS layer was provided in 2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("City of El Paso", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Mileage of roadway network (stcent, without limited access roadways such as the Interstate 10, US 54, Loop 375, Cesar Chavez Memorial Highway, Spur 601) was compared with mileage of sidewalks. Only sidewalks with status 'complete', 'pre-existing', 'private' or 'scheduled' were included in the analysis. Sidewalks with no information about status, or status 'removed', 'unfeasible', or 'awaiting assessment' were not included in this performance measure. ", "paragraph", "calc-info");
    paragraphAdder("Note: A GIS sidewalk layer was at the time of analysis available only from the City of El Paso. GIS data from other municipalities will be added as it becomes available.", "paragraph", "calc-info");
    openNav();
}
function pm12R(data) {
    headerAdder("Bikeway Buildout", "title");
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm12StackedChart(ctx,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("In the El Paso MPO region, there are a total of " + data.pm12existing.toFixed(2) + " miles of existing bikeways. There are " + data.pm12proposed.toFixed(2) + " miles of proposed bikeways. If all proposed bikeways are completed, there would be a total of " + data.tot.toFixed(2) + " miles in the El Paso MPO region.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018 bikeway data provided.", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario and the City of El Paso. ", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The data inside the layer package had contained columns that have its status, proposed or existing, which were filtered to make a distinction between the two. The files containing existing bikeways were placed into a new, individual layer. The miles were then calculated for both existing and all bikeways.", "paragraph", "calc-info");
    openNav();
}
function pm26R(data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');

    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    chart_pm26(ctx, data);
    chart_pm26_2(ctx2, data);

    headerAdder("Bridge & Culvert Condition", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Within the Texas portion of the El Paso MPO area, there are " + data.tx_good_count + " bridges(" + data.goodTX + "%) in Good condition, " + data.tx_fair_count + " bridges(" + data.fairTX + "%) in Fair condition, " + data.tx_poor_count + " bridges(" + data.poorTX + "%) in Poor condition.", "paragraph", "summary-info");
    paragraphAdder("Within the New Mexico portion of the El Paso MPO area, there are " + data.nm_good_count + " bridges(" + data.goodNM + "%) in Good conditions, " + data.nm_fair_count + " bridges(" + data.fairNM + "%) in Fair condition, " + data.nm_poor_count + " bridge(" + data.poorNM + "%) in Poor condition.", "paragraph", "summary-info");
    paragraphAdder("Condition data was not available for " + data.tnodatabridges + " bridges within the El Paso MPO area.", "paragraph", "summary-info");
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
function pm5R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm5chart(ctx,data);
    headerAdder("Percent of jobs within 1/2 mile of high-quality rapid transit", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("In the El Paso MPO region, there are a total of " + commafy(data.jobs) + " jobs. In a half-mile of high-quality rapid transit, there are a total of " + Math.round(data.ratioPrim) + "% jobs.  Once all proposed high-quality rapid transit stations are complete, there will be a total of " + data.ratioPrimTot.toFixed(2) + "% jobs within a half-mile of high-quality rapid transit.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2015 LEHD files, 2017 Tigerline shapefile, bikeway data from 2018. ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder(1, "https://www.fhwa.dot.gov/bridge/britab.cfm");
    paragraphAdder("TIGER/Line Shapefiles & Longitudinal Employer-Household Dynamics (LEHD) files.", "paragraph", "data-info");
    paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro.  ", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("LEHD worskplace area characteristics (WAC) data was analysed on a census block group-level in order to estimate the population within 1/2 mile of high-quality rapid transit, assuming a homogenous distribution of population each the block group.", "paragraph", "calc-info");
    //adds toggle function
    togglevisible();
    openNav();
}
function pm9R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm9chart(ctx,data);
    headerAdder("Population within 1/2 mile of high-quality rapid transit.", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are " + commafy(data.Ex_pop) + " people residing in the El Paso MPO region. There are " + data.peopleLivingTransit.toFixed(2) + "% people living within a half-mile of high-quality rapid transit.  Once all proposed high-quality rapid transit stations are complete, there will be a total of " + commafy(data.totPop) + " people living within a high-quality rapid transit.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2015 LEHD files, 2012-2016 ACS data, bikeway data from 2018.", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("American Community Survey 5-Year Estimates & TIGER/Line Shapefiles ", "paragraph", "data-info");
    paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro.  ", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("American Community Survey data was analysed on a census block group-level in order to estimate the population within 1/2 mile of high-quality rapid transit, assuming a homogenous distribution of population each the block group.", "paragraph", "calc-info");
    togglevisible();
    openNav();
}
function pm6R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm6chart(ctx, data);
    headerAdder("Population within 1/2 mile of high-quality rapid transit.", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are " + commafy(data.totalJobs) + " people residing in the El Paso MPO region. There are " + data.percentLiving.toFixed(2) + "% people living within a half-mile of high-quality rapid transit.  Once all proposed high-quality rapid transit stations are complete, there will be a total of " + data.percentJobs.toFixed(2)  + " % people living within a high-quality rapid transit.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2015 LEHD files, 2012-2016 ACS data, bikeway data from 2018.", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("American Community Survey 5-Year Estimates & TIGER/Line Shapefiles ", "paragraph", "data-info");
    paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro.  ", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("American Community Survey data was analysed on a census block group-level in order to estimate the population within 1/2 mile of high-quality rapid transit, assuming a homogenous distribution of population each the block group.", "paragraph", "calc-info");
    togglevisible();
    openNav();
}
function pm10R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm10chart(ctx, data);
    headerAdder("Population within 1/2 mile of high-quality rapid transit.", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are " + data.totPop + " people residing in the El Paso MPO region. There are " + data.peoplelivin.toFixed(2) + "% people living within a half-mile of high-quality rapid transit.  Once all proposed high-quality rapid transit stations are complete, there will be a total of " + data.totpeoplelivinTot + " people living within a high-quality rapid transit.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2015 LEHD files, 2012-2016 ACS data, bikeway data from 2018.", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("American Community Survey 5-Year Estimates & TIGER/Line Shapefiles ", "paragraph", "data-info");
    paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro.  ", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("American Community Survey data was analysed on a census block group-level in order to estimate the population within 1/2 mile of high-quality rapid transit, assuming a homogenous distribution of population each the block group.", "paragraph", "calc-info");
    togglevisible();
    openNav();
}

function pm8R(data) {
   // canvasMaker('chart1', 'myChart');
 //   canvasMaker('chart2', 'myChart2');
  //  var ctx = document.getElementById('myChart').getContext('2d');
   // var ctx2 = document.getElementById('myChart2').getContext('2d');
  //  pm8HorizontalBar(ctx);
   // pm8HorizontalBar2(ctx2);

    headerAdder("Key Destinations in the El Paso MPO Region ", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder(" In the El Paso MPO region, there are a total of _ key destinations. In a half-mile of existing bikeways, there are a total of __  (__%) key destinations.  Once all proposed bikeways are complete, there will be a total of __  (__%)  key destinations within a half-mile of bikeways. ", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data was provided by various local agencies in 2018 ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("A � mile buffer was drawn around existing bikeways and the number of key destinations within the buffer was calculated. This analysis was also done for proposed bikeways, to indicate the potential result if all bikeways in existing plans were completed.", "paragraph", "calc-info");
    togglevisible();
    openNav();
}

function pm15R(data) {
    canvasMaker('chart1', 'myChart');
    canvasMaker('chart2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm15chartLine(ctx, data);
    pm15chartLine2(ctx2,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("According to the data available, ozone, carbon monoxide, and particulate matter pollution has been increasing in the last 5 years.", "paragraph", "summary-info");
    paragraphAdder("Stations with the highest annual readings for each pollutant are:", "paragraph", "summary-info");
    paragraphAdder("Ozone 8hr � El Paso Chamizal in 2018,", "paragraph", "summary-info");
    paragraphAdder("Ozone 1hr � Santa Teresa in 2017,", "paragraph", "summary-info");
    paragraphAdder("Particulate Matter � Desert View in 2016", "paragraph", "summary-info");
    paragraphAdder("Carbon Monoxide � El Paso UTEP in 2018.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Texas Commission on Environmental Quality website and New Mexico Environment Department website", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Annual readings are reported exactly as they appear at Texas Commission on Environmental Quality website and New Mexico Environment Department website. In Texas 8-hour ozone standard is reported, in NM only 1-hour ozone standard was available. Carbon monoxide and particulate matter (PM10) are also reported.", "paragraph", "calc-info");
    paragraphAdder("*Note: Not all monitors collected data for all three pollutants, also not all monitors have data for the full 5-year period.", "paragraph", "calc-info");
    openNav();
}

function pm16R(data) {
    canvasMaker('chart1', 'myChart');

    var ctx = document.getElementById('myChart').getContext('2d');
 
    pm16chartLine(ctx, data);

    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder(" According to the data available, ______ Carbon Monoxide pollution has been the same for the last 5 years. Except for 2018 that UTEP registered a high reading. ", "paragraph", "summary-info");
    paragraphAdder("Stations with the highest annual readings for Carbon Monoxide _____ are:  ", "paragraph", "summary-info");
    paragraphAdder("El Paso UTEP in 2018.  ", "paragraph", "summary-info");
    paragraphAdder("El Paso Chamizal in 2017. ", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Texas Commission on Environmental Quality website and New Mexico Environment Department website", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Annual readings are reported exactly as they appear at Texas Commission on Environmental Quality website and New Mexico Environment Department website. In Texas 8-hour ozone standard is reported, in NM only 1-hour ozone standard was available. Carbon monoxide and particulate matter (PM10) are also reported.", "paragraph", "calc-info");
    paragraphAdder("*Note: Not all monitors collected data for all three pollutants, also not all monitors have data for the full 5-year period.", "paragraph", "calc-info");
    openNav();
}

function pm17R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm17chartLine(ctx, data);

    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder(" According to the data available, ______ Particulate Matter pollution has been increasing and decreasing depending of the station in the last 5 years.", "paragraph", "summary-info");
    paragraphAdder("Stations with the highest annual readings for Carbon Monoxide ______ are:  ", "paragraph", "summary-info");
    paragraphAdder("El Paso UTEP in 2018.  ", "paragraph", "summary-info");
    paragraphAdder("El Paso Chamizal in 2017. ", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Texas Commission on Environmental Quality website and New Mexico Environment Department website", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Annual readings are reported exactly as they appear at Texas Commission on Environmental Quality website and New Mexico Environment Department website. In Texas 8-hour ozone standard is reported, in NM only 1-hour ozone standard was available. Carbon monoxide and particulate matter (PM10) are also reported.", "paragraph", "calc-info");
    paragraphAdder("*Note: Not all monitors collected data for all three pollutants, also not all monitors have data for the full 5-year period.", "paragraph", "calc-info");
    openNav();
}