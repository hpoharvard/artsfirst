require([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/renderers/SimpleRenderer",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/SimpleFillSymbol",
      "esri/renderers/UniqueValueRenderer",
      "esri/widgets/Search",
      "esri/widgets/Popup",
      "dojo/query",

      // Bootstrap
      "bootstrap/Dropdown",
      "bootstrap/Collapse",

      // Calcite Maps
      "calcite-maps/calcitemaps-v0.3",

      "dojo/domReady!"
    ], function(Map, MapView, FeatureLayer, SimpleRenderer, SimpleMarkerSymbol, SimpleFillSymbol, UniqueValueRenderer, Search, Popup, query) {

      var artsLocationUrl = "https://hppm-dev.cadm.harvard.edu/arcgis/rest/services/ArtsFirst/ArtsFirst/MapServer/2";
            
      // create the PopupTemplate
      var popupTemplate = {
        title: "{Name}",
        content: "<p><b> Address: {Address} </b></p>" +
          "<p> Room: {Room}</p>" +
          "<p> Zone: {Zone}</p>" 
      };
      // create markers symbol
      var symConcert = new SimpleMarkerSymbol({        
        size: 8,
        color: "#a6cee3",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symExhibition = new SimpleMarkerSymbol({
        size: 8,
        color: "#1f78b4",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symInstallation = new SimpleMarkerSymbol({
        size: 8,
        color: "#b2df8a",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symFilm = new SimpleMarkerSymbol({
        size: 8,
        color: "#33a02c",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symMakeArtStation = new SimpleMarkerSymbol({
        size: 8,
        color: "#fb9a99",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symPerformanceFair = new SimpleMarkerSymbol({
        size: 8,
        color: "#e31a1c",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symPublicArt = new SimpleMarkerSymbol({
        size: 8,
        color: "#fdbf6f",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symLecture = new SimpleMarkerSymbol({
        size: 8,
        color: "#ff7f00",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symTeaCeremony = new SimpleMarkerSymbol({
        size: 8,
        color: "#cab2d6",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symHarvardPowWow = new SimpleMarkerSymbol({
        size: 8,
        color: "#6a3d9a",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symTheatricalProduction = new SimpleMarkerSymbol({
        size: 8,
        color: "#ffff99",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });

      var symTheatricalPerformance = new SimpleMarkerSymbol({
        size: 8,
        color: "#b15928",
        style:"circle",
        outline: {
          width: .6,
          color: "black"
        }
      });


      var aRenderer = new UniqueValueRenderer({
        field: "Venue_Type",
        //defaultSymbol: new SimpleFillSymbol()
        uniqueValueInfos: [
          {
            value: "Concert",  // value "Concert"
            symbol: symConcert  // will be assigned symConcert
          }, {
            value: "Exhibition",  // value "Exhibition"
            symbol: symExhibition  // will be assigned symExbition
          }, 
          {
            value: "Installation",  // value "Exhibition"
            symbol: symInstallation  // will be assigned symExbition
          },          
          {
            value: "Film",  // value "Exhibition"
            symbol: symFilm  // will be assigned symExbition
          },
          {
            value: "Make Art Station",  // value "Exhibition"
            symbol: symMakeArtStation  // will be assigned symExbition
          },
          {
            value: "Performance Fair",  // value "Exhibition"
            symbol: symPerformanceFair // will be assigned symExbition
          },
          {
            value: "Public Art",  // value "Exhibition"
            symbol: symPublicArt   // will be assigned symExbition
          },
          {
            value: "Lecture",  // value "Exhibition"
            symbol: symLecture  // will be assigned symExbition
          },
          {
            value: "Tea Ceremony",  // value "Exhibition"
            symbol: symTeaCeremony  // will be assigned symExbition
          },
          {
            value: "Harvard Pow Wow",  // value "Exhibition"
            symbol: symHarvardPowWow  // will be assigned symExbition
          },
          {
            value: "Theatrical Production",  // value "Exhibition"
            symbol: symTheatricalProduction  // will be assigned symExbition
          },
          {
            value: "Theatrical Performance",  // value "Exhibition"
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
      
      // Map
      var map = new Map({
        basemap: "gray",
        layers: [artsLayer]
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
        artsLayer.definitionExpression = "Venue_Type = '" + newValue + "'";
          if (!artsLayer.visible) {
            artsLayer.visible = true;
          }
        return queryForArtsLayerGeometries();
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

      // Search - add to navbar
      var searchWidget = new Search({
        view: mapView
      }, "searchWidgetDiv");

      
      // change arstLayer value with panel
      query("#selectFilterPanel").on("change", function(e) {
        //mapView.map.basemap = e.target.value;
        //console.log(e.target.value)
        setArtsDefinitionExpression(e.target.value)
      });
 

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