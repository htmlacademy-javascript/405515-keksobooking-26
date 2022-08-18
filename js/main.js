import { createOffers } from './data.js';
import { createOfferCard } from './offer-cards.js';
import { initForm } from './form.js';

window.addEventListener('DOMContentLoaded', () => {
  const map = document.querySelector('#map-canvas');
  const offers = createOffers();
  const [offer] = offers;

  map.append(createOfferCard(offer));

  initForm();
});
