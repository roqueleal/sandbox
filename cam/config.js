
const config = {
    style: "mapbox://styles/vistcomunicacion/ckf5qsnnj2h8f19qqdim9r8m1",
    accessToken: "pk.eyJ1IjoidmlzdGNvbXVuaWNhY2lvbiIsImEiOiJja2Nyc3ZiYzQxaTJ4MnFzNXBpMG5iZno2In0.9bPy87fQMJpOmV2sJ_AYWQ",
    CSV: "./GEOVISOR.csv",
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
            columnHeader: "Tipo_Camar",
            listItems: ["En proceso regularización","Regularizada"]
        },
        {
            type: "dropdown",
            title: "Provincia: ",
            columnHeader: "PROVINCIA",
            listItems: [
              'Santa Elena',
                'El Oro',
                'Manabi',
                'Guayas',
                'Esmeraldas'
            ]
        },
        {
            type: "checkbox",
            title: "Type de structure: ",
            columnHeader: "ISLA",
            listItems: ["1", "0"]
        }
    ]

};
