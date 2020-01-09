//  ** There are 4 types of mode
//  ** Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
//  ** Mode 1: Regional Performance Points and data
//  ** Mode 2: Corridor Performance Points and data
// **Mode 3: Corridor Data only, data for benchmark
// ** Mode 4: AOI
//  */
let pdnColor = "#FDD835";
let ysletaColor = "#FF9800";
let botaColor = "#304FFE";
let pm13_years = []; // to store all pm13_years for the 5 year range -- caveat - do not hardcode the pm13_years, or updates will not reflect
let passenger_totals_by_year = []; 
let freight_totals_by_year = [];    
let pedestrian_totals_by_year = []; 
let northbound_totals_by_year = []; 
let data_by_mode = {
    'driving':{
        pdn:[],
        ysleta:[],
        bota:[],
        stanton_dcl:[], 
        ysleta_dcl: [] ,
    },
    'walking':{
        pdn:[],
        ysleta:[],
        bota:[],
        stanton_dcl:[], 
        ysleta_dcl: [] ,
    },
    'freight':{
        pdn:[],
        ysleta:[],
        bota:[],
        stanton_dcl:[], 
        ysleta_dcl: [] ,
    },
    

}

function pm13Data(mode,data){
    let php_handler = './mwt_handler.php';
    let data_for_php = {'key':'all_pm13_14'};
    // if mode == x ...
    $.get(php_handler,data_for_php).done(function(data) {//succesful
        alert("success");
       console.table(data);
        let all_pm13_data = 
        {
            bridge_data: {
                    year:[],
                    pdn:[],
                    ysleta:[],
                    bota:[],
                    stanton_dcl:[], 
                    ysleta_dcl: [] ,
                    total:[],
                    mode:[]
            },
            bridge_points:{
                port_name:[],
                port_point:[]
            },
        };
        let length = data.shape_arr.length;
        for (let index = 0; index < length; index++) {
            // How to distinguish between the two different dictionaries -- check if key is undefined
            const curr_index =data.shape_arr[index];
            if(curr_index.port_of_en === undefined){ //if  there is no port_of_en  in this dictionary, then this is bridge data dictionary
                //save bridge data
                all_pm13_data.bridge_data.year.push( curr_index.Period );                          // store the year
                all_pm13_data.bridge_data.pdn.push(curr_index.PDN);                               // store PDN
                all_pm13_data.bridge_data.ysleta.push( curr_index.Ysleta);                        // store Ysleta
                all_pm13_data.bridge_data.bota.push(curr_index.BOTA);                           // store Bota
                all_pm13_data.bridge_data.stanton_dcl.push(curr_index.Stanton_DCL);    // store Stanton_DCL
                all_pm13_data.bridge_data.ysleta_dcl.push(curr_index.Ysleta_DCL);        // store Ysleta_DCL
                all_pm13_data.bridge_data.total.push( curr_index.Total);                            // store total
                all_pm13_data.bridge_data.mode.push(curr_index.MODE);                        // store mode
            }
            else{ // store geo-points
                all_pm13_data.bridge_points.port_name.push(curr_index.port_of_en);      //store name of the bridge
                let geoPoint = {
                    lat: parseFloat(curr_index.latitude),
                    lng:parseFloat(curr_index.longitude)
                };
                all_pm13_data.bridge_points.port_point.push(geoPoint);               // store geo-location
            }
        }// end for loop
        load_data_for_graphs(all_pm13_data);
        console.table(all_pm13_data);
        draw_points_pm13(all_pm13_data.bridge_points);
    }).fail(function(error){
            alert("ERROR PM 13");
            console.log(error);
    });
}
function load_data_for_graphs(all_data){
//------------------- SAVE TOTALS DATA BY pm13_years  & SAVE DATA PER MODE / PER BRIDGE ------------------------
let data_length = all_data.bridge_data.year.length; // get the length
for(let i  = 0;   i < data_length; i++ ){
    let year_found = all_data.bridge_data.year[i];       // get the current year stored in array
    let mode_found = all_data.bridge_data.mode[i];  // get the current mode stored in array
    let total_found = all_data.bridge_data.total[i];     // get the current total stored in array
    let pdn_data_found = all_data.bridge_data.pdn[i];     // get the current pdn stored in array
    let ysleta_data_found = all_data.bridge_data.ysleta[i];     // get the current ysleta stored in array
    let bota_data_found = all_data.bridge_data.bota[i];     // get the current bota stored in array
    let stanton_dcl_data_found = all_data.bridge_data.stanton_dcl[i];     // get the current stanton dcl data stored in array
    let ysleta_dcl_data_found = all_data.bridge_data.ysleta_dcl[i];     // get the current ysleta dcl data  stored in array

    if(mode_found == 'psgrveh'){
        passenger_totals_by_year.push(total_found);
        data_by_mode.driving.bota.push(bota_data_found);
        data_by_mode.driving.pdn.push(pdn_data_found);
        data_by_mode.driving.ysleta.push(ysleta_data_found);
        data_by_mode.driving.stanton_dcl.push(stanton_dcl_data_found);
        data_by_mode.driving.ysleta_dcl.push(ysleta_dcl_data_found);
    }
        if(mode_found == 'freight'){
        freight_totals_by_year.push(total_found);
        data_by_mode.freight.bota.push(bota_data_found);
        data_by_mode.freight.pdn.push(pdn_data_found);
        data_by_mode.freight.ysleta.push(ysleta_data_found);
        data_by_mode.freight.stanton_dcl.push(stanton_dcl_data_found);
        data_by_mode.freight.ysleta_dcl.push(ysleta_dcl_data_found);
    }
    if(mode_found == 'pedestrian'){
        pedestrian_totals_by_year.push(total_found);
        data_by_mode.walking.bota.push(bota_data_found);
        data_by_mode.walking.pdn.push(pdn_data_found);
        data_by_mode.walking.ysleta.push(ysleta_data_found);
        data_by_mode.walking.stanton_dcl.push(stanton_dcl_data_found);
        data_by_mode.walking.ysleta_dcl.push(ysleta_dcl_data_found);
    }
    if(pm13_years.includes(year_found)){
        //do nothing; do not include repeated values
    }
    else{// current year is not in array; save it
        pm13_years.push(year_found);
    }
}
for (let index = 0; index < pm13_years.length; index++) {
    let sum =  parseInt(passenger_totals_by_year[index]) + parseInt(freight_totals_by_year[index]) +parseInt(pedestrian_totals_by_year[index]);
    northbound_totals_by_year.push(sum);
}
//    let checking_data = {
//     ' years_found':pm13_years,
//     'pass':passenger_totals_by_year,
//     'freight':freight_totals_by_year,
//     'ped':pedestrian_totals_by_year,
//     'Northbound':northbound_totals_by_year
// }
//  console.table(checking_data);
//  console.table(data_by_mode);

}
function pm13ModeGraph(ctx){ 
        //line chart data
    
    var data = {
        labels: pm13_years,
        datasets: [
            {
            label: "Passenger Vechicles",
            data: passenger_totals_by_year,
            backgroundColor: "lightgreen",
            borderColor: "lightgreen",
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Pedestrians",
            data: pedestrian_totals_by_year,
            backgroundColor: "purple",
            borderColor: "purple",
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Cargo Trucks",
            data: freight_totals_by_year,
            backgroundColor: "lightblue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
            },
                {
            label: "Northbound Crossing count",
            data: northbound_totals_by_year,
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
    labels: pm13_years,
    datasets: [
        {
        label: "PDN",
        data: data_by_mode.driving.pdn,
        backgroundColor: pdnColor,
        borderColor: pdnColor,
        fill: false,
        lineTension: 0,
        radius: 5
        },
        {
        label: "Ysleta",
        data:  data_by_mode.driving.ysleta,
        backgroundColor: ysletaColor,
        borderColor: ysletaColor,
        fill: false,
        lineTension: 0,
        radius: 5
        },
        {
        label: "BOTA",
        data:  data_by_mode.driving.bota,
        backgroundColor: botaColor,
        borderColor: botaColor,
        fill: false,
        lineTension: 0,
        radius: 5
        },
        {
        label: "Stanton DCL",
        data:  data_by_mode.driving.stanton_dcl,
        backgroundColor: "#FF5722", 
        borderColor: "#FF5722",
        fill: false,
        lineTension: 0,
        radius: 5
        },
        {
        label: "Ysleta DCL",
        data: data_by_mode.driving.ysleta_dcl,
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
function pm13FreightChart(ctx){
var data = {
    labels: pm13_years,
    datasets: [
        
        {
        label: "Ysleta",
        data: data_by_mode.freight.ysleta,
        backgroundColor: ysletaColor,
        borderColor: ysletaColor,
        fill: false,
        lineTension: 0,
        radius: 5
        },
        {
        label: "BOTA",
        data: data_by_mode.freight.bota,
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

}
function pm13WalkingChart(ctx){
    var data = {
        labels: pm13_years,
        datasets: [
        {
            label: "PDN",
            data:data_by_mode.walking.pdn,
            backgroundColor: pdnColor,
            borderColor: pdnColor,
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Ysleta",
            data: data_by_mode.walking.ysleta,
            backgroundColor: ysletaColor,
            borderColor: ysletaColor,
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "BOTA",
            data: data_by_mode.walking.bota,
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
function draw_points_pm13(points_data){
    let  image = "./img/markers/grey.png";
    for (let index = 0; index < points_data.port_name.length; index++) {
        let title = points_data.port_name[index];
        let to_visualize = points_data.port_point[index];
        let point = new google.maps.Marker({
            position: to_visualize,
            title: title,
            icon: image
        });
        point.setMap(map);
        points.push(point);
    }
}
let pm13_driving_avg = arr_avg(passenger_totals_by_year);
let pm13_freight_avg = arr_avg(freight_totals_by_year);
let pm13_walking_avg = arr_avg(pedestrian_totals_by_year);
document.getElementById("pm13DText").innerHTML = commafy(pm13_driving_avg);
document.getElementById("pm13FText").innerHTML = commafy(pm13_freight_avg);
document.getElementById("pm13WText").innerHTML = commafy(pm13_walking_avg);