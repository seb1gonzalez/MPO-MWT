/*
PM 13 and PM 14. This code is outdated. 
Uses JSON to get the calculations and then calculates values for graph and text ONLY
*/

// Colors for Graphs
let pdnC = "#FDD835";
let pdnC2 = "#FFEB3B"
let ysC = "#FF9800";
let ysC2 = '#FFB74D';
let botaC = "#304FFE";
let botaC2 ="#2196F3"

// calculations for 2018
var pm14Calculations = {
    vehAvgTime:0, vehHighestWait:"",

    freightAvgTime:0, freightHigherstWait:0,
    
    WalkAvgTime:0, walkHighestWait:0
};
// * * * *  * * * * * * PM14 graph info

// personal vehicles
var pm14PV = { 
    PDN:[], PDN_R:[], 
    BOTA:[], BOTA_R:[], 
    Y:[], Y_R:[]
};
// cargo trucks
var pm14CT = { 
    BOTA_C:[], BOTA_F:[], 
    Y_C:[], Y_CF:[]
};
// pedestrians
var pm14PED = { 
    PDN:[], PDN_R:[], 
    BOTA_P:[], 
    Y_P:[]
};

//Pm13
function pm13_14Data(){ 
    fetch('./results.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            //coordinates PM13 & PM14 --- Not needed
            // for(let i = 0; i < myJson.PMS_13_14.lat.length; i++){ 
            //      pms_13_14_cor.lon.push(myJson.PMS_13_14.lon[i]);
            //      pms_13_14_cor.lat.push(myJson.PMS_13_14.lat[i]);
            //      pms_13_14_cor.port.push(myJson.PMS_13_14.port[i]);
            // }

            //filter PM14 graph data by year and category
            for(let i = 0; i < myJson.PM14.year.length; i++){
                if(myJson.PM14.year[i] == "2014"){
                    if(myJson.PM14.Mode[i] == "psgrveh"){
                        pm14PV.PDN.push(parseFloat(myJson.PM14.pdn[i]));
                        pm14PV.PDN_R.push(parseFloat(myJson.PM14.pdn_ready[i]));
                        pm14PV.BOTA.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14PV.BOTA_R.push(parseFloat(myJson.PM14.Bota_Ready[i]));
                        pm14PV.Y.push(parseFloat(myJson.PM14.Ysleta[i]));
                        pm14PV.Y_R.push(parseFloat(myJson.PM14.ysleta_Ready[i]));
                    }else if(myJson.PM14.Mode[i] == "freight"){
                        pm14CT.BOTA_C.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14CT.BOTA_F.push(parseFloat(myJson.PM14.Bota_Fast[i]));
                        pm14CT.Y_C.push(parseFloat(myJson.PM14.Ysleta[i]));
                        pm14CT.Y_CF.push(parseFloat(myJson.PM14.Ysleta_Fast[i]));
                    }else if(myJson.PM14.Mode[i] == "pedestrian"){
                        pm14PED.PDN.push(parseFloat(myJson.PM14.pdn[i]));
                        pm14PED.PDN_R.push(parseFloat(myJson.PM14.pdn_ready[i]));
                        pm14PED.BOTA_P.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14PED.Y_P.push(parseFloat(myJson.PM14.Ysleta[i]));
                    }
                }else if(myJson.PM14.year[i] == "2015"){
                    if(myJson.PM14.Mode[i] == "psgrveh"){
                        pm14PV.PDN.push(parseFloat(myJson.PM14.pdn[i]));
                        pm14PV.PDN_R.push(parseFloat(myJson.PM14.pdn_ready[i]));
                        pm14PV.BOTA.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14PV.BOTA_R.push(parseFloat(myJson.PM14.Bota_Ready[i]));
                        pm14PV.Y.push(parseFloat(myJson.PM14.Ysleta[i]));
                        pm14PV.Y_R.push(parseFloat(myJson.PM14.ysleta_Ready[i]));
                    }else if(myJson.PM14.Mode[i] == "freight"){
                        pm14CT.BOTA_C.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14CT.BOTA_F.push(parseFloat(myJson.PM14.Bota_Fast[i]));
                        pm14CT.Y_C.push(parseFloat(myJson.PM14.Ysleta[i]));
                        pm14CT.Y_CF.push(parseFloat(myJson.PM14.Ysleta_Fast[i]));
                    }else if(myJson.PM14.Mode[i] == "pedestrian"){
                        pm14PED.PDN.push(parseFloat(myJson.PM14.pdn[i]));
                        pm14PED.PDN_R.push(parseFloat(myJson.PM14.pdn_ready[i]));
                        pm14PED.BOTA_P.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14PED.Y_P.push(parseFloat(myJson.PM14.Ysleta[i]));
                    }
                 

                }else if(myJson.PM14.year[i] == "2016"){
                    if(myJson.PM14.Mode[i] == "psgrveh"){
                        pm14PV.PDN.push(parseFloat(myJson.PM14.pdn[i]));
                        pm14PV.PDN_R.push(parseFloat(myJson.PM14.pdn_ready[i]));
                        pm14PV.BOTA.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14PV.BOTA_R.push(parseFloat(myJson.PM14.Bota_Ready[i]));
                        pm14PV.Y.push(parseFloat(myJson.PM14.Ysleta[i]));
                        pm14PV.Y_R.push(parseFloat(myJson.PM14.ysleta_Ready[i]));
                    }else if(myJson.PM14.Mode[i] == "freight"){
                        pm14CT.BOTA_C.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14CT.BOTA_F.push(parseFloat(myJson.PM14.Bota_Fast[i]));
                        pm14CT.Y_C.push(parseFloat(myJson.PM14.Ysleta[i]));
                        pm14CT.Y_CF.push(parseFloat(myJson.PM14.Ysleta_Fast[i]));
                    }else if(myJson.PM14.Mode[i] == "pedestrian"){
                        pm14PED.PDN.push(parseFloat(myJson.PM14.pdn[i]));
                        pm14PED.PDN_R.push(parseFloat(myJson.PM14.pdn_ready[i]));
                        pm14PED.BOTA_P.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14PED.Y_P.push(parseFloat(myJson.PM14.Ysleta[i]));
                    }
               
                }else if(myJson.PM14.year[i] == "2017"){
                    if(myJson.PM14.Mode[i] == "psgrveh"){
                        pm14PV.PDN.push(parseFloat(myJson.PM14.pdn[i]));
                        pm14PV.PDN_R.push(parseFloat(myJson.PM14.pdn_ready[i]));
                        pm14PV.BOTA.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14PV.BOTA_R.push(parseFloat(myJson.PM14.Bota_Ready[i]));
                        pm14PV.Y.push(parseFloat(myJson.PM14.Ysleta[i]));
                        pm14PV.Y_R.push(parseFloat(myJson.PM14.ysleta_Ready[i]));
                    }else if(myJson.PM14.Mode[i] == "freight"){
                        pm14CT.BOTA_C.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14CT.BOTA_F.push(parseFloat(myJson.PM14.Bota_Fast[i]));
                        pm14CT.Y_C.push(parseFloat(myJson.PM14.Ysleta[i]));
                        pm14CT.Y_CF.push(parseFloat(myJson.PM14.Ysleta_Fast[i]));
                    }else if(myJson.PM14.Mode[i] == "pedestrian"){
                        pm14PED.PDN.push(parseFloat(myJson.PM14.pdn[i]));
                        pm14PED.PDN_R.push(parseFloat(myJson.PM14.pdn_ready[i]));
                        pm14PED.BOTA_P.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14PED.Y_P.push(parseFloat(myJson.PM14.Ysleta[i]));
                    }
                 

                }else if(myJson.PM14.year[i] == "2018"){
                    if(myJson.PM14.Mode[i] == "psgrveh"){
                        pm14PV.PDN.push(parseFloat(myJson.PM14.pdn[i]));
                        pm14PV.PDN_R.push(parseFloat(myJson.PM14.pdn_ready[i]));
                        pm14PV.BOTA.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14PV.BOTA_R.push(parseFloat(myJson.PM14.Bota_Ready[i]));
                        pm14PV.Y.push(parseFloat(myJson.PM14.Ysleta[i]));
                        pm14PV.Y_R.push(parseFloat(myJson.PM14.ysleta_Ready[i]));
                    }else if(myJson.PM14.Mode[i] == "freight"){
                        pm14CT.BOTA_C.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14CT.BOTA_F.push(parseFloat(myJson.PM14.Bota_Fast[i]));
                        pm14CT.Y_C.push(parseFloat(myJson.PM14.Ysleta[i]));
                        pm14CT.Y_CF.push(parseFloat(myJson.PM14.Ysleta_Fast[i]));
                    }else if(myJson.PM14.Mode[i] == "pedestrian"){
                        pm14PED.PDN.push(parseFloat(myJson.PM14.pdn[i]));
                        pm14PED.PDN_R.push(parseFloat(myJson.PM14.pdn_ready[i]));
                        pm14PED.BOTA_P.push(parseFloat(myJson.PM14.Bota[i]));
                        pm14PED.Y_P.push(parseFloat(myJson.PM14.Ysleta[i]));
                    }
                }
            }
            /******* Calculations for Driving Text */
            let t2018D= []; // temp array holds 2018 values for driving only
            t2018D[0] = pm14PV.PDN[pm14PV.PDN.length-1];
            t2018D[1] = pm14PV.PDN_R[pm14PV.PDN_R.length-1]
            t2018D[2] = pm14PV.BOTA[pm14PV.BOTA.length-1]
            t2018D[3] = pm14PV.BOTA_R[pm14PV.BOTA_R.length-1]
            t2018D[4] = pm14PV.Y[pm14PV.Y.length-1];
            t2018D[5] = pm14PV.Y_R[pm14PV.Y_R.length-1];

            //Average time on 2018 only
            pm14Calculations.vehAvgTime = Math.round(calAverageTime(t2018D)* 100) / 100;//((pm14PV.PDN[pm14PV.PDN.length-1] + pm14PV.PDN_R[pm14PV.PDN_R.length-1] + pm14PV.BOTA[pm14PV.BOTA.length-1] + pm14PV.BOTA_R[pm14PV.BOTA_R.length-1] + pm14PV.Y[pm14PV.Y.length-1] + pm14PV.Y_R[pm14PV.Y_R.length-1]) / 6);

            let tmp = calHighestWaitTime(t2018D); // returns index of highest wait time, index on vehHighestWait

            // 2018 Driving names 
            let tvehHighestWait = [];
            tvehHighestWait[0] = "PDN";
            tvehHighestWait[1] = "PDN";
            tvehHighestWait[2] ="BOTA";
            tvehHighestWait[3] = "BOTA";
            tvehHighestWait[4] = "Ysleta";
            tvehHighestWait[5] = "Ysleta";
    
            pm14Calculations.vehHighestWait = tvehHighestWait[tmp];

            /******* Calculations for Text End*/

            /******* Calculations for Freight Text */
            let t2018F= []; // temp array holds 2018 values for driving only
            t2018F[0] = pm14CT.BOTA_C[pm14CT.BOTA_C.length-1];
            t2018F[1] = pm14CT.BOTA_F[pm14CT.BOTA_F.length-1]
            t2018F[2] = pm14CT.Y_C[pm14CT.Y_C.length-1]
            t2018F[3] = pm14CT.Y_CF[pm14CT.Y_CF.length-1]
        
            //Average time on 2018 only
            pm14Calculations.freightAvgTime = Math.round(calAverageTime(t2018F)*100)/100;//((pm14PV.PDN[pm14PV.PDN.length-1] + pm14PV.PDN_R[pm14PV.PDN_R.length-1] + pm14PV.BOTA[pm14PV.BOTA.length-1] + pm14PV.BOTA_R[pm14PV.BOTA_R.length-1] + pm14PV.Y[pm14PV.Y.length-1] + pm14PV.Y_R[pm14PV.Y_R.length-1]) / 6);

            tmp = calHighestWaitTime(t2018F); // returns index of highest wait time, index on vehHighestWait

            // 2018 Freight names 
            let tFHighestWait = [];
            tFHighestWait[0] = "BOTA";
            tFHighestWait[1] = "BOTA";
            tFHighestWait[2] ="Ysleta";
            tFHighestWait[3] = "Ysleta";

            pm14Calculations.freightHigherstWait = tFHighestWait[tmp];
            
            /******* Calculations for Freight Text End*/
            /******* Calculations for Walking Text */
            let t2018W= []; // temp array holds 2018 values for driving only
            t2018W[0] = pm14PED.PDN[pm14PED.PDN.length-1];
            t2018W[1] = pm14PED.PDN_R[pm14PED.PDN_R.length-1]
            t2018W[2] = pm14PED.BOTA_P[pm14PED.BOTA_P.length-1]
            t2018W[3] = pm14PED.Y_P[pm14PED.Y_P.length-1]
            
            //Average time on 2018 only
            pm14Calculations.WalkAvgTime = Math.round(calAverageTime(t2018W)*100)/100;//((pm14PV.PDN[pm14PV.PDN.length-1] + pm14PV.PDN_R[pm14PV.PDN_R.length-1] + pm14PV.BOTA[pm14PV.BOTA.length-1] + pm14PV.BOTA_R[pm14PV.BOTA_R.length-1] + pm14PV.Y[pm14PV.Y.length-1] + pm14PV.Y_R[pm14PV.Y_R.length-1]) / 6);

            tmp = calHighestWaitTime(t2018W); // returns index of highest wait time, index on vehHighestWait

            // 2018 Walking names 
            let tWHighestWait = [];
            tWHighestWait[0] = "PDN";
            tWHighestWait[1] = "PDN";
            tWHighestWait[2] ="BOTA";
            tWHighestWait[3] = "Ysleta";

            pm14Calculations.walkHighestWait = tWHighestWait[tmp];
            
            /******* Calculations for Pedestrians Text End*/
             document.getElementById("pm14DText").innerHTML = pm14Calculations.vehAvgTime + " min";
             document.getElementById("pm14FText").innerHTML = pm14Calculations.freightAvgTime + " min";
             document.getElementById("pm14WText").innerHTML = pm14Calculations.WalkAvgTime + " min";
        
        });
}
// returns the *index* of the higher Wait time 
function calHighestWaitTime(times){
    let highestT = 0; // highest time
    let highest_I = 0; // highest time position on array
    let i =0;
    while(times[i] != null){
        if(times[i] > highestT){
            highestT = times[i];
            highest_I = i;
        }
        i++;
    }
    return highest_I;
}
//calculates the average time 
function calAverageTime(times){
    let sum = 0;
    for(let i =0; i < times.length; i++){
        sum += times[i];
    }
    return sum/times.length;
}
// Graph Here
function pm14DrivingChart(ctx){ 
    var data = {
       labels: ['2014', '2015', '2016', '2017', '2018'],
       datasets: [
           {
                label: "PDN Personal Vehicles",
                data: pm14PV.PDN,
                backgroundColor: pdnC,
                borderColor: pdnC,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "PND Ready Personal Vehicles",
                data: pm14PV.PDN_R,
                backgroundColor: pdnC2,
                borderColor: pdnC2,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "BOTA Personal Vehicles",
                data: pm14PV.BOTA,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "BOTA Ready Personal Vehicles",
                data: pm14PV.BOTA_R,
                backgroundColor: botaC2,
                borderColor: botaC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Personal Vehicles",
                data: pm14PV.Y,
                backgroundColor: ysC2,
                borderColor: ysC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Ready Personal Vehicles",
                data: pm14PV.Y_R,
                backgroundColor: ysC,
                borderColor: ysC,
                fill: false,
                lineTension: 0,
                radius: 5
            }
       ]
   };

   //create Chart class object
   var chart = new Chart(ctx, {
       type: "line",
       data: data,
       options: {
        responsive: true,
        scales:{
            yAxes: [{
                scaleLabel: {
                display: true,
                labelString: 'Mean (Minutes)'
             }
         }]},
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 12,
                boxWidth:8
            }
       },
        title: {
            display: true,
            text: 'Wait Times Personal Vehicles'
        }
    }
   });
}


