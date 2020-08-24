var wms_layers = [];

var format_worldgeo_0 = new ol.format.GeoJSON();
var features_worldgeo_0 = format_worldgeo_0.readFeatures(json_worldgeo_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_worldgeo_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_worldgeo_0.addFeatures(features_worldgeo_0);
var lyr_worldgeo_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_worldgeo_0, 
                style: style_worldgeo_0,
                interactive: false,
                title: '<img src="styles/legend/worldgeo_0.png" /> world.geo'
            });

lyr_worldgeo_0.setVisible(true);
var layersList = [lyr_worldgeo_0];
lyr_worldgeo_0.set('fieldAliases', {'scalerank': 'scalerank', 'featurecla': 'featurecla', 'labelrank': 'labelrank', 'sovereignt': 'sovereignt', 'sov_a3': 'sov_a3', 'adm0_dif': 'adm0_dif', 'level': 'level', 'type': 'type', 'admin': 'admin', 'adm0_a3': 'adm0_a3', 'geou_dif': 'geou_dif', 'geounit': 'geounit', 'gu_a3': 'gu_a3', 'su_dif': 'su_dif', 'subunit': 'subunit', 'su_a3': 'su_a3', 'brk_diff': 'brk_diff', 'name': 'name', 'name_long': 'name_long', 'brk_a3': 'brk_a3', 'brk_name': 'brk_name', 'brk_group': 'brk_group', 'abbrev': 'abbrev', 'postal': 'postal', 'formal_en': 'formal_en', 'formal_fr': 'formal_fr', 'note_adm0': 'note_adm0', 'note_brk': 'note_brk', 'name_sort': 'name_sort', 'name_alt': 'name_alt', 'mapcolor7': 'mapcolor7', 'mapcolor8': 'mapcolor8', 'mapcolor9': 'mapcolor9', 'mapcolor13': 'mapcolor13', 'pop_est': 'pop_est', 'gdp_md_est': 'gdp_md_est', 'pop_year': 'pop_year', 'lastcensus': 'lastcensus', 'gdp_year': 'gdp_year', 'economy': 'economy', 'income_grp': 'income_grp', 'wikipedia': 'wikipedia', 'fips_10_': 'fips_10_', 'iso_a2': 'iso_a2', 'iso_a3': 'iso_a3', 'iso_n3': 'iso_n3', 'un_a3': 'un_a3', 'wb_a2': 'wb_a2', 'wb_a3': 'wb_a3', 'woe_id': 'woe_id', 'woe_id_eh': 'woe_id_eh', 'woe_note': 'woe_note', 'adm0_a3_is': 'adm0_a3_is', 'adm0_a3_us': 'adm0_a3_us', 'adm0_a3_un': 'adm0_a3_un', 'adm0_a3_wb': 'adm0_a3_wb', 'continent': 'continent', 'region_un': 'region_un', 'subregion': 'subregion', 'region_wb': 'region_wb', 'name_len': 'name_len', 'long_len': 'long_len', 'abbrev_len': 'abbrev_len', 'tiny': 'tiny', 'homepart': 'homepart', 'filename': 'filename', });
lyr_worldgeo_0.set('fieldImages', {'scalerank': '', 'featurecla': '', 'labelrank': '', 'sovereignt': '', 'sov_a3': '', 'adm0_dif': '', 'level': '', 'type': '', 'admin': '', 'adm0_a3': '', 'geou_dif': '', 'geounit': '', 'gu_a3': '', 'su_dif': '', 'subunit': '', 'su_a3': '', 'brk_diff': '', 'name': '', 'name_long': '', 'brk_a3': '', 'brk_name': '', 'brk_group': '', 'abbrev': '', 'postal': '', 'formal_en': '', 'formal_fr': '', 'note_adm0': '', 'note_brk': '', 'name_sort': '', 'name_alt': '', 'mapcolor7': '', 'mapcolor8': '', 'mapcolor9': '', 'mapcolor13': '', 'pop_est': '', 'gdp_md_est': '', 'pop_year': '', 'lastcensus': '', 'gdp_year': '', 'economy': '', 'income_grp': '', 'wikipedia': '', 'fips_10_': '', 'iso_a2': '', 'iso_a3': '', 'iso_n3': '', 'un_a3': '', 'wb_a2': '', 'wb_a3': '', 'woe_id': '', 'woe_id_eh': '', 'woe_note': '', 'adm0_a3_is': '', 'adm0_a3_us': '', 'adm0_a3_un': '', 'adm0_a3_wb': '', 'continent': '', 'region_un': '', 'subregion': '', 'region_wb': '', 'name_len': '', 'long_len': '', 'abbrev_len': '', 'tiny': '', 'homepart': '', 'filename': '', });
lyr_worldgeo_0.set('fieldLabels', {'scalerank': 'no label', 'featurecla': 'no label', 'labelrank': 'no label', 'sovereignt': 'no label', 'sov_a3': 'no label', 'adm0_dif': 'no label', 'level': 'no label', 'type': 'no label', 'admin': 'no label', 'adm0_a3': 'no label', 'geou_dif': 'no label', 'geounit': 'no label', 'gu_a3': 'no label', 'su_dif': 'no label', 'subunit': 'no label', 'su_a3': 'no label', 'brk_diff': 'no label', 'name': 'no label', 'name_long': 'no label', 'brk_a3': 'no label', 'brk_name': 'no label', 'brk_group': 'no label', 'abbrev': 'no label', 'postal': 'no label', 'formal_en': 'no label', 'formal_fr': 'no label', 'note_adm0': 'no label', 'note_brk': 'no label', 'name_sort': 'no label', 'name_alt': 'no label', 'mapcolor7': 'no label', 'mapcolor8': 'no label', 'mapcolor9': 'no label', 'mapcolor13': 'no label', 'pop_est': 'no label', 'gdp_md_est': 'no label', 'pop_year': 'no label', 'lastcensus': 'no label', 'gdp_year': 'no label', 'economy': 'no label', 'income_grp': 'no label', 'wikipedia': 'no label', 'fips_10_': 'no label', 'iso_a2': 'no label', 'iso_a3': 'no label', 'iso_n3': 'no label', 'un_a3': 'no label', 'wb_a2': 'no label', 'wb_a3': 'no label', 'woe_id': 'no label', 'woe_id_eh': 'no label', 'woe_note': 'no label', 'adm0_a3_is': 'no label', 'adm0_a3_us': 'no label', 'adm0_a3_un': 'no label', 'adm0_a3_wb': 'no label', 'continent': 'no label', 'region_un': 'no label', 'subregion': 'no label', 'region_wb': 'no label', 'name_len': 'no label', 'long_len': 'no label', 'abbrev_len': 'no label', 'tiny': 'no label', 'homepart': 'no label', 'filename': 'no label', });
lyr_worldgeo_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});