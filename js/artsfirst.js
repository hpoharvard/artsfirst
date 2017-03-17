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
      
      /*var aRenderer = new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          size: 8,
          color: "black",
          outline: {
            width: 1,
            color: "red"
          }
        })
      });*/

      var symConcert = new SimpleMarkerSymbol({        
        size: 8,
        color: "#a6cee3",
        style:"circle",
        outline: {
          width: 0.5,
          color: "black"
        }
      });

      var symExhibition = new SimpleMarkerSymbol({
        size: 8,
        color: "#1f78b4",
        style:"circle",
        outline: {
          width: 0.5,
          color: "black"
        }
      });

      var symInstallation = new SimpleMarkerSymbol({
        size: 8,
        color: "#b2df8a",
        style:"circle",
        outline: {
          width: 0.5,
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
        ]
      });

      // Create the PopupTemplate
        var popupTemplate = {
          title: "{Name}",
          content: "<p><b> Address: {Address} </b></p>" +
            "<p> Room: {Room}</p>" +
            "<p> Zone: {Zone}</p>" 
        };      
      
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
        padding: {
          top: 50,
          bottom: 0
        }, 
        breakpoints: {
          xsmall: 768,
          small: 769,
          medium: 992,
          large: 1200
        }
      });

      // Search - add to navbar
      var searchWidget = new Search({
        view: mapView
      }, "searchWidgetDiv");

      // Zoom to New York and show popup
      //searchWidget.search("New York City");

      // Change basemaps with panel
      query("#selectBasemapPanel").on("change", function(e) {
        mapView.map.basemap = e.target.value;
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