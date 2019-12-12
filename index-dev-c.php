<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Multimodal Web Tool</title>

    <!-- Pre-made styles from URLs -->
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/css-toggle-switch/latest/toggle-switch.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    
    <!-- Custom styles from CSS folder -->
    <link href="css/sidebar.css" rel="stylesheet" type="text/css">
    <link href="css/legend.css" rel="stylesheet" type="text/css">
    <link href="css/custom.css" rel="stylesheet" type="text/css">
    <link href="css/mwt.css" rel="stylesheet" type="text/css">

    <!-- Loaded Scripts -->
    <script type="text/javascript" src="pm_functions/pm26Functions.js"></script> 
    <script type="text/javascript" src="pm_functions/pm1Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm2Functions.js"></script>
    <script src="js/jquery.js"></script>
    <script src="wireframe/ui/jquery-ui.js"></script>
    <script src="node_modules/chart.js/dist/Chart.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://cdn.rawgit.com/bjornharrtell/jsts/gh-pages/1.4.0/jsts.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCY0B3_Fr1vRpgJDdbvNmrVyXmoOOtiq64&libraries=drawing&callback=initMap"async defer></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col">
			
                <!-- Sidenavbar -->
                <div id="mySidenav" class="sidenav rounded-left mb-2 bg-light text-dark">
                    <div class="p-2">
                        <a  href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>

                        <!-- Main Title for PM -->
                        <div id="title"></div>

                        <!-- Google Chart for PM  -->
                        <div class="row">
                            <div id = 'chart1/2' class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <!--   <canvas id="myChart" width="90%" height="50%"></canvas> -->
                            </div>

                            <div id = 'chart2/2' class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <!-- <canvas id="myChart2" width="90%" height="50%"></canvas> -->
                            </div>
                        </div>
                        <div class="row">
                            <div id = 'chart1' class="col-md-12 col-sm-12 col-xs-12">
                                <!--  <canvas id="single" width="90%" height="50%"></canvas> -->
                            </div>
                        </div>

                        <!-- Subtitles and Information for PM -->
                        <div id="summary-title" class="border-top border-dark"></div>
                        <div id="summary-info"></div>
                        <div id="analysis-title" class="border-top border-dark"></div>
                        <div id="analysis-info"></div>
                        <div id="data-title" class="border-top border-dark"></div>
                        <div id="data-info"></div>
                        <div id="calc-title" class="border-top border-dark"></div>
                        <div id="calc-info"></div>
                    </div>
                </div>

                <!-- Legend -->
                <div id="legendHolder" class="legend">
                     <div  class="row">
                        <div  class="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
                            <div class='my-legend'>
	                            <div id='legend_title'></div>
	                            <div class='legend-scale'>
 	                	            <ul id = "legendList" class='legend-labels'>
    	                                <!-- <li><span style='background:#C0C0C0;'></span>No Data</li>
    	                            	<li><span style='background:#00CCFF;'></span>Below Mean</li>
    		                            <li><span style='background:#BEBADA;'></span>Mean</li>
    		                            <li><span style='background:#0066CC;'></span>Above Mean</li> -->
   		                            </ul>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>

                <!-- Performance Measures Section in Multimodal Corridors -->
                <div id="pms-modal" class="modal fade">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title float-left">Multimodal Performance: El Paso MPO Region</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="accordion" id="accordionExample1">
                                    <div class="card">
                                        <div class="card-header text-center" id="heading1">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                                    Driving
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapse1" class="collapse show" aria-labelledby="heading1" data-parent="#accordionExample1">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                        <div class="card" style="background:rgba(0,255,0,0.5)">
                                                            <button type="button" href="#" value ="pmbridge" data-dismiss="modal" class="btn btn-success" onclick="shape_handler('pmbridge','all_pmbridge','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body text-center">
                                                                    <h5>Bridge</h5>
                                                                    <h5>Condition</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                        <div class="card" style="background:rgba(0,255,0,0.5)">
                                                            <button type="button" href="#" value ="pm1" data-dismiss="modal" class="btn btn-success" onclick="/*shape_handler('pm1-nonsov','all_pm1','polygon');*/ buttonSwitch(this)">
                                                                <div  data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body text-center">
                                                                    <h5 id="pm1-sov"></h5>
                                                                    <h5>of Workers</h5>
                                                                    <h5>Commuting</h5>
                                                                    <h5>Alone</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header text-center" id="heading2">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                                    Freight
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapse2" class="collapse" aria-labelledby="heading2" data-parent="#accordionExample1">
                                            <div class="card-body">
                                                <div class="row">
                                                    <!-- futrue pm bttns here -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header text-center" id="heading3">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                                    Transit
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapse3" class="collapse" aria-labelledby="heading3" data-parent="#accordionExample1">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                        <div class="card" style="background:rgba(0,255,0,0.5)">
                                                            <button type="button" href="#" value="transitWC" data-dismiss="modal" class="btn btn-success" onclick="shape_handler('pm2-transit','all_pm1','polygon');">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body text-center">
                                                                    <h5 id="pm2-transit"></h5>
                                                                    <h5>of Workers</h5>
                                                                    <h5>Commuting</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header text-center" id="heading4">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                                    Walking
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapse4" class="collapse" aria-labelledby="heading4" data-parent="#accordionExample1">
                                            <div class="card-body">
                                                <div class="row">
                                                <div class="col-lg-4 col-md-4 col-sm-4">
                                                        <div class="card" style="background:rgba(0,255,0,0.5)">
                                                            <button type="button" href="#" value="walkingWC" data-dismiss="modal" class="btn btn-success" onclick="shape_handler('pm2-walking','all_pm1','polygon');">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body text-center">
                                                                    <h5 id="pm2-walking"></h5>
                                                                    <h5>of Workers</h5>
                                                                    <h5>Commuting</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header text-center" id="heading5">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                                    Biking
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapse5" class="collapse" aria-labelledby="heading5" data-parent="#accordionExample1">
                                            <div class="card-body">
                                                <div class="row">
                                                <div class="col-lg-4 col-md-4 col-sm-4">
                                                        <div class="card" style="background:rgba(0,255,0,0.5)">
                                                            <button type="button" href="#" value="BikingWC" data-dismiss="modal" class="btn btn-success" onclick="shape_handler('pm2-biking','all_pm1','polygon');">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body text-center">
                                                                    <h5 id="pm2-biking"></h5>
                                                                    <h5>of Workers</h5>
                                                                    <h5>Commuting</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- About PMEPC -->
                <div id="aboutmodal" class="modal fade">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4>MPO Performance Measures for El Paso Corridors</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-header">
                                <p>Interactive web application for visualizing the performance measures of El Paso corridors.</p>
                                <p>Support and funding provided by El Paso Metropolitan Planning Organization.</p>
                            </div>
                            <div class="modal-body">
                                <p>Final Report:</p>
                                <a href="documents/final.pdf">Development of a Sustainable Performance-Based Methodology for Strategic Metropolitan Planning Based on MAP-21</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tutorial -->
                <div id="slidesmodal" class="modal fade" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-xl" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="center-block text-center">Introduction</h4>
                            </div>
                            <div class="center-block text-center modal-header modal-xl">
                                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                                    <!-- Indicators -->
                                    <ol class="carousel-indicators">
                                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                                        <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                                    </ol>

                                    <!-- Wrapper for slides -->
                                    <div class="carousel-inner" width="100%" role="listbox">
                                        <div class="item active">
                                            <img class="center-block text-center" src="./slides/new/Slide1.PNG" alt="">
                                        </div>
                                        <div class="item">
                                            <img class="center-block text-center" src="./slides/new/Slide2.PNG" alt="">
                                        </div>
                                        <div class="item">
                                            <img class="center-block text-center" src="./slides/new/Slide3.PNG" alt="">
                                        </div>
                                        <div class="item">
                                            <img class="center-block text-center" src="./slides/new/Slide4.PNG" alt="">
                                        </div>
                                    </div>

                                    <!-- Controls -->
                                    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Buttons for Sidebar -->
	<div class="wrapper">
        <div class="container-fluid" >
            <div class="row d-flex d-md-block flex-nowrap wrapper">
                <div class="col-md-2 float-left col-1 pl-0 pr-0 collapse width" id="sidebar" >
                    <div class="list-group border-0 card text-center text-md-left">
                        <a href="#menu3" class="list-group-item d-inline-block collapsed" data-toggle="collapse" aria-expanded="false"><i class="fa fa-tasks"></i><span class="d-none d-md-inline">Menu</span></a>
                        <div class="collapse" id="menu3" data-parent="#sidebar">
                            <!-- on clicks: onclick="appear('pm'), onclick="appear('corridor'), onclick="appear('pb'), onclick="appear('pb')-->
                            <!-- hrefs: href="#corridor-modal"-->
                            <a class="list-group-item" href="#pms-modal" data-backdrop="false" data-toggle="modal">Performance Measures</a>
                            <a class="list-group-item" data-backdrop="false" data-toggle="modal">Interactive AOI</a>
                            <a class="list-group-item" data-backdrop="false" data-toggle="modal">Benchmarking</a>
                        </div>
                        <a href="#" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class=""></i><span class="d-none d-md-inline"></span></a>
                        <a href="tutorial.php" target="_blank" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class="fa fa-certificate"></i> <span class="d-none d-md-inline">Tutorial</span></a>
                        <a data-toggle="modal" href="#aboutmodal" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class="fa fa-info"></i> <span class="d-none d-md-inline">About</span></a>
                        <a href="#" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class=""></i><span class="d-none d-md-inline"></span></a>
                        <a onclick="clearMetadata(); closeNav(); closeLegend()" href="#" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class="fa fa-trash-o"></i> <span class="d-none d-md-inline">Clear</span></a>
                        <a onclick="pdf()" href="#" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class="fa fa-print"></i> <span class="d-none d-md-inline">Print</span></a>
                    </div>
                </div>

                <!-- Main Banner/Google Map -->
                <main class="col-md-10 float-left">
                    <nav class="navbar navbar-dark bg-dark">
                        <a href="#" data-target="#sidebar" data-toggle="collapse"><i class="fa fa-navicon fa-2x py-2 p-1"></i></a>
                        <a class="navbar-brand" href="#">Multimodal Web Tool</a>
                    </nav>
                    <div id="map"></div>
                </main>
            </div>
        </div>
    </div>
