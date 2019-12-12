/**
 * Creates graphs for PM18
 * Calculates data for both Pm18 and PM19
 *  
*/
/**
 * There are 4 types of mode
 * Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
 * Mode 1: Regional Performance Points and data
 * Mode 2: Corridor Performance Points and data
 * Mode 3: Corridor Data only, data for benchmark
 *  * Mode 4: AOI
 */
function pm18Data(mode, ex) {
    //console.log('debugging pm18');
  //  console.log(currentType);
    let pedCrash = [];
    let commCrash = [];
    let genCrash = [];
    let bikeCrash = [];


    //stores graph values
    var pm18data= {
        //barGraph
        F13: 0, S13: 0, N_I_I13: 0, P13: 0, NI13: 0,
        F14: 0, S14: 0, N_I_I14: 0, P14: 0, NI14: 0,
        F15: 0, S15: 0, N_I_I15: 0, P15: 0, NI15: 0,
        F16: 0, S16: 0, N_I_I16: 0, P16: 0, NI16: 0,
        F17: 0, S17: 0, N_I_I17: 0, P17: 0, NI17: 0,
        //linegraph
        ftD13: 0, ftD14: 0, ftD15: 0, ftD16: 0, ftD17: 0, //fatalities driving
        ftF13: 0, ftF14: 0, ftF15: 0, ftF16: 0, ftF17: 0, //freight
        ftW13: 0, ftW14: 0, ftW15: 0, ftW16: 0, ftW17: 0, //walking
        ftB13: 0, ftB14: 0, ftB15: 0, ftB16: 0, ftB17: 0, //bike
        tot13: 0, tot14: 0, tot15: 0, tot16: 0, tot17: 0,  //totals
        //T0TS per category
        dtot18: 0, ftot18: 0, wtot18: 0, btot18:0,
        currentCorridor: 'Entire Region',
        GEN_: 0, //dynamic text total crashes
        GEN_Fatal: 0, //crashes of fatalities only, 4 types used this variable
        dtextPercent: 0, 
        dtextFatality: 0

    }

    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm18_19';
        data_for_php = { key: key };
    } else if (mode == 2) { // if we want corridors
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
       // console.log(data_for_php);
    }
    else if(mode == 4){
        data_for_php = ex;
        php_handler = "./backend/AOI.php";
    }

    let image = "./img/markers/crash.png";
    //Crash Points
    let tshape = "shape";
    $.get(php_handler, data_for_php, function (data) {
        for (index in data.shape_arr) {
            let holder = [];
            let type = data.shape_arr[index]['type'];
            let year = parseInt(data.shape_arr[index]['year']);

            let fatalities = parseInt(data.shape_arr[index]['fatalities']);
            let nonInjury = parseInt(data.shape_arr[index]['non_injuri']);
            let serious = parseInt(data.shape_arr[index]['suspected_']);
            let nonIncapa = parseInt(data.shape_arr[index]['non_incapa']);
            let possible = parseInt(data.shape_arr[index]['possible_i']);
            let unknown = parseInt(data.shape_arr[index]['unknown_in']);
            let ogrID = parseInt(data.shape_arr[index]['OGR_FID']);

            if (mode == 1 || mode == 2 || mode == 4) { // mode 1 and 2 allows us to store points 
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs

                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: "Year: " + year + " \nSerious Injuries " + serious + " \nNon-Incapacitating Injuries: " + nonIncapa + "\nPossible Injuries: " + possible + "\nNon-Injury: " + nonInjury + "\nFatalities: " + fatalities,
                    value: ogrID,
                    icon: image
                });

                //filter crashes/points
                if ((type == "Pedestrian" || type == "PED") && fatalities > 0) {
                    pedCrash.push(point);
                } else if ((type == "COMV" || type == "Commerical_Vehicles") && fatalities > 0) {
                    commCrash.push(point);
                } else if (type == "GEN" && fatalities > 0) {
                    genCrash.push(point);
                } else if ((type == "Pedcyclists" || type == "BIKE") && fatalities > 0) {
                    bikeCrash.push(point);
                }
            }
           
            //count total crashes by category
            if (currentType == 'driving') {
                pm18data.GEN_++; //count crash
            } else if (currentType == 'walking') {
                pm18data.GEN_++; //count crash
            } else if (currentType == 'biking') {
                pm18data.GEN_++; //count crash
            } else if (currentType == 'freight') {
                pm18data.GEN_++; //count crash
            }
   

            // count crashes on current type.
            if (fatalities > 0) {
                if (currentType == 'driving') {
                    pm18data.GEN_Fatal++; //crashes
                } else if (currentType == 'walking') {
                    pm18data.GEN_Fatal++; //crashes
                } else if (currentType == 'biking') {
                    pm18data.GEN_Fatal++; //crashes
                } else if (currentType == 'freight') {
                    pm18data.GEN_Fatal++; //crashes
                }
            }

            //filter values by year
            if (year == 2013) {
                //for bar graph
                if (mode >0) {
                    pm18data.F13 += fatalities;
                    pm18data.NI13 += nonInjury;
                    if (type == "tx") pm18data.NI13 += unknown;   //class O or nonInjury = addition of nonInjury and Unknown
                    pm18data.S13 += serious;
                    pm18data.N_I_I13 += nonIncapa;
                    pm18data.P13 += possible;
                }
                if (fatalities > 0) {  //for line graph
                    if (type == "Pedestrian" || type == "PED") {
                        pm18data.ftW13 += fatalities;
                    } else if (type == "Commerical_Vehicles" || type == "COMV") {
                        pm18data.ftF13 += fatalities;
                    } else if (type == "GEN") {
                        pm18data.ftD13 += fatalities;
                    } else if (type == "Pedcyclists" || type == "BIKE") {
                        pm18data.ftB13 += fatalities;
                    }
                }

            } else if (year == 2014) {
                if (mode > 0) {
                    pm18data.F14 += fatalities;
                    pm18data.NI14 += nonInjury;
                    if (type == "tx") pm18data.NI14 += unknown;
                    pm18data.S14 += serious;
                    pm18data.N_I_I14 += nonIncapa;
                    pm18data.P14 += possible;
                }
                if (fatalities > 0) {
                    if (type == "Pedestrian" || type == "PED") {
                        pm18data.ftW14 += fatalities;
                    } else if (type == "Commerical_Vehicles" || type == "COMV") {
                        pm18data.ftF14 += fatalities;
                    } else if (type == "GEN") {
                        pm18data.ftD14 += fatalities;
                    } else if (type == "Pedcyclists" || type == "BIKE") {
                        pm18data.ftB14 += fatalities;
                    } 
                }
     
            } else if (year == 2015) {
                if (mode>0) {
                    pm18data.F15 += fatalities;
                    pm18data.NI15 += nonInjury;
                    if (type == "tx") pm18data.NI15 += unknown;
                    pm18data.S15 += serious;
                    pm18data.N_I_I15 += nonIncapa;
                    pm18data.P15 += possible;
                }
                if (fatalities > 0) {
                    if (type == "Pedestrian" || type == "PED") {
                        pm18data.ftW15 += fatalities;
                    } else if (type == "Commerical_Vehicles" || type == "COMV") {
                        pm18data.ftF15 += fatalities;
                    } else if (type == "GEN") {
                        pm18data.ftD15 += fatalities;
                    } else if (type == "Pedcyclists" || type == "BIKE") {
                        pm18data.ftB15 += fatalities;
                    }
                }

            } else if (year == 2016) {
                if (mode>0) {
                    pm18data.F16 += fatalities;
                    pm18data.NI16 += nonInjury;
                    if (type == "tx") pm18data.NI16 += unknown;
                    pm18data.S16 += serious;
                    pm18data.N_I_I16 += nonIncapa;
                    pm18data.P16 += possible;
                }
                if (fatalities > 0) {
                    if (type == "Pedestrian" || type == "PED") {
                        pm18data.ftW16 += fatalities;
                    } else if (type == "Commerical_Vehicles" || type == "COMV") {
                        pm18data.ftF16 += fatalities;
                    } else if (type == "GEN") {
                        pm18data.ftD16 += fatalities;
                    } else if (type == "Pedcyclists" || type == "BIKE") {
                        pm18data.ftB16 += fatalities;
                    }
                }
            } else if (year == 2017) {
                if (mode>0) {
                    pm18data.F17 += fatalities;
                    pm18data.NI17 += nonInjury;
                    if (type == "tx") pm18data.NI17 += unknown;
                    pm18data.S17 += serious;
                    pm18data.N_I_I17 += nonIncapa;
                    pm18data.P17 += possible;
                }
                if (fatalities > 0) {
                    if (type == "Pedestrian" || type == "PED") {
                        pm18data.ftW17 += fatalities;
                    } else if (type == "Commerical_Vehicles" || type == "COMV") {
                        pm18data.ftF17 += fatalities;
                    } else if (type == "GEN") {
                        pm18data.ftD17 += fatalities;
                    } else if (type == "Pedcyclists" || type == "BIKE") {
                        pm18data.ftB17 += fatalities;
                    }
                }
               
            }
         
        } 

        //Print Points
        if (mode == 1 || mode == 2 ||  mode == 4) {
            if (currentType == "driving") {
                for (index in genCrash) {
                    genCrash[index].setMap(map);
                    points.push(genCrash[index]);
                }
            } else if (currentType == "freight") {
                for (index in commCrash) {

                    commCrash[index].setMap(map);
                    points.push(commCrash[index]);
                }
            } else if (currentType == "walking") {
                for (index in pedCrash) {

                    pedCrash[index].setMap(map);
                    points.push(pedCrash[index]);
                }
            } else if (currentType == "biking") {
                for (index in bikeCrash) {

                    bikeCrash[index].setMap(map);
                    points.push(bikeCrash[index]);
                }
            }
        }


        //calculations for menu Text
         pm18data.dtot18 = pm18data.ftD13 + pm18data.ftD14 + pm18data.ftD15 + pm18data.ftD16 + pm18data.ftD17;
         pm18data.ftot18 = pm18data.ftF13 + pm18data.ftF14 + pm18data.ftF15 + pm18data.ftF16 + pm18data.ftF17;
         pm18data.wtot18 = pm18data.ftW13 + pm18data.ftW14 + pm18data.ftW15 + pm18data.ftW16 + pm18data.ftW17;
         pm18data.btot18 = pm18data.ftB13 + pm18data.ftB14 + pm18data.ftB15 + pm18data.ftB16 + pm18data.ftB17;


        if (mode == 0) { // menu text, this is only done once
            // Send to menu Text
            document.getElementById("pm18DrivingText").innerHTML = pm18data.dtot18;
            document.getElementById("pm18FreightText").innerHTML = pm18data.ftot18;
            document.getElementById("pm18WalkingText").innerHTML = pm18data.wtot18;
            document.getElementById("pm18BikeText").innerHTML = pm18data.btot18;

        }
        //graph calculations totals per year all categories
        pm18data.tot13 = pm18data.ftD13 + pm18data.ftF13 + pm18data.ftW13 + pm18data.ftB13;
        pm18data.tot14 = pm18data.ftD14 + pm18data.ftF14 + pm18data.ftW14 + pm18data.ftB14;
        pm18data.tot15 = pm18data.ftD15 + pm18data.ftF15 + pm18data.ftW15 + pm18data.ftB15;
        pm18data.tot16 = pm18data.ftD16 + pm18data.ftF16 + pm18data.ftW16 + pm18data.ftB16;
        pm18data.tot17 = pm18data.ftD17 + pm18data.ftF17 + pm18data.ftW17 + pm18data.ftB17;

        //calculations for static text
        dtextPercent = (pm18data.GEN_Fatal / pm18data.GEN_) * 100; 
     
        if (mode == 1) {
            regionalText(pm18data);
        }
        else if (mode == 2 || mode == 3 ) {
            let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?
            pm18data.currentCorridor = corr;
           // console.log('testing 18');
            // console.log(corr);
            // console.log(pm18data.currentCorridor);

            dynamicCorridorText(corr, pm18data); // Send graph data and current corridor to dynamic text for corridors
        }
        else if(mode == 4){
            dynamicCorridorText("AOI", pm18data); // Send graph data and current corridor to dynamic text for corridors

        }

    }); 
}

