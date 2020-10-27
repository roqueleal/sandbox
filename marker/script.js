function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
                                                                                                                                                                                                            * 📝 TODO:
                                                                                                                                                                                                            * Center SVG Text properly (what if 1 word?)
                                                                                                                                                                                                            * Cluster our markers: https://github.com/mapbox/mapbox-gl-js/issues/4491
                                                                                                                                                                                                            * Do something sweet on Click
                                                                                                                                                                                                           */

// ❤️ Import all of the nice things from Popmotion: 🔗 https://popmotion.io/
const { svg, css, timeline, physics, chain, delay, tween, easing } = window.popmotionXL;

// 🌎 URL to our map style: https://github.com/openmaptiles/dark-matter-gl-style
const mapStyleUrl = 'https://api.maptiler.com/maps/hybrid/style.json?key=n5G7Cjw4uaSGWFAWjABg';

// ⚙️ HELPERS
// 👉🏼 Get TranslateXY values of element, returns array `[x, y]`
// 🔗 https://stackoverflow.com/questions/21912684/how-to-get-value-of-translatex-and-translatey 
function getComputedTranslateXY(obj) {
  const transArr = [];
  if (!window.getComputedStyle) return;
  const style = getComputedStyle(obj),
  transform = style.transform || style.webkitTransform || style.mozTransform;
  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) return parseFloat(mat[1].split(', ')[13]);
  mat = transform.match(/^matrix\((.+)\)$/);
  mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : 0;
  mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : 0;
  return transArr;
}
// 💻 Get X and Y Width of window
function getWindowXYSize() {
  const windowXY = [];
  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];
  const x = w.innerWidth || e.clientWidth || g.clientWidth;
  const y = w.innerHeight || e.clientHeight || g.clientHeight;
  windowXY.push(x, y);
  return windowXY;
}

// 💍 One App to rule them all
class MapApp extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "startArticle",

































    feature => {
      this.setState({
        isMapPanning: true,
        currentArticle: feature,
        isActiveArticle: true });

    });_defineProperty(this, "triggerArticle",

    () => {
      this.setState({
        isMapPanning: false,
        isActiveArticle: true,
        isArticleVisible: true });

    });_defineProperty(this, "closeArticleHander",

    () => {
      this.setState({
        isActiveArticle: false,
        isArticleVisible: false });

    });this.state = { initLoaded: false, isMapPanning: false, data: '', map: {}, currentArticle: {}, isActiveArticle: false, isArticleVisible: false };}componentDidMount() {const { geojson } = this.props;fetch(mapStyleUrl).then(response => {return response.json();}).then(json => {const map = new mapboxgl.Map({ container: this.map, style: json, zoom: 2, center: [-90.875666, 14.500461] });this.setState({ initLoaded: true, data: json, map });});}

  renderMarkers() {
    const { geojson, icons } = this.props;
    const { map } = this.state;
    const bounds = new mapboxgl.LngLatBounds();

    map.on('load', e => {
      setTimeout(() => {
        map.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          easing(t) {
            return t * (2 - t);
          } });

      }, 300);
    });

    return geojson.features.map(feature => {
      bounds.extend(feature.geometry.coordinates);
      return (
        React.createElement(Marker, {
          onClick: () => this.markerTest,
          key: feature.properties.id,
          map: this.state.map,
          feature: feature,
          icons: icons,
          triggerArticle: this.triggerArticle,
          startArticle: this.startArticle }));


    });
  }

  render() {
    const { isActiveArticle, currentArticle } = this.state;

    return (
      React.createElement("div", null,
      React.createElement("div", { ref: e => {this.map = e;} }),
      isActiveArticle &&
      React.createElement(LocationArticle, {
        currentArticle: currentArticle,
        closeArticleHander: this.closeArticleHander,
        isArticleVisible: this.state.isArticleVisible }),


      this.state.initLoaded &&
      this.renderMarkers()));



  }}


