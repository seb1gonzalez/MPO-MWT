/*stores 2014-2018 data to be plotted in pm13 driving graph*/ 
console.log("I am fixing PM 13, originally made by Christian.  - Sebastian")

var pm13DrivingData = {
    PDN: [], Ysleta: [], BOTA: [], Stanton: [], YsletaDCL: []
    }
    
    /*stores 2014-2018 data to be plotted in pm13 driving graph*/ 
    var pm13FreightData = {
        YsletaFreight: [], BOTAFreight: []
    }
    
    var pm13ModeData ={
        passengerVehicles: [], pedestrians: [], cargoTrucks: [] , Northbound: []
    
    }
    
    var pm13WalkingData ={
        PDNWalking: [], ysletaWalking: [], BOTA: []
    }
    
    var pm13Calculations = {
        totalPDNDriving: 0, totalYsletaDriving: 0, totalBOTADriving: 0, totalStantonDriving: 0, totalYsletaDCLDriving: 0, average: 0, highestPortNumber:0, portWithHighestTrafficName: ' ', 
        totalYsletaFreight: 0, totalBOTAFreight: 0, portWithHighestTrafficNameFreight: ' ', avgFreight: 0, totalBOTAWalking: 0, totalPDNWalking: 0, totalYsletaWalking: 0, avgWalking: 0, 
        portWithHighestTrafficNameWalking: ' '
    }

    var driving = { //arrays to be fed to the driving graph
        PDNData: [], YsletaData: [], BOTAData: [], StantonDCLData: [], YsletaDCL: [],
    }
    var freight = { // arrays to be fed to the freight graph
        YsletaData: [], BOTAData: [], 
    }
        
    var walking = { //arrays to be fed to the walking graph
        PDNData: [], YsletaData: [], BOTAData: [], dataLoaded: false
    }
    let pdnColor = "#FDD835";
    let ysletaColor = "#FF9800";
    let botaColor = "#304FFE";
    
    /*populates the above dictionaries with json data.shape_arr. Index 0 of all dictionaries represents 
    data from 2014; index 1 stores data from 2015, and so on.*/ 
   
