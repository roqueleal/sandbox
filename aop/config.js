
const config = {
    style: "mapbox://styles/vistcomunicacion/ckf5qsnnj2h8f19qqdim9r8m1",
    accessToken: "pk.eyJ1IjoidmlzdGNvbXVuaWNhY2lvbiIsImEiOiJja2Nyc3ZiYzQxaTJ4MnFzNXBpMG5iZno2In0.9bPy87fQMJpOmV2sJ_AYWQ",
    CSV: "./prueba.csv",
    center: [-80.325780, -2.477416], //Lng, Lat
    zoom: 8, //Default zoom
    title: "Geovisor Camaronero",
    description: "Entorno de prueba",
    sideBarInfo: ["NOMBRE"],
    popupNom: ["NOMBRE"],
    popupDescrip:["Suprf-Ha"],
    popupWeb:["INGName"],
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
