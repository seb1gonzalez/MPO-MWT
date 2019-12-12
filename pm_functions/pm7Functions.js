
function pm7HorizontalBar(ctx){
    var myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels:["Millitary Base","Airport","University/College", "Transit Center", "Shelter", "Prison/jail", "Nursing Home", "Natural and heritage", "Mall", "Leisure Time Activity", "Hospital"],
            datasets:[
                {
                    label:"Number of Key Destinations in El Paso MPO Region",
                    data:[1,5,8,5,6,7,8,9,4,6,11],
                    fill: false,
                    backgroundColor:['rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)' ],
                    borderColor:['rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)'],
                    borderWidth:1
                },
                {
                    label:"Number of Key Destinations in 0.5 mi of high-quality rapid transit",
                    data:[1,5,8,4,8,9,6,3,4,7,8],
                    fill: false,
                    backgroundColor:['rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)'],
                    borderColor:['rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)'],
                    borderWidth:1
                },

            ]
        },
                
        options:{
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: 11, //changes the two little boxes' text on the bottom of the graph
                    boxWidth:15
                }
            },
             title: {
                display: true,
                text: 'Key Destinations in the El Paso MPO region in 0.5 mi of existing high-quality rapid transit'
            },
            scales:{
                xAxes:[{
                    ticks:{
                        beginAtZero:true
                    }
                }
            ]}
        }
                       
    
        
    });
}

function pm7HorizontalBar2(ctx){
    var myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels:["Millitary Base","Airport","University/College", "Transit Center", "Shelter", "Prison/jail", "Nursing Home", "Natural and heritage", "Mall", "Leisure Time Activity", "Hospital"],
            datasets:[
                {
                    label:"Number of Key Destinations in El Paso MPO Region",
                    data:[1,5,8,5,6,7,8,9,4,6,11],
                    fill: false,
                    backgroundColor:['rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)','rgb(255,112,67)' ],
                    borderColor:['rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)','rgb(255,87,34)'],
                    borderWidth:1
                },
                {
                    label:"Number of Key Destinations in 0.5 mi of high-quality rapid transit",
                    data:[1,5,8,4,8,9,6,3,4,7,8],
                    fill: false,
                    backgroundColor:['rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)','rgba(33,150,243 ,1)'],
                    borderColor:['rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)','rgb(33,150,243)'],
                    borderWidth:1
                },

            ]
        },
                
        options:{
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: 11, //changes the two little boxes' text on the bottom of the graph
                    boxWidth:15
                }
            },
             title: {
                display: true,
                text: 'Key Destinations in the El Paso MPO region'
            },
            scales:{
                xAxes:[{
                    ticks:{
                        beginAtZero:true
                    }
                }
            ]}
        }
                       
    
        
    });
}
