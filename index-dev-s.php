﻿<!DOCTYPE html>
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
      <link rel="stylesheet" type="text/css" href="css/loading.css"/>
      <link rel="stylesheet" type="text/css" href="css/loading-btn.css"/>
      <style>
      </style>
   </head>
   <body>


    <!-- Sidenavbar -->
    <div>
        <?php include("inject-sidenavbar_PMs.php");?>
    </div>

    <!-- Sidenavbar2 -->
    <div id="mtp" class=" sidenav rounded-left mb-2 bg-light text-dark" ondblclick="openNavMTP()" data-toggle="tooltip" data-placement="left" title="Double click to Open" >
            <a href="javascript:void(0)" class=" col-lg-1 closebtn" onclick="closeNavMTP()">&times;</a>
            <div id="mtp-title" class="row container">
                <h1 class="col-lg-6 text-center">MTP Projects</h1>
                <button id="locate-project-btn" type="button" class="col-lg-6 btn btn-outline-info btn-lg">Locate</button>
            </div>
            <div  id="mtp-content" >
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


        <!-- Performance Measures Section in Multimodal Corridors -->
        <div>
        <?php include("inject-modal_PMs.php");?>
    </div>

         <!-- home for mtp projects, benchmark and data repository 
        and any future things we could add.--> 
        <div id="non-pm-content"></div>


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
            <div class="row container-fluid">
               <div class="col-lg-6 col-sm-6">
                  <ul>
                     <li>
                        <h5>Research Team</h5>
                     </li>
                     <li>Marketa Vavrova</li>
                     <li>Adolfo Cordova</li>
                     <li>Sara Rivera </li>
                  </ul>
               </div>
               <div class="col-lg-6 col-sm-6">
                  <ul>
                     <li>
                        <h5>Developing Team</h5>
                     </li>
                     <li>Brian Cardiel</li>
                     <li>Sebastian Gonzalez</li>
                     <li>Christopher Santos</li>
                     <li>Sergio Yañez</li>
                  </ul>
               </div>
            </div>
            <hr>
            <p>Final Report:</p>
            <a href="documents/final.pdf">Development of a Sustainable Performance-Based Methodology for Strategic Metropolitan Planning Based on MAP-21</a>
         </div>
      </div>
   </div>
</div>   <!--END --- About PMEPC -->


<!-- Buttons for Sidebar -->
    <!-- Buttons for Sidebar -->
	<div class="wrapper">
        <div class="container-fluid">
            <div class="row d-md-block flex-nowrap wrapper">
            <div class="col-md-2 float-left col-1 pl-0 pr-0  show width" id="sidebar">
                    <div class="list-group border-0 card text-center text-md-left">
                    <a href="http://www.elpasompo.org/" target="#" class="d-none d-md-inline"><img src="./img/elmpologo.png" class="img-responsive"></a>
                    <a href="#" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class=""></i><span class="d-none d-md-inline"></span></a>
                        <a class="list-group-item d-inline-block collapsed " data-parent="#sidebar" href="#pms-modal" data-toggle="modal"><i class="fa fa-bar-chart"></i> <span class="d-none d-md-inline">Regional Performance</span></a>
                        <!-- <a class="list-group-item d-inline-block collapsed" data-parent="#sidebar" href="#corridors-modal" data-toggle="modal"><i class="fa fa-toggle-on"></i> <span class="d-none d-md-inline">Corridor Performance</span></a> -->
                        <a class="list-group-item d-inline-block collapsed " data-parent="#sidebar" href="#" data-parent= "sidebar" id="benchmarking"><i class="fa fa-tachometer"></i> <span class="d-none d-md-inline">Benchmarking</span></a>
                        <!-- <a onclick="switch_AOI()"class="list-group-item d-inline-block collapsed " data-parent="#sidebar" href="#" ><i class="fa fa-map"></i> <span class="d-none d-md-inline">Interactive AOI</span></a> -->
                        <a class="list-group-item d-inline-block collapsed " data-parent="#sidebar" href="#" data-target="#sidebar"id = "mtp-projects"> <i class="fa fa-pencil-square-o"></i> <span class="d-none d-md-inline">MTP Projects</span></a>
                        <a class="list-group-item d-inline-block collapsed " data-parent="#sidebar" href="#pms-modal" data-toggle="modal"><i class="fa fa-database"></i> <span class="d-none d-md-inline">Data Repository</span></a>

                        <a href="#" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class=""></i><span class="d-none d-md-inline"></span></a>
                        <a href="tutorial.php" target="_blank" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class="fa fa-certificate"></i> <span class="d-none d-md-inline">Tutorial</span></a>
                        <a data-toggle="modal" href="#aboutmodal" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class="fa fa-info"></i> <span class="d-none d-md-inline">About</span></a>
                        <a href="#" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class=""></i><span class="d-none d-md-inline"></span></a>
                        <a onclick="clearMetadata(); closeNav(); closeLegend();deleteUserShapes()" href="#" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class="fa fa-trash-o"></i> <span class="d-none d-md-inline">Clear</span></a>
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
   <link href="css/corridorDropdown.css" rel="stylesheet" type="text/css">
   <link href="css/legend.css" rel="stylesheet" type="text/css">
   <link href="css/custom.css" rel="stylesheet" type="text/css">
   <link href="css/mwt.css" rel="stylesheet" type="text/css">
   <!-- load all functions -->
   <div>
   <?php include("inject-imports.php");?>
</div>

   <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCY0B3_Fr1vRpgJDdbvNmrVyXmoOOtiq64&libraries=visualization&libraries=drawing&callback=initMap"></script>
</html>