// 🚛 React component for the articles
class LocationArticle extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "closeButtonHandler",


























    () => {
      const { closeArticleHander } = this.props;
      const introRenderer = css(this.articleIntro);
      const introScale = tween({
        from: 1,
        to: 0,
        duration: 300,
        ease: easing.anticipate,
        onUpdate: x => introRenderer.set({
          'opacity': x,
          'clip-path': 'circle(0)',
          '-webkit-clip-path': 'circle(0)' }),

        onComplete: () => {
          closeArticleHander();
        } });

      chain([
      delay(200),
      introScale]).
      start();
    });this.state = {};}componentWillReceiveProps(nextProps) {if (nextProps.isArticleVisible) {const introRenderer = css(this.articleIntro);const introScale = tween({ from: 0, to: 1, duration: 300, ease: easing.circOut, onUpdate: x => introRenderer.set({ // 'opacity': x,
          'clip-path': 'circle(100%)', '-webkit-clip-path': 'circle(100%)' }) });chain([delay(200), introScale]).start();}}
  render() {
    const { currentArticle } = this.props;

    return (
      React.createElement("article", { className: "m-article" },
      React.createElement("div", { ref: e => {this.articleIntro = e;}, className: "m-article__intro", style: { backgroundImage: `url(${currentArticle.properties.introImage})` } },
      React.createElement("button", { className: "m-article__close", onClick: () => this.closeButtonHandler() },
      React.createElement("svg", { fill: "#ffffff", height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }),
      React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }))),


      React.createElement("h1", { className: "m-article__introTitle" }, currentArticle.properties.title))));



  }}


