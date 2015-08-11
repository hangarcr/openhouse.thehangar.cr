'use strict';
import ScrollDown from "./modules/ScrollDown";
import Share from "./modules/Share";
import RegistrationForm from "./modules/RegistrationForm";

// jQuery DOM Ready
$(() => {
  'use strict';

  // Polyfill to remove click delays on browsers with touch UIs
  FastClick.attach(document.body);

  // Arrow down animation
  ScrollDown();

  // Initialize form funcionality
  new RegistrationForm();
  new Share();
});