function pm14FreightChart(ctx){
 var data = {
       labels: ['2014', '2015', '2016', '2017', '2018'],
       datasets: [
           {
                label: "BOTA Cargo",
                data: pm14CT.BOTA_C,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "BOTA Fast Cargo",
                data: pm14CT.BOTA_F,
                backgroundColor: botaC2 ,
                borderColor: botaC2,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "Ysleta Cargo",
                data: pm14CT.Y_C,
                backgroundColor: ysC,
                borderColor: ysC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Cargo Fast",
                data: pm14CT.Y_CF,
                backgroundColor: ysC2,
                borderColor: ysC2,
                fill: false,
                lineTension: 0,
                radius: 5
            }
       ]
   };

    //options
   var options = {
    scales: {
      },
       responsive: true,
       title: {
       
       },
       legend: {
       display: true,
       position: "bottom",
       labels: {
           fontColor: "#333",
           fontSize: 12,
           boxWidth:10
       }
       }
   };

   //create Chart class object
   var chart = new Chart(ctx, {
       type: "line",
       data: data,
       options: {
        scales:{
            yAxes: [{
                scaleLabel: {
                display: true,
                labelString: 'Mean (Minutes)'
             }
         }]},
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 12,
                boxWidth:10
            }
        },
        title: {
            display: true,
            text: 'Wait Times Cargo Trucks'
        }
    }
   });
}



function pm14WalkingChart(ctx){
    var data = {
       labels: ['2014', '2015', '2016', '2017', '2018'],
       datasets: [
           {
                label: "PDN Pedestrians",
                data: pm14PED.PDN,
                backgroundColor: pdnC,
                borderColor: pdnC,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "PDN Ready Pedestrians",
                data: pm14PED.PDN_R,
                backgroundColor: pdnC2,
                borderColor: pdnC2,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "BOTA Pedestrians",
                data: pm14PED.BOTA_P,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Pedestrians",
                data: pm14PED.Y_P,
                backgroundColor: ysC,
                borderColor: ysC,
                fill: false,
                lineTension: 0,
                radius: 5
            }
       ]
   };

   //create Chart class object
   var chart = new Chart(ctx, {
       type: "line",
       data: data,
       options: {
        scales:{
            yAxes: [{
                scaleLabel: {
                display: true,
                labelString: 'Mean (Minutes)'
             }
         }]},
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 12,
                boxWidth:10
            }
        },
        title: {
            display: true,
            text: 'Wait Times Pedestrians'
        }
    }
   });
}
