import { activateMapFilters, activateAdFormElements } from './utils.js';
import { initMap } from './map.js';
import { initForm } from './form.js';

window.addEventListener('DOMContentLoaded', () => {
  activateMapFilters(false);
  activateAdFormElements(false);
  initMap();
  initForm();
});
