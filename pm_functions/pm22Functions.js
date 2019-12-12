

/** 
 * Creates graph for PM22
 * Calculates graph data
 *  
*/
var pm22_crashes = []; // stores year totals for pm22 crashes
let pm22Text = 0;
//stores summation


let pm22_TX_data = {
		    _2013:{injuries:0},
		    _2014:{injuries:0},
		    _2015:{injuries:0},
		    _2016:{injuries:0},
		    _2017:{injuries:0}
			};
let pm22_NM_data = {
		    _2013:{injuries:0},
		    _2014:{injuries:0},
		    _2015:{injuries:0},
		    _2016:{injuries:0},
		    _2017:{injuries:0}
		};


function pm22Data(){
	pm22_crashes = []; // gets valuesPm22 for pm22 graph
    
	$.get("./backend/pm22_data.php",function (myJson) {
       
	// crashes data
    let all_tx_years = myJson.PM22.TX_YEARS;
	let all_nm_years = myJson.PM22.NM_YEARS;
	//console.log(all_tx_years);
	

	let c17 = 0, c16 = 0, c15 = 0, c14 = 0, c13 = 0; // counts per year


	// FOR Texas
	for(let i = 0; i < all_tx_years.length; i++ ){
		if(all_tx_years[i] == "2017"){
			c17++;// crash count
			
			/* FOR INJURIES */
			pm22_TX_data._2017.injuries += parseInt(myJson.PM22.TX_INJURIES[i]);
		
		}
		else if(all_tx_years[i] == "2016"){
			c16++;// crash count
			
			/* FOR INJURIES */
			pm22_TX_data._2016.injuries += parseInt(myJson.PM22.TX_INJURIES[i]);
		}
		else if(all_tx_years[i] == "2015"){
			c15++;// crash count
			/* FOR INJURIES */
			pm22_TX_data._2015.injuries += parseInt(myJson.PM22.TX_INJURIES[i]);
			

		}
		else if(all_tx_years[i] == "2014"){
			c14++;// crash count
			/* FOR INJURIES */
			pm22_TX_data._2014.injuries += parseInt(myJson.PM22.TX_INJURIES[i]);


		}
		else if(all_tx_years[i] == "2013"){	
			c13++;// crash count
			/* FOR INJURIES */
			pm22_TX_data._2013.injuries += parseInt(myJson.PM22.TX_INJURIES[i]);

		}
	}
	
	// now for New Mexico
		for(let i = 0; i < all_nm_years.length; i++ ){
		if(all_nm_years[i] == "2017"){
			c17++;// crash count
			
			/* FOR INJURIES */
			pm22_NM_data._2017.injuries += parseInt(myJson.PM22.NM_INJURIES[i]);
		
		}
		else if(all_nm_years[i] == "2016"){
			c16++;// crash count
			
			/* FOR INJURIES */
			pm22_NM_data._2016.injuries += parseInt(myJson.PM22.NM_INJURIES[i]);
		}
		else if(all_nm_years[i] == "2015"){
			c15++;// crash count
			
			/* FOR INJURIES */
			pm22_NM_data._2015.injuries += parseInt(myJson.PM22.NM_INJURIES[i]);
			

		}
		else if(all_nm_years[i] == "2014"){
			c14++;// crash count
			
			/* FOR INJURIES */
			pm22_NM_data._2014.injuries += parseInt(myJson.PM22.NM_INJURIES[i]);


		}
		else if(all_nm_years[i] == "2013"){	
			c13++;// crash count
			
			/* FOR INJURIES */
			pm22_NM_data._2013.injuries += parseInt(myJson.PM22.NM_INJURIES[i]);

		}
	}	

	pm22_crashes.push(c17);//0
	pm22_crashes.push(c16);//1
	pm22_crashes.push(c15);//2
	pm22_crashes.push(c14);//3
	pm22_crashes.push(c13);//4
	pm22Text = c17+c16+c15+c14+c13;
	document.getElementById("pm22Count").innerHTML = commafy(pm22Text);

        });
}


//  CHARTS 
		/* LINE CHART */
function pm22chartLine(ctx){
let crashes = {
		_2013:pm22_crashes[4],
		_2014:pm22_crashes[3],
		_2015:pm22_crashes[2],
		_2016:pm22_crashes[1],
		_2017:pm22_crashes[0]
		};


    //line chart data
    var data = {
        labels: ["2013", "2014", "2015", "2016", "2017"],
        datasets: [
            {
            label: "Crashes",
            data: [crashes._2013,crashes._2014,crashes._2015 ,crashes._2016 ,crashes._2017],
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Injuries",
            data: [
            		pm22_NM_data._2013.injuries + pm22_TX_data._2013.injuries,
             		pm22_NM_data._2014.injuries + pm22_TX_data._2014.injuries, 
             		pm22_NM_data._2015.injuries + pm22_TX_data._2015.injuries, 
             		pm22_NM_data._2016.injuries + pm22_TX_data._2016.injuries, 
             		pm22_NM_data._2017.injuries + pm22_TX_data._2017.injuries],
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
        display: true,
        position: "top",
        text: "CMP Network",
        fontSize: 16
        
        },
        legend: {
        display: true,
        position: "bottom",
        labels: {
            fontColor: "#000",
            fontSize: 12,
            boxWidth:10
        }
        }
    };

    //create Chart class object
    var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options
    });
	

	//stores summation


	pm22_TX_data = {
			    _2013:{injuries:0},
			    _2014:{injuries:0},
			    _2015:{injuries:0},
			    _2016:{injuries:0},
			    _2017:{injuries:0}
				};
	pm22_NM_data = {
			    _2013:{injuries:0},
			    _2014:{injuries:0},
			    _2015:{injuries:0},
			    _2016:{injuries:0},
			    _2017:{injuries:0}
			};
	}


		/* STACKED BAR CHART */
function pm22StackedChart(ctx){
    var barChartData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'Dataset 1',
				backgroundColor: 'rgba(255,82,0,0.5)',
				data: [
					1,3,8,9,10,7,5
				]
			}, {
				label: 'Dataset 2',
				backgroundColor: 'rgba(92,187,3,0.5)',
				data: [
					5,13,6,8,4,2,1
				]
			}, {
				label: 'DataSet 3',
				backgroundColor: 'rgba(117,36,221,0.5)',
				data: [
					20,7,9,1,0,5,13
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
                    fontSize: 12,
                    boxWidth:10
                }
                },
            title: {
                display: true,
                text: 'CMP Network'
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
                    stacked: true
                }]
            }
        }
    });
	
}

    


    

	