</body>

<script>
    $.ajax({
        url: 'database_calculations.php',
        success: function(data) { alert('All Performance Measures Have Been Loaded.'); },
        error: function(errorThrown) { $.ajax(this); },
    });
    
    performanceDataLoader();

    var universal = 0; // aids in managing tables on sideBar -B
    
    // lists for the clear bttn functionality -C
    var polylines = [];
    var points = [];
    var polygons = [];

    // used in hover effect for polygons -C
    var coordPropName = null;
    var tipObj = null;
    var offset = {
        x: 20,
        y: 20
    };

    // keeps count of the number in each mode of transportation. Used for bar chart in workers commute. -C
    var count_list = []; count_list[0] = 0; count_list[1] = 0; count_list[2] = 0;
    var no_data_num = 0;
    var low_num = 0;
    var high_num = 0;

    // link for bridge condition
    var txt = "https://www.fhwa.dot.gov/bridge/britab.cfm";

    $(document).ready(function() { // when the document loads
        let map; // global variable for map 
        $.get('mwt_populate_pms.php', function(data){ // ajax call to populate all the pms
            // missing implementation
            // console.log(data);
            // populate programatically
        });
    });

    type="text/javascript"

    // Loads graph Data
    function performanceDataLoader(){
        pm26Percentates(); // needed  <----
        pm2Data();
        pm1Data();
    }

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), { // callback
            zoom: 11,
            center: new google.maps.LatLng(31.837465,-106.2851078),
            mapTypeId: 'terrain'
        });

        infoWindow = new google.maps.InfoWindow;

        map.addListener('click', function(e) {});

        drawingManager = new google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['rectangle', 'polyline', 'polygon']
            },
            rectangleOptions: {
                draggable: true,
                clickable: true,
                editable: true,
                zIndex: 10
            },
            polylineOptions: {
                clickable: true,
                draggable: true,
                editable: false,
                geodesic: true,
                zIndex: 10,
                strokeWeight: 6
            },
            polygonOptions: {
                clickable: true,
                draggable: true,
                editable: false,
                geodesic: true,
                zIndex: 10
            }
        });

        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
            drawingManager.setDrawingMode(null);
            drawingManager.setOptions({
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: ['']
                }
            });

            rec = e.overlay;
            rec.type = e.type;
            payload.AoI = 1;
            setSelection(rec);

            if (rec.type == 'polyline') {
                lineParser();
            } else if (rec.type == 'polygon') {
                polyParser();
            }

            google.maps.event.addListener(rec, 'click', function() {
                if(rec.type == 'polyline') {
                    lineParser();
                } else if(rec.type == 'polygon') {
                    polyParser();
                }
                clickRec(rec);

            });
            google.maps.event.addListener(rec, 'bounds_changed', function() {
                showNewRect2(rec);
            });

            if (rec.type == 'polyline') {
                google.maps.event.addListener(rec, 'dragend', function() {
                    lineParser();
                });
            } else if (rec.type == 'polygon') {
                google.maps.event.addListener(rec, 'dragend', function() { polyParser(); });
            }
        });

        // google.maps.event.addDomListener(document.getElementById('draw'), 'click', drawAnotherRectangle());
        infoWindow = new google.maps.InfoWindow();
    }

    function avg(data) {
        let sum = 0.0;
        for (let i = 0; i < data.length; i++) {
            sum += data[i];
        }
        return sum / data.length;
    }

    function pdf() {
        print();
    }
    
    function shape_handler(found, key, method) {
        fetch('./results.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let example = {key: key};
                if(method == "line") {
                    $.get('mwt_handler.php', example, function(data) { // ajax call to populate pavement lines
                        for(index in data.shape_arr){ // iterates through every index in the returned element (data['shape_arr'])
                            let shp = data.shape_arr[index]['shape']; // shape is LINESTRING or MULTILINESTRING
                            let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
                            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
                            let to_visualize = []; // used to populate the map (latitude & longitude)

                            let coord; // will be an object to push coordinates to populate the map
                            let ln = r.getCoordinates(); // parses the shape into lat & lng
                            for (let i = 0; i < ln.length; i++) {
                                coord = {lat: ln[i]['y'], lng: ln[i]['x']}; // this is how lat & lng is interpreted by the tool
                                to_visualize.push(coord); // pushing the interpretation to our to_visualize array
                            }

                            let line = new google.maps.Polyline({ // it is a POLYLINE
                                path: to_visualize, // polyline has a path, defined by lat & lng 
                                value: data.shape_arr[index]['value'], // iri (attribute for the pavement condition score)
                                strokeColor: 'black',
                                strokeOpacity: 1.0,
                                strokeWeight: 4,
                                zIndex: 99 // on top of every other shape
                            });
                            line.setMap(map);
                            polylines.push(line);
                        //line.addListener('click', lineInfo_pavement); // listener for tooltip; "on'click'"
                        //polygons["pm1"].push(line); // could store into global array for easy/fast erasing and re-populating
                        }
                    });
                } else if (method == "point") {
                    $.get('mwtB_handler.php', example, function(data) { // ajax call to populate points
                        let lowest_values = myJson["PM26_Lowest_Value_2018"];

                        for(index in data.shape_arr){ 
                            //let temp = wktFormatterPoint(data.shape_arr[index]['shape']);
                            //let to_visualize = temp[0][0]; // should fix return method
                            let to_visualize = {lat: parseFloat(data.shape_arr[index].lat_dd), lng: parseFloat(data.shape_arr[index].long_dd)};

                            let bridge_value = lowest_values[index];

                            let image = "./img/markers/old_imgs/black_dot.svg";
				            let point_title = "No data: ";

                            if (bridge_value >= 7 && bridge_value <= 9) { image = "./img/markers/green.png";  point_title= "Good Condition: "}
                            else if (bridge_value >= 5 && bridge_value <= 6) { image = "./img/markers/yellow.png"; point_title= "Fair Condition: "}
                            else if (bridge_value >= 0 && bridge_value <= 4) { image = "./img/markers/red.png";  point_title= "Poor Condition: "}
                            else if (bridge_value == 999 || bridge_value == null) { image = "./img/markers/grey.png"; }

                            let point  = new google.maps.Marker({
                                position: to_visualize,
                                title: point_title + bridge_value + '',
                                value: 'bridge condition',
                                icon: image
                            });
                        
                            //point.addListener('click', pointInfo);
                            point.setMap(map);
                            points.push(point);
                            //points["pm1"].push(point); // could store into global array for easy/fast erasing and re-populating
                        }
                    });
                } else { // polygons
                    if(found == 'pm2-transit' || found == 'pm2-walking'|| found == 'pm2-biking' ){
                        clean()                      
                    }
                      
                    $.get('mwtB_handler.php', example, function(data) { // ajax call to populate pavement lines
                        let res = found.split("-");
                        let pm = res[0];    // pm type 1 or 2
                        let type = res[1];  // mode of transportation type

                        // list of transportations
                        let transportation_modes = [
                            "PM1_pct_NonSOV_e",      // 0
                            "PM2_pct_PublicTrans_e", // 1
                            "PM2_pct_Walking_e",     // 2
                            "PM2_pct_Biking_e",      // 3
                        ];

                        let tx_mean = [ // loaded mean values for tx
                            2.166882,   // transit
                            2.623363,   // walking
                            0.262361    // biking
                        ];

                        let nm_mean = [ // loaded mean values for nm
                            0.645192,   // transit
                            1.516317,   // walking
                            0.005669    // biking
                        ];

                        for (index in data.shape_arr) {
                            let temp = wktFormatter(data.shape_arr[index]['shape']);
                            let to_visualize = [];

                            for (let i = 0; i < temp.length; i++) {
                                to_visualize.push(temp[i]);
                            }

                            let mode_values = [];
                            let value = 0.000000;
                            let mean = 0.000000;

                            if (index <= 514) { // UPPER SECTION = Texas
                                if (type == "nonsov") {
                                    mode_values = myJson[transportation_modes[0]];
                                    //...
                                } else if (type == "transit") {
                                    mode_values = myJson[transportation_modes[1]];
                                    mean = tx_mean[0];
                                } else if (type == "walking") {
                                    mode_values = myJson[transportation_modes[2]];
                                    mean = tx_mean[1];
                                } else if (type == "biking") {
                                    mode_values = myJson[transportation_modes[3]];
                                    mean = tx_mean[2];
                                }
                            } else { // LOWER SECTION = New Mexico
                                if (type == "nonsov") {
                                    mode_values = myJson[transportation_modes[0]];
                                    //...
                                } else if (type == "transit") {
                                    mode_values = myJson[transportation_modes[1]];
                                    mean = nm_mean[0];
                                } else if (type == "walking") {
                                    mode_values = myJson[transportation_modes[2]];
                                    mean = nm_mean[1];
                                } else if (type == "biking") {
                                    mode_values = myJson[transportation_modes[3]];
                                    mean = nm_mean[2];
                                }
                            }
                            value = mode_values[index];

                            let color = "";
                            if (pm == "pm1") {
                                //...
                            } else {
                                if (value == 0.000000) { // grey = no data
                                    color = "#C0C0C0";
                                    no_data_num++;
                                } else if (value < mean) { // light blue = low/less than mean
                                    color = "#00CCFF";
                                    low_num++;
                                } else if (value > mean) { // dark blue = high/greater than mean
                                    color = "#0066CC";
                                    high_num++;
                                }
                            }

                            let polygon = new google.maps.Polygon({
                                description: "Percentage of Workers Commuting by Biking",
                                description_value: 'something from data.shape_arr[index][value]',
                                paths: to_visualize,
                                strokeColor: 'black',
                                strokeOpacity: 0.60,
                                strokeWeight: 0.70,
                                fillColor: color,
                                fillOpacity: 0.60,
                                zIndex: -1,
                                title: value.toFixed(1) + "%",
                            });
                            
                            // Hover Effect for Google API Polygons
                            google.maps.event.addListener(polygon, 'mouseover', function(event){ injectTooltip(event, polygon.title); });
                            google.maps.event.addListener(polygon, 'mousemove', function(event){ moveTooltip(event); });
                            google.maps.event.addListener(polygon, 'mouseout', function(event){ deleteTooltip(event); });

                            polygon.setMap(map);
                            polygons.push(polygon);
                        }
                        count_list[0] = no_data_num;
                        count_list[1] = low_num;
                        count_list[2] = high_num;
                     
                        if(found == 'pm2-transit'){
                            buttonSwitch('transitWC');
                        }
                        if(found == 'pm2-walking'){
                            buttonSwitch('walkingWC');
                        }
                        if(found == 'pm2-biking'){
                            buttonSwitch('BikingWC');
                        }
                    
                    });
                }
             });
        }
   
    function wktFormatter(poly) {
        let name = poly.slice(0,7);
        let shape_s = [];
        if (name == "MULTIPO") { // Multipolygon parser
            let new_poly = poly.slice(15,-3);
            new_poly = new_poly.split(")),((");
            let len = new_poly.length;
            for (var j = 0; j < len; j++) {
                let polyCoordi = [];
                let polyTemp = new_poly[j].split(",");
                for(i = 0; i<polyTemp.length; i++){
                    let temp = polyTemp[i].split(" ");
                    polyCoordi.push({lat: parseFloat(temp[1]), lng: parseFloat(temp[0])});
                }
                shape_s[j] = polyCoordi;
            }
        } else { // Polygon parser
            let new_poly = poly.slice(9,-2);
            new_poly = new_poly.split("),(");
            let len = new_poly.length;
            for (var j = 0; j < len; j++) {
                let polyCoordi = [];
                let polyTemp = new_poly[j].split(",");
                for(i = 0; i < polyTemp.length; i++) {
                    let temp = polyTemp[i].split(" ");
                    polyCoordi.push({lat: parseFloat(temp[1]), lng: parseFloat(temp[0])});
                }
                shape_s[j] = polyCoordi;
            }    
        }
        return shape_s;
    }

    function wktFormatterPoint(point) {
        // let name = point.slice(0,5);
        // console.log(name);
        let shape_s = [];
        let new_point = point.slice(6,-2);
        //console.log(new_point);
        new_point = new_point.split("),(");
        //console.log(new_point);
        let len = new_point.length;
        for (var j = 0; j < len; j++) {
            let pointCoordi = [];
            let pointTemp = new_point[j].split(",");
            for(i = 0; i < pointTemp.length; i++) {
                let temp = pointTemp[i].split(" ");
                pointCoordi.push({lat: parseFloat(temp[1]), lng: parseFloat(temp[0])});
            }
            shape_s[j] = pointCoordi;
        }    
        //console.log(shape_s);
        return shape_s;
    }

    // adds a hover effect on polygons(google api has not provided functionality for it)
    function injectTooltip(event, data) {
		if(!tipObj && event){
            //create the tooltip object
            tipObj = document.createElement("div");
            tipObj.style.width = '100px';
            tipObj.style.height = '40px';            
            tipObj.style.backgroundColor = "white";
            tipObj.style.borderRadius = "5px";
            tipObj.style.padding = "10px";
            tipObj.style.fontFamily = "Arial,Helvetica";
            tipObj.style.textAlign = "center";
            tipObj.innerHTML = data;
            
            //fix for the version issue
            eventPropNames = Object.keys(event);
            if(!coordPropName){
                //discover the name of the prop with MouseEvent
                for(var i in eventPropNames){
                    var name = eventPropNames[i];
                    if(event[name] instanceof MouseEvent){
                        coordPropName = name;
                        break;
                    }
                }
            }
            
            if(coordPropName){
            //position it
            tipObj.style.position = "fixed";
            tipObj.style.top = event[coordPropName].clientY + window.scrollY + offset.y + "px";
            tipObj.style.left = event[coordPropName].clientX + window.scrollX + offset.x + "px";

            //add it to the body
            document.body.appendChild(tipObj);
            }
        }
    }

    // continues hover effect while moving within the polygon
    function moveTooltip(event) {
		if (tipObj && event && coordPropName) {
	    	//position it
            tipObj.style.top = event[coordPropName].clientY + window.scrollY + offset.y + "px";
            tipObj.style.left = event[coordPropName].clientX + window.scrollX + offset.x + "px";
        }
    }

    // removes hover effect when exiting polygon
    function deleteTooltip(event) {
        if (tipObj) {
    		//delete the tooltip if it exists in the DOM
    		document.body.removeChild(tipObj);
            tipObj = null;
        }
    }

    function clearMetadata() {
        if(polylines) {
            for(var i = 0; i < polylines.length; i++) {
                polylines[i].setMap(null);
            }
        }
        if(points) {
            for(var i = 0; i < points.length; i++) {
                points[i].setMap(null);
            }
        }
        if(polygons) {
            for(var i = 0; i < polygons.length; i++) {
                polygons[i].setMap(null);
            }
        }
        polylines = [];
        points = [];
        polygons = [];
    }

    function openLegend() {
        if(detectmob() == true){
            //document.getElementById("legendHolder").style.width = "80%";
            document.getElementById("legendHolder").style.width = "35%";
        }else{
            document.getElementById("legendHolder").style.width = "35%";
        }
    }

    function closeLegend() {
        document.getElementById("legendHolder").style.width = "0";
    }

    /* This functions are for sidebar */
    function openNav() {
    /*    if(detectmob() == true){
           // document.getElementById("mySidenav").style.width = "100%";
            //document.getElementById("mySidenav").style.height = "50%";
            console.log('mobile');
        }else{*/
            document.getElementById("mySidenav").style.width = "53%";
            document.getElementById("mySidenav").style.height = "71%";
            document.getElementById("mySidenav").style.marginTop = "8.5%";
            console.log('web');
        //}
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0%";
		removeAllElementsBar(); // destroy everything when closing bar
    }
    
    function closeSideBar() {
        document.getElementById("sidebar").style.width = "0%";
    }
    var firstTimePM2 = 0;
	// handles Button methods
    function buttonSwitch(var1) {
        let buttonValue = var1.value;
        if (buttonValue == 'pm1') {
            removeAllElementsBar(); 
            removeAllElementsLegend();
            clearMetadata();

            canvasMaker('chart1','myChart');
            //canvasMaker('chart2/2','myChart2');
            //var ctxpm1 = document.getElementById('myChart').getContext('2d');
            var ctx2pm1 = document.getElementById('myChart').getContext('2d');
           // barchartPm1(ctxpm1);
            pieChartpm1(ctx2pm1);
            console.log("inside mothership");
            headerAdder("Percent of non-single occupancy vehicle (SOV) commute", "title");
            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder( valsPm1[0]+ "% of workers living in the El Paso MPO area reported to drive alone during their commute to work," 
             +"therefore only "+ valsPm1[1]+"% of workers commute via non-SOV modes, which includes carpooled via car, truck, or van. Workers"
             +"used Public Transport means such as bus or trolley bus, streetcar or trolley car, subway or elevated railroad, railroad,"
             +" and ferryboat. Some workers also used a taxicab, motorcycle, bicycle, walking, and other means to go to work or they worked"
             +" at home. …","paragraph","summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2012-2016 5-year average estimates", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("American Community Survey 5-Year Estimates & TIGER/Line Shapefiles and TIGER/Line Files ", "paragraph", "data-info");
            anchorAdder("American Community Survey 5-Year Estimates","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2017.html");
            anchorAdder("TIGER/Line Shapefiles and TIGER/Line Files ","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
			paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("PM1 is calculated as:", "paragraph", "calc-info");
            imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG','calc-info');
            openNav();
        } else if (var1 == 'transitWC' || var1 == 'walkingWC' || var1 == 'BikingWC' || buttonValue == 'transitWC' || buttonValue == 'walkingWC'||buttonValue == 'BikingWC') {
           /* removeAllElementsBar(); 
            removeAllElementsLegend();
            clearMetadata();*/

            canvasMaker('chart1/2','myChart');
            canvasMaker('chart2/2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            pm2chart2(ctx2);
     
            if(var1 == 'transitWC' || buttonValue == 'transitWC') {
                console.log('transitWC call' );
                pm2chart1(ctx, count_list);
                headerAdder("Percent of Workers Commuting by Transit", "title");
            } else if (var1 == 'walkingWC'|| buttonValue ==  'walkingWC') {
                console.log('Walking');
             
                pm2chart1(ctx, count_list);
                headerAdder("Percent of Workers Commuting by Walking", "title");
            } else {
                console.log('Biking');
             
              
                pm2chart1(ctx, count_list);
                headerAdder("Percent of Workers Commuting by Biking", "title");
            }

            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("During 2012-2016 "+ valuesPm2[1]  +"% of workers living in the El Paso MPO area reported to walk to work, "+valuesPm2[1]+"% of workers bike, and "+ valuesPm2[0]+ "% of workers reported to commute by public transit. ", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder(" 2012-2016 5-year average estimates ", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("American Community Survey 5-Year Estimates & TIGER/Line Shapefiles and TIGER/Line Files ", "paragraph", "data-info");
            anchorAdder(1,"https://www.census.gov/geo/maps-data/data/tiger-data.html");
            anchorAdder(1,"https://www.census.gov/geo/maps-data/data/tiger-line.html");
			paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            imageAdder('./img/performance_measures/pm2/transEqn.PNG','calc-title');
            imageAdder('./img/performance_measures/pm2/walkEqn.PNG','calc-title');
            imageAdder('./img/performance_measures/pm2/bikingEqn.PNG','calc-title');

            //Legend elements
            headerAdder("Legend", "legend_title");
            legendPM2Transit();
            openNav();
            openLegend();

            no_data_num = 0;
            low_num = 0;
            high_num = 0;
            count_list[0] = 0; count_list[1] = 0; count_list[2] = 0;

        } else if (buttonValue == 'pmbridge') {
            removeAllElementsBar(); // clear bar
            removeAllElementsLegend();
            clearMetadata();

            canvasMaker('chart1/2','myChart');
            canvasMaker('chart2/2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            chart1(ctx); 
            chart2(ctx2);
            headerAdder("Bridge Condition", "title");
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("Within the Texas portion of the El Paso MPO area, there are " + pm26TX[0] + " bridges("+ pm26PrctTX[0]+ "%) in Good condition, "+pm26TX[1] + " bridges("+pm26PrctTX[1]+"%) in Fair condition, "+  pm26TX[2]+" bridges("+  pm26PrctTX[2]+"%) in Poor condition.", "paragraph", "summary-info");
            paragraphAdder("Within the New Mexico portion of the El Paso MPO area, there are " + pm26NM[0]+ " bridges("+pm26PrctNM[0]+"%) in Good conditions, "+ pm26NM[1] +" bridges("+pm26PrctNM[1]+"%) in Fair condition, "+pm26NM[2]+" bridge("+pm26PrctNM[2]+"%) in Poor condition.", "paragraph", "summary-info");
            paragraphAdder("Condition data was not available for "+ pm26P[5] + " bridges within the El Paso MPO area.", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Bridges condition data as of 2018", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Bridge condition data was provided by TxDOT and NMDOT.", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("Bridge condition rating is based on the lowest condition rating from the following components: deck, substructure, superstructure or culvert.", "paragraph", "calc-info");
            paragraphAdder("Following the FHWA guidance, bridges with lowest rating between 7 and 9 are classified as Good, those rated 6 or 5 are classified as Fair and bridges with lowest rating 4 or below are classified as Poor.", "paragraph", "calc-info");
            paragraphAdder("More information about Bridge Condition Performance can be found at this FHWA website: ", "paragraph", "calc-info");
            anchorAdder(1,"https://www.fhwa.dot.gov/bridge/britab.cfm");
            openNav();
	    }
    }
    
    function clean() {
        removeAllElementsBar(); 
        removeAllElementsLegend();
        clearMetadata();
    }

    // removes any element
    function removeElement(id) {
        var element = document.getElementById(id);
        element.remove();
    }

    // safe removal for legend elements
    function removeAllElementsLegend() {
        var element = document.getElementById("temp_title"); 
        var element2 = document.getElementById("temp_list");
        // if element exist, delete
        if(element){
            removeElement("temp_title");
        }
        if(element2){
            removeElement("temp_list");
        }

        closeLegend();
    }

    // removes bar elements only
    function removeAllElementsBar() {
        for(var x = 0; x < universal; x++) {
            removeElement(x);
        }
        universal = 0; // reset counter
        canvasSafeDelete('myChart');
        canvasSafeDelete('myChart2');
        canvasSafeDelete('single');
        safeDestroypm1();
        safeDestroypm2();
        safeDestroypm26(); // <-----
    }

    function imageAdder(imageDir, holderDiv){
        // create a new div element 
        var newDiv = document.createElement("div"); 
        newDiv.id = universal;
        universal++;
        var holder = document.getElementById(holderDiv); 
        holder.appendChild(newDiv);
        // Create Image on Div
        var x = document.createElement("IMG");
        x.setAttribute("src", imageDir);
        x.setAttribute("width", "80%");
        x.setAttribute("height", "1%");
        x.className = 'col-md-12 col-sm-12 col-xs-12'; // add bootstrap
        x.id = universal;
        holder.appendChild(x);
        universal++;
    }

     // adds the pm title
     function headerAdder(text,holderTitle) {
        var x = document.createElement("HEADER");
        var y;
        x.setAttribute("id", universal);
        document.body.appendChild(x);
        var holder = document.getElementById(holderTitle);
        if(holderTitle == "legend_title"){
             y = document.createElement("H5"); 
             y.id = "temp_title"
             if(detectmob() == true){
                y = document.createElement("H7"); 
             }
        }
        else{
            y = document.createElement("H4"); 
            y.id = universal;
        }
        var t = document.createTextNode(text);
        y.appendChild(t);
  
        holder.appendChild(y);
        
        // styles
        holder.style.textAlign = "center";
        
        universal++;
    }

    // modifies class id
    function classNameMod(id,newName){
        document.getElementById(id).className = newName;
    }

    // adds Anchor
    function anchorAdder(text,link){
        var x = document.createElement("A");
        x.setAttribute("class", "bridgeText");
        x.setAttribute("target", "#");
        x.setAttribute("style", "font-size: medium; color: blue;");
        // if one keep link as text of anchor
        if(text == 1){
            var t = document.createTextNode(link);
        }else{
            var t = document.createTextNode(text);
        }
        x.setAttribute("href", link);
        x.appendChild(t);
        var holder = document.getElementById(universal-1);
        holder.appendChild(x);

        //styles
        holder.style.fontSize = "medium";
    }

    // adds the information/subtitles(e.g summary/analysis period/data source/how it was calculated) of the pm
    function paragraphAdder(text, elemtype, infotype) {
        var elem = document.createElement("P");
        var node = document.createTextNode(text);
        elem.id = universal;
        elem.appendChild(node);
        var holder = document.getElementById(infotype);
        holder.appendChild(elem);
	
        if (elemtype == "subtitle") {
            // styles
            holder.style.fontSize = "large"; // xx-small, x-small, small, medium, large, x-large, xx-large
            holder.style.fontWeight = 'bold';
        } else {
            // styles
            holder.style.fontSize = "medium"; // xx-small, x-small, small, medium, large, x-large, xx-large
        }
        
        universal++;
    }

    // creates canvas so graph can be loaded
    function canvasMaker(id, name){
        var holder = document.getElementById(id); 
        var x = document.createElement("CANVAS");
        x.id = name;
        holder.appendChild(x);
    }

    function canvasSafeDelete(name){
        var element = document.getElementById(name); 
        if(element){
            removeElement(name);
        }
    }

    // adds 1 list element to temp_list div
    function listForLegend(text, color) {
        var node = document.createElement("LI");
        var x = document.createElement("SPAN");
        x.setAttribute("style", color);
        node.appendChild(x);
        var textnode = document.createTextNode(text);
        node.appendChild(textnode);
        var holder =  document.getElementById("temp_list");
        holder.appendChild(node);
    }

    //Creates a temporal div to hold list for PM2,  so it can be deleted
    function createTempList(){
        var newDiv = document.createElement("div"); 
        newDiv.id = "temp_list";
        var holder =  document.getElementById("legendList");
        holder.appendChild(newDiv);
    }

    //Adds PM2 names and colors to legend list
    function legendPM2Transit(){
        createTempList();
        names = ['No Data','Below mean','Above Mean'];
        colors = ['background:#C0C0C0;','background:#00CCFF;','background:#0066CC;'];
        for(let i = 0; i < names.length; i++){
            listForLegend(names[i], colors[i]);
        }
    }

    function detectmob() { 
        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ){
        return true;
         }
        else {
            return false;
         }
    }
</script>
</html>

