/**
 * Writing Guidelines module (data + UI).
 * Loaded inline from ui.html so Figma always bundles it.
 */
(function (root) {
var WRITING_GUIDELINES_COMPONENTS = [
  {
    name: "Button Primary",
    useCases: [
      {
        title: "Button Primary",
        description: "Go back / return to previous screen",
        labels: {
          alternative: "Go back to previous screen",
          supplementary: null,
          feedback: null,
          devSpecifications: "When returning to the previous screen, the screen reader must announce the name of that screen.",
        },
      },
      {
        title: "Button Primary",
        description: "Dismiss / close a message or dialog",
        labels: {
          alternative: "Ok",
          supplementary: "Dismiss message",
          feedback: null,
          devSpecifications: "When returning to the previous screen, the screen reader must announce the name of that screen.",
        },
      },
      {
        title: "Button Primary",
        description: "Try again / reload",
        labels: {
          alternative: "Try again",
          supplementary: null,
          feedback: "Something went wrong. Please try again later.",
          devSpecifications: "If the Refresh action reloads the same screen, read the Feedback text instead.",
        },
      },
      {
        title: "Button Primary",
        description: "Continue to next step",
        labels: {
          alternative: "Continue",
          supplementary: "Continue your {{flow name}}",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Button Primary",
        description: "Book another item",
        labels: {
          alternative: "Book another class",
          supplementary: "Go to Explore to find other classes to book",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Button Primary",
        description: "Show hidden content (e.g. password, code)",
        labels: {
          alternative: "Show code",
          supplementary: "Reveal code to show the partner's front desk",
          feedback: "Code shown",
          devSpecifications: null,
        },
      },
      {
        title: "Button Primary",
        description: "Step progress (e.g. multi-step form)",
        labels: {
          alternative: "Deleting your account, step {{three}} of {{three}}",
          supplementary: null,
          feedback: null,
          devSpecifications: "Use ordinal numbers spelled out for screen reader clarity.",
        },
      },
    ],
  },
  {
    name: "Button Secondary",
    useCases: [
      {
        title: "Button Secondary",
        description: "Close window / bottom sheet",
        labels: {
          alternative: "Close window",
          supplementary: null,
          feedback: null,
          devSpecifications: "When returning to the previous screen, the screen reader must announce the name of that screen.",
        },
      },
      {
        title: "Button Secondary",
        description: "Dismiss message",
        labels: {
          alternative: "Dismiss message",
          supplementary: null,
          feedback: "This message has been dismissed",
          devSpecifications: null,
        },
      },
      {
        title: "Button Secondary",
        description: "Get a new code / resend",
        labels: {
          alternative: "Get a new code",
          supplementary: "We'll send a new code to {{eligible@email.com}}",
          feedback: "We've sent a new code to {{eligible@email.com}}",
          devSpecifications: null,
        },
      },
      {
        title: "Button Secondary",
        description: "Maybe later / skip",
        labels: {
          alternative: "Maybe later",
          supplementary: "Go back to previous screen",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Button Secondary",
        description: "Address (location detail)",
        labels: {
          alternative: "Address: {{Street name}}, {{number}}, {{floor}}, {{City}}, {{State}}",
          supplementary: "Open location apps to find this address",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Button Secondary",
        description: "Phone number",
        labels: {
          alternative: "Phone number {{+1 844-478-4744}}",
          supplementary: "Check out how to get in touch with {{Venue name}}",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Button Secondary",
        description: "Social media link",
        labels: {
          alternative: "Social media: {{instagram.com/handle}}",
          supplementary: "Access {{Venue name}}'s {{Instagram}}",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Button Secondary",
        description: "Clear / remove a filter or field value",
        labels: {
          alternative: "Clear {{field name}}",
          supplementary: "Remove {{value}}",
          feedback: "{{Value}} has been removed",
          devSpecifications: null,
        },
      },
      {
        title: "Button Secondary",
        description: "Update email",
        labels: {
          alternative: "Email {{pat.doe@email.com}}, verified",
          supplementary: "Update your email",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Button Secondary",
        description: "See all items",
        labels: {
          alternative: "See all",
          supplementary: null,
          feedback: null,
          devSpecifications: null,
        },
      },
    ],
  },
  {
    name: "Button Link",
    useCases: [
      {
        title: "Button Link",
        description: "Help center",
        labels: {
          alternative: "Help Center",
          supplementary: "Go to the Help Center web page",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Button Link",
        description: "Log in",
        labels: {
          alternative: "Log in",
          supplementary: "Go to \"Log in\" screen and log in with your existing account",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Button Link",
        description: "Go to footer / section",
        labels: {
          alternative: "Go to Footer",
          supplementary: null,
          feedback: null,
          devSpecifications: "Element must be keyboard focusable and visible.",
        },
      },
      {
        title: "Button Link",
        description: "Learn more / details",
        labels: {
          alternative: "Learn more about your {{item}}",
          supplementary: null,
          feedback: null,
          devSpecifications: null,
        },
      },
    ],
  },
  {
    name: "Input",
    useCases: [
      {
        title: "Input",
        description: "Email address field",
        labels: {
          alternative: "Email address",
          supplementary: "Enter the email you used to sign up",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Input",
        description: "Employee ID field",
        labels: {
          alternative: "Employee ID",
          supplementary: "Enter the code your company uses to identify you. It may include numbers, letters, or both.",
          feedback: null,
          devSpecifications: "Open text keyboard. Validate field. Autocomplete list must be keyboard accessible. Associate label to field.",
        },
      },
      {
        title: "Input",
        description: "Enter password",
        labels: {
          alternative: "Password",
          supplementary: "Enter your password",
          feedback: null,
          devSpecifications: "Open text keyboard. Validate field. Associate label to field.",
        },
      },
      {
        title: "Input",
        description: "Password with requirements",
        labels: {
          alternative: "Enter your password",
          supplementary: "Your password must have at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character (!@#$).",
          feedback: null,
          devSpecifications: "Open text keyboard. Validate field. Associate label to field.",
        },
      },
      {
        title: "Input",
        description: "Verification code sent by email",
        labels: {
          alternative: "First digit; Second digit; Third digit; Fourth digit",
          supplementary: "Enter the code we've sent to {{eligible@email.com}}",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Input",
        description: "Invalid code entered",
        labels: {
          alternative: "First digit; Second digit; Third digit; Fourth digit",
          supplementary: "Invalid code",
          feedback: "Code doesn't match. Try again.",
          devSpecifications: null,
        },
      },
      {
        title: "Input",
        description: "Card number",
        labels: {
          alternative: "Card number",
          supplementary: "Enter your credit or debit card number",
          feedback: null,
          devSpecifications: "Associate card brand per image/flag. Open number keyboard. Validate field. Associate label to field.",
        },
      },
      {
        title: "Input",
        description: "Generic search field",
        labels: {
          alternative: "Search for {{gyms, studios, wellness apps, and classes}}",
          supplementary: null,
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Input",
        description: "Search country",
        labels: {
          alternative: "Search country",
          supplementary: "Enter the country where your company is located",
          feedback: "{{Country}} has been selected",
          devSpecifications: null,
        },
      },
      {
        title: "Input",
        description: "Address field",
        labels: {
          alternative: "Address 1",
          supplementary: null,
          feedback: null,
          devSpecifications: "Open text keyboard. Autocomplete list must be keyboard accessible. Associate label to field.",
        },
      },
      {
        title: "Input",
        description: "Find nearby venues",
        labels: {
          alternative: "Enter the address, postal code or city to find gyms and studios near you",
          supplementary: null,
          feedback: null,
          devSpecifications: "Open text keyboard. Autocomplete list must be keyboard accessible. Associate label to field.",
        },
      },
    ],
  },
  {
    name: "List",
    useCases: [
      {
        title: "List",
        description: "List with multiple selectable items (e.g. nearby gyms)",
        labels: {
          alternative: "{{Gym}}, {{5}} items available",
          supplementary: null,
          feedback: null,
          devSpecifications: "Dynamic content — populate from prototype.",
        },
      },
      {
        title: "List",
        description: "Container only — not applicable",
        labels: {
          alternative: null,
          supplementary: null,
          feedback: null,
          devSpecifications: "Dynamic content.",
        },
      },
      {
        title: "List",
        description: "Individual list item",
        labels: {
          alternative: null,
          supplementary: null,
          feedback: null,
          devSpecifications: "Dynamic content.",
        },
      },
      {
        title: "List",
        description: "User selects filters to generate results (e.g. days of the week)",
        labels: {
          alternative: null,
          supplementary: null,
          feedback: null,
          devSpecifications: "Do not trigger dropdown automatically. Announce button state (collapsed/expanded). Element triggers bottom sheet. Dates, values and numbers must be read in full.",
        },
      },
      {
        title: "List",
        description: "List of selectable chips or filter items",
        labels: {
          alternative: "Filter list, {{5}} items available",
          supplementary: null,
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "List",
        description: "User selects one or more payment methods",
        labels: {
          alternative: "{{n}} items available",
          supplementary: null,
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "List",
        description: "List of items read sequentially with focus and no time limit",
        labels: {
          alternative: null,
          supplementary: null,
          feedback: null,
          devSpecifications: "Inform the quantity and position of each item.",
        },
      },
    ],
  },
  {
    name: "Spinner",
    useCases: [
      {
        title: "Spinner",
        description: "Generic loading state",
        labels: {
          alternative: "Loading...",
          supplementary: null,
          feedback: null,
          devSpecifications: "Hide spinner when inactive so it is not read by the screen reader.",
        },
      },
      {
        title: "Spinner",
        description: "Sending a new code",
        labels: {
          alternative: "Sending new code...",
          supplementary: null,
          feedback: null,
          devSpecifications: "Provide measurable feedback when the action is completed.",
        },
      },
      {
        title: "Spinner",
        description: "Saving address",
        labels: {
          alternative: "Saving your billing address...",
          supplementary: null,
          feedback: null,
          devSpecifications: "Provide feedback when save is confirmed.",
        },
      },
      {
        title: "Spinner",
        description: "Barcode / progress bar loading",
        labels: {
          alternative: "Your barcode to {{item}} at {{venue}}",
          supplementary: null,
          feedback: null,
          devSpecifications: "Provide feedback on completion.",
        },
      },
    ],
  },
  {
    name: "Text",
    useCases: [
      {
        title: "Text",
        description: "Standard body copy",
        labels: {
          alternative: "Copy and paste from component",
          supplementary: null,
          feedback: null,
          devSpecifications: "Dynamic content. Apply <lang> attribute.",
        },
      },
      {
        title: "Text",
        description: "Body copy with numbers",
        labels: {
          alternative: "Copy and paste from component",
          supplementary: null,
          feedback: null,
          devSpecifications: "Dynamic content. Apply <lang> attribute. Numbers must be read in full.",
        },
      },
      {
        title: "Text",
        description: "Standard headline",
        labels: {
          alternative: "Copy and paste from component",
          supplementary: null,
          feedback: null,
          devSpecifications: "Dynamic content. Include a hidden <h1> title for screen readers.",
        },
      },
      {
        title: "Text",
        description: "Hidden title for screen readers only",
        labels: {
          alternative: "Copy and paste from component",
          supplementary: null,
          feedback: null,
          devSpecifications: "Dynamic content.",
        },
      },
      {
        title: "Text",
        description: "External system — no a11y specs provided",
        labels: {
          alternative: null,
          supplementary: null,
          feedback: null,
          devSpecifications: "External system — accessibility specifications are not provided.",
        },
      },
    ],
  },
  {
    name: "Accordion",
    useCases: [
      {
        title: "Accordion",
        description: "Expandable content section",
        labels: {
          alternative: "Copy and paste from component",
          supplementary: null,
          feedback: null,
          devSpecifications: "Announce expanded/collapsed state. Button must be keyboard operable.",
        },
      },
    ],
  },
  {
    name: "Banner",
    useCases: [
      {
        title: "Banner",
        description: "Informational or promotional banner",
        labels: {
          alternative: null,
          supplementary: null,
          feedback: null,
          devSpecifications: "Dynamic content — populate from prototype.",
        },
      },
      {
        title: "Banner",
        description: "Expanded banner state",
        labels: {
          alternative: null,
          supplementary: null,
          feedback: null,
          devSpecifications: "Dynamic content — populate from prototype.",
        },
      },
    ],
  },
  {
    name: "Radio Button",
    useCases: [
      {
        title: "Radio Button",
        description: "Debit payment option",
        labels: {
          alternative: "Debit",
          supplementary: "Select this option to pay using a debit card",
          feedback: null,
          devSpecifications: "The state of the radio button must be announced by the screen reader when selected or deselected. Example: Radio button \"Selected\".",
        },
      },
      {
        title: "Radio Button",
        description: "Credit or debit card with details",
        labels: {
          alternative: "{{Credit or debit card}} – {{Mastercard}} ending in {{1245}}",
          supplementary: "Select this payment method to pay for {{Name}}'s past due subscription",
          feedback: null,
          devSpecifications: "The state of the radio button must be announced by the screen reader. Example: Radio button \"Selected\".",
        },
      },
      {
        title: "Radio Button",
        description: "Cancel reason selection",
        labels: {
          alternative: "Concerned about privacy",
          supplementary: "Selected",
          feedback: null,
          devSpecifications: "The state of the radio button must be announced by the screen reader.",
        },
      },
    ],
  },
  {
    name: "QR Code",
    useCases: [
      {
        title: "QR Code",
        description: "QR code displayed on screen",
        labels: {
          alternative: "Show this code ({{190 646 201 3399}}) to {{venue}}'s front desk to enter.",
          supplementary: null,
          feedback: null,
          devSpecifications: "QR codes are not read by screen readers. Always provide an alternative button or action for the same task.",
        },
      },
    ],
  },
  {
    name: "Snackbar",
    useCases: [
      {
        title: "Snackbar",
        description: "Actionable snackbar — read automatically when it appears",
        labels: {
          alternative: null,
          supplementary: null,
          feedback: null,
          devSpecifications: "Read automatically when it appears, according to the interface. Read as per the component.",
        },
      },
    ],
  },
  {
    name: "Ranger",
    useCases: [
      {
        title: "Ranger",
        description: "Rating scale (e.g. gym rating out of 5)",
        labels: {
          alternative: "Notes for gym, 5 items available",
          supplementary: "{{Gym name}} {{1}} of {{5}}",
          feedback: null,
          devSpecifications: null,
        },
      },
      {
        title: "Ranger",
        description: "General evaluation scale",
        labels: {
          alternative: "{{Scale label}}, {{n}} items available",
          supplementary: "{{Item}} {{position}} of {{total}}",
          feedback: null,
          devSpecifications: null,
        },
      },
    ],
  },
  {
    name: "Timer",
    useCases: [
      {
        title: "Timer",
        description: "Countdown to request a new code",
        labels: {
          alternative: "Get a new code in {{time}}",
          supplementary: "Please wait {{time}} to get a new code. We'll send it to {{email}}.",
          feedback: null,
          devSpecifications: null,
        },
      },
    ],
  },
  {
    name: "Stepper",
    useCases: [
      {
        title: "Stepper",
        description: "Multi-step flow progress",
        labels: {
          alternative: "{{Daily check-in completed!}} OR {{You still haven't used your daily check-in}}",
          supplementary: null,
          feedback: null,
          devSpecifications: "Must indicate the current position within the interface. Example: Step {{2}} of {{5}}.",
        },
      },
    ],
  },
  {
    name: "Switch",
    useCases: [
      {
        title: "Switch",
        description: "Toggle setting on or off",
        labels: {
          alternative: null,
          supplementary: null,
          feedback: null,
          devSpecifications: "Indicate the purpose of the switch. State (on/off) must be announced by the screen reader when toggled.",
        },
      },
    ],
  },
];

  function getWritingGuidelinesStats(components) {
    var list = components || WRITING_GUIDELINES_COMPONENTS;
    var totalUseCases = 0;
    for (var i = 0; i < list.length; i++) {
      totalUseCases += (list[i].useCases && list[i].useCases.length) || 0;
    }
    return {
      totalComponents: list.length,
      totalUseCases: totalUseCases,
    };
  }

var LABEL_FIELDS = [
    {
      key: "alternative",
      title: "Alternative",
      pluginKey: "labelAlternative",
      disabledTooltip: "No alternative ARIA text in this use case.",
    },
    {
      key: "supplementary",
      title: "Supplementary",
      pluginKey: "supplementary",
      disabledTooltip:
        "Item lacks supplementary or feedback ARIA texts in this use case.",
    },
    {
      key: "feedback",
      title: "Feedback",
      pluginKey: "feedback",
      disabledTooltip:
        "Item lacks supplementary or feedback ARIA texts in this use case.",
    },
    {
      key: "devSpecifications",
      title: "Dev Specifications",
      pluginKey: "designerGuidance",
      disabledTooltip: "No dev specifications in this use case.",
    },
  ];

  var ICON_BACK =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
    '<path fill="currentColor" d="M8.04297 7.04303c0.39052 -0.39052 1.02354 -0.39052 1.41406 0 0.39045 0.39053 0.3905 1.02356 0 1.41406L6.91406 11.0001H20c0.5522 0 1 0.4477 1 1 0 0.5522 -0.4478 0.9999 -1 1H6.91406l2.54297 2.5429c0.39045 0.3906 0.3905 1.0236 0 1.4141s-1.02353 0.3904 -1.41406 0l-4.25 -4.25c-0.39053 -0.3905 -0.39053 -1.0235 0 -1.4141z"/>' +
    "</svg>";

  var ICON_HAMBURGER =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.75 -0.75 24 24" width="22" height="22" aria-hidden="true">' +
    '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.763 6.599H1.182M21.317 6.599H9.381M13.119 16.025H1.182M21.317 16.025h-3.58"/>' +
    '<path stroke="currentColor" stroke-width="1.5" d="M4.763 6.469a2.309 2.309 0 1 0 4.618 0 2.309 2.309 0 1 0-4.618 0M13.119 16.028a2.309 2.309 0 1 0 4.618 0 2.309 2.309 0 1 0-4.618 0"/>' +
    "</svg>";

  var ICON_CHEVRON =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
    '<path d="M6 9l6 6 6-6"/>' +
    "</svg>";

  var ICON_INFO =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="wg-aria-info-icon">' +
    '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>' +
    '<path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 8v.01M12 12v4"/>' +
    "</svg>";

  function createBackButton(ariaLabel, onClick) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "back-button back-button--asset";
    btn.setAttribute("aria-label", ariaLabel);
    btn.innerHTML =
      '<span class="back-button__icon-wrap" aria-hidden="true">' +
      ICON_BACK +
      "</span>";
    btn.onclick = onClick;
    return btn;
  }

  function getLabelText(labels, fieldKey) {
    if (!labels) return null;
    var value = labels[fieldKey];
    if (value == null || value === "") return null;
    var asString = String(value).trim();
    if (!asString || /^not required$/i.test(asString)) return null;
    return asString;
  }

  function mountWritingGuidelinesUI(deps) {
    var app = deps.app;
    var closePortaledUiMenu = deps.closePortaledUiMenu;
    var postToPlugin = deps.postToPlugin;
    var onExit = deps.onExit;
    var components =
      deps.components ||
      (typeof WRITING_GUIDELINES_COMPONENTS !== "undefined"
        ? WRITING_GUIDELINES_COMPONENTS
        : null);

    if (!components || !components.length) {
      throw new Error(
        "Writing Guidelines data is missing. Reload the plugin (Plugins > Development > Reload)."
      );
    }

    closePortaledUiMenu();
    app.innerHTML = "";

    var view = "overview";
    var selectedIndex = 0;
    var drawerOpen = false;
    var openUseCaseIndices = {};
    var useCaseListEl = null;

    function setUseCaseOpen(idx, open) {
      if (open) {
        openUseCaseIndices[idx] = true;
      } else {
        delete openUseCaseIndices[idx];
      }

      if (!useCaseListEl) return;

      var card = useCaseListEl.querySelector(
        '[data-usecase-idx="' + idx + '"]'
      );
      if (!card) return;

      var isOpen = !!openUseCaseIndices[idx];
      card.classList.toggle("is-open", isOpen);

      var trigger = card.querySelector(".handoff-accordion__trigger");
      if (trigger) {
        trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
    }

    function buildUseCaseCard(useCase, idx) {
      var isOpen = !!openUseCaseIndices[idx];
      var card = document.createElement("div");
      card.className =
        "handoff-accordion wg-usecase-item" + (isOpen ? " is-open" : "");
      card.setAttribute("data-usecase-idx", String(idx));

      var trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "handoff-accordion__trigger";
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");

      var headerStable = document.createElement("div");
      headerStable.className = "handoff-accordion__header-box";

      var headRow = document.createElement("div");
      headRow.className = "handoff-type-row__head";

      var typeMain = document.createElement("div");
      typeMain.className = "handoff-type-row__main";

      var titleEl = document.createElement("span");
      titleEl.className = "handoff-type-row__title";
      titleEl.textContent = useCase.title;

      var typeActions = document.createElement("div");
      typeActions.className = "handoff-type-row__actions";

      var chevron = document.createElement("span");
      chevron.className = "handoff-type-row__chevron";
      chevron.innerHTML = ICON_CHEVRON;

      typeMain.appendChild(titleEl);
      typeActions.appendChild(chevron);
      headRow.appendChild(typeMain);
      headRow.appendChild(typeActions);

      var subtitleEl = document.createElement("p");
      subtitleEl.className = "handoff-accordion__subtitle";
      subtitleEl.textContent = useCase.description || "";

      headerStable.appendChild(headRow);
      headerStable.appendChild(subtitleEl);
      trigger.appendChild(headerStable);

      trigger.onclick = function () {
        setUseCaseOpen(idx, !openUseCaseIndices[idx]);
      };

      var bodyWrap = document.createElement("div");
      bodyWrap.className = "handoff-accordion__body";

      var bodyInner = document.createElement("div");
      bodyInner.className = "handoff-accordion__body-inner";

      var panel = document.createElement("div");
      panel.className = "handoff-accordion__panel";

      var ariaList = document.createElement("div");
      ariaList.className = "wg-aria-list";

      LABEL_FIELDS.forEach(function (field) {
        ariaList.appendChild(buildAriaButton(useCase.labels, field));
      });

      panel.appendChild(ariaList);
      bodyInner.appendChild(panel);
      bodyWrap.appendChild(bodyInner);

      card.appendChild(trigger);
      card.appendChild(bodyWrap);

      return card;
    }

    var page = document.createElement("div");
    page.className = "wg-page wg-scope";

    var header = document.createElement("header");
    header.className = "wg-sticky-header";

    var headerRow = document.createElement("div");
    headerRow.className = "wg-header-row";

    var headerLeft = document.createElement("div");
    headerLeft.className = "wg-header-left";

    var headerRight = document.createElement("div");
    headerRight.className = "wg-header-right";

    var overviewHeading = document.createElement("div");
    overviewHeading.className = "wg-overview-heading";

    var overviewTitle = document.createElement("div");
    overviewTitle.className =
      "header-title header-title-component header-title-archivo";
    overviewTitle.textContent = "Writing Guidelines";

    var overviewSubtitle = document.createElement("p");
    overviewSubtitle.className = "header-subtitle";
    overviewSubtitle.textContent =
      "Select a component type to explore standard labels and accessibility guidelines";

    overviewHeading.appendChild(overviewTitle);
    overviewHeading.appendChild(overviewSubtitle);

    var detailHeading = document.createElement("div");
    detailHeading.className = "wg-detail-heading";

    var detailTitle = document.createElement("div");
    detailTitle.className =
      "header-title header-title-component header-title-archivo";
    detailHeading.appendChild(detailTitle);

    var content = document.createElement("div");
    content.className = "wg-scroll-content";

    var overlay = document.createElement("div");
    overlay.className = "wg-drawer-overlay";

    var drawer = document.createElement("div");
    drawer.className = "wg-drawer wg-scope";

    var drawerHeader = document.createElement("div");
    drawerHeader.className = "wg-drawer-header";

    var drawerTitle = document.createElement("div");
    drawerTitle.className = "wg-drawer-title";
    drawerTitle.textContent = "Components";

    var drawerCloseBtn = document.createElement("button");
    drawerCloseBtn.type = "button";
    drawerCloseBtn.className = "wg-drawer-close";
    drawerCloseBtn.setAttribute("aria-label", "Close components menu");
    drawerCloseBtn.textContent = "\u00d7";

    var drawerList = document.createElement("div");
    drawerList.className = "wg-drawer-list";

    var hamburger = document.createElement("button");
    hamburger.type = "button";
    hamburger.className = "wg-hamburger";
    hamburger.setAttribute("aria-label", "Open components menu");
    hamburger.innerHTML =
      '<span class="back-button__icon-wrap" aria-hidden="true">' +
      ICON_HAMBURGER +
      "</span>";

    drawerHeader.appendChild(drawerTitle);
    drawerHeader.appendChild(drawerCloseBtn);
    drawer.appendChild(drawerHeader);
    drawer.appendChild(drawerList);

    function setDrawer(open) {
      if (open) {
        ensureDrawerMounted();
      }
      drawerOpen = open;
      if (overlay.parentNode) {
        overlay.classList.toggle("open", drawerOpen);
        drawer.classList.toggle("open", drawerOpen);
      }
    }

    function ensureDrawerMounted() {
      if (overlay.parentNode) return;
      overlay.classList.add("is-mounted");
      drawer.classList.add("is-mounted");
      app.appendChild(overlay);
      app.appendChild(drawer);
    }

    function removeDrawerFromDom() {
      drawerOpen = false;
      overlay.classList.remove("open", "is-mounted");
      drawer.classList.remove("open", "is-mounted");
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (drawer.parentNode) drawer.parentNode.removeChild(drawer);
    }

    function resetDetailState() {
      openUseCaseIndices = {};
    }

    function goToOverview() {
      view = "overview";
      selectedIndex = 0;
      resetDetailState();
      useCaseListEl = null;
      removeDrawerFromDom();
      render();
    }

    function goToDetail(index) {
      view = "detail";
      selectedIndex = index;
      resetDetailState();
      useCaseListEl = null;
      ensureDrawerMounted();
      setDrawer(false);
      render();
    }

    function renderDrawerNav() {
      drawerList.innerHTML = "";
      components.forEach(function (component, idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className =
          "wg-nav-item" + (idx === selectedIndex ? " active" : "");
        btn.textContent = component.name;
        btn.onclick = function () {
          selectedIndex = idx;
          resetDetailState();
          renderDrawerNav();
          renderDetailContent();
          setDrawer(false);
        };
        drawerList.appendChild(btn);
      });
    }

    function renderOverviewContent() {
      content.innerHTML = "";

      var grid = document.createElement("div");
      grid.className = "wg-component-grid";

      components.forEach(function (component, idx) {
        var card = document.createElement("button");
        card.type = "button";
        card.className = "wg-component-card-btn";
        card.setAttribute("aria-label", "Open " + component.name);

        var name = document.createElement("p");
        name.className = "wg-component-card-name";
        name.textContent = component.name;

        card.appendChild(name);
        card.onclick = function () {
          goToDetail(idx);
        };
        grid.appendChild(card);
      });

      content.appendChild(grid);
    }

    function buildAriaButton(labels, field) {
      var text = getLabelText(labels, field.key);
      var isDisabled = text == null;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "wg-aria-btn";
      btn.disabled = isDisabled;

      var inner = document.createElement("div");
      inner.className = "wg-aria-btn-inner";

      var textWrap = document.createElement("div");
      textWrap.className = "wg-aria-btn-content";

      var labelEl = document.createElement("div");
      labelEl.className = "wg-aria-label";
      labelEl.textContent = field.title;

      textWrap.appendChild(labelEl);

      if (!isDisabled) {
        var valueEl = document.createElement("div");
        valueEl.className = "wg-aria-value";
        valueEl.textContent = text;
        textWrap.appendChild(valueEl);

        btn.onclick = function (e) {
          if (e) {
            e.stopPropagation();
            e.preventDefault();
          }
          postToPlugin({
            type: "apply-writing-guideline",
            payload: {
              labelKey: field.pluginKey,
              text: text,
            },
          });
        };
      }

      inner.appendChild(textWrap);

      if (isDisabled) {
        var infoWrap = document.createElement("span");
        infoWrap.className = "wg-aria-info-wrap";
        infoWrap.innerHTML = ICON_INFO;

        var tooltip = document.createElement("span");
        tooltip.className = "wg-aria-tooltip";
        tooltip.setAttribute("role", "tooltip");
        tooltip.textContent = field.disabledTooltip;
        infoWrap.appendChild(tooltip);

        inner.appendChild(infoWrap);
      }

      btn.appendChild(inner);
      return btn;
    }

    function renderDetailContent() {
      content.innerHTML = "";

      var selected = components[selectedIndex];
      if (!selected) return;

      var list = document.createElement("div");
      list.className = "wg-usecase-list";
      useCaseListEl = list;

      (selected.useCases || []).forEach(function (useCase, idx) {
        list.appendChild(buildUseCaseCard(useCase, idx));
      });

      content.appendChild(list);
    }

    function renderHeader() {
      header.className =
        "wg-sticky-header wg-sticky-header--elevated";
      header.innerHTML = "";
      headerLeft.innerHTML = "";
      headerRight.innerHTML = "";

      if (view === "overview") {
        headerLeft.appendChild(
          createBackButton("Back to home", function () {
            onExit();
          })
        );
        headerRow.appendChild(headerLeft);
        headerRow.appendChild(headerRight);
        header.appendChild(headerRow);
        header.appendChild(overviewHeading);
        return;
      }

      var selected = components[selectedIndex];

      headerLeft.appendChild(
        createBackButton("Back to overview", function () {
          goToOverview();
        })
      );

      hamburger.onclick = function () {
        setDrawer(true);
      };

      headerRight.appendChild(hamburger);
      headerRow.appendChild(headerLeft);
      headerRow.appendChild(headerRight);
      header.appendChild(headerRow);

      if (selected) {
        detailTitle.textContent = selected.name;
        header.appendChild(detailHeading);
      }
    }

    function render() {
      renderHeader();

      if (view === "overview") {
        renderOverviewContent();
      } else {
        renderDrawerNav();
        renderDetailContent();
      }
    }

    drawerCloseBtn.onclick = function () {
      setDrawer(false);
    };
    overlay.onclick = function () {
      setDrawer(false);
    };

    page.appendChild(header);
    page.appendChild(content);
    app.appendChild(page);

    render();
  }

  root.WELLHUB_WRITING_GUIDELINES = {
    mount: mountWritingGuidelinesUI,
    components: WRITING_GUIDELINES_COMPONENTS,
    getStats: getWritingGuidelinesStats,
  };
  root.WRITING_GUIDELINES_COMPONENTS = WRITING_GUIDELINES_COMPONENTS;
  root.getWritingGuidelinesStats = getWritingGuidelinesStats;
  root.mountWritingGuidelinesUI = mountWritingGuidelinesUI;
})(
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
      ? window
      : typeof self !== "undefined"
        ? self
        : this
);