function pm18chartLine(ctx, data) {
    var pm18_graphTitle;
    var pm18_graphValues = [];

    //line chart data
    if (currentType == 'driving') { // if Driving is click
        pm18_graphValues[0] = data.ftD13;
        pm18_graphValues[1] = data.ftD14;
        pm18_graphValues[2] = data.ftD15;
        pm18_graphValues[3] = data.ftD16;
        pm18_graphValues[4] = data.ftD17;
        pm18_graphTitle = 'Driving Fatalities';
    } else if (currentType == 'freight') { // if Freight is click
        pm18_graphValues[0] = data.ftF13;
        pm18_graphValues[1] = data.ftF14;
        pm18_graphValues[2] = data.ftF15;
        pm18_graphValues[3] = data.ftF16;
        pm18_graphValues[4] = data.ftF17;
        pm18_graphTitle = 'Freight Fatalities';

    } else if (currentType == 'walking') {
        pm18_graphValues[0] = data.ftW13;
        pm18_graphValues[1] = data.ftW14;
        pm18_graphValues[2] = data.ftW15;
        pm18_graphValues[3] = data.ftW16;
        pm18_graphValues[4] = data.ftW17;
        pm18_graphTitle = 'Walking Fatalities';
    } else if (currentType == 'biking') {
        pm18_graphValues[0] = data.ftB13;
        pm18_graphValues[1] = data.ftB14;
        pm18_graphValues[2] = data.ftB15;
        pm18_graphValues[3] = data.ftB16;
        pm18_graphValues[4] = data.ftB17;
        pm18_graphTitle = 'Bycycle Fatalities';
    }

    var data = {
        labels: ["2013", "2014", "2015", "2016", "2017"],
        datasets: [
            {
                label: pm18_graphTitle,
                data: pm18_graphValues,
                backgroundColor: "purple",
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Total Fatalities",
                data: [data.tot13, data.tot14, data.tot15, data.tot16, data.tot17],
                backgroundColor: "green",
                borderColor: "lightgreen",
                fill: false,
                lineTension: 0,
                radius: 5
            }
        ]
    };

    //options
    var options = {
        responsive: true,
        title: {
            /*display: true,
            position: "top",
            text: title;
            fontSize: 12,
            fontColor: "#111"*/
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 12,
                boxWidth: 10
            }
        }
    };

    //create Chart class object
    var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options
    });

}

