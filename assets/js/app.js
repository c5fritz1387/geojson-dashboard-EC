var config = {
  geojson: "assets/js/birchplot.geojson", //birchplot.js needs to be saved to birchplot.geojson
  title: "Guardian Program Data Management System",
  layerName: "Plots",
  hoverProperty: "Tap_Class", //add new property
  sortProperty: "Tap_Stem", //
  sortOrder: "desc"
};

var properties = [{
value: "OBJECTID",
  label: "Table Unique ID",
  table: {
    visible: false,
    sortable: true
  }
},
{
  value: "SITE_PLOT",
  label: "Plot Unique ID",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    vertical: true,
    multiple: true,
    operators: ["in", "not_in", "equal", "not_equal", "greater"],
    values: []
  }
},
{
  value: "SITE_ID",
  label: "Site Identifier",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "Plot_ID",
  label: "Plot Identifier",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer",
    input: "checkbox",
    vertical: true,
    multiple: true,
    operators: ["in", "not_in", "equal", "not_equal"],
    values: []
  }
},
{
  value: "DateRecord",
  label: "Date Recorded",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    vertical: true,
    multiple: true,
    operators: ["in", "not_in", "equal", "not_equal"],
    values: []
  }
},
{
  value: "Status",
  label: "Site Status",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    vertical: true,
    multiple: true,
    operators: ["in", "not_in", "equal", "not_equal"],
    values: []
  }
},
  value: "PlotStatus",
  label: "Plot Status",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    vertical: true,
    multiple: true,
    operators: ["in", "not_in", "equal", "not_equal"],
    values: []
  }
},
{
  value: "Forest_Nam",
  label: "Forest Name",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    vertical: true,
    multiple: true,
    operators: ["in", "not_in", "equal", "not_equal"],
    values: []
  }
},
{
  value: "Forest_num",
  label: "Forest Code",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer",
    input: "checkbox",
    vertical: true,
    multiple: true,
    operators: ["in", "not_in", "equal", "not_equal"],
    values: []
  }
},
{
  value: "Tap_Stem",
  label: "Stem Density (Trees/Ha) - Tap",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "Tap_DBH",
  label: "DBH Average (cm) - Tap",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "HA",
  label: "Site Size (Ha)",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "Access1km",
  label: "Site Accessibility within 1 km",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "radio",
    operators: ["equal"],
    values: {
      "y": "Yes",
      "null": "No"
    }
  }
},
{
  value: "Tap_Class",
  label: "Tappable",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "radio",
    operators: ["equal"],
    values: {
      "Tap": "Yes",
      "No Tap": "No"
    }
  }
},
{
  value: "Prem_Class",
  label: "Monitor for Growth 1-5 years",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "radio",
    operators: ["equal"],
    values: {
      "Monitor": "Yes",
      "No Monitor": "No"
    }
  }
},
{
  value: "notes_other_information",
  label: "Notes",
  table: {
    visible: false,
    sortable: true
  },
  filter: {
    type: "string"
  }
},
{
  value: "Dis_Chap",
  label: "Distance to Chapleau, ON",
  table: {
    visible: false,
    sortable: true
  }
},
  value: "Dis_TL",
  label: "Distance to Trout Lake, ON",
  table: {
    visible: false,
    sortable: true
  }
},
  value: "SPCOMP",
  label: "Species Composition",
  table: {
    visible: false,
    sortable: true
  }
},
  value: "GPS_CodeG",
  label: "Team",
  table: {
    visible: false,
    sortable: true
  }
},
value: "SiteAccess",
  label: "Access Type",
  table: {
    visible: false,
    sortable: true
  }
},
/*{
  value: "photos_url",
  label: "Photos",
  table: {
    visible: true,
    sortable: true,
    formatter: urlFormatter
  },
  filter: false
}*/];