class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};


  }

  componentWillMount() {
    this.addMarker();
  }

  shouldComponentUpdate() {
    return false;
  }

  addMarker() {
    const { map, feature } = this.props;
    const markerObj = this.renderMarker();
    const placeholder = document.createElement('div');

    ReactDOM.render(markerObj, placeholder);

    const markerEl = placeholder.firstChild;

    new mapboxgl.Marker(markerEl, { offset: [0, -30] }).
    setLngLat(feature.geometry.coordinates).
    addTo(map);
    this.markerEventHandler(markerEl, feature, map);

  }

  renderMarker() {
    const { feature, icons } = this.props;
    const { title, imageUrl, type, id } = feature.properties;
    const { iconBeach, iconCity, iconMountain, iconJungle } = icons;
    const titleArr = title.split(' ');
    const titleLast = titleArr.slice(Math.ceil(titleArr.length / 2), titleArr.length);
    const titleFirst = titleArr.slice(0, Math.ceil(titleArr.length / 2));
    let currentIcon = '';

    switch (type) {
      case 'beach':
        currentIcon = iconBeach;
        break;
      case 'city':
        currentIcon = iconCity;
        break;
      case 'mountain':
        currentIcon = iconMountain;
        break;
      case 'jungle':
        currentIcon = iconJungle;
        break;
      default:
        currentIcon = '';}
    ;

    return (
      React.createElement("div", { position: feature.geometry.coordinates, key: id },
      React.createElement("svg", { className: "e-marker", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", x: "0px", y: "0px", viewBox: "0 0 72 130.7", width: "36" },
      React.createElement("defs", null,
      React.createElement("clipPath", { id: "circle" },
      React.createElement("path", { d: "M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z" }))),


      React.createElement("path", { className: "e-marker__marker", d: "M60.7,45.4C54.1,38.8,45.3,35.2,36,35.2c-9.3,0-18.1,3.6-24.7,10.3C4.6,52,1,60.8,1,70.2c0,6.3,1.5,11.6,4.6,16.7 C8.4,91.3,12.1,95,16,98.9c7.3,7.2,15.5,15.4,19,30.5c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c3.5-15.1,11.7-23.3,19-30.5 c3.9-3.9,7.6-7.6,10.4-12.1c3.1-5.1,4.6-10.3,4.6-16.7C71,60.8,67.4,52,60.7,45.4z M36,97.4c-15,0-27.3-12.2-27.3-27.3 S21,42.9,36,42.9c15,0,27.3,12.2,27.3,27.3C63.3,85.2,51,97.4,36,97.4z" }),



      React.createElement("path", { className: "e-marker__circle", d: "M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z" }),
      currentIcon,
      React.createElement("path", { className: "e-marker__loader", d: "M49.5,62.5l-7.7,7.7h5.8c0,6.4-5.2,11.5-11.5,11.5c-1.9,0-3.8-0.5-5.4-1.3l-2.8,2.8c2.4,1.5,5.2,2.4,8.2,2.4 c8.5,0,15.4-6.9,15.4-15.4h5.8L49.5,62.5z M24.5,70.2c0-6.4,5.2-11.5,11.5-11.5c1.9,0,3.8,0.5,5.4,1.3l2.8-2.8 c-2.4-1.5-5.2-2.4-8.2-2.4c-8.5,0-15.4,6.9-15.4,15.4h-5.8l7.7,7.7l7.7-7.7H24.5z" }),


      React.createElement("image", { className: "e-marker__image", width: "100%", height: "100%", clipPath: "url(#circle)", xlinkHref: imageUrl }),
      React.createElement("text", { className: "e-marker__text", transform: "matrix(1 0 0 1 0 13.9998)" },
      React.createElement("tspan", { x: "50%", y: "0" }, titleFirst.join(' ')),
      React.createElement("tspan", { x: "50%", y: "13" }, titleLast.join(' '))))));




  }

  markerEventHandler(marker, feature, map) {
    const { triggerArticle, startArticle } = this.props;

    const markerSVG = marker.querySelector('svg');
    const markerIcon = marker.querySelector('.e-marker__icon');
    const markerImage = marker.querySelector('.e-marker__image');
    const markerCircle = marker.querySelector('.e-marker__circle');
    const markerText = marker.querySelector('.e-marker__text');
    const markerLoader = marker.querySelector('.e-marker__loader');

    const markerRenderer = css(markerSVG, { enableHardwareAcceleration: false });
    const iconRenderer = css(markerIcon);
    const imageRenderer = css(markerImage);
    const textRenderer = css(markerText);
    const loadRenderer = css(markerLoader);
    const loadScaleRenderer = css(markerLoader);
    const circleRenderer = css(markerCircle);

    const markerGrowSize = 3;

    const markerScale = physics({
      from: 1,
      to: markerGrowSize,
      velocity: 20,
      spring: 300,
      friction: 0.8,
      onUpdate: x => markerRenderer.set('scale', x) });


    const iconScale = tween({
      from: 1,
      to: 0,
      duration: 300,
      ease: easing.backIn,
      onUpdate: x => iconRenderer.set('scale', x) });


    const loadScale = tween({
      from: 0,
      to: 1,
      duration: 300,
      ease: easing.backOut,
      onUpdate: x => loadScaleRenderer.set('scale', x) });


    const loadRotate = tween({
      from: 0,
      to: 360,
      duration: 900,
      loop: Infinity,
      ease: easing.anticipate,
      onUpdate: x => loadRenderer.set('rotate', x) });


    const imageScale = tween({
      from: 0,
      to: 1,
      duration: 300,
      ease: easing.backOut,
      onUpdate: x => imageRenderer.set('scale', x) });


    const textToggle = tween({
      from: 0,
      to: 1,
      duration: 300,
      ease: easing.backOut,
      onUpdate: x => textRenderer.set('opacity', x) });


    const hoverTimeline = timeline([
    iconScale,
    imageScale,
    '-100',
    textToggle]);


    let isFlying = false;

    function closeMarker() {
      markerScale.setProps({
        from: markerGrowSize,
        to: 1 });

      marker.style.zIndex = 101;
      markerScale.start();
      hoverTimeline.reverse().start();
    }

    marker.addEventListener('mouseenter', () => {
      this.offSetMarker(marker, markerGrowSize, map);
      marker.style.zIndex = 201;
      markerScale.setProps({
        from: 1,
        to: markerGrowSize });

      imageScale.setProps({ playDirection: 1 });
      iconScale.setProps({ playDirection: 1 });
      hoverTimeline.setProps({ playDirection: 1 });
      textToggle.setProps({ playDirection: 1 });
      markerScale.start();
      hoverTimeline.start();
    });

    marker.addEventListener('mouseleave', () => {
      if (!isFlying) {
        closeMarker();
        // loadScale.reverse().start();                 
        // loadRotate.complete();
      }
    });

    marker.addEventListener('click', () => {
      isFlying = true;
      startArticle(feature);
      setTimeout(() => {
        map.flyTo({
          center: feature.geometry.coordinates,
          zoom: 11 });

      }, 600);

      loadScale.setProps({
        playDirection: 1,
        from: 0,
        to: 1 });

      loadScale.start();
      loadRotate.start();
      imageScale.reverse().start();
      textToggle.reverse().start();

      map.scrollZoom.disable();

      // 🤔 Possible performance killer, should remove this eventhandler when done.
      map.on('moveend', e => {
        if (isFlying) {
          triggerArticle();
          loadScale.reverse().start();
          loadRotate.stop();
          map.scrollZoom.enable();
          isFlying = false;
        }
      });
    });
  }

  offSetMarker(marker, markerGrowSize, map) {
    // Set the max width and height of the marker and shrink it a bit by multiplying with 0.x. This is to compensate for padding around the marker
    const markerMaxWidth = marker.offsetWidth * markerGrowSize * 0.55;
    const markerMaxHeight = marker.offsetHeight * markerGrowSize * 0.7;
    const markerOffSetX = getComputedTranslateXY(marker)[0];
    const markerOffSetY = getComputedTranslateXY(marker)[1];
    const windowXSize = getWindowXYSize()[0];
    if (
    markerOffSetY < markerMaxHeight ||
    markerOffSetX < markerMaxWidth ||
    windowXSize - markerOffSetX < markerMaxWidth + marker.offsetWidth)
    {
      let offSetY = 0;
      let offSetX = 0;

      // Offset when marker is closer to the top than its max height on expansion
      if (markerOffSetY < markerMaxHeight) {
        offSetY = markerOffSetY - markerMaxHeight;
      }

      // Offset when marker is closer to the left than its max width on expansion
      if (markerOffSetX < markerMaxWidth) {
        offSetX = markerOffSetX - markerMaxWidth;
      }
      // Offset when marker is closer to the right than its max width on expansion
      // Add `marker.offsetWidth` to this calculation because the marker position is calculated from top-left
      if (windowXSize - markerOffSetX < markerMaxWidth + marker.offsetWidth) {
        offSetX = markerMaxWidth + marker.offsetWidth - (windowXSize - markerOffSetX);
      }

      map.panBy([offSetX, offSetY]);
    }
  }

  render() {
    return null;
  }}


