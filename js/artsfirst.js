require([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/layers/MapImageLayer",
      /*"esri/layers/TileLayer",
      "esri/layers/VectorTileLayer",*/
      "esri/renderers/SimpleRenderer",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/SimpleFillSymbol",
      "esri/renderers/UniqueValueRenderer",
      "esri/widgets/Search",
      "esri/widgets/Popup",
      "esri/widgets/Legend",
      "esri/geometry/Extent",
      "esri/symbols/TextSymbol",
      "dojo/query",

      // Bootstrap
      "bootstrap/Dropdown",
      "bootstrap/Collapse",

      // Calcite Maps
      "calcite-maps/calcitemaps-v0.3",

      "dojo/domReady!"
    ], function(Map, MapView, FeatureLayer, MapImageLayer, /*TileLayer, VectorTileLayer,*/ SimpleRenderer, SimpleMarkerSymbol, 
      SimpleFillSymbol, UniqueValueRenderer, Search, Popup, Legend, Extent, TextSymbol, query) {

      var artsLocationUrl = "https://map.harvard.edu/arcgis/rest/services/artsfirst/artsfirst2018/MapServer/0";
      
      // add text labels
      /*var layerText = new MapImageLayer({
        //url: "https://webgis.labzone.dce.harvard.edu/arcgis/rest/services/art_label/MapServer"
        url: "https://map.harvard.edu/arcgis/rest/services/MapText/MapServer"
      });

      // add vector tiles
      var tileLyr = new VectorTileLayer({
        url: "https://webgis.labzone.dce.harvard.edu/arcgis/rest/services/Hosted/art_vt/VectorTileServer"
      });

      var campusLyr = new TileLayer({
          url: "https://map.harvard.edu/arcgis/rest/services/CampusBase/MapServer"
      });*/


      // create the PopupTemplate
      var popupTemplate = {
        title: "{Primary_Category}",
        content: "<p>Address: <b>{Address_1}</b></p>" +
          "<p> Location: <b>{Venue_1}</b></p>"
           
      };
      
      // to do change color and var name  

      // create markers symbol
      var symConference = new SimpleMarkerSymbol({        
        size: 10,
        color: "#ffff00",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [255, 255, 0,0.4]
        }
      });

      var symDance = new SimpleMarkerSymbol({
        size: 10,
        color: "#99ff33",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [153, 255, 51,0.4]
        }
      });

      var symExhibitions = new SimpleMarkerSymbol({
        size: 10,
        color: "#009900",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [0,153,0,0.4]
        }
      });

      var symFilms = new SimpleMarkerSymbol({
        size: 10,
        color: "#0000ff",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [0, 0, 255,0.4]
        }
      });

      var symArtsMedalCeremony = new SimpleMarkerSymbol({
        size: 10,
        color: "#cc66ff",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [204, 102, 255,0.4]
        }
      });

      var symJTeaCeremony = new SimpleMarkerSymbol({
        size: 10,
        color: "#990000",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [153, 0, 0,0.4]
        }
      });

      var symLecture = new SimpleMarkerSymbol({
        size: 10,
        color: "#ffb84d",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [255, 184, 77,0.4]
        }
      });

      var symMakeArtStations = new SimpleMarkerSymbol({
        size: 10,
        color: "#e68a00",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [230, 138, 0,0.4]
        }
      });
      
      var symMusic = new SimpleMarkerSymbol({
        size: 10,
        color: "#ff99ff",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [255, 153, 255,0.4]
        }
      });

      var symPerformanceFair = new SimpleMarkerSymbol({
        size: 10,
        color: "#ff3300",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [255, 51, 0,0.4]
        }
      });
      
      var symPowWow = new SimpleMarkerSymbol({
        size: 10,
        color: "#cccc00",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [204, 204, 0,0.4]
        }
      });

      var symPublicArt = new SimpleMarkerSymbol({
        size: 10,
        //color: "#993399",
        color: "#ffff00",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          //color: [153, 51, 153,0.4]
          color: [255, 255, 0,0.4]
        }
      });

      var symTheater = new SimpleMarkerSymbol({
        size: 10,
        color: "#663300",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [102, 51, 0,0.4]
        }
      });

      // style a legend
      var aRenderer = new UniqueValueRenderer({
        field: "Primary_Category",
        //defaultSymbol: new SimpleFillSymbol()
        uniqueValueInfos: [
          /*{
            value: "Conference",  // value "Concert"
            symbol: symConference  // will be assigned symConcert
          },*/ {
            value: "Dance",  // value "Dance"
            symbol: symDance  // will be assigned symExbition
          }, 
          {
            value: "Exhibitions",  // value "Exhibitions"
            symbol: symExhibitions  // will be assigned symExbition
          },          
          {
            value: "Films",  // value "Film"
            symbol: symFilms  // will be assigned symExbition
          },
          /*{
            value: "Harvard Arts Medal Ceremony",  // value "Harvard Arts Medal Ceremony"
            symbol: symArtsMedalCeremony  // will be assigned symExbition
          },*/
          {
            value: "Japanese Tea Ceremony",  // value "Japanese Tea Ceremony"
            symbol: symJTeaCeremony // will be assigned symExbition
          },
          {
            value: "Make Art Stations",  // value "Make Art Stations"
            symbol: symMakeArtStations   // will be assigned symExbition
          },
          {
            value: "Music",  // value "Music"
            symbol: symMusic  // will be assigned symExbition
          },
          {
            value: "Performance Fair",  // value "Performance Fair"
            symbol: symPerformanceFair  // will be assigned symExbition
          },
          /*{
            value: "Pow Wow",  // value "Pow Wow"
            symbol: symPowWow  // will be assigned symExbition
          },*/
          {
            value: "Public Art",  // value "Public Art"
            symbol: symPublicArt  // will be assigned symExbition
          },
          {
            value: "Theater",  // value "Exhibition"
            symbol: symTheater  // will be assigned symExbition
          },
        ]
      });

      
      /******************************************************************
       *
       * Create the map, view and widgets
       * 
       ******************************************************************/
      var artsLayer = new FeatureLayer({
        url: artsLocationUrl,
        outFields: ["*"],
        popupTemplate: popupTemplate,
        visible: true,
        renderer: aRenderer
      });

      var tentLayer = new MapImageLayer({
        url: "https://map.harvard.edu/arcgis/rest/services/artsfirst/artsfirst2018/MapServer",
        sublayers: [{
          id: 1,
          labelsVisible: true,
          labelingInfo: [{
            labelExpression: "[name]",
            labelPlacement: "always-horizontal",
            symbol: new TextSymbol({
              color: [ 0,0,0,0.85 ],
              font: {size: 14}
            }),      
            }]
          }]
      });
      
      // Map
      var map = new Map({
        basemap: "topo",
        //layers: [campusLyr, layerText, artsLayer]
        layers: [artsLayer, tentLayer]
        //layers: [artsLayer]
      });

      // View
      var mapView = new MapView({
        container: "mapViewDiv",
        map: map,
        center: [-71.116076, 42.37375],
        zoom: 16,
        padding: {top: 50, bottom: 0}, 
        breakpoints: {xsmall: 768, small: 769, medium: 992, large: 1200}
      });

      // query all features from the artsLayer
      mapView.then(function() {         
        return artsLayer.then(function() {
          var query = artsLayer.createQuery();
          return artsLayer.queryFeatures(query);
        });
      }).then(getValues).then(getUniqueValues);
      
      // return an array of all the values in the
      // Venue_Type field of the artsLayer
      function getValues(response) {        
        var features = response.features;               
        var values = features.map(function(feature) {
          return feature.attributes.Primary_Category;
        });
        return values;
      }

      // return an array of unique values in
      // the Venue_Type field of the artsLayer
      function getUniqueValues(values) {
        var uniqueValues = [];
        values.forEach(function(item, i) {
          if ((uniqueValues.length < 1 || uniqueValues.indexOf(item) ===
              -1) &&
            (item !== "")) {
            uniqueValues.push(item);
          }
        });
        return uniqueValues;
      }

      // set the definition expression on the artsLayer
      // to reflect the selection of the user
      function setArtsDefinitionExpression(newValue) {
        if(newValue == "%"){
          artsLayer.definitionExpression = "Primary_Category Like '" + newValue + "'";
          
          if (!artsLayer.visible) {
            artsLayer.visible = true;

          }
          return queryForArtsLayerGeometries();
        }
        else{
          artsLayer.definitionExpression = "Primary_Category = '" + newValue + "'";
          if (!artsLayer.visible) {
            artsLayer.visible = true;

          }
          return queryForArtsLayerGeometries();
        }
      }
     
      // Get all the geometries of the artsLayer
        
        function queryForArtsLayerGeometries() {
          //console.log("test!!!")
          var artsQuery = artsLayer.createQuery();
          
          return artsLayer.queryFeatures(artsQuery)
            .then(function(response) {
              console.log(response)
              //console.log(myArray(response.features.length, response.features))
              //console.log(response.features.length, response.features)
              myArray(response.features.length, response.features)
              artsGeometries = response.features.map(function(feature) {
                return feature.geometry;
              });
              return artsGeometries;
            });
        }

        // create extent
        function myArray(len, arr){
          // for a single point center the map on top of it
          if(len === 1){
            //console.log(arr[0].geometry)
            mapView.center = [arr[0].geometry.longitude, arr[0].geometry.latitude];
            mapView.zoom = 18;
          }
          var artsArrayX = [];
          var artsArrayY = [];
          for (i = 0; i < len; i++) {             
            artsArrayX.push(arr[i].geometry.x)
            artsArrayY.push(arr[i].geometry.y)
          }          
          artsArrayX.sort();
          artsArrayY.sort();
          
          var xMin = artsArrayX[0];
          var yMin = artsArrayY[0];
          var xMax = artsArrayX[artsArrayX.length - 1];
          var yMax = artsArrayY[artsArrayY.length - 1];
          //console.log(xMin, yMin, xMax, yMax)
          mapView.extent = new Extent({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, spatialReference: 102100});
          //mapView.expand(3);
          //alert(mapView.zoom)
          if(mapView.zoom > 18){mapView.zoom = 17}          
        } 

      // create a legend  
      var legend = new Legend({
          view: mapView,
          height:'200px',
          width: '200px',
          layerInfos: [
          {
            layer: artsLayer,
            title: "Arts Venue"
          }]
      });

      //mapView.ui.add(legend, "bottom-left");
      

      // Search - add to navbar
      var searchWidget = new Search({
        view: mapView,
        allPlaceholder: "Building",
        sources: [{
          featureLayer: new FeatureLayer({
            url: "https://map.harvard.edu/arcgis/rest/services/HUMercator/MapServer/16",
            popupTemplate: { // autocasts as new popupTemplate()
              title: "{Primary_Building_Name}",
              overwriteActions: true
            }
          }),
          searchFields: ["Primary_Building_Name"],
          displayField: "Primary_Building_Name",
          exactMatch: false,
          outFields: ["Primary_Building_Name"],
          name: "",
          placeholder: "Building Name",
        },
          /*{featureLayer: new FeatureLayer({
              url: "https://map.harvard.edu/arcgis/rest/services/ArtsFirst/artsfirst17/MapServer/0",
              popupTemplate: { // autocasts as new popupTemplate()
                title: "{Primary_Category}",
                overwriteActions: true
              }
            }),
            searchFields: ["Primary_Category"],
            displayField: "Primary_Category",
            exactMatch: false,
            outFields: ["Primary_Category"],
            name: "",
            placeholder: "Primary_Category",
        }*/],
      }, "searchWidgetDiv");

      
      // change arstLayer value with panel
      query("#selectFilterPanel").on("change", function(e) {
        if(mapView.popup.visible === true) {mapView.popup.close();}
        //console.log(mapView.popup.visible)
        setArtsDefinitionExpression(e.target.value);
        //console.log(mapView.extent)
      });
 
      query("#toggleLegend").on("click", function(){
        if(document.getElementById("esri_widgets_Legend_0") == null){
          mapView.ui.add(legend, "bottom-left");
          // remove legend caption
          document.getElementsByClassName('esri-legend__layer-caption')[0].remove();  
        }
        else{
          mapView.ui.remove(legend, "bottom-left");  
        }        
      })

      /******************************************************************
       *
       * Synchronize popup and Bootstrap panels
       * 
       ******************************************************************/

      // Popup - dock top-right desktop, bottom for mobile
      mapView.watch("widthBreakpoint", function(breakPoint){        
        if (breakPoint === "medium" || breakPoint === "large" || breakPoint === "xlarge") {
         mapView.popup.dockOptions.position = "top-right";
        } else {
         mapView.popup.dockOptions.position = "bottom-center";
        }
      });

      // Popup - show/hide panels when popup is docked
      mapView.popup.watch(["visible", "currentDockPosition"], function(){
        var docked = mapView.popup.visible && mapView.popup.currentDockPosition;
        if (docked) {
          query(".calcite-panels").addClass("invisible");
        } else {
          query(".calcite-panels").removeClass("invisible");
        }
      });

      // Panels - undock popup when panel shows
      query(".calcite-panels .panel").on("show.bs.collapse", function(e) {
        if (mapView.popup.currentDockPosition) {
          mapView.popup.dockEnabled = false;
        }
      });



    });