/*function drawCharts() {
  // Status
  $(function() {
    var result = alasql("SELECT status AS label, COUNT(*) AS total FROM ? GROUP BY status", [features]);
    var columns = $.map(result, function(status) {
      return [[status.label, status.total]];
    });
    var chart = c3.generate({
        bindto: "#status-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Zones
  $(function() {
    var result = alasql("SELECT congress_park_inventory_zone AS label, COUNT(*) AS total FROM ? GROUP BY congress_park_inventory_zone", [features]);
    var columns = $.map(result, function(zone) {
      return [[zone.label, zone.total]];
    });
    var chart = c3.generate({
        bindto: "#zone-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Size
  $(function() {
    var sizes = [];
    var regeneration = alasql("SELECT 'Regeneration (< 3\")' AS category, COUNT(*) AS total FROM ? WHERE CAST(dbh_2012_inches_diameter_at_breast_height_46 as INT) < 3", [features]);
    var sapling = alasql("SELECT 'Sapling/poles (1-9\")' AS category, COUNT(*) AS total FROM ? WHERE CAST(dbh_2012_inches_diameter_at_breast_height_46 as INT) BETWEEN 1 AND 9", [features]);
    var small = alasql("SELECT 'Small trees (10-14\")' AS category, COUNT(*) AS total FROM ? WHERE CAST(dbh_2012_inches_diameter_at_breast_height_46 as INT) BETWEEN 10 AND 14", [features]);
    var medium = alasql("SELECT 'Medium trees (15-19\")' AS category, COUNT(*) AS total FROM ? WHERE CAST(dbh_2012_inches_diameter_at_breast_height_46 as INT) BETWEEN 15 AND 19", [features]);
    var large = alasql("SELECT 'Large trees (20-29\")' AS category, COUNT(*) AS total FROM ? WHERE CAST(dbh_2012_inches_diameter_at_breast_height_46 as INT) BETWEEN 20 AND 29", [features]);
    var giant = alasql("SELECT 'Giant trees (> 29\")' AS category, COUNT(*) AS total FROM ? WHERE CAST(dbh_2012_inches_diameter_at_breast_height_46 as INT) > 29", [features]);
    sizes.push(regeneration, sapling, small, medium, large, giant);
    var columns = $.map(sizes, function(size) {
      return [[size[0].category, size[0].total]];
    });
    var chart = c3.generate({
        bindto: "#size-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Species
  $(function() {
    var result = alasql("SELECT species_sim AS label, COUNT(*) AS total FROM ? GROUP BY species_sim ORDER BY label ASC", [features]);
    var chart = c3.generate({
        bindto: "#species-chart",
        size: {
          height: 2000
        },
        data: {
          json: result,
          keys: {
            x: "label",
            value: ["total"]
          },
          type: "bar"
        },
        axis: {
          rotated: true,
          x: {
            type: "category"
          }
        },
        legend: {
          show: false
        }
    });
  });
}*/

$(function() {
  $(".title").html(config.title);
  $("#layer-name").html(config.layerName);
});

function buildConfig() {
  filters = [];
  table = [{
    field: "action",
    title: "<i class='fa fa-gear'></i>&nbsp;Action",
    align: "center",
    valign: "middle",
    width: "75px",
    cardVisible: false,
    switchable: false,
    formatter: function(value, row, index) {
      return [
        '<a class="zoom" href="javascript:void(0)" title="Zoom" style="margin-right: 10px;">',
          '<i class="fa fa-search-plus"></i>',
        '</a>',
        '<a class="identify" href="javascript:void(0)" title="Identify">',
          '<i class="fa fa-info-circle"></i>',
        '</a>'
      ].join("");
    },
    events: {
      "click .zoom": function (e, value, row, index) {
        map.fitBounds(featureLayer.getLayer(row.leaflet_stamp).getBounds());
        highlightLayer.clearLayers();
        highlightLayer.addData(featureLayer.getLayer(row.leaflet_stamp).toGeoJSON());
      },
      "click .identify": function (e, value, row, index) {
        identifyFeature(row.leaflet_stamp);
        highlightLayer.clearLayers();
        highlightLayer.addData(featureLayer.getLayer(row.leaflet_stamp).toGeoJSON());
      }
    }
  }];



  $.each(properties, function(index, value) {
    // Filter config
    if (value.filter) {
      var id;
      if (value.filter.type == "integer") {
        id = "cast(properties->"+ value.value +" as int)";
      }
      else if (value.filter.type == "double") {
        id = "cast(properties->"+ value.value +" as double)";
      }
      else {
        id = "properties->" + value.value;
      }
      filters.push({
        id: id,
        label: value.label
      });
      $.each(value.filter, function(key, val) {
        if (filters[index]) {
          // If values array is empty, fetch all distinct values
          if (key == "values" && val.length === 0) {
            alasql("SELECT DISTINCT(properties->"+value.value+") AS field FROM ? ORDER BY field ASC", [geojson.features], function(results){
              distinctValues = [];
              $.each(results, function(index, value) {
                distinctValues.push(value.field);
              });
            });
            filters[index].values = distinctValues;
          } else {
            filters[index][key] = val;
          }
        }
      });
    }
    // Table config
    if (value.table) {
      table.push({
        field: value.value,
        title: value.label
      });
      $.each(value.table, function(key, val) {
        if (table[index+1]) {
          table[index+1][key] = val;
        }
      });
    }
  });

  buildFilters();
  buildTable();
}




