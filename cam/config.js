
const config = {
    style: "mapbox://styles/vistcomunicacion/ckf5qsnnj2h8f19qqdim9r8m1",
    accessToken: "pk.eyJ1IjoidmlzdGNvbXVuaWNhY2lvbiIsImEiOiJja2Nyc3ZiYzQxaTJ4MnFzNXBpMG5iZno2In0.9bPy87fQMJpOmV2sJ_AYWQ",
    CSV: "./GEOVISOR.csv",
    center: [4.825780, 45.477416], //Lng, Lat
    zoom: 7, //Default zoom
    title: "Réseau Traces",
    description: "Le réseau TRACES, Histoire, mémoires et actualités des migrations s’est créé à la fin des années 1990. Il regroupe une très grande diversité d’acteurs, qui tous ont en commun de travailler les questions qui entourent les migrations d’hier et d’aujourd’hui en région Auvergne-Rhône-Alpes : chercheurs, artistes, médias, associations socio-culturelles, lieux de diffusion, collectivités territoriales, institutions, collectifs d’habitants, etc.",
    sideBarInfo: ["Structure"],
    popupNom: ["Structure"],
    popupDescrip:["Description"],
    popupWeb:["Siteweb"],
    filters: [
        {
            type: "checkbox",
            title: "Thematique : ",
            columnHeader: "Thématique de travail",
            listItems: ["Solidarités","Education et Education populaire", "Champ Culturel Arts","Patrimoine & Mémoire","Recherche","Médias et Information"]
        },
        {
            type: "dropdown",
            title: "Département: ",
            columnHeader: "Departement",
            listItems: [
              'Ain',
                'Ardèche',
                'Auvergne',
                'Drôme',
                'Isère',
                'Haute-Savoie',
                'Loire',
                'Rhône',
                'Savoie'
            ]
        },
        {
            type: "checkbox",
            title: "Type de structure: ",
            columnHeader: "Forme",
            listItems: ["Association", "etc"]
        }
    ]

};
