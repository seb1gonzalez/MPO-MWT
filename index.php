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

   <style>

   </style>   
   
</head>
<body>

    <div class="container">
        <div class="row">
            <div class="col">
			
                <!-- Sidenavbar -->
                <div id="mySidenav" class="sidenav rounded-left mb-2 bg-light text-dark">
                    <div class="p-2">
                        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>

                        <!-- Main Title for PM -->
                        <div id="title"></div>

                        <!-- Google Chart for PM  -->
                        <div class="row">
                            <div id='chart1/2' class="col-lg-6 col-md-12 col-sm-12 col-xs-12"></div>
                            <div id='chart2/2' class="col-lg-6 col-md-12 col-sm-12 col-xs-12"></div>
                        </div>
                        <div class="row">
                            <div id='chart1' class="col-md-12 col-sm-12 col-xs-12"></div>
                        </div>
                        
                        <div class="row">
                            <div id='chart2' class="col-md-12 col-sm-12 col-xs-12"></div>
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
                     <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
                            <div class='my-legend'>
	                            <div id='legend_title'></div>
	                            <div class='legend-scale'>
 	                	            <ul id="legendList" class='legend-labels'></ul>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>

                <!-- modal for corridor selection - make draggable!!! -->
                <div id="corridors-modal" class="modal fade" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Select a corridor</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    
                                <div class="row">
                                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                           <h5> ALAMEDA</h5>
                                        </div>
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">
                                            <label class="switch">
                                                <input type="checkbox" id="alameda_toggle">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                <hr>
                                <div class="row">
                                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                           <h5>DONIPHAN</h5>
                                        </div>
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">
                                            <label class="switch">
                                                <input type="checkbox" id="doniphan_toggle">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                <hr>
                                <div class="row">
                                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                           <h5>DYER</h5>
                                        </div>
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">
                                            <label class="switch">
                                                <input type="checkbox" id="dyer_toggle">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                <hr>
                                <div class="row">
                                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                           <h5>HORIZON</h5>
                                        </div>
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">
                                            <label class="switch">
                                                <input type="checkbox" id="horizon_toggle">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                <hr>
                                <div class="row">
                                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                           <h5>MESA</h5>
                                        </div>
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">
                                            <label class="switch">
                                                <input type="checkbox" id="mesa_toggle">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <hr>
                                    <div class="row">
                                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                           <h5> MONTANA</h5>
                                        </div>
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">
                                            <label class="switch">
                                                <input type="checkbox" id="montana_toggle">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>


                                    
                                <hr>
                                <div class="row">
                                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                           <h5>MONTWOOD</h5>
                                        </div>
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">
                                            <label class="switch">
                                                <input type="checkbox" id="montwood_toggle">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                <hr>
                                <div class="row">
                                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                           <h5>YARBROUGH</h5>
                                        </div>
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">
                                            <label class="switch">
                                                <input type="checkbox" id="yarbrough_toggle">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                <hr>
                                <div class="row">
                                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                           <h5>ZARAGOZA</h5>
                                        </div>
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">
                                            <label class="switch">
                                                <input type="checkbox" id="zaragoza_toggle">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>

                                </div>



                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
                <!-- Performance Measures Section in Multimodal Corridors -->
                <div id="pms-modal" class="modal fade">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title float-left">Multimodal Performance: El Paso MPO Region</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="accordion" id="pms_accordion">
                                    <div class="card">
                                        <div class="card-header text-center" id="heading1">
                                
                                                <button class="btn  btn-light btn-lg btn-block collapsed " type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                                                    <h5> Driving </h5>
                                                </button>
                                        
                                        </div>
                                        <div id="collapse1" class="collapse" aria-labelledby="heading1" data-parent="#pms_accordion">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="pmbridge" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pmbridge','all_pmbridge','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id= "pm26Text"></h3>
                                                                    <h5>of bridges</h5>
                                                                    <h5>in poor Condition</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                    <div class="card">
                                                    <button type="button" href="#" value="pm18Driving" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm18Driving','a','point'); buttonSwitch(this)">
                                                            <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm18DrivingText"></h3>
                                                                <h5>Fatalities</h5>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="pm19Driving" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm19Driving','a','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm19DrivingText"></h3>
                                                                    <h5>serious Injuries</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                   
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="pm1" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="/*shape_handler('pm1-nonsov','all_pm1','polygon');*/ buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm1-sov"></h3>
                                                                    <h5>drive alone</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                        <button type="button" href="#" value="pm22Driving" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm22crashes','all_pm22','point');buttonSwitch(this);pm22Data()">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm22Count"></h3>
                                                                    <h5>crashes on</h5> 
                                                                    <h5>the CMP</h5> 
                                                                    <h5>network</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                        <button type="button" href="#" value="pm15Driving" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block "  onclick="shape_handler('pm15Driving','a','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm15Text"></h3>
                                                                    <h5>Ozone</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                        <button type="button" href="#" value="pm16Driving" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm16Driving','a','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm16Text"></h3>
                                                                    <h5>Carbon</h5>
                                                                    <h5>Monoxide</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                        <button type="button" href="#" value="pm17Driving" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm17Driving','a','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm17Text"></h3>
                                                                    <h5>Particulate</h5>
                                                                    <h5>Matter</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                        <button type="button" href="#" value="pm13Driving" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm13_14','a','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm13DText"></h3>
                                                                    <h5>automobiles </h5>
                                                                    <h5>at POEs</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                        <button type="button" href="#" value="pm14Driving" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm13_14','a','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm14DText"></h3>
                                                                    <h5>avergae wait </h5>
                                                                    <h5>time at POEs</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                        <button type="button" href="#" value="pm25" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm25','all_pm25','line'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm25Text">PM25</h3>
                                                                    <h5>pavements in</h5>
                                                                    <h5>poor condition </h5>
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
                                            
                                                <button class="btn  btn-light btn-lg btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                                <h5> Freight </h5>
                                                </button>
                                            
                                        </div>
                                        <div id="collapse2" class="collapse" aria-labelledby="heading2" data-parent="#pms_accordion">
                                            <div class="card-body">
                                                <div class="row">
                                                <div class="col-lg-4 col-md-4 col-sm-12">
                                                         <div class="card">
                                                             <button type="button" href="#" value="pm18Freight" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm18Freight','a','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm18FreightText"></h3>
                                                                    <h5>Fatalities</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                
                                                <div class="col-lg-4 col-md-4 col-sm-12">
                                                    <div class="card">
                                                        <button type="button" href="#" value="pm19Freight" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm19Freight','a','point'); buttonSwitch(this)">
                                                            <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                            <h3 id="pm19FreightText"></h3>
                                                                <h5>serious injuries</h5>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12">
                                                    <div class="card">
                                                        <button type="button" href="#" value="pm13Freight" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm13_14','a','point'); buttonSwitch(this)">
                                                            <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm13FText"></h3>
                                                                <h5>Trucks</h5>
                                                                <h5>at POEs</h5>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12">
                                                    <div class="card">
                                                        <button type="button" href="#" value="pm14Freight" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm13_14','a','point'); buttonSwitch(this)">
                                                            <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm14FText"></h3>
                                                                <h5>Average wait time</h5>
                                                                <h5>at POEs</h5>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <div class="card">
                                        <div class="card-header text-center" id="heading3">
                                       
                                                <button class="btn  btn-light btn-lg btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                                <h5> Transit </h5>
                                                </button>
                                           
                                        </div>
                                        <div id="collapse3" class="collapse" aria-labelledby="heading3" data-parent="#pms_accordion">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="transitWC" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm2-transit','all_pm1','polygon');">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm2-transit"></h3>
                                                                    <h5>commute</h5>
                                                                    <h5>by transit</h5>
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
                                            
                                                <button class="btn  btn-light btn-lg btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                                    <h5>Walking</h5>
                                                </button>
                                            
                                        </div>
                                        <div id="collapse4" class="collapse" aria-labelledby="heading4" data-parent="#pms_accordion">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="walkingWC" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm2-walking','all_pm1','polygon');">
                                                            <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm2-walking"></h3>
                                                                <h5>Commute</h5>
                                                                <h5>by walking</h5>
                                                            </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="pm18Walking" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm18Walking','a','point'); buttonSwitch(this)">
                                                            <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm18WalkingText"></h3>
                                                                <h5>pedestrian fatalities</h5>
                                                            </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                    <div class="card">
                                                        <button type="button" href="#" value="pm19Walking" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm19Walking','a','point'); buttonSwitch(this)">
                                                            <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm19WalkingText"></h3>
                                                                <h5>pedestrian</h5>
                                                                <h5>serious injuries</h5>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                        <button type="button" href="#" value="pm13Walking" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm13_14','a','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm13WText"></h3>
                                                                    <h5>Northbound </h5>
                                                                    <h5>Border Crossings</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="pm14Walking" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm13_14','a','point'); buttonSwitch(this)">
                                                            <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm14WText"></h3>
                                                                <h5>average wait time</h5>
                                                                <h5>at POEs</h5>
                                                            </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="pm11Walking" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick=" shape_handler('pm11','all_pm11','line'); buttonSwitch(this)">
                                                            <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="">0.56 mi</h3> <!-- pm11WText-->
                                                                <h5>sidewalks</h5>
                                                                <h5>Per Mile</h5>
                                                            </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="pm20P" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm20P','','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm20-P"></h3>
                                                                    <h5>Number</h5>
                                                                    <h5>crashes nearby </h5>
                                                                    <h5>bus stops</h5>
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
                                        
                                                <button class="btn  btn-light btn-lg btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                                    <h5>Biking</h5>
                                                </button>
                                            
                                        </div>
                                        <div id="collapse5" class="collapse" aria-labelledby="heading5" data-parent="#pms_accordion">
                                            <div class="card-body">
                                                <div class="row">
                                                <div class="col-lg-4 col-md-4 col-sm-12">
                                                    <div class="card">
                                                        <button type="button" href="#" value="BikingWC" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm2-biking','all_pm1','polygon');">
                                                            <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm2-biking"></h3>
                                                                <h5>of Workers</h5>
                                                                <h5>Commuting</h5>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="pm18Biking" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm18Biking','a','point'); buttonSwitch(this)">
                                                               <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm18BikeText"></h3>
                                                                    <h5>Fatalities</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                             <button type="button" href="#" value="pm19Biking" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm19Biking','a','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm19BikeText"></h3>
                                                                    <h5>injuries</h5>
                                                                </div>
                                                             </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="pm12Biking" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm12','all_pm12','line'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm12Text"></h3>
                                                                <h5>of bikeway</h5>
                                                                    <h5>network Buildout</h5>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                             <button type="button" href="#" value="pm4Biking" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick=" shape_handler('pm4Biking','all_pm4','line'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                    <h3 id="pm4BText"></h3>
                                                                    <h5>Biking Trips</h5>
                                                                    <h5>Recorded by</h5>
                                                                    <h5>Strava</h5>
                                                                </div>
                                                             </button>
                                                        </div>
                                                    </div>
                                                        <div class="col-lg-4 col-md-4 col-sm-12">
                                                        <div class="card">
                                                            <button type="button" href="#" value="pm20B" data-dismiss="modal" class="btn btn-info btn-lg same-btn-size btn-block " onclick="shape_handler('pm20B','','point'); buttonSwitch(this)">
                                                                <div data-target="#sidebar" data-toggle="collapse" aria-expanded="false" class="card-body">
                                                                <h3 id="pm20-B"></h3>
                                                                    <h5>crashes nearby</h5>
                                                                    <h5>bus stops</h5>
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

            
            </div>
        </div>
    </div>

    <!-- Buttons for Sidebar -->
	<div class="wrapper">
        <div class="container-fluid">
            <div class="row d-md-block flex-nowrap wrapper">
            <div class="col-md-2 float-left col-1 pl-0 pr-0  show width" id="sidebar">
                    <div class="list-group border-0 card text-center text-md-left">
                    <a href="http://www.elpasompo.org/" target="#" class="d-none d-md-inline"><img src="./img/elmpologo.png" class="img-responsive"></a>
                    <a href="#" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class=""></i><span class="d-none d-md-inline"></span></a>
                        <a class="list-group-item d-inline-block collapsed " data-parent="#sidebar" href="#pms-modal" data-toggle="modal"><i class="fa fa-bar-chart"></i> <span class="d-none d-md-inline">Performance Measures</span></a>
                        <a class="list-group-item d-inline-block collapsed " data-parent="#sidebar" href="#pms-modal" data-toggle="modal"><i class="fa fa-pencil-square-o"></i> <span class="d-none d-md-inline">Interactive AOI</span></a>
                        <a class="list-group-item d-inline-block collapsed " data-parent="#sidebar" href="#pms-modal" data-toggle="modal"><i class="fa fa-tachometer"></i> <span class="d-none d-md-inline">Benchmarking</span></a>
                        <a class="list-group-item d-inline-block collapsed" data-parent="#sidebar" href="#corridors-modal" data-toggle="modal"><i class="fa fa-toggle-on"></i> <span class="d-none d-md-inline">Corridors</span></a>
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
    <!-- Custom styles from CSS folder -->
    <link href="css/sidebar.css" rel="stylesheet" type="text/css">
    <link href="css/legend.css" rel="stylesheet" type="text/css">
    <link href="css/custom.css" rel="stylesheet" type="text/css">
    <link href="css/mwt.css" rel="stylesheet" type="text/css">



  

    <!-- Loaded Scripts -->
    <script type="text/javascript" src="pm_functions/pm1Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm2Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm4Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm8Function.js"></script>
    <script type="text/javascript" src="pm_functions/pm11Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm12Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm13_14Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm13Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm15Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm16Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm17Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm18Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm19Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm20Functions.js"></script> 
    <script type="text/javascript" src="pm_functions/pm22Functions.js"></script>
    <script type="text/javascript" src="pm_functions/pm25Functions.js"></script> 
    <script type="text/javascript" src="pm_functions/pm26Functions.js"></script> 
    <script type="text/javascript" src="js/corridor-handler.js"></script>
    <script src="js/jquery.js"></script>
    
    <script src="node_modules/chart.js/dist/Chart.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://cdn.rawgit.com/bjornharrtell/jsts/gh-pages/1.4.0/jsts.min.js"></script>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/big.js"></script>
          
  <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js">
    </script>
    <script text="type/javascript">

</script>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCY0B3_Fr1vRpgJDdbvNmrVyXmoOOtiq64&libraries=visualization&callback=initMap">

</script>

  </html>