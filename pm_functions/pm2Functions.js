/* Last Edited: Sebastian 11/21/2019 */

/**
 * Data only for pm2
 * [SOV, Walking, Biking, Transit] 
 * For pie chart
 *  */
let for_pm2 = {
    'SOV':[],
    'Walking':[],
    'Biking':[],
    'Transit':[]
}

 /** Keys for GRAPHS:
    valuesPm2[0] = transit
    valuesPm2[1] = biking
    valuesPm2[2] = walking
    valuesPm2[3] = other modes
   stores pie graph values for PM2 */
var valuesPm2 = []; 


/**Creates graph data for PM2*/
function pm2Data(){ // gets valuesPm2 for pm2 graph, returns array with percent
 
    

            
// document.getElementById("pm2-transit").innerHTML = valuesPm2[0] + "%";
// document.getElementById("pm2-biking").innerHTML = valuesPm2[1] + "%";
// document.getElementById("pm2-walking").innerHTML = valuesPm2[2] + "%";

           

}

/** Draws bar chart for pm2*/
function pm2chart1(g1, values){
    myChart = new Chart(g1, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [
            {
                label: 'No Data',
                data: [values[0]],
                backgroundColor: [
                    'rgba(192,192,192 ,1 )',                     
                ],
                borderColor: [
                    'rgba(192,192,192 ,1 )',
            
                ],
                borderWidth: 1
            },
            {
                label: 'Below Mean',
                data: [values[1]],
                backgroundColor: [
                    'rgba(0,204,255,0.5)',                     
                ],
                borderColor: [
                    'rgba(0,204,255,0.5)',
            
                ],
                borderWidth: 1
            },
            {
                label: 'Above Mean',
                data: [values[2]],
                backgroundColor: [
                    'rgba(0,102,204,0.5)',                     
                ],
                borderColor: [
                    'rgba(0,102,204,0.5)',
            
                ],
                borderWidth: 1
            }]
        },
    
        options: {
                responsive: true,
            legend:{
                labels: {
                    fontSize: 12,
                    boxWidth:15
                }
            },
            title: {
                display: true,
                text: 'Number in Each Census Block',
                fontSize:14,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
			            
                    }
                }]
            }
        }
    });
}

/** Draws pie chart for pm2*/
function pm2chart2(g2){
    colors=[];
    colors = [
        'rgba(255,82,0,0.5)',
        'rgba(92,187,3,0.5)',
        'rgba(117,36,221,0.5)',
        'rgba(228,245,20,0.5)',
    ];

    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                data: valuesPm2,
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Transit',
                'Biking',
                'Walking',
                'Other Modes',
            ]
        },
        options: {
            responsive: true,
            legend:{
                labels: {
                    fontSize: 13,
                    boxWidth:15
                }
            },
           /* title: {
                display: true,
                text: 'Title 2'
            },*/
            tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                  }
                }
              }
        }
       
    });
}

 
/** Get SUM of array 
 * | Input: array 
 * | Output: integer || float*/
function arrSum(list){
    let sum= 0;
    list.forEach(element => {
        sum+=1;
    });
    return sum;
}


/** Get AVG of array 
 * | Input: array 
 * | Output: integer || float*/
function arrAvg(list){
    let x= 0;
    x = arrSum(list);
    let avg = x/list.length;
    return avg;
}
   


    

	