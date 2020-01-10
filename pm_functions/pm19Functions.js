/**
 * There are 4 types of mode
 * Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
 * Mode 1: Regional Performance Points and data
 * Mode 2: Corridor Performance Points and data
 * Mode 3: Corridor Data only, data for benchmark
 */

function pm19Data(mode, ex) {
    let pm19Points = {
        pedCrash: [],
        commCrash: [],
        genCrash: [],
        bikeCrash: []
    }


    //stores line values
    let pm19Data = { // 2013 TO 2017, 5 year holder,  starts at index 0
        ID: [0, 0, 0, 0, 0], //SERIOUS Injuries driving
        IF: [0, 0, 0, 0, 0], //freight
        IW: [0, 0, 0, 0, 0], //walking
        IB: [0, 0, 0, 0, 0], //bike
        TOT: [0, 0, 0, 0, 0],  //totals
        //Bar Graph
        F13: 0, S13: 0, N_I_I13: 0, P13: 0, NI13: 0,
        F14: 0, S14: 0, N_I_I14: 0, P14: 0, NI14: 0,
        F15: 0, S15: 0, N_I_I15: 0, P15: 0, NI15: 0,
        F16: 0, S16: 0, N_I_I16: 0, P16: 0, NI16: 0,
        F17: 0, S17: 0, N_I_I17: 0, P17: 0, NI17: 0,

        //take advantage of this dictionary and send dynamic variables for the dynamic text
		crashCountD:0, crashCountF:0, crashCountW:0, crashCountB:0,
        GEN_: 0, //dynamic text total crashes
        dtextpercent: 0, //(GEN_Serious_Injury / GEN_ ) * 100
        dtextinjured: 0, //sumation of class A 
        currentCorridor:'Entire Region'
         
    }
    let data_for_php = {};
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm18_19';
        data_for_php = { key: key };
    } else if (mode == 2) { // if we want corridors
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 19,
            corridors_selected: ex,
            tableName: "pm18_19txdotall"
        };
    } else if (mode == 4) {
        data_for_php = ex;
        php_handler = "./backend/AOI.php";
    }
    console.log(data_for_php);
    $.get(php_handler, data_for_php, function (data) {
        console.log(data_for_php);
        let image = "./img/markers/crash.png";
        for (index in data.shape_arr) { // Organize information into dictionaries
            //hold info of 1 point at a time
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

                
                //filter crashes or points by the four categories
                if ((type == "Pedestrian" || type == "PED") && parseInt(serious) > 0) {
                    pm19Points.pedCrash.push(point);
                } else if ((type == "PED_COMV" || type == "COMV" || type == "Commerical_Vehicles") && parseInt(serious) > 0) {
                    pm19Points.commCrash.push(point);
                } else if (type == "GEN" && parseInt(serious) > 0) {
                    pm19Points.genCrash.push(point);
                } else if ((type == "Pedcyclists" || type == "BIKE") && parseInt(serious) > 0) {
                    pm19Points.bikeCrash.push(point);
                } else if (parseInt(serious) > 0) {
                    alert(type);
                }

            }
            // all modes store graph values, but not all modes store points

			//count total crashes by category
            if (currentType == 'driving' && type == "GEN" ) {
                pm19Data.crashCountD++; //count crash
            } else if (currentType == 'walking' && type == "Pedestrian" || type == "PED") {
                pm19Data.crashCountW++; //count crash
            } else if (currentType == 'biking' && type == "Pedcyclists" || type == "BIKE") {
                pm19Data.crashCountB++; //count crash
            } else if (currentType == 'freight' && type == "COMV" || type == "Commerical_Vehicles") {
                pm19Data.crashCountF++; //count crash
            }
			
			
            //filter graph values by year
            if (year == 2013) {
                //for bar graph
                if (mode > 0) {
                    pm19Data.F13 += fatalities;
                    pm19Data.NI13 += nonInjury;
                    if (type == "tx") pm19Data.NI13 += unknown;   //class O or nonInjury = addition of nonInjury and Unknown
                    pm19Data.S13 += serious;
                    pm19Data.N_I_I13 += nonIncapa;
                    pm19Data.P13 += possible;
                }

     
       
                //for line graph
                if (type == "Pedestrian" || type == "PED") {
                    pm19Data.IW[0] += serious;
                } else if (type == "Commerical_Vehicles" || type == "COMV") {
                    pm19Data.IF[0] += serious;
                } else if (type == "GEN") {
                    pm19Data.ID[0] += serious;
                } else if (type == "Pedcyclists" || type == "BIKE") {
                    pm19Data.IB[0] += serious;
                }

            } else if (year == 2014) {
                //bar graph 
                if (mode > 0) {
                    pm19Data.F14 += fatalities;
                    pm19Data.NI14 += nonInjury;
                    if (type == "tx") pm19Data.NI14 += unknown;
                    pm19Data.S14 += serious;
                    pm19Data.N_I_I14 += nonIncapa;
                    pm19Data.P14 += possible;
                }

                if (type == "Pedestrian" || type == "PED") {
                    pm19Data.IW[1] += serious;
                } else if (type == "Commerical_Vehicles" || type == "COMV") {
                    pm19Data.IF[1] += serious;
                } else if (type == "GEN") {
                    pm19Data.ID[1] += serious;
                } else if (type == "Pedcyclists" || type == "BIKE") {
                    pm19Data.IB[1] += serious;
                }
            } else if (year == 2015) {
                if (mode > 0) {
                    pm19Data.F15 += fatalities;
                    pm19Data.NI15 += nonInjury;
                    if (type == "tx") pm19Data.NI15 += unknown;
                    pm19Data.S15 += serious;
                    pm19Data.N_I_I15 += nonIncapa;
                    pm19Data.P15 += possible;
                }

                if (type == "Pedestrian" || type == "PED") {
                    pm19Data.IW[2] += serious;
                } else if (type == "Commerical_Vehicles" || type == "COMV") {
                    pm19Data.IF[2] += serious;
                } else if (type == "GEN") {
                    pm19Data.ID[2] += serious;
                } else if (type == "Pedcyclists" || type == "BIKE") {
                    pm19Data.IB[2] += serious;
                }
            } else if (year == 2016) {
                if (mode > 0) {
                    pm19Data.F16 += fatalities;
                    pm19Data.NI16 += nonInjury;
                    if (type == "tx") pm19Data.NI16 += unknown;
                    pm19Data.S16 += serious;
                    pm19Data.N_I_I16 += nonIncapa;
                    pm19Data.P16 += possible;
                }

                if (type == "Pedestrian" || type == "PED") {
                    pm19Data.IW[3] += serious;
                } else if (type == "Commerical_Vehicles" || type == "COMV") {
                    pm19Data.IF[3] += serious;
                } else if (type == "GEN") {
                    pm19Data.ID[3] += serious;
                } else if (type == "Pedcyclists" || type == "BIKE") {
                    pm19Data.IB[3] += serious;
                }
            } else if (year == 2017) {
                if (mode > 0) {
                    pm19Data.F17 += fatalities;
                    pm19Data.NI17 += nonInjury;
                    if (type == "tx") pm19Data.NI17 += unknown;
                    pm19Data.S17 += serious;
                    pm19Data.N_I_I17 += nonIncapa;
                    pm19Data.P17 += possible;
                }
                if (type == "Pedestrian" || type == "PED") {
                    pm19Data.IW[4] += serious;
                } else if (type == "Commerical_Vehicles" || type == "COMV") {
                    pm19Data.IF[4] += serious;
                } else if (type == "GEN") {
                    pm19Data.ID[4] += serious;
                } else if (type == "Pedcyclists" || type == "BIKE") {
                    pm19Data.IB[4] += serious;
                }
            }

            pm19Data.GEN_++; //add total crashes For dynamic Text in corridor and Regional

            //store total serious in a single variable to return to Dynamic text, will store CURRENT TYPE only  
            if (currentType == "driving" && type =="GEN" ) pm19Data.dtextinjured += serious;
            else if (currentType == "freight" && type == "Commerical_Vehicles") pm19Data.dtextinjured += serious;
            else if (currentType == "walking" && type == "Pedestrian") pm19Data.dtextinjured += serious;
            else if (currentType == "biking" && type == "Pedcyclists") pm19Data.dtextinjured += serious;
            

        } // at this point all data is organized by dictionaries



        // if mode 1 or 2 print points 
        if (mode == 1 || mode == 2 || mode == 4) {
            if (currentType == "driving") {
                for (index in pm19Points.genCrash) {
                    pm19Points.genCrash[index].setMap(map);
                    points.push(pm19Points.genCrash[index]);
                }
 
            } else if (currentType == "freight") {
                for (index in pm19Points.commCrash) {

                    pm19Points.commCrash[index].setMap(map);
                    points.push(pm19Points.commCrash[index]);
                }

            } else if (currentType == "walking") {
                for (index in pm19Points.pedCrash) {

                    pm19Points.pedCrash[index].setMap(map);
                    points.push(pm19Points.pedCrash[index]);
                }

            } else if (currentType == "biking") {
                for (index in pm19Points.bikeCrash) {

                    pm19Points.bikeCrash[index].setMap(map);
                    points.push(pm19Points.bikeCrash[index]);
                }

            }

        }

        let pm19DT = pm19Data.ID[0] + pm19Data.ID[1] + pm19Data.ID[2] + pm19Data.ID[3] + pm19Data.ID[4];
        let pm19FT = pm19Data.IF[0] + pm19Data.IF[1] + pm19Data.IF[2] + pm19Data.IF[3] + pm19Data.IF[4];
        let pm19WT = pm19Data.IW[0] + pm19Data.IW[1] + pm19Data.IW[2] + pm19Data.IW[3] + pm19Data.IW[4];
        let pm19BT = pm19Data.IB[0] + pm19Data.IB[1] + pm19Data.IB[2] + pm19Data.IB[3] + pm19Data.IB[4];

        if (mode == 0) { // menu text, this is only done once
            // Send to menu Text
            document.getElementById("pm19DrivingText").innerHTML = pm19DT;
            document.getElementById("pm19FreightText").innerHTML = pm19FT;
            document.getElementById("pm19WalkingText").innerHTML = pm19WT;
            document.getElementById("pm19BikeText").innerHTML = pm19BT;

        }

        // fatalities totals, this will alwways be recalculated
        pm19Data.TOT[0] = pm19Data.ID[0] + pm19Data.IF[0] + pm19Data.IW[0] + pm19Data.IB[0];
        pm19Data.TOT[1] = pm19Data.ID[1] + pm19Data.IF[1] + pm19Data.IW[1] + pm19Data.IB[1];
        pm19Data.TOT[2] = pm19Data.ID[2] + pm19Data.IF[2] + pm19Data.IW[2] + pm19Data.IB[2];
        pm19Data.TOT[3] = pm19Data.ID[3] + pm19Data.IF[3] + pm19Data.IW[3] + pm19Data.IB[3];
        pm19Data.TOT[4] = pm19Data.ID[4] + pm19Data.IF[4] + pm19Data.IW[4] + pm19Data.IB[4];

        //calculations for static text
		if(currentType == 'driving') {
            pm19Data.dtextpercent = (pm19DT / pm19Data.crashCountD) * 100; 
            console.log("******");
            console.log(pm19Data.dtextpercent);
            console.log(pm19DT);
            console.log(pm19Data.crashCountD);
          } else if (currentType == 'walking') {
                pm19Data.dtextpercent = (pm19WT / pm19Data.crashCountW) * 100;  
          } else if (currentType == 'biking') {
                pm19Data.dtextpercent = (pm19BT / pm19Data.crashCountB) * 100; 
          } else if (currentType == 'freight') {
                pm19Data.dtextpercent = (pm19FT / pm19Data.crashCountF) * 100; 
          }
     //   pm19Data.dtextpercent = (pm19DT / pm19Data.GEN_) * 100; //(GEN_Serious_Injury / GEN_ ) * 100
       // dtextinjured: 0 //sumation of class A in general crashes


        if (mode == 1) {
            regionalText(pm19Data);
        }
        else if (mode == 2 || mode == 3) {
            let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?
            pm19Data.currentCorridor = corr;

            dynamicCorridorText(corr, pm19Data); // Send graph data and current corridor to dynamic text for corridors
        }
        else if (mode == 4) {
            dynamicCorridorText("AOI", pm19Data); // Send graph data and current corridor to dynamic text for corridors
        }
    });


}

