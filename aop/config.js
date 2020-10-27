
const config = {
    style: "mapbox://styles/vistcomunicacion/ckf5qsnnj2h8f19qqdim9r8m1",
    accessToken: "pk.eyJ1IjoidmlzdGNvbXVuaWNhY2lvbiIsImEiOiJja2Nyc3ZiYzQxaTJ4MnFzNXBpMG5iZno2In0.9bPy87fQMJpOmV2sJ_AYWQ",
    CSV: "./finale.csv",
    center: [2.021484,47.219568], //Lng, Lat
    zoom: 8, //Default zoom
    title: "Geovisor Camaronero",
    description: "Entorno de prueba",
    sideBarInfo: ["produit"],
    popupNom: ["produit"],
    popupDescrip:["type"],
    popupWeb:["URL"],
    filters: [
        {
            type: "checkbox",
            title: "Thematique : ",
            columnHeader: "produit",
            listItems: ["Munster","Farine de châtaigne corse", "Crémant de Bordeaux"]
        },
        {
            type: "dropdown",
            title: "region",
            columnHeader: "region",
            listItems: [
              'Grand Est',
                'Corse',
                'Nouvelle-Aquitaine'
            ]
        },
        {
            type: "checkbox",
            title: "Type",
            columnHeader: "type",
            listItems: ["Fromages", "Vins", "Fruits"]
        }
    ]

};
