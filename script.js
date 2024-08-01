document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("accept-cookies");
  const declineButton = document.getElementById("decline-cookies");

  const COOKIE_CONSENT_KEY = "cookie-consent";
  const CONSENT_EXPIRY_DAYS = 15;

  function getCookieConsent() {
    const consent = sessionStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent) {
      const { uuid, timestamp } = JSON.parse(consent);
      const now = new Date().getTime();
      if (now - timestamp < CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
        return true;
      } else {
        sessionStorage.removeItem(COOKIE_CONSENT_KEY);
      }
    }
    return false;
  }

  function setCookieConsent() {
    const uuid = generateUUID();
    const timestamp = new Date().getTime();
    sessionStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ uuid, timestamp })
    );
  }

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  if (!getCookieConsent()) {
    banner.style.display = "block";
  }

  acceptButton.addEventListener("click", function () {
    setCookieConsent();
    banner.style.display = "none";
  });

  declineButton.addEventListener("click", function () {
    banner.style.display = "none";
  });
});