// 🏄 ICONS
const icons = {
  iconCity: React.createElement("path", { className: "e-marker__icon e-marker__icon--city", d: "M41.1,68.7V58.5L36,53.4l-5.1,5.1v3.4H20.8v23.7h30.5V68.7H41.1z M27.5,82.2h-3.4v-3.4h3.4V82.2z M27.5,75.4h-3.4 V72h3.4V75.4z M27.5,68.7h-3.4v-3.4h3.4V68.7z M37.7,82.2h-3.4v-3.4h3.4V82.2z M37.7,75.4h-3.4V72h3.4V75.4z M37.7,68.7h-3.4v-3.4 h3.4V68.7z M37.7,61.9h-3.4v-3.4h3.4V61.9z M47.9,82.2h-3.4v-3.4h3.4V82.2z M47.9,75.4h-3.4V72h3.4V75.4z" }),


  iconBeach: React.createElement("path", { className: "e-marker__icon e-marker__icon--beach", d: "M38.3,74.8l2.9-2.9L54,84.8l-2.9,2.9L38.3,74.8z M46.8,63.3l5.7-5.7c-7.9-7.9-20.7-7.9-28.6,0C31.8,55,40.6,57.1,46.8,63.3z M23.9,57.6c-7.9,7.9-7.9,20.7,0,28.6l5.7-5.7C23.4,74.2,21.3,65.5,23.9,57.6z M23.9,57.6L23.9,57.6c-0.8,6,2.3,13.8,8.6,20.1 L44,66.2C37.7,59.9,30,56.8,23.9,57.6z" }),


  iconMountain: React.createElement("path", { className: "e-marker__icon e-marker__icon--mountain", d: "M39.5,58.8l-6.6,8.8l5,6.7l-2.8,2.1c-3-3.9-7.9-10.5-7.9-10.5l-10.5,14h38.6L39.5,58.8z" }),
  iconJungle: React.createElement("g", { className: "e-marker__icon e-marker__icon--jungle" },
  React.createElement("path", { d: "M50.1,81.9c-1.7-2.8-2.8-6.1-5.6-8c1.6-0.2,3.2,0.1,4.6-0.5c2.3-0.9,3.2-3.9,2.7-6.3c-0.5-2.5-2.1-4.5-3.7-6.5 c-0.8-1.1-1.6-2.1-2.5-3.2c-1.3,2.9,0.1,6.6-1.4,9.4c-0.3,0.5-0.8,1-1.4,0.8c-0.6-0.3-0.3-1.3,0-1.9c1.4-2.5,1.8-5.6,1.3-8.4 c-0.1-0.5-0.3-1.1-0.6-1.5c-0.3-0.4-0.8-0.7-1.3-0.9c-1.5-0.8-3.1-1.3-4.8-1.6c1.3,1.6,1.6,3.9,1.8,6c0.2,1.7,0.3,3.7-0.9,4.9 c-0.6-0.3-1.1-0.9-1.1-1.6c-0.1-0.7,0-1.4,0.1-2.1c0.3-2,0.3-4.2-0.9-5.9c-1.5-2.4-5.1-3.1-7.5-1.5c1.9,1.6,3.3,3.8,3.9,6.2 c0.1,0.6,0.1,1.6-0.6,1.6c-0.6,0.1-0.9-0.6-1.2-1.1c-0.6-1.5-1.1-3-1.7-4.4c-0.3-0.6-0.5-1.3-1.1-1.8c-1.3-0.9-3-0.1-4.5,0.3 C23,54,22,53.9,21.2,53.7c0.7,1.6,0.8,3.5,0.4,5.3c-0.3,0.9-0.6,1.8-0.8,2.8c-0.2,0.9-0.1,2,0.5,2.8c0.8,1,2.3,1.1,3.7,0.9 c2.6-0.3,5.3-1.1,7.7-0.4c-0.3,0.9-1.1,1.5-2,1.8c-3.5,1.6-7.8,1.8-11.5,0.4c1.3,0.7,2.8,1.4,3.5,2.8c0.3,0.6,0.4,1.3,0.8,1.9 c0.5,0.9,1.5,1.5,2,2.4c0.4,0.6,0.6,1.3,0.9,2c0.4,0.6,0.9,1.3,1.6,1.3c0.5,0.1,0.9-0.2,1.4-0.4c2.3-1,4.7-1.8,7.2-2.5 c0.6-0.2,1.5-0.3,1.8,0.4c-0.1,0.5-0.6,0.8-1.1,1.1c-2.7,1.3-5.5,2.3-8.4,3.1c1.8,1.3,3.7,2.5,5.8,3.3c2.1,0.8,4.5,0.9,6.5-0.1 c2.6-1.2,4.2-4.2,3.7-7c1.7,1.6,2.8,3.8,3.9,5.9c1.1,2.1,2.2,4.1,3.2,6.2c0.2-0.4,0.4-0.7,0.6-1.1C52,85.1,51,83.4,50.1,81.9z M33.2,71.4c-0.5,0.3-1.1,0.4-1.6,0.6c-0.8,0.2-1.5,0.3-2.3,0.3c1.6-0.7,3.2-1.3,4.8-1.9h-0.1c0.1-0.1,0.3,0,0.4,0.1 C34.2,71,33.7,71.2,33.2,71.4z" })) };













