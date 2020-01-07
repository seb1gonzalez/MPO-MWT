/*
PM 13: Northbound border crossings 


NOTE: There are 3  tables in the DB related to PM 13 
    TABLE 1 : pm13_frgt
    TABLE 2 : pm13_ped
    TABLE 3 : pm13_psgrveh
  
    For bridge locations : pm14points

FIX THIS -> Uses JSON to get the calculations and then calculates values for graph and text ONLY
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
    vehAvgTime:0, 
    vehHighestWait:0,
    freightAvgTime:0, 
    freightHigherstWait:0,
    WalkAvgTime:0, 
    walkHighestWait:0
};
// * * * *  * * * * * * PM14 graph info

// personal vehicles
var pm14_personal_vehicles = { 
    PDN:[],
    PDN_R:[], 
    BOTA:[], 
    BOTA_R:[], 
    Y:[], 
    Y_R:[]
};
// cargo trucks
var pm14_cargo = { 
    BOTA_C:[],
    BOTA_F:[], 
    Y_C:[],
    Y_CF:[]
};
// pedestrians
var pm14_pedestrians = { 
    PDN:[], 
    PDN_R:[], 
    BOTA_P:[], 
    Y_P:[]
};

//Pm13
function pm13_data(){ 
    

  
}

// Graph Here
function pm14DrivingChart(ctx){ 
    var data = {
       labels: ['2014', '2015', '2016', '2017', '2018'],
       datasets: [
           {
                label: "PDN Personal Vehicles",
                data: pm14_personal_vehicles.PDN,
                backgroundColor: pdnC,
                borderColor: pdnC,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "PND Ready Personal Vehicles",
                data: pm14_personal_vehicles.PDN_R,
                backgroundColor: pdnC2,
                borderColor: pdnC2,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "BOTA Personal Vehicles",
                data: pm14_personal_vehicles.BOTA,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "BOTA Ready Personal Vehicles",
                data: pm14_personal_vehicles.BOTA_R,
                backgroundColor: botaC2,
                borderColor: botaC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Personal Vehicles",
                data: pm14_personal_vehicles.Y,
                backgroundColor: ysC2,
                borderColor: ysC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Ready Personal Vehicles",
                data: pm14_personal_vehicles.Y_R,
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
                data: pm14_cargo.BOTA_C,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "BOTA Fast Cargo",
                data: pm14_cargo.BOTA_F,
                backgroundColor: botaC2 ,
                borderColor: botaC2,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "Ysleta Cargo",
                data: pm14_cargo.Y_C,
                backgroundColor: ysC,
                borderColor: ysC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Cargo Fast",
                data: pm14_cargo.Y_CF,
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
                data: pm14_pedestrians.PDN,
                backgroundColor: pdnC,
                borderColor: pdnC,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "PDN Ready Pedestrians",
                data: pm14_pedestrians.PDN_R,
                backgroundColor: pdnC2,
                borderColor: pdnC2,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "BOTA Pedestrians",
                data: pm14_pedestrians.BOTA_P,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Pedestrians",
                data: pm14_pedestrians.Y_P,
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
