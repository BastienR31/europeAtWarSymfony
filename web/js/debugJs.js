/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Select a region
//Click on the region
//Alert infos

$(document).ready(function () {

    $("#politic-info").show();
    $("#economic-info").hide();
    $("#diplomatic-info").hide();
    $("#army-info").hide();
    $("#technology-info").hide();

    $("#info-army").hide();

    // get the inner DOM of world.svg
    var svg = document.getElementById("worldsvg");
    var svgDoc = svg.contentDocument;
    var svgRoot = svgDoc.documentElement;
    var childSvgRoot = svgRoot.childNodes;

    var armyBlock = document.getElementById("army");
    var armyName = document.getElementById("army-general");
    var armyNumber = document.getElementById("army-number");

    // get the inner element by id
    var region = svgRoot.getElementsByClassName('regionGroup');

    //center the map on europe
    svgRoot.setAttribute("viewBox", "533.883 145.167 257.25 37.0833");

    var svgViewBox = svgRoot.getAttribute("viewBox");
    var split = svgViewBox.split(" ");
    var valueViewBox = 0;

    for (var i = 0; i < split.length; i++) {
        valueViewBox += parseInt(split[i]);
    }

    for (var i = 0; i < childSvgRoot.length; i++) {
        if (childSvgRoot[i].tagName === 'g') {

            var gPrincipal = childSvgRoot[i].childNodes;

            for (var j = 0; j < gPrincipal.length; j++) {
                if (gPrincipal[j].tagName === 'g') {
                    gPrincipal[j].classList.add("regionGroup");
                }
            }
        }
    }

    for (var i = 0; i < region.length; i++) {

        
        console.log(region);
        console.log(region.length);
        
        console.log(region[i]);
        
        region[i].addEventListener("click", function () {

            this.style.strokeWidth = "0.3";

            var idRegion = this.id;

            $.ajax({
                type: "POST",
                url: "./View/RegionView.php",
                data: {idRegion: idRegion},
                success: function (data) {
                    console.log(data);
                    $('#container').append(data);
                    $('#info-region').show();
                }
            });

        }, false);
        
        if (region[i].getAttribute('id') === 'paris') {
            alert('paris');
        }
        
        var regionNodes = region[i].childNodes;

        for (var j = 0; j < regionNodes.length; j++) {

            if (regionNodes[j].tagName === 'text') {

                console.log(region[j]);
            }
        }
        
        //insérer ce code dans une fonction, comme ça, calcul de ces informations sur les events concernant le zoom
        if (valueViewBox >= 900) {

            for (var i = 0; i < region.length; i++) {

                var regionNodes = region[i].childNodes;

                for (var j = 0; j < regionNodes.length; j++) {

                    if (regionNodes[j].tagName === 'text') {

                        regionNodes[j].style.display = 'none';
                    }
                }
            }

            //armyBlock.classList.add("army-zoom");
            /*armyName.style.display = 'none';
             armyNumber.style.display = 'none';*/
            /*armyBlock.onmouseover = function () {
             armyNumber.style.display = 'block';
             };
             armyBlock.onmouseout = function () {
             armyNumber.style.display = 'none';
             };*/

        }
        
    }

    /*$.ajax({
     type: "POST",
     url: "./View/ArmyView.php",
     success: function (data) {
     
     for (var i = 0; i < data.length; i++) {
     
     var regionArmy = data;
     var foreignObject;
     
     console.log(regionArmy);
     console.log(regionNodes[i]);
     
     for (var i = 0; i < region.length; i++) {
     console.log(region);
     
     if (region[i].getAttribute('id') === regionArmy) {
     
     for (var j = 0; j < regionNodes.length; j++) {
     
     if (regionNodes[j].tagName === 'text') {
     
     var armyCoordinatesX = regionNodes[j].getAttribute('x');
     var armyCoordinatesY = regionNodes[j].getAttribute('y');
     }
     }
     }
     
     foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
     
     //var infoArmy = '<div id="info-army" class="info-army"><div id="info-general-army"><span id="name-army">Armée franque</span><span id="location-army"></span><div id="info-general-army-close"><i class="fa fa-window-close-o close-army-button" onclick="displayArmyInfo(false)"></i></div></div><div id="info-content-small-army"><div class="small-army" id="infantry-army-1">Infanterie franque 4000</div><div class="small-army" id="infantry-army-2">Infanterie franque 3500</div><div class="small-army" id="bow-army-1">Archer franc 1500</div><div class="small-army" id="cavalry-army-1">Cavalerie franque 1000</div></div></div>';
     var armyContent = '<div id="army" onclick="displayArmyInfo(true)"> <img src="../europeAtWar/Resources/img/oriflamme.png" id="header-army" class="oriflamme-small"/><span id="army-general">Clovis</span><span id="army-number">10000</span></div>';
     
     $(foreignObject).attr("x", armyCoordinatesX).attr("y", armyCoordinatesY).attr("width", 2.5).attr("height", 1.5).append(armyContent);
     
     }
     region[i].append(foreignObject);
     }
     }
     });*/



    //globals so we can manipulate them in the debugger
    /*var example1;
     
     $(function () {
     "use strict";
     //init the zoom
     var svgZoom = $(svgRoot).svgPanZoom();
     
     var callback = function (example) {
     return function (event) {
     if ($(event.target).hasClass("fa-plus"))
     example.zoomIn();
     if ($(event.target).hasClass("fa-minus"))
     example.zoomOut();
     };
     };
     
     example1 = svgZoom[0];
     
     $("div#example1 i").click(callback(example1));
     });*/

});