// 💻 DATA
const geojson = {
  "type": "FeatureCollection",
  "features": [
  {
    "type": "Feature",
    "properties": {
      "id": 1,
      "title": "San Blas Islands",
      "imageUrl": "https://c1.staticflickr.com/5/4241/35467523155_346b08810f_q.jpg",
      "introImage": "https://c1.staticflickr.com/5/4241/35467523155_25bf8fd39e_h.jpg",
      "type": "beach",
      "iconSize": [60, 60] },

    "geometry": {
      "type": "Point",
      "coordinates": [
      -78.82,
      9.57] } },



  {
    "type": "Feature",
    "properties": {
      "id": 2,
      "title": "San Juan Del Sur",
      "imageUrl": "https://c1.staticflickr.com/5/4379/36844732181_78bd19e9eb_q.jpg",
      "introImage": "https://c1.staticflickr.com/5/4379/36844732181_4704ef4952_h.jpg",
      "type": "beach",
      "iconSize": [50, 50] },

    "geometry": {
      "type": "Point",
      "coordinates": [
      -85.8639766,
      11.263406] } },



  {
    "type": "Feature",
    "properties": {
      "id": 3,
      "title": "Little Corn Island",
      "imageUrl": "https://c1.staticflickr.com/5/4348/36844765631_03e90607bd_q.jpg",
      "introImage": "https://c1.staticflickr.com/5/4348/36844765631_3e25ac9cd2_h.jpg",
      "type": "beach",
      "iconSize": [40, 40] },

    "geometry": {
      "type": "Point",
      "coordinates": [
      -82.98509939999997,
      12.2937504] } },



  {
    "type": "Feature",
    "properties": {
      "id": 4,
      "title": "San Salvador",
      "imageUrl": "https://c1.staticflickr.com/5/4333/36825444362_4291ce6d1e_q.jpg",
      "introImage": "https://c1.staticflickr.com/5/4333/36825444362_474d38d67c_h.jpg",
      "type": "city",
      "iconSize": [40, 40] },

    "geometry": {
      "type": "Point",
      "coordinates": [
      -89.218191,
      13.692940] } },



  {
    "type": "Feature",
    "properties": {
      "id": 5,
      "title": "Monteverde",
      "imageUrl": "https://c1.staticflickr.com/5/4347/36857337771_d1bb7f798a_q.jpg",
      "introImage": "https://c1.staticflickr.com/5/4347/36857337771_24e5e3f9a0_h.jpg",
      "type": "jungle",
      "iconSize": [40, 40] },

    "geometry": {
      "type": "Point",
      "coordinates": [
      -84.8535067,
      10.2855218] } },



  {
    "type": "Feature",
    "properties": {
      "id": 6,
      "title": "Volcano Acatenango",
      "imageUrl": "https://c1.staticflickr.com/5/4421/36997408855_bfdb9f1fba_q.jpg",
      "introImage": "https://c1.staticflickr.com/5/4421/36997408855_2ca0cf2521_h.jpg",
      "type": "mountain" },

    "geometry": {
      "type": "Point",
      "coordinates": [
      -90.875666,
      14.500461] } },



  {
    "type": "Feature",
    "properties": {
      "id": 7,
      "title": "Mexico City",
      "imageUrl": "https://c1.staticflickr.com/5/4388/36837224452_98940aa9e4_q.jpg",
      "introImage": "https://c1.staticflickr.com/5/4388/36837224452_74d2da5fd2_k.jpg",
      "type": "city" },

    "geometry": {
      "type": "Point",
      "coordinates": [
      -99.13320799999997,
      19.4326077] } },



  {
    "type": "Feature",
    "properties": {
      "id": 8,
      "title": "Oaxaca City",
      "imageUrl": "https://c1.staticflickr.com/5/4357/36172707494_2b8ea05f04_q.jpg",
      "introImage": "https://c1.staticflickr.com/5/4357/36172707494_53c0f25d98_h.jpg",
      "type": "city" },

    "geometry": {
      "type": "Point",
      "coordinates": [
      -96.7216219,
      17.0594169] } },



  {
    "type": "Feature",
    "properties": {
      "id": 9,
      "title": "Tulum",
      "imageUrl": "https://c1.staticflickr.com/5/4390/36837410552_fbeb6d1cdc_q.jpg",
      "introImage": "https://c1.staticflickr.com/5/4390/36837410552_1ec5f5d658_h.jpg",
      "type": "beach" },

    "geometry": {
      "type": "Point",
      "coordinates": [
      -87.46535019999999,
      20.2114185] } }] };






// Render all the things 🙋, add geojson data and icons as props
ReactDOM.render(React.createElement(MapApp, { geojson: geojson, icons: icons }), document.querySelector('#app'));