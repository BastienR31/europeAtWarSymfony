/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Select a region
//Click on the region
//Alert infos

$(document).ready(function () {

    // get the inner DOM of world.svg
    var svg = document.getElementById("svg2");
    var svgtoto = document.getElementById("layer1");
    /*console.log(svg);
     var svgDoc = svg.contentDocument;
     console.log(svgDoc);*/
    var svgRoot = document.getElementById("svg2");
    var childSvgRoot = svgRoot.childNodes;

    //Create dom
    $("<div id='content-player'></div>").appendTo('#container');

    $("<div id='menu-player'></div>").appendTo('#content-player');
    $("<div id='content-details-player'></div>").appendTo('#content-player');

    $("<ul id='onglets'></ul>").appendTo('#menu-player');

    $("<li><a id='onglet-politic'>Politique</a></li>").appendTo('#onglets');
    $("<li><a id='onglet-economic'>Economique</a></li>").appendTo('#onglets');
    $("<li><a id='onglet-diplomacy'>Diplomatie</a></li>").appendTo('#onglets');
    $("<li><a id='onglet-military'>Militaire</a></li>").appendTo('#onglets');
    $("<li><a id='onglet-technology'>Technologie</a></li>").appendTo('#onglets');
    
    $("<div id='politic-info'></div>").appendTo('#content-details-player');
    
    $("<div id='faction-name'></div>").appendTo('#politic-info');
    $("<span id='faction-title'>Francs</span>").appendTo('#faction-name');
    
    $("#onglet-politic").click(function () {

        $("#content-details-player").empty();

        $("<div id='politic-info'></div>").appendTo('#content-details-player');

        $("<div id='faction-name'></div>").appendTo('#politic-info');
        $("<span id='faction-title'>Francs</span>").appendTo('#faction-name');
    });

    $("#onglet-economic").click(function () {

        $("#content-details-player").empty();

        $("<div id='economic-info'></div>").appendTo('#content-details-player');

        $("<p id='tax'>Impôts</p>").appendTo('#economic-info');
        $("<p id='commercial'>Commerce</p>").appendTo('#economic-info');
        $("<p id='gold'>Or</p>").appendTo('#economic-info');
    });
    
    $("<div id='timeline'></div>").appendTo('#container');   
    $("<span id='timeline-date'>Janvier 500</span>").appendTo('#timeline');   
    $("<i class='fa fa-chevron-circle-right timeline-change' aria-hidden='true'></i>").appendTo('#timeline');   
    
    $("<div id='army'></div>").appendTo('#container');
    $("<div id='army-general'></div>").appendTo('#container');
    $("<div id='army-number'></div>").appendTo('#container');

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

        //Fogwar
        //Attribute what region is for player
        //Opacity reduct for other region
        //Opacity to one for player(s)
        //Get regions with ajax

        if (childSvgRoot[i].tagName === 'g') {

            var gPrincipal = childSvgRoot[i].childNodes;

            for (var j = 0; j < gPrincipal.length; j++) {
                if (gPrincipal[j].tagName === 'g') {
                    gPrincipal[j].classList.add("regionGroup");
                    childG = gPrincipal[j].childNodes;
                    for (var k = 0; k < childG.length; k++) {
                        if (childG[k].tagName === 'path') {
                            childG[k].classList.add("pathFog");
                        }
                    }
                }
                if (gPrincipal[j].tagName === 'path') {
                    gPrincipal[j].classList.add("pathFog");
                }
            }
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

        armyBlock.classList.add("army-zoom");
        armyName.style.display = 'none';
        armyNumber.style.display = 'none';
        armyBlock.onmouseover = function () {
            armyNumber.style.display = 'block';
        };
        armyBlock.onmouseout = function () {
            armyNumber.style.display = 'none';
        };

    }

    for (var i = 0; i < region.length; i++) {

        region[i].addEventListener("click", function (event) {

            if (event.target !== this) {

                alert('You actually clicked #container itself.');

                this.style.strokeWidth = "0.3";

                var idRegion = this.id;

                $.ajax({
                    type: "POST",
                    url: "./View/RegionView.php",
                    data: {idRegion: idRegion},
                    success: function (data) {
                        console.log(data);
                        $('#container').append(data);
                        $("#info-region").show();
                    }
                });

            } else {

                $("#army").click(function () {
                    alert('toto');
                    var infoArmyBlock = document.getElementById("info-army");
                    infoArmyBlock.style.display = 'block';
                });

            }
        }, false);
    }

    $.ajax({
        type: "POST",
        url: "./View/ArmyView.php",
        success: function (data) {

            var jsonData = $.parseJSON(data);

            //now json variable contains data in json format
            //let's display a few items
            for (var i = 0; i < jsonData.length; i++)
            {

                var nameArmy = jsonData[i].armyName;
                var regionArmy = jsonData[i].regionName;
                var foreignObject;

                for (var j = 0; j < region.length; j++) {

                    if (region[j].getAttribute('id') === regionArmy) {

                        var regionNodes = region[j].childNodes;

                        for (var k = 0; k < regionNodes.length; k++) {

                            if (regionNodes[k].tagName === 'text') {

                                var armyCoordinatesX = regionNodes[k].getAttribute('x');
                                var armyCoordinatesY = regionNodes[k].getAttribute('y');
                            }
                        }

                        foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

                        //var infoArmy = '<div id="info-army" class="info-army"><div id="info-general-army"><span id="name-army">Armée franque</span><span id="location-army"></span><div id="info-general-army-close"><i class="fa fa-window-close-o close-army-button" onclick="displayArmyInfo(false)"></i></div></div><div id="info-content-small-army"><div class="small-army" id="infantry-army-1">Infanterie franque 4000</div><div class="small-army" id="infantry-army-2">Infanterie franque 3500</div><div class="small-army" id="bow-army-1">Archer franc 1500</div><div class="small-army" id="cavalry-army-1">Cavalerie franque 1000</div></div></div>';
                        var armyContent = '<div id="army">' + nameArmy + '</div>';

                        $(foreignObject).attr("x", armyCoordinatesX).attr("y", armyCoordinatesY).attr("width", 8).attr("height", 2).append(armyContent);

                        region[j].append(foreignObject);

                    }
                }
            }
        }
    });

    $("div.close-army-button").click(function () {

        var infoArmyBlock = document.getElementById("info-army");
        infoArmyBlock.style.display = 'none';

    });

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

function endTurn() {
    return;
}

function displayArmyInfo(boolean) {

    var infoArmyBlock = document.getElementById("info-army");

    if (boolean) {
        infoArmyBlock.style.display = 'block';
    } else {
        infoArmyBlock.style.display = 'none';
    }
}

function displayRegionInfo(boolean) {

    var infoRegionBlock = document.getElementById("info-region");

    if (boolean) {
        infoRegionBlock.style.display = 'block';
    } else {
        infoRegionBlock.style.display = 'none';
    }
}