function pm19chartLine(ctx, pm19_graphValues) {
    //line chart data

    var pm19_graphTitle; // legend changes depending on button clicked
    var gData = [];
    //line chart data
    if (currentType == 'driving') { // if Driving is click
        pm19_graphTitle = 'Driving Serious Injuries';
        gData = pm19_graphValues.ID;
    } else if (currentType == 'freight') { // if Freight is click
        pm19_graphTitle = 'Freight  Serious Injuries';
        gData = pm19_graphValues.IF;
    } else if (currentType == 'walking') {
        pm19_graphTitle = 'Walking  Serious Injuries';
        gData = pm19_graphValues.IW;
    } else if (currentType == 'biking') {
        pm19_graphTitle = 'Bycycle  Serious Injuries';
        gData = pm19_graphValues.IB;
    }

    var data = {
        labels: ['2013', '2014', '2015', '2016', '2017'],
        datasets: [
            {
                label: pm19_graphTitle,
                data: gData,
                backgroundColor: "purple",
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Total Serious Injuries",
                data: pm19_graphValues.TOT,
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
            text: "2013-2017",
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
    chart.update();

}

function pm19StackedChart(ctx, data) {
    let titleH = data.currentCorridor; 
    if (titleH != 'Entire Region') { //if corridor fix wording
        titleH = wordFix(titleH + " Corridor");
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
        }, {
            label: 'Possible Injuries',
            backgroundColor: 'rgba(255,235,59,1)',
            data: [
                data.P13, data.P14, data.P15, data.P16, data.P17
            ]
        }, {
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
                    boxWidth: 6
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