// Basemap Layers


var streetsLayer = L.tileLayer('http://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWNvdHJ1c3QiLCJhIjoibGo4TG5nOCJ9.QJnT2dgjL4_4EA7WlK8Zkw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>'
});


var satelliteLayer = L.esri.basemapLayer('Imagery');


var highlightLayer = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      color: "#FFF",
      weight: 2,
      opacity: 1,
      fillColor: "#00FFFF",
      fillOpacity: 1,
      clickable: false
    });
  },
  style: function (feature) {
    return {
      color: "#00FFFF",
      weight: 2,
      opacity: 1,
      fillColor: "#00FFFF",
      fillOpacity: 0.5,
      clickable: false
    };
  }
});

var featureLayer = L.geoJson(null, {
  filter: function(feature, layer) {
    return feature.geometry.coordinates[0] !== 0 && feature.geometry.coordinates[1] !== 0;
  },
  /*style: function (feature) {
    return {
      color: feature.properties.color
    };
  },*/
  pointToLayer: function (feature, latlng) {
    if (feature.properties && feature.properties["marker-color"]) {
      markerColor = feature.properties["marker-color"];
    } else {
      markerColor = "#FF0000";
    }
    return L.circleMarker(latlng, {
      radius: 4,
      weight: 2,
      fillColor: markerColor,
      color: markerColor,
      opacity: 1,
      fillOpacity: 1
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      layer.on({
        click: function (e) {
          identifyFeature(L.stamp(layer));
          highlightLayer.clearLayers();
          highlightLayer.addData(featureLayer.getLayer(L.stamp(layer)).toGeoJSON());
        },
        mouseover: function (e) {
          if (config.hoverProperty) {
            $(".info-control").html(feature.properties[config.hoverProperty]);
            $(".info-control").show();
          }
        },
        mouseout: function (e) {
          $(".info-control").hide();
        }
      });
    }
  }
});

// Fetch the GeoJSON file
$.getJSON(config.geojson, function (data) {
  geojson = data;
  features = $.map(geojson.features, function(feature) {
    return feature.properties;
  });
  featureLayer.addData(data);
  buildConfig();
  $("#loading-mask").hide();
});

var map = L.map("map", {
  layers: [satelliteLayer, featureLayer, highlightLayer]
}).fitWorld();

// ESRI geocoder
var searchControl = L.esri.Geocoding.Controls.geosearch({
  useMapBounds: 17
}).addTo(map);

// Info control
var info = L.control({
  position: "bottomleft"
});

// Custom info hover control
info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info-control");
  this.update();
  return this._div;
};
info.update = function (props) {
  this._div.innerHTML = "";
};
info.addTo(map);
$(".info-control").hide();

// Larger screens get expanded layer control
if (document.body.clientWidth <= 767) {
  isCollapsed = true;
} else {
  isCollapsed = false;
}
var baseLayers = {
  "Street Map": streetsLayer,
  "Aerial Imagery": satelliteLayer
};
var overlayLayers = {
  "<span id='layer-name'>GeoJSON Layer</span>": featureLayer
};
var layerControl = L.control.layers(baseLayers, overlayLayers, {
  collapsed: isCollapsed
}).addTo(map);

// Filter table to only show features in current map bounds
map.on("moveend", function (e) {
  syncTable();
});

map.on("click", function(e) {
  highlightLayer.clearLayers();
});

// Table formatter to make links clickable
function urlFormatter (value, row, index) {
  if (typeof value == "string" && (value.indexOf("http") === 0 || value.indexOf("https") === 0)) {
    return "<a href='"+value+"' target='_blank'>"+value+"</a>";
  }
}

function buildFilters() {
  $("#query-builder").queryBuilder({
    allow_empty: true,
    filters: filters
  });
}