/**
 ** There are 4 types of mode
 ** Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
 ** Mode 1: Regional Performance Points and data
 ** Mode 2: Corridor Performance Points and data
**Mode 3: Corridor Data only, data for benchmark
** Mode 4: AOI
 */
    function pm13Data(mode,data_for_php) {

        $.get( php_handler,to_php).done(function(data) {
            
            for (let i = 0; i < data.shape_arr.PSGRVEH.length; i++) {
                
                if (data.PSGRVEH[i].Period == "2014") {

                    pm13DrivingData.PDN.push(parseInt(data.PSGRVEH[i].PDN));
                    pm13DrivingData.Ysleta.push(parseInt(data.PSGRVEH[i].Ysleta));
                    pm13DrivingData.BOTA.push(parseInt(data.PSGRVEH[i].BOTA));
                    pm13DrivingData.Stanton.push(parseInt(data.PSGRVEH[i]["Stanton DCL"]));
                    pm13DrivingData.YsletaDCL.push(parseInt(data.PSGRVEH[i]["Ysleta DCL"]));

                } else if (data.PSGRVEH[i].Period == "2015") {
                    pm13DrivingData.PDN.push(parseInt(data.PSGRVEH[i].PDN));
                    pm13DrivingData.Ysleta.push(parseInt(data.PSGRVEH[i].Ysleta));
                    pm13DrivingData.BOTA.push(parseInt(data.PSGRVEH[i].BOTA));
                    pm13DrivingData.Stanton.push(parseInt(data.PSGRVEH[i]["Stanton DCL"]));
                    pm13DrivingData.YsletaDCL.push(parseInt(data.PSGRVEH[i]["Ysleta DCL"]));

                } else if (data.PSGRVEH[i].Period == "2016") {
                    pm13DrivingData.PDN.push(parseInt(data.PSGRVEH[i].PDN));
                    pm13DrivingData.Ysleta.push(parseInt(data.PSGRVEH[i].Ysleta));
                    pm13DrivingData.BOTA.push(parseInt(data.PSGRVEH[i].BOTA));
                    pm13DrivingData.Stanton.push(parseInt(data.PSGRVEH[i]["Stanton DCL"]));
                    pm13DrivingData.YsletaDCL.push(parseInt(data.PSGRVEH[i]["Ysleta DCL"]));

                } else if (data.PSGRVEH[i].Period == "2017") {
                    pm13DrivingData.PDN.push(parseInt(data.PSGRVEH[i].PDN));
                    pm13DrivingData.Ysleta.push(parseInt(data.PSGRVEH[i].Ysleta));
                    pm13DrivingData.BOTA.push(parseInt(data.PSGRVEH[i].BOTA));
                    pm13DrivingData.Stanton.push(parseInt(data.PSGRVEH[i]["Stanton DCL"]));
                    pm13DrivingData.YsletaDCL.push(parseInt(data.PSGRVEH[i]["Ysleta DCL"]));

                } else if (data.PSGRVEH[i].Period == "2018") {
                    pm13DrivingData.PDN.push(parseInt(data.PSGRVEH[i].PDN));
                    pm13DrivingData.Ysleta.push(parseInt(data.PSGRVEH[i].Ysleta));
                    pm13DrivingData.BOTA.push(parseInt(data.PSGRVEH[i].BOTA));
                    pm13DrivingData.Stanton.push(parseInt(data.PSGRVEH[i]["Stanton DCL"]));
                    pm13DrivingData.YsletaDCL.push(parseInt(data.PSGRVEH[i]["Ysleta DCL"]));
                    
                    //console.table(pm13DrivingData);
                   
                    
                }
            }

            /*Calculating Freight data */
            for (let i = 0; i < data.shape_arr.FREIGHT.length; i++) {
                //come back here
                if (data.FREIGHT[i].Period == "2014") {

                   
                     let myString = data.shape_arr.FREIGHT[i].Ysleta; //this field has commas and they are producing errors, so I'm going to get rid of them
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13FreightData.YsletaFreight.push(parseInt(myString));;
                    
                    myString = data.shape_arr.FREIGHT[i].BOTA;
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13FreightData.BOTAFreight.push(parseInt(myString));

                }
                 else if (data.PSGRVEH[i].Period == "2015") {
                    let myString = data.shape_arr.FREIGHT[i].Ysleta; //this field has commas and they are producing errors, so I'm going to get rid of them
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13FreightData.YsletaFreight.push(parseInt(myString));;
                    
                    myString = data.shape_arr.FREIGHT[i].BOTA;
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13FreightData.BOTAFreight.push(parseInt(myString));
                } 
                else if (data.PSGRVEH[i].Period == "2016") {
                    let myString = data.shape_arr.FREIGHT[i].Ysleta; //this field has commas and they are producing errors, so I'm going to get rid of them
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13FreightData.YsletaFreight.push(parseInt(myString));;
                    
                    myString = data.shape_arr.FREIGHT[i].BOTA;
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13FreightData.BOTAFreight.push(parseInt(myString));
                } 
                else if (data.PSGRVEH[i].Period == "2017") {
                    let myString = data.shape_arr.FREIGHT[i].Ysleta; //this field has commas and they are producing errors, so I'm going to get rid of them
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13FreightData.YsletaFreight.push(parseInt(myString));;
                    
                    myString = data.shape_arr.FREIGHT[i].BOTA;
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13FreightData.BOTAFreight.push(parseInt(myString));
                } 
                else if (data.PSGRVEH[i].Period == "2018") {
                    let myString = data.shape_arr.FREIGHT[i].Ysleta; //this field has commas and they are producing errors, so I'm going to get rid of them
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13FreightData.YsletaFreight.push(parseInt(myString));;
                    
                    myString = data.shape_arr.FREIGHT[i].BOTA;
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13FreightData.BOTAFreight.push(parseInt(myString));
                }
            }

            /*Calculating Mode data */
            for (let i = 0; i < data.shape_arr.PSGRVEH.length; i++) {
                if (data.PSGRVEH[i].Period == "2014") {

                    pm13ModeData.passengerVehicles.push(parseInt(data.PSGRVEH[i].Total));
                    pm13ModeData.pedestrians.push(parseInt(data.PEDESTRIAN[i].Total));
                    let myString = data.shape_arr.FREIGHT[i].Total; //this field has commas and they are producing errors, so I'm going to get rid of them
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13ModeData.cargoTrucks.push(parseInt(myString));
                }
                 else if (data.PSGRVEH[i].Period == "2015") {
                    pm13ModeData.passengerVehicles.push(parseInt(data.PSGRVEH[i].Total));
                    pm13ModeData.pedestrians.push(parseInt(data.PEDESTRIAN[i].Total));
                    let myString = data.shape_arr.FREIGHT[i].Total; //this field has commas and they are producing errors, so I'm going to get rid of them
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13ModeData.cargoTrucks.push(parseInt(myString));
                } 
                else if (data.PSGRVEH[i].Period == "2016") {
                    pm13ModeData.passengerVehicles.push(parseInt(data.PSGRVEH[i].Total));
                    pm13ModeData.pedestrians.push(parseInt(data.PEDESTRIAN[i].Total));
                    let myString = data.shape_arr.FREIGHT[i].Total; //this field has commas and they are producing errors, so I'm going to get rid of them
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13ModeData.cargoTrucks.push(parseInt(myString));
                } 
                else if (data.PSGRVEH[i].Period == "2017") {
                    pm13ModeData.passengerVehicles.push(parseInt(data.PSGRVEH[i].Total));
                    pm13ModeData.pedestrians.push(parseInt(data.PEDESTRIAN[i].Total));
                    let myString = data.shape_arr.FREIGHT[i].Total; //this field has commas and they are producing errors, so I'm going to get rid of them
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13ModeData.cargoTrucks.push(parseInt(myString));
                } 
                else if (data.PSGRVEH[i].Period == "2018") {
                    pm13ModeData.passengerVehicles.push(parseInt(data.PSGRVEH[i].Total));
                    pm13ModeData.pedestrians.push(parseInt(data.PEDESTRIAN[i].Total));
                    let myString = data.shape_arr.FREIGHT[i].Total; //this field has commas and they are producing errors, so I'm going to get rid of them
                    myString = myString.replace(/,/g, ''); //gets rid of the commas
                    pm13ModeData.cargoTrucks.push(parseInt(myString));
                   
                    //console.table(pm13ModeData);
                    
                }
            }
                 /*Calculating Walking data */
            for (let i = 0; i < data.shape_arr.PEDESTRIAN.length; i++) {
                if (data.PEDESTRIAN[i].Period == "2014") {

                    pm13WalkingData.PDNWalking.push(parseInt(data.PEDESTRIAN[i].PDN));
                    pm13WalkingData.ysletaWalking.push(parseInt(data.PEDESTRIAN[i].Ysleta));
                    pm13WalkingData.BOTA.push(parseInt(data.PEDESTRIAN[i].BOTA));
                }
                 else if (data.PSGRVEH[i].Period == "2015") {
                    pm13WalkingData.PDNWalking.push(parseInt(data.PEDESTRIAN[i].PDN));
                    pm13WalkingData.ysletaWalking.push(parseInt(data.PEDESTRIAN[i].Ysleta));
                    pm13WalkingData.BOTA.push(parseInt(data.PEDESTRIAN[i].BOTA));
                } 
                else if (data.PSGRVEH[i].Period == "2016") {
                    pm13WalkingData.PDNWalking.push(parseInt(data.PEDESTRIAN[i].PDN));
                    pm13WalkingData.ysletaWalking.push(parseInt(data.PEDESTRIAN[i].Ysleta));
                    pm13WalkingData.BOTA.push(parseInt(data.PEDESTRIAN[i].BOTA));
                } 
                else if (data.PSGRVEH[i].Period == "2017") {
                    pm13WalkingData.PDNWalking.push(parseInt(data.PEDESTRIAN[i].PDN));
                    pm13WalkingData.ysletaWalking.push(parseInt(data.PEDESTRIAN[i].Ysleta));
                    pm13WalkingData.BOTA.push(parseInt(data.PEDESTRIAN[i].BOTA));
                } 
                else if (data.PSGRVEH[i].Period == "2018") {
                    pm13WalkingData.PDNWalking.push(parseInt(data.PEDESTRIAN[i].PDN));
                    pm13WalkingData.ysletaWalking.push(parseInt(data.PEDESTRIAN[i].Ysleta));
                    pm13WalkingData.BOTA.push(parseInt(data.PEDESTRIAN[i].BOTA));
                   
                    
                    loadDrivingData();
                    loadFreightData();
                    loadWalkingData();

                }
            }
        document.getElementById("pm13DText").innerHTML = commafy(pm13Calculations.average);
        document.getElementById("pm13FText").innerHTML = commafy(pm13Calculations.avgFreight);
        document.getElementById("pm13WText").innerHTML = commafy(pm13Calculations.avgWalking);
       
        });
    }

    function loadDrivingData(){
//creates data points for Driving Chart
driving.PDNData        =   [pm13DrivingData.PDN[0],pm13DrivingData.PDN[1],pm13DrivingData.PDN[2],pm13DrivingData.PDN[3],pm13DrivingData.PDN[4]]; 
driving.YsletaData     =   [pm13DrivingData.Ysleta[0],pm13DrivingData.Ysleta[1],pm13DrivingData.Ysleta[2],pm13DrivingData.Ysleta[3],pm13DrivingData.Ysleta[4]]; 
driving.BOTAData       =   [pm13DrivingData.BOTA[0],pm13DrivingData.BOTA[1],pm13DrivingData.BOTA[2],pm13DrivingData.BOTA[3],pm13DrivingData.BOTA[4]]; 
driving.StantonDCLData =   [pm13DrivingData.Stanton[0],pm13DrivingData.Stanton[1],pm13DrivingData.Stanton[2],pm13DrivingData.Stanton[3],pm13DrivingData.Stanton[4]]; 
driving.YsletaDCL      =   [pm13DrivingData.YsletaDCL[0],pm13DrivingData.YsletaDCL[1],pm13DrivingData.YsletaDCL[2],pm13DrivingData.YsletaDCL[3],pm13DrivingData.YsletaDCL[4]];

//loads text under driving graph that says "On average ___ personal vehicles . . ."
loadDrivingTextData(driving.PDNData,driving.YsletaData,driving.BOTAData,driving.StantonDCLData,driving.YsletaDCL);

    }

    function loadFreightData(){
                    //creates data points for freight graph
                    freight.YsletaData     =   [pm13FreightData.YsletaFreight[0],pm13FreightData.YsletaFreight[1],pm13FreightData.YsletaFreight[2],pm13FreightData.YsletaFreight[3],pm13FreightData.YsletaFreight[4]]; 
                    freight.BOTAData       =   [pm13FreightData.BOTAFreight[0],pm13FreightData.BOTAFreight[1],pm13FreightData.BOTAFreight[2],pm13FreightData.BOTAFreight[3],pm13FreightData.BOTAFreight[4]]; 
                    loadFreightTextData();

    }
    
    function loadWalkingData(){
        walking.YsletaData     =   [pm13WalkingData.ysletaWalking[0],pm13WalkingData.ysletaWalking[1],pm13WalkingData.ysletaWalking[2],pm13WalkingData.ysletaWalking[3],pm13WalkingData.ysletaWalking[4]]; 
                     walking.BOTAData       =   [pm13WalkingData.BOTA[0],pm13WalkingData.BOTA[1],pm13WalkingData.BOTA[2],pm13WalkingData.BOTA[3],pm13WalkingData.BOTA[4]];
                     walking.PDNData       =   [pm13WalkingData.PDNWalking[0],pm13WalkingData.PDNWalking[1],pm13WalkingData.PDNWalking[2],pm13WalkingData.PDNWalking[3],pm13WalkingData.PDNWalking[4]];
                     loadWalkingText(walking.YsletaData, walking.BOTAData, walking.PDNData);
                     walking.dataLoaded = true;
                    
    }

    
    function pm13ModeGraph(ctx){
        //line chart data
        var passengerVechiclesData = [pm13ModeData.passengerVehicles[0],pm13ModeData.passengerVehicles[1],pm13ModeData.passengerVehicles[2],pm13ModeData.passengerVehicles[3],pm13ModeData.passengerVehicles[4]]; 
        var pedestriansData = [pm13ModeData.pedestrians[0],pm13ModeData.pedestrians[1],pm13ModeData.pedestrians[2],pm13ModeData.pedestrians[3],pm13ModeData.pedestrians[4]];
        var cargoTrucksData = [pm13ModeData.cargoTrucks[0],pm13ModeData.cargoTrucks[1],pm13ModeData.cargoTrucks[2],pm13ModeData.cargoTrucks[3],pm13ModeData.cargoTrucks[4]];
        var NorthboundData = [];
        NorthboundData[0] = passengerVechiclesData[0] + pedestriansData[0] + cargoTrucksData[0];
        NorthboundData[1] = passengerVechiclesData[1] + pedestriansData[1] + cargoTrucksData[1];
        NorthboundData[2] = passengerVechiclesData[2] + pedestriansData[2] + cargoTrucksData[2];
        NorthboundData[3] = passengerVechiclesData[3] + pedestriansData[3] + cargoTrucksData[3];
        NorthboundData[4] = passengerVechiclesData[4] + pedestriansData[4] + cargoTrucksData[4];

        
        var data = {
           labels: ['2014', '2015', '2016', '2017', '2018'],
           datasets: [
               {
               label: "Passenger Vechicles",
               data: passengerVechiclesData,
               backgroundColor: "lightgreen",
               borderColor: "lightgreen",
               fill: false,
               lineTension: 0,
               radius: 5
               },
               {
               label: "Pedestrians",
               data: pedestriansData,
               backgroundColor: "purple",
               borderColor: "purple",
               fill: false,
               lineTension: 0,
               radius: 5
               },
               {
                label: "Cargo Trucks",
                data: cargoTrucksData,
                backgroundColor: "lightblue",
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
                },
                 {
                label: "Northbound Crossing count",
                data: NorthboundData,
                backgroundColor: "#009688",
                borderColor: "#009688",
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
                    //To add commas on the y Axis of the graph
                    ticks: {
                        beginAtZero:true,
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                    },
                    scaleLabel: {
                    display: true,
                    }
                }]},
                // The tooltips sections adds commas to hoover text
                tooltips: {
                    mode: 'label',
                    label: 'mylabel',
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
                 },
         
     
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
                    text: 'Northbound Crossings by Mode'
                }
            }
       });
    }

    function pm13DrivingChart(ctx){ 
    var data = {
       labels: ['2014', '2015', '2016', '2017', '2018'],
       datasets: [
           {
           label: "PDN",
            data: driving.PDNData,
            backgroundColor: pdnColor,
            borderColor: pdnColor,
            fill: false,
            lineTension: 0,
            radius: 5
           },
           {
            label: "Ysleta",
            data: driving.YsletaData,
            backgroundColor: ysletaColor,
            borderColor: ysletaColor,
            fill: false,
            lineTension: 0,
            radius: 5
           },
           {
            label: "BOTA",
            data: driving.BOTAData,
            backgroundColor: botaColor,
            borderColor: botaColor,
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Stanton DCL",
            data: driving.StantonDCLData,
            backgroundColor: "#FF5722", 
            borderColor: "#FF5722",
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Ysleta DCL",
            data: driving.YsletaDCL,
            backgroundColor: "#FFB74D",
            borderColor: "#FFB74D",
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
                ticks: {
                    beginAtZero:true,
                    userCallback: function(value, index, values) {
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        return value;
                    }
                },
                scaleLabel: {
                display: true,
             }
         }]},
         tooltips: {
            mode: 'label',
            label: 'mylabel',
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
         },
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
            text: 'Northbound Crossing of Passenger Vehicles'
        }
    }
   });
}
    
    
    function sumAllValuesOfArrays(PDNData,YsletaData,BOTAData,StantonDCLData,YsletaDCL){
        //sums all the values inside of given arrays (e.g. [0,1,2,3] = 6, for all arrays given)
         pm13Calculations.totalPDNDriving = PDNData.reduce(
      ( accumulator, currentValue ) => accumulator + currentValue,
      0
    );
          pm13Calculations.totalYsletaDriving = YsletaData.reduce(
      ( accumulator, currentValue ) => accumulator + currentValue,
      0
    );
          pm13Calculations.totalBOTADriving = BOTAData.reduce(
      ( accumulator, currentValue ) => accumulator + currentValue,
      0
    );
          pm13Calculations.totalStantonDriving = StantonDCLData.reduce(
      ( accumulator, currentValue ) => accumulator + currentValue,
      0
    );
          pm13Calculations.totalYsletaDCLDriving = YsletaDCL.reduce(
      ( accumulator, currentValue ) => accumulator + currentValue,
      0
    );
    
    }
    
    
    function getAverage(num1, num2, num3, num4, num5){
        let avg = num1+num2+num3+num4+num5;
        pm13Calculations.average = avg/5;
    
    }
    
    function loadDrivingTextData(PDNData,YsletaData,BOTAData,StantonDCLData,YsletaDCL){
        sumAllValuesOfArrays(PDNData,YsletaData,BOTAData,StantonDCLData,YsletaDCL);
        getAverage(pm13Calculations.totalPDNDriving,pm13Calculations.totalYsletaDriving,pm13Calculations.totalBOTADriving,pm13Calculations.totalStantonDriving,pm13Calculations.totalYsletaDCLDriving)
        getPortWithHighestTraffic(pm13Calculations.totalPDNDriving,pm13Calculations.totalYsletaDriving,pm13Calculations.totalBOTADriving,pm13Calculations.totalStantonDriving,pm13Calculations.totalYsletaDCLDriving)
        if( pm13Calculations.totalPDNDriving === pm13Calculations.highestPortNumber) pm13Calculations.portWithHighestTrafficName = "Pedestrian"
        else if( pm13Calculations.totalYsletaDriving === pm13Calculations.highestPortNumber) pm13Calculations.portWithHighestTrafficName = "Ysleta"
        else if( pm13Calculations.totalBOTADriving === pm13Calculations.highestPortNumber) pm13Calculations.portWithHighestTrafficName = "BOTA"
        else if( pm13Calculations.totalStantonDriving === pm13Calculations.highestPortNumber) pm13Calculations.portWithHighestTrafficName = "Stanton DCL"
        else if( pm13Calculations.totalYsletaDCLDriving=== pm13Calculations.highestPortNumber) pm13Calculations.portWithHighestTrafficName = "Ysleta DCL"
    }
    
    
    function getPortWithHighestTraffic(port1, port2, port3, port4, port5){
        let bigPort = Math.max(port1, port2, port3, port4, port5);
        pm13Calculations.highestPortNumber = bigPort;
    }
    
    
    function pm13FreightChart(ctx){
        var data = {
           labels: ['2014', '2015', '2016', '2017', '2018'],
           datasets: [
               
               {
               label: "Ysleta",
               data: freight.YsletaData,
               backgroundColor: ysletaColor,
               borderColor: ysletaColor,
               fill: false,
               lineTension: 0,
               radius: 5
               },
               {
                label: "BOTA",
                data: freight.BOTAData,
                backgroundColor: botaColor,
                borderColor: botaColor,
                fill: false,
                lineTension: 0,
                radius: 5
                },
                
           ]
       };
 
       //create Chart class object
       var chart = new Chart(ctx, {
           type: "line",
           data: data,
           options: {
           scales:{
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    userCallback: function(value, index, values) {
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        return value;
                    }
                },
                scaleLabel: {
                display: true,
             }
         }]},
            responsive: true,
         title: {
            display: true,
            text: 'Northbound Crossing of Cargo Trucks'
        },
        tooltips: {
            mode: 'label',
            label: 'mylabel',
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
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
        }

       });
    
    //console.table(pm13Calculations);
    }

    function loadFreightTextData(){

       let YsletaPort = pm13Calculations.totalYsletaFreight;
       let BOTAPort = pm13Calculations.totalBOTAFreight;
       let bigPort = -1;
       pm13Calculations.avgFreight = Math.floor(getAverageOfCommercialVehicles(freight.YsletaData,freight.BOTAData));
       bigPort = getPortWithHighestCMVTraffic(YsletaPort, BOTAPort);
       if(YsletaPort === bigPort) 
           pm13Calculations.portWithHighestTrafficNameFreight = "Ysleta";
       else if(BOTAPort === bigPort)
           pm13Calculations.portWithHighestTrafficNameFreight = "BOTA";
    }
    
    function getPortWithHighestCMVTraffic(port1, port2){
        /*returns the highest value of the two ports & stores it in pm13Calculations.highestPortNumber
        this number is later used to determine which port was biggest*/
        let biggerPort = Math.max(port1, port2);
        return biggerPort;
    }
    
    function getAverageOfCommercialVehicles(BOTAData,YsletaData){
        let avg = 0;
        //storing the sum of all values of YsletaData inside of totalYsletaFreight
        pm13Calculations.totalYsletaFreight = YsletaData.reduce(
            ( accumulator, currentValue ) => accumulator + currentValue,
            0
          );
        //storing the sum of all values of BOTAData inside of totalBOTAFreight
        pm13Calculations.totalBOTAFreight = BOTAData[0] + BOTAData[1] + BOTAData[2] + BOTAData[3] + BOTAData[4];
    
         avg = (pm13Calculations.totalYsletaFreight + pm13Calculations.totalBOTAFreight)/2
         return avg;
    }
    
    function sumAllValuesOfArraysAndGetAverage(YsletaData, BOTAData, PDNData){
        
        pm13Calculations.totalPDNWalking = PDNData.reduce(
            ( accumulator, currentValue ) => accumulator + currentValue,
            0
          );
                pm13Calculations.totalYsletaWalking = YsletaData.reduce(
            ( accumulator, currentValue ) => accumulator + currentValue,
            0
          );
                pm13Calculations.totalBOTAWalking = BOTAData.reduce(
            ( accumulator, currentValue ) => accumulator + currentValue,
            0
          );
        
          pm13Calculations.avgWalking = (pm13Calculations.totalBOTAWalking + pm13Calculations.totalYsletaWalking + pm13Calculations.totalPDNWalking)/3
    
    }
    
