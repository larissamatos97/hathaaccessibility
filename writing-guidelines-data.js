/**
 * Writing Guidelines component catalog (separate from Component Accessibility registry).
 * Generated from writing_guidelines_a11y spreadsheet.
 */
(function (root) {
  root.WRITING_GUIDELINES_COMPONENTS = [
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

  root.getWritingGuidelinesStats = function getWritingGuidelinesStats(components) {
  var list = components || root.WRITING_GUIDELINES_COMPONENTS;
  var totalUseCases = 0;
  for (var i = 0; i < list.length; i++) {
    totalUseCases += (list[i].useCases && list[i].useCases.length) || 0;
  }
  return {
    totalComponents: list.length,
    totalUseCases: totalUseCases,
  };
  };
})(
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
      ? self
      : this
);