function pm18StackedChart(ctx, data) {
    let titleH = data.currentCorridor;
    console.log(titleH);
    if (titleH != 'Entire Region') { //if corridor fix wording
        titleH = wordFix(titleH + " Corridor");
        console.log(titleH);
    }
    var barChartData = {
		labels: ['2013', '2014', '2015', '2016', '2017'],
			datasets: [{
				label: 'Fatalities',
				backgroundColor: 'rgba(255,82,0,0.5)',
				data: [
                    data.F13, data.F14, data.F15, data.F16, data.F17
				]
			}, {
				label: 'Serious Injuries',
				backgroundColor: 'rgba(92,187,3,0.5)',
				data: [
                    data.S13, data.S14, data.S15, data.S16, data.S17
				]
			}, {
				label: 'Non-Incapacitating Injuries',
				backgroundColor: 'rgba(117,36,221,0.5)',
				data: [
                    data.N_I_I13, data.N_I_I14, data.N_I_I15, data.N_I_I16, data.N_I_I17
				]
			},  {
				label: 'Possible Injuries',
				backgroundColor: 'rgba(255,235,59,1)',
				data: [
                    data.P13, data.P14, data.P15, data.P16, data.P17
				]
			},  {
				label: 'Non-Injury',
				backgroundColor: 'rgb(255,0,255,0.5)',
				data: [
                    data.NI13, data.NI14, data.NI15, data.NI16, data.NI17
				]
			}]

	};
    var chartBar = new Chart(ctx, {
        type: "bar",
        data: barChartData,
        options: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 10,
                    boxWidth:6
                }
                },
            title: {
                display: true,
                text: titleH,
                fontSize: 10
                //fontColor: "#111"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        //max:45000
                    }
                }]
            }
        }
    });
	
}