function loadWalkingText(YsletaData, BOTAData, PDNData){
    sumAllValuesOfArraysAndGetAverage(walking.YsletaData, walking.BOTAData, walking.PDNData);
        //getting highest pedestrian traffic port
            let bigPort = Math.max(pm13Calculations.totalPDNWalking,pm13Calculations.totalYsletaWalking,pm13Calculations.totalBOTAWalking);
            if (pm13Calculations.totalYsletaWalking === bigPort) 
                pm13Calculations.portWithHighestTrafficNameWalking = "Ysleta";
    
            else if(pm13Calculations.totalBOTAWalking === bigPort) 
                pm13Calculations.portWithHighestTrafficNameWalking = "BOTA";
    
            else if(pm13Calculations.totalPDNWalking === bigPort) 
                pm13Calculations.portWithHighestTrafficNameWalking = "PDN";
}

function pm13WalkingChart(ctx){
        var data = {
           labels: ['2014', '2015', '2016', '2017', '2018'],
           datasets: [
            {
                label: "PDN",
                data: walking.PDNData,
                backgroundColor: pdnColor,
                borderColor: pdnColor,
                fill: false,
                lineTension: 0,
                radius: 5
                },
               {
               label: "Ysleta",
               data: walking.YsletaData,
               backgroundColor: ysletaColor,
               borderColor: ysletaColor,
               fill: false,
               lineTension: 0,
               radius: 5
               },
               {
                label: "BOTA",
                data: walking.BOTAData,
                backgroundColor: botaColor,
                borderColor: botaColor,
                fill: false,
                lineTension: 0,
                radius: 5
                },
                
           ]
       };
    
       
       
    
       //create Chart class object
       var chart = new Chart(ctx, {
           type: "line",
           data: data,
           
                 options: {
        scales:{
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    userCallback: function(value, index, values) {
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        return value;
                    }
                },
                scaleLabel: {
                display: true,
             }
         }]},
         tooltips: {
            mode: 'label',
            label: 'mylabel',
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
         },
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
            text: 'Northbound Crossing of Pedestrians'
        }
        }
       
       });
    
}