function applyFilter() {
  var query = "SELECT * FROM ?";
  var sql = $("#query-builder").queryBuilder("getSQL", false, false).sql;
  if (sql.length > 0) {
    query += " WHERE " + sql;
  }
  alasql(query, [geojson.features], function(features){
		featureLayer.clearLayers();
		featureLayer.addData(features);
		syncTable();
	});
}

function buildTable() {
  $("#table").bootstrapTable({
    cache: false,
    height: $("#table-container").height(),
    undefinedText: "",
    striped: false,
    pagination: false,
    minimumCountColumns: 1,
    sortName: config.sortProperty,
    sortOrder: config.sortOrder,
    toolbar: "#toolbar",
    search: true,
    trimOnSearch: false,
    showColumns: true,
    showToggle: true,
    columns: table,
    onClickRow: function (row) {
      // do something!
    },
    onDblClickRow: function (row) {
      // do something!
    }
  });

  map.fitBounds(featureLayer.getBounds());

  $(window).resize(function () {
    $("#table").bootstrapTable("resetView", {
      height: $("#table-container").height()
    });
  });
}

function syncTable() {
  tableFeatures = [];
  featureLayer.eachLayer(function (layer) {
    layer.feature.properties.leaflet_stamp = L.stamp(layer);
    if (map.hasLayer(featureLayer)) {
      if (map.getBounds().contains(layer.getBounds())) {
        tableFeatures.push(layer.feature.properties);
      }
    }
  });
  $("#table").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));
  var featureCount = $("#table").bootstrapTable("getData").length;
  if (featureCount == 1) {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " visible feature");
  } else {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " visible features");
  }
}

function identifyFeature(id) {
  var featureProperties = featureLayer.getLayer(id).feature.properties;
  var content = "<table class='table table-striped table-bordered table-condensed'>";
  $.each(featureProperties, function(key, value) {
    if (!value) {
      value = "";
    }
    if (typeof value == "string" && (value.indexOf("http") === 0 || value.indexOf("https") === 0)) {
      value = "<a href='" + value + "' target='_blank'>" + value + "</a>";
    }
    $.each(properties, function(index, property) {
      if (key == property.value) {
        if (property.info !== false) {
          content += "<tr><th>" + property.label + "</th><td>" + value + "</td></tr>";
        }
      }
    });
  });
  content += "<table>";
  $("#feature-info").html(content);
  $("#featureModal").modal("show");
}

function switchView(view) {
  if (view == "split") {
    $("#view").html("Split View");
    location.hash = "#split";
    $("#table-container").show();
    $("#table-container").css("height", "55%");
    $("#map-container").show();
    $("#map-container").css("height", "45%");
    $(window).resize();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "map") {
    $("#view").html("Map View");
    location.hash = "#map";
    $("#map-container").show();
    $("#map-container").css("height", "100%");
    $("#table-container").hide();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "table") {
    $("#view").html("Table View");
    location.hash = "#table";
    $("#table-container").show();
    $("#table-container").css("height", "100%");
    $("#map-container").hide();
    $(window).resize();
  }
}

$("[name='view']").click(function() {
  $(".in,.open").removeClass("in open");
  if (this.id === "map-graph") {
    switchView("split");
    return false;
  } else if (this.id === "map-only") {
    switchView("map");
    return false;
  } else if (this.id === "graph-only") {
    switchView("table");
    return false;
  }
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#filter-btn").click(function() {
  $("#filterModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#chart-btn").click(function() {
  $("#chartModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#view-sql-btn").click(function() {
  alert($("#query-builder").queryBuilder("getSQL", false, false).sql);
});

$("#apply-filter-btn").click(function() {
  applyFilter();
});

$("#reset-filter-btn").click(function() {
  $("#query-builder").queryBuilder("reset");
  applyFilter();
});

$("#extent-btn").click(function() {
  map.fitBounds(featureLayer.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-csv-btn").click(function() {
  $("#table").tableExport({
    type: "csv",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-excel-btn").click(function() {
  $("#table").tableExport({
    type: "excel",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-pdf-btn").click(function() {
  $("#table").tableExport({
    type: "pdf",
    ignoreColumn: [0],
    fileName: "data",
    jspdf: {
      format: "bestfit",
      margins: {
        left: 20,
        right: 10,
        top: 20,
        bottom: 20
      },
      autotable: {
        extendWidth: false,
        overflow: "linebreak"
      }
    }
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#chartModal").on("shown.bs.modal", function (e) {
  drawCharts();
});
