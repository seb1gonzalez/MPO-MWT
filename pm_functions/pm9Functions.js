//**************************************************************** pm5 shares table with pm9 on database
//Handles 2 toggles of Exist/Plan for Polygons.

function pm9Data(mode, condition) {

    let pm9Data = {
        totPop: 0, //The summation of people living in the proposed & planned areas
        peopleLivingTransit: 0,
        totalpeopleLivingTransit:0,
        ratioPop: 0 // population for existing ONLY
    };

    let key = 'all_pm9';
    let example = { key: key};
    let color = "#039BE5";
    let totRatioPop = 0;

    $.get('mwt_handler.php', example, function (data) {
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index]['shape']);
            let to_visualize = [];
            let status = data.shape_arr[index].status;
            let pop = data.shape_arr[index].b00001e1;
            let ratioPop = data.shape_arr[index].ratio_pop;

            // update Text Data
            if (status == "exist") {
                pm9Data.ratioPop += parseInt(ratioPop);
            }
       
            pm9Data.totPop += parseInt(pop); // sumation of people living in proposed and planned areas
            totRatioPop += parseInt(ratioPop);
            // if the status of a shape exists, push to visualize
            for (let i = 0; i < temp.length; i++) {
                if (status == "exist" && condition == "e") {
                    color = "#039BE5";//blue
                    to_visualize.push(temp[i]);
                    polyToErase.exist.push();
                } else if (status == "planned" && condition == "p") {
                    color = "#9E9E9E"; //gray
                    to_visualize.push(temp[i]);
                    polyToErase.plan.push();
                }

            }
            let polygon = new google.maps.Polygon({
                description: "",
                description_value: '',
                paths: to_visualize,
                strokeColor: 'black',
                strokeOpacity: 0.60,
                strokeWeight: 0.70,
                fillColor: color,
                fillOpacity: 0.60,
                zIndex: -1,
                title: Math.round(ratioPop),
            });

            if (condition == "e") polyToErase.exist.push(polygon);
            if (condition == "p") polyToErase.plan.push(polygon);

            // Hover Effect for Google API Polygons
            google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
            google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

            polygon.setMap(map);
            polygons.push(polygon);
        }

        /*In EXISTING only, get the summation of all the values in the Ratio_Pop column. For the percentage, use this summation, 
         * then divide that by the total number of jobs((Ratio_Pop / Total Population) * 100) */
        pm9Data.peopleLivingTransit = ((pm9Data.ratioPop / pm9Data.totPop) * 100);

        // ((Ratio_Pop /Total Pop) *100).
        pm9Data.totalpeopleLivingTransit = ((totRatioPop / pm9Data.totPop) * 100);
   


        if (mode == 0) {
            document.getElementById("pm9Text").innerHTML = String(pm9Data.peopleLivingTransit.toFixed()) + "%"; // menu text
        } else if (mode == 1) {
            regionalText(pm9Data);
        }
    });

}


function pm9chart(g2,data) {
    colors=[];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];
    let tot = 100 - data.peopleLivingTransit.toFixed(2);
    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                data: [tot, data.peopleLivingTransit.toFixed(2)],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Total Population',
                'Population within 0.5 mi from proposed high-quality rapid transit',
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

    