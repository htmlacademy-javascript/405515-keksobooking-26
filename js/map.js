import {
  activateMapFilters, activateAdFormElements, getRandomArrayElements,
  showAlert } from './utils.js';
import { getData } from './api.js';
import { createBaloon } from './create-baloon.js';

const MAX_OFFERS = 10;

const DEFAULT_MAP_COORDS = {
  lat: 35.675,
  lng: 139.75,
};

const DEFAULT_MAP_ZOOM = 13;

const MAP_SETTINGS = {
  layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};
const PIN = {
  main: {
    width: 52,
    height: 52,
  },
  offer: {
    width: 40,
    height: 40,
  },
};
const mapCanvas = document.querySelector('#map-canvas');
const addressInput = document.querySelector('#address');

let currentOffers;
let map;
let mainPinMarker;
let pinIcon;

const renderMarkers = (icon, offers) => {
  offers.forEach((offer) => {
    const {
      location: {
        lat,
        lng,
      } } = offer;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(createBaloon(offer));
  });
};

const setDefaultAddress = () => {
  addressInput.value = `${DEFAULT_MAP_COORDS.lat.toFixed(5)}, ${DEFAULT_MAP_COORDS.lng.toFixed(5)}`;
};

const resetMap = () => {
  if (map) {
    map.closePopup();
    map.setView(DEFAULT_MAP_COORDS);

    setTimeout(() => {
      map.setZoom(DEFAULT_MAP_ZOOM);
    }, 300);
  }
};

const resetMainPinMarker = () => {
  if (mainPinMarker) {
    mainPinMarker.setLatLng(DEFAULT_MAP_COORDS);
  }
};

const initMap = () => {
  if (!mapCanvas) {
    return;
  }

  const onSuccessGetOffers = (offers) => {
    currentOffers = offers;

    renderMarkers(pinIcon, getRandomArrayElements(currentOffers, MAX_OFFERS));
  };

  const onFailGetOffers = (msg) => {
    showAlert(msg);
  };

  map = L.map('map-canvas')
    .on('load', () => {
      activateMapFilters(true);
      getData(onSuccessGetOffers, onFailGetOffers);
      activateAdFormElements(true);
    })
    .setView(DEFAULT_MAP_COORDS, DEFAULT_MAP_ZOOM);

  L.tileLayer(MAP_SETTINGS.layer, MAP_SETTINGS.attribution).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [PIN.main.width, PIN.main.height],
    iconAnchor: [PIN.main.width / 2, PIN.main.height],
  });

  pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [PIN.offer.width, PIN.offer.height],
    iconAnchor: [PIN.offer.width / 2, PIN.offer.height],
  });

  mainPinMarker = L.marker(
    DEFAULT_MAP_COORDS,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  setDefaultAddress(addressInput.value);

  mainPinMarker.addTo(map);

  mainPinMarker.on('drag', ({ target }) => {
    const { lat, lng } = target.getLatLng();

    addressInput.value = `${Number(lat).toFixed(5)}, ${Number(lng).toFixed(5)}`;
  });
};

export { setDefaultAddress, resetMap, resetMainPinMarker, initMap };