/**
 * The script who decide what happend at the end of the turn
 */
function endTurn() {
    return;
}

/**
 * The script who define how happen a fight
 */
function armyFight() {
    return;
}

/**
 * Display or not army info
 * @param boolean boolean
 */
function displayArmyInfo(boolean) {

    var infoArmyBlock = document.getElementById("info-army");

    if (boolean) {
        infoArmyBlock.style.display = 'block';
    } else {
        infoArmyBlock.style.display = 'none';
    }
}

/**
 * Display or not region info
 * @param boolean boolean
 */
function displayRegionInfo(boolean) {

    var infoRegionBlock = document.getElementById("info-region");

    if (boolean) {
        infoRegionBlock.style.display = 'block';
    } else {
        infoRegionBlock.style.display = 'none';
        document.getElementById("container").removeChild(infoRegionBlock);
    }
}

/**
 * Display onglet
 * @param {object} onglet
 * @returns 
 */
function changeOnglet(onglet) {

    //select the block by id
    var politicBlock = document.getElementById("politic-info");
    var economicBlock = document.getElementById("economic-info");
    var diplomatiBlock = document.getElementById("diplomatic-info");
    var armyBlock = document.getElementById("army-info");
    var technologyBlock = document.getElementById("technology-info");

    //display or not the data concerning the onglet
    switch (onglet) {

        case 'politic':
            politicBlock.style.display = "block";
            economicBlock.style.display = "none";
            diplomatiBlock.style.display = "none";
            armyBlock.style.display = "none";
            technologyBlock.style.display = "none";
            break;
        case 'economic':
            politicBlock.style.display = "none";
            economicBlock.style.display = "block";
            diplomatiBlock.style.display = "none";
            armyBlock.style.display = "none";
            technologyBlock.style.display = "none";
            break;
        case 'diplomacy':
            politicBlock.style.display = "none";
            economicBlock.style.display = "none";
            diplomatiBlock.style.display = "block";
            armyBlock.style.display = "none";
            technologyBlock.style.display = "none";
            break;
        case 'military':
            politicBlock.style.display = "none";
            economicBlock.style.display = "none";
            diplomatiBlock.style.display = "none";
            armyBlock.style.display = "block";
            technologyBlock.style.display = "none";
            break;
        case 'technology':
            politicBlock.style.display = "none";
            economicBlock.style.display = "none";
            diplomatiBlock.style.display = "none";
            armyBlock.style.display = "none";
            technologyBlock.style.display = "block";
            break;
    }
}