require([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/layers/MapImageLayer",
      "esri/layers/VectorTileLayer",
      "esri/renderers/SimpleRenderer",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/SimpleFillSymbol",
      "esri/renderers/UniqueValueRenderer",
      "esri/widgets/Search",
      "esri/widgets/Popup",
      "esri/widgets/Legend",
      "dojo/query",

      // Bootstrap
      "bootstrap/Dropdown",
      "bootstrap/Collapse",

      // Calcite Maps
      "calcite-maps/calcitemaps-v0.3",

      "dojo/domReady!"
    ], function(Map, MapView, FeatureLayer, MapImageLayer, VectorTileLayer, SimpleRenderer, SimpleMarkerSymbol, 
      SimpleFillSymbol, UniqueValueRenderer, Search, Popup, Legend, query) {

      var artsLocationUrl = "https://map.harvard.edu/arcgis/rest/services/ArtsFirst/artsfirst17/MapServer/0";
            
      // create the PopupTemplate
      var popupTemplate = {
        title: "{Venue}",
        content: "<p>Address: {Address_1}</p>" +
          "<p> Location: {Room_name_or_number__or_description_of_location_}</p>" +
          "<p> Event Type: {Venue_1}" 
      };
      
      // to do change color and var name  

      // create markers symbol
      var symConcert = new SimpleMarkerSymbol({        
        size: 8,
        color: "#a6cee3",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [166, 206, 227,0.4]
        }
      });

      var symExhibition = new SimpleMarkerSymbol({
        size: 8,
        color: "#1f78b4",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [31, 120, 180,0.4]
        }
      });

      var symInstallation = new SimpleMarkerSymbol({
        size: 8,
        color: "#b2df8a",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [178, 223, 138,0.4]
        }
      });

      var symFilm = new SimpleMarkerSymbol({
        size: 8,
        color: "#33a02c",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [51, 160, 44,0.4]
        }
      });

      var symMakeArtStation = new SimpleMarkerSymbol({
        size: 8,
        color: "#fb9a99",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [251, 154, 153,0.4]
        }
      });

      var symPerformanceFair = new SimpleMarkerSymbol({
        size: 8,
        color: "#e31a1c",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [227, 26, 28,0.4]
        }
      });

      var symPublicArt = new SimpleMarkerSymbol({
        size: 8,
        color: "#fdbf6f",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [253, 191, 111,0.4]
        }
      });

      var symLecture = new SimpleMarkerSymbol({
        size: 8,
        color: "#ff7f00",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [255, 127, 0,0.4]
        }
      });

      var symTeaCeremony = new SimpleMarkerSymbol({
        size: 8,
        color: "#cab2d6",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [202, 178, 214,0.4]
        }
      });

      var symHarvardPowWow = new SimpleMarkerSymbol({
        size: 8,
        color: "#6a3d9a",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [106, 61, 154,0.4]
        }
      });

      var symTheatricalProduction = new SimpleMarkerSymbol({
        size: 8,
        color: "#ffff99",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [255, 255, 153,0.4]
        }
      });

      var symTheatricalPerformance = new SimpleMarkerSymbol({
        size: 8,
        color: "#b15928",
        style:"circle",
        outline: {
          width: 2.4,
          //color: "black"
          color: [177, 89, 40,0.4]
        }
      });


      var aRenderer = new UniqueValueRenderer({
        field: "Primary_Category",
        //defaultSymbol: new SimpleFillSymbol()
        uniqueValueInfos: [
          {
            value: "Conference",  // value "Concert"
            symbol: symConcert  // will be assigned symConcert
          }, {
            value: "Dance",  // value "Dance"
            symbol: symExhibition  // will be assigned symExbition
          }, 
          {
            value: "Exhibitions",  // value "Exhibitions"
            symbol: symInstallation  // will be assigned symExbition
          },          
          {
            value: "Films",  // value "Film"
            symbol: symFilm  // will be assigned symExbition
          },
          {
            value: "Harvard Arts Medal Ceremony",  // value "Harvard Arts Medal Ceremony"
            symbol: symMakeArtStation  // will be assigned symExbition
          },
          {
            value: "Japanese Tea Ceremony",  // value "Japanese Tea Ceremony"
            symbol: symPerformanceFair // will be assigned symExbition
          },
          {
            value: "Make Art Stations",  // value "Make Art Stations"
            symbol: symPublicArt   // will be assigned symExbition
          },
          {
            value: "Music",  // value "Music"
            symbol: symLecture  // will be assigned symExbition
          },
          {
            value: "Performance Fair",  // value "Performance Fair"
            symbol: symTeaCeremony  // will be assigned symExbition
          },
          {
            value: "Pow Wow",  // value "Pow Wow"
            symbol: symHarvardPowWow  // will be assigned symExbition
          },
          {
            value: "Public Art",  // value "Public Art"
            symbol: symTheatricalProduction  // will be assigned symExbition
          },
          {
            value: "Theater",  // value "Exhibition"
            symbol: symTheatricalPerformance  // will be assigned symExbition
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
      // add text labels
      layerText = new MapImageLayer({
        url: "https://webgis.labzone.dce.harvard.edu/arcgis/rest/services/art_label/MapServer"
      });

      // add vector tiles
      var tileLyr = new VectorTileLayer({
        url: "http://webgis.labzone.dce.harvard.edu/arcgis/rest/services/Hosted/art_vt/VectorTileServer"
      });
      
      // Map
      var map = new Map({
        //basemap: "gray",
        layers: [tileLyr, layerText, artsLayer]
        //layers: [artsLayer]

      });

      // View
      var mapView = new MapView({
        container: "mapViewDiv",
        map: map,
        center: [-71.116076, 42.37375],
        zoom: 17,
        padding: {top: 50, bottom: 0}, 
        breakpoints: {xsmall: 768, small: 769, medium: 992, large: 1200}
      });

      // query all features from the artsLayer
      mapView.then(function() {
        return artsLayer.then(function() {
          var query = artsLayer.createQuery();
          return artsLayer.queryFeatures(query);
        });
      }).then(getValues).then(getUniqueValues)

      // return an array of all the values in the
      // Venue_Type field of the artsLayer
      function getValues(response) {
        var features = response.features;
        var values = features.map(function(feature) {
          return feature.attributes.Venue_Type;
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
        // the createQuery() method creates a query
        // object that respects the definitionExpression
        // of the layer
        function queryForArtsLayerGeometries() {
          var artsQuery = artsLayer.createQuery();

          return artsLayer.queryFeatures(artsQuery)
            .then(function(response) {
              artsGeometries = response.features.map(function(feature) {
                return feature.geometry;
              });

              return artsGeometries;
            });
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

      // Search - add to navbar
      var searchWidget = new Search({
        view: mapView,
        allPlaceholder: "Building or Parking",
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
          {featureLayer: new FeatureLayer({
              url: "https://map.harvard.edu/arcgis/rest/services/Parking/MapServer/0",
              popupTemplate: { // autocasts as new popupTemplate()
                title: "{Name}",
                overwriteActions: true
              }
            }),
            searchFields: ["Name"],
            displayField: "Name",
            exactMatch: false,
            outFields: ["Name"],
            name: "",
            placeholder: "Name",
        }],
      }, "searchWidgetDiv");

      
      // change arstLayer value with panel
      query("#selectFilterPanel").on("change", function(e) {
        setArtsDefinitionExpression(e.target.value)
      });
 
      query("#toggleLegend").on("click", function(){
        if(document.getElementById("esri_widgets_Legend_0") == null){
          mapView.ui.add(legend, "bottom-right");
          // remove legend caption
          document.getElementsByClassName('esri-legend__layer-caption')[0].remove();  
        }
        else{
          mapView.ui.remove(legend, "bottom-right");  
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