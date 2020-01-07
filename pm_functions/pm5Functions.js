//**************************************************************** pm5 shares table with pm9 on database
//Handles 2 toggles of Exist/Plan for Polygons.

function pm5Data(mode, status) {
    let pm5Data = {
        tot_jobs: 0,
        ratioPrim: 0,
        ratioPrimTot: 0
    };
    let key = 'all_pm9';
    let example = { key: key };
    let color = "#039BE5";

    $.get('mwt_handler.php', example, function (data) {
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index]['shape']);
            let to_visualize = [];
            let status = data.shape_arr[index].status;
            let prctprim = parseFloat(data.shape_arr[index].prcnt_prim);  //filter values on polygons

            //update Dynamic Data
            if (data.shape_arr[index].status == "exist") {
                pm5Data.ratioPrim += parseInt(data.shape_arr[index].ratio_prim);
            } 
            //both existing and planned
            pm5Data.ratioPrimTot += parseInt(data.shape_arr[index].ratio_prim);
            pm5Data.tot_jobs+= parseInt(data.shape_arr[index].prim_jobs_);  ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          



            // if the status of a shape exists, push to visualize
            for (let i = 0; i < temp.length; i++) {
                if (status == "exist" && status == "e") {
                    color = "#039BE5";//blue
                    to_visualize.push(temp[i]);
                    polyToErase.exist.push();
                } else if (status == "planned" && status == "p") {
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
                title: prctprim.toFixed(2) + "%",
            });
            if (status == "e") polyToErase.exist.push(polygon);
            if (status == "p") polyToErase.plan.push(polygon);

            // Hover Effect for Google API Polygons
            google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
            google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

            polygon.setMap(map);
            polygons.push(polygon);
        }

        pm5Data.ratioPrim = ((pm5Data.ratioPrim / pm5Data.tot_jobs) * 100);
        pm5Data.ratioPrimTot = ((pm5Data.ratioPrimTot / pm5Data.tot_jobs) * 100);


        if (mode == 0) {
            document.getElementById("pm5Text").innerHTML = String(pm5Data.ratioPrim.toFixed(2)) + "%"; // menu text
        } else if (mode == 1) {
            regionalText(pm5Data);
        }
        

    });
}

function pm5chart(g2,data){
    colors=[];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];
    let tot = 100 - (Math.round(data.ratioPrim));
  
    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                data: [tot, Math.round(data.ratioPrim)],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Total Jobs in the El Paso MPO region',
                'Percent of jobs 0.5 mi from existing high-quality rapid transit',
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

    