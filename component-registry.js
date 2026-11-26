/**
 * Registry de componentes — runtime (UI + code.js).
 * Fonte espelhada de rebuild/src/shared/constants/component-registry.ts
 */
(function (root) {
  var GROUPING_DISPLAY_SUFFIX = " \u2022 Grouping";

  function normalizeComponentName(name) {
    var raw = (name || "").trim();
    if (!raw) return "";
    var normalized = raw
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/[\s_]+/g, " ")
      .trim();
    if (normalized.indexOf("copy of ") === 0) {
      normalized = normalized.slice(8).trim();
    }
    return normalized;
  }

  var SNACKBAR_GUIDELINES =
    '//The element should not close until it is "executed", read by the screen reader.\n' +
    '//FOCUS: The focus of the snackbar should not be moved automatically or "locked" on it, as the user should be able to navigate freely.\n' +
    '//In this case, the focus should return to the next element >> "Close message" button >> or return to the element that triggered it.';

  var COMPONENT_REGISTRY = [
    { kind: "simple", typeName: "Tag", aliases: ["tag", "tags"], readExactlyAsInterface: true, ariaLabel: "no", alternativeText: "no", supplementalRequired: "no", supplementalOptional: "no", feedbackRequired: "no", feedbackOptional: "no" },
    { kind: "simple", typeName: "Button", aliases: ["button", "buttons", "buttom", "btn", "primary", "action"], readExactlyAsInterface: true, ariaLabel: "required", alternativeText: "no", supplementalRequired: "optional", supplementalOptional: "no", feedbackRequired: "required", feedbackOptional: "no" },
    { kind: "simple", typeName: "Checkbox", aliases: ["checkbox"], readExactlyAsInterface: true, ariaLabel: "required", alternativeText: "no", supplementalRequired: "optional", supplementalOptional: "no", feedbackRequired: "required", feedbackOptional: "no" },
    { kind: "simple", typeName: "Chips", aliases: ["chip", "chips"], readExactlyAsInterface: false, ariaLabel: "required", alternativeText: "no", supplementalRequired: "required", supplementalOptional: "no", feedbackRequired: "optional", feedbackOptional: "no" },
    { kind: "simple", typeName: "Radio Button", aliases: ["radio", "radio button"], readExactlyAsInterface: false, ariaLabel: "required", alternativeText: "no", supplementalRequired: "no", supplementalOptional: "no", feedbackRequired: "required", feedbackOptional: "no", guidelinesForDev: "The state/status of the radio button needs to be read by the screen reader when checked/unchecked. Example: [NO Selected status]", guidelinesLocked: true },
    { kind: "simple", typeName: "Loader", aliases: ["loader", "loading", "spinner"], readExactlyAsInterface: false, ariaLabel: "required", alternativeText: "no", supplementalRequired: "required", supplementalOptional: "no", feedbackRequired: "optional", feedbackOptional: "no", guidelinesForDev: "Provide measurable feedback on spinner status. Provide feedback when action is completed. Example: [Check-in completed]. Hide spinner when inactive so it is not read by the screen reader.", guidelinesLocked: true },
    { kind: "simple", typeName: "QR Code", aliases: ["qr code", "qrcode", "qr"], readExactlyAsInterface: false, ariaLabel: "required", alternativeText: "no", supplementalRequired: "optional", supplementalOptional: "no", feedbackRequired: "required", feedbackOptional: "no" },
    { kind: "simple", typeName: "Switch", aliases: ["switch", "toggle"], readExactlyAsInterface: false, ariaLabel: "required", alternativeText: "no", supplementalRequired: "optional", supplementalOptional: "no", feedbackRequired: "required", feedbackOptional: "no", guidelinesForDev: "The state of the switch must be announced when toggled ON/OFF. Must be focusable via keyboard (Space or Enter). Focus stays on switch after activation. Avoid auto-toggling without explicit user action.", guidelinesLocked: true },
    { kind: "internalRead", typeName: "Snackbar", aliases: ["snackbar", "snack bar"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Accordion", aliases: ["accordion"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Banner", aliases: ["banner"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Text Field", aliases: ["text field", "textfield"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Bottom Sheet", aliases: ["bottom sheet", "bottomsheet"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Result List", aliases: ["result list", "resultlist"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Progress Bar", aliases: ["progress bar", "progress"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Feedback", aliases: ["feedback"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Footer Card", aliases: ["footer card", "footer", "footercard"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Stepper", aliases: ["stepper"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Heading", aliases: ["heading", "header"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Section Title", aliases: ["section title", "sectiontitle", "section-title"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
    { kind: "internalRead", typeName: "Section Divider", aliases: ["section divider", "section-divider", "sectiondivider"], subComponentsRead: ["Text Body", "Text Headline", "Button"] },
  ];

  var DECORATIVE_IMAGE_ALIASES = ["avatar", "image", "img", "logo", "decorative", "decorative image", "icon", "icons"];
  var NUMBER_ALIASES = ["number"];
  var SCAN_IGNORED_TYPE_NAMES = { Number: true };

  function isScanIgnoredType(typeName) {
    return !!typeName && !!SCAN_IGNORED_TYPE_NAMES[typeName];
  }

  var registryByNormalizedName = {};
  for (var i = 0; i < COMPONENT_REGISTRY.length; i++) {
    var spec = COMPONENT_REGISTRY[i];
    registryByNormalizedName[normalizeComponentName(spec.typeName)] = spec;
    for (var j = 0; j < spec.aliases.length; j++) {
      registryByNormalizedName[normalizeComponentName(spec.aliases[j])] = spec;
    }
  }
  for (var k = 0; k < DECORATIVE_IMAGE_ALIASES.length; k++) {
    registryByNormalizedName[normalizeComponentName(DECORATIVE_IMAGE_ALIASES[k])] = {
      kind: "ignored",
      typeName: "Decorative Image",
      aliases: DECORATIVE_IMAGE_ALIASES,
    };
  }
  var numberIgnoredSpec = { kind: "ignored", typeName: "Number", aliases: NUMBER_ALIASES };
  registryByNormalizedName[normalizeComponentName("Number")] = numberIgnoredSpec;
  for (var ni = 0; ni < NUMBER_ALIASES.length; ni++) {
    registryByNormalizedName[normalizeComponentName(NUMBER_ALIASES[ni])] = numberIgnoredSpec;
  }

  function lookupRegistrySpec(name) {
    var normalized = normalizeComponentName(name || "");
    if (!normalized) return null;
    if (registryByNormalizedName[normalized]) return registryByNormalizedName[normalized];
    var keys = Object.keys(registryByNormalizedName);
    for (var ki = 0; ki < keys.length; ki++) {
      var key = keys[ki];
      if (normalized.indexOf(key) === 0 && normalized.charAt(key.length) === " ") {
        return registryByNormalizedName[key];
      }
    }
    return null;
  }

  function lookupRegistryTypeName(name) {
    var spec = lookupRegistrySpec(name);
    return spec ? spec.typeName : null;
  }

  function getGroupingDisplayType(baseTypeName) {
    return baseTypeName + GROUPING_DISPLAY_SUFFIX;
  }

  function getGroupingBaseType(displayType) {
    if (!displayType || displayType.indexOf(GROUPING_DISPLAY_SUFFIX) < 0) return null;
    return displayType.slice(0, displayType.indexOf(GROUPING_DISPLAY_SUFFIX));
  }

  function isButtonFamilyType(typeName) {
    return typeName === "Button" || typeName === "Buttons" || typeName === "Button Secondary" || typeName === "Button Link" || typeName === "Button Primary";
  }

  function normalizeSubComponentType(typeName) {
    if (!typeName) return null;
    if (isButtonFamilyType(typeName)) return "Button";
    return typeName;
  }

  function isGroupingPresetType(typeName) {
    if (!typeName) return false;
    var base = getGroupingBaseType(typeName) || typeName;
    var spec = lookupRegistrySpec(base);
    return spec && spec.kind === "grouping";
  }

  function isInternalReadType(typeName) {
    if (!typeName) return false;
    var spec = lookupRegistrySpec(typeName);
    return spec && spec.kind === "internalRead";
  }

  function isTransparentScanWrapper(matchedType, isInstanceLike) {
    return isInternalReadType(matchedType);
  }

  function getGroupingSpec(typeName) {
    if (!typeName) return null;
    var base = getGroupingBaseType(typeName) || typeName;
    var spec = lookupRegistrySpec(base);
    return spec && spec.kind === "grouping" ? spec : null;
  }

  function getSimpleSpec(typeName) {
    if (!typeName) return null;
    var base = getGroupingBaseType(typeName) || typeName;
    var spec = lookupRegistrySpec(base);
    return spec && spec.kind === "simple" ? spec : null;
  }

  /** Checkbox, Radio, Switch, etc. — single handoff card; no internal listItems from scan. */
  function isSimpleAtomicHandoffType(typeName) {
    if (!typeName) return false;
    var spec = getSimpleSpec(typeName);
    return !!(spec && !isScanIgnoredType(spec.typeName));
  }

  function getInternalReadSpec(typeName) {
    if (!typeName) return null;
    var spec = lookupRegistrySpec(typeName);
    return spec && spec.kind === "internalRead" ? spec : null;
  }

  function groupingSpecHasTextHeadline(groupingSpec) {
    if (!groupingSpec || !groupingSpec.subComponents) return false;
    for (var hi = 0; hi < groupingSpec.subComponents.length; hi++) {
      if (groupingSpec.subComponents[hi].type === "Text Headline") return true;
    }
    return false;
  }

  function matchesGroupingSubComponent(resolvedType, groupingSpec) {
    if (!resolvedType || !groupingSpec) return null;
    var normalized = normalizeSubComponentType(resolvedType);
    if (!normalized) return null;
    var matchAs = normalized;
    if (normalized === "Text Headline" && !groupingSpecHasTextHeadline(groupingSpec)) {
      matchAs = "Text Body";
    }
    for (var i = 0; i < groupingSpec.subComponents.length; i++) {
      var sub = groupingSpec.subComponents[i];
      if (sub.type === "Text Headline" && matchAs === "Text Headline") {
        return { spec: sub, resolvedType: "Text Headline" };
      }
      var subNorm = normalizeSubComponentType(sub.type);
      if (subNorm === matchAs) {
        return {
          spec: sub,
          resolvedType: sub.type === "Text Headline" ? "Text Headline" : matchAs,
        };
      }
    }
    return null;
  }

  function subComponentTypeAllowedForInternalRead(resolvedType, allowedTypes) {
    if (!resolvedType) return false;
    var normalized = normalizeSubComponentType(resolvedType);
    if (!normalized) return false;
    for (var i = 0; i < allowedTypes.length; i++) {
      if (normalizeSubComponentType(allowedTypes[i]) === normalized) return true;
    }
    return false;
  }

  function isReadableInternalType(typeName) {
    if (!typeName) return false;
    if (typeName === "Text Headline" || typeName === "Text Body") return true;
    if (isScanIgnoredType(typeName)) return false;
    var spec = lookupRegistrySpec(typeName);
    if (!spec) return false;
    if (spec.kind === "internalRead" || spec.kind === "grouping") return false;
    if (isScanIgnoredType(spec.typeName)) return false;
    return true;
  }

  function mergeFieldRequirement(required, optional) {
    if (required === "required" || optional === "required") return "required";
    if (required === "optional" || optional === "optional") return "optional";
    return "no";
  }

  function getHandoffFieldRules(typeName) {
    if (!typeName) return null;
    var base = getGroupingBaseType(typeName) || typeName;
    var groupingSpec = getGroupingSpec(base);
    if (groupingSpec) {
      return {
        readExactlyAsInterface: groupingSpec.readExactlyAsInterface,
        ariaLabel: groupingSpec.ariaLabel,
        alternativeText: "no",
        supplemental: "no",
        feedback: "no",
        guidelinesForDev: groupingSpec.guidelinesForDev || "",
        guidelinesLocked: !!groupingSpec.guidelinesLocked,
        isGroupingPreset: true,
      };
    }
    var simple = getSimpleSpec(base);
    if (simple && !isScanIgnoredType(simple.typeName)) {
      return {
        readExactlyAsInterface: simple.readExactlyAsInterface,
        ariaLabel: simple.ariaLabel,
        alternativeText: simple.alternativeText || "no",
        supplemental: mergeFieldRequirement(simple.supplementalRequired, simple.supplementalOptional),
        feedback: mergeFieldRequirement(simple.feedbackRequired, simple.feedbackOptional),
        guidelinesForDev: simple.guidelinesForDev || "",
        guidelinesLocked: !!simple.guidelinesLocked,
        isGroupingPreset: false,
      };
    }
    return null;
  }

  function getEffectiveHandoffMode(comp) {
    if (!comp) return "standard";
    var rules = getHandoffFieldRules(comp.type);
    if (rules && !rules.readExactlyAsInterface) return "custom";
    return comp.mode === "custom" ? "custom" : "standard";
  }

  function resolveDesignerGuidanceText(comp) {
    if (!comp) return "";
    var rules = getHandoffFieldRules(comp.type);
    var cd = comp.customData || {};
    var dg = cd.designerGuidance;
    var text = "";
    if (typeof dg === "string") text = dg;
    else if (dg && dg.text) text = String(dg.text);
    if (rules && rules.guidelinesForDev && String(rules.guidelinesForDev).trim()) {
      if (rules.guidelinesLocked || !String(text).trim()) {
        return String(rules.guidelinesForDev);
      }
    }
    if (rules && rules.guidelinesLocked && rules.guidelinesForDev) {
      return String(rules.guidelinesForDev);
    }
    if (typeof dg === "string" && String(dg).trim()) return dg;
    if (dg && dg.enabled && dg.text) return String(dg.text);
    return "";
  }

  function shouldUseCustomHandoffRendering(comp) {
    return getEffectiveHandoffMode(comp) === "custom";
  }

  var api = {
    GROUPING_DISPLAY_SUFFIX: GROUPING_DISPLAY_SUFFIX,
    normalizeComponentName: normalizeComponentName,
    lookupRegistrySpec: lookupRegistrySpec,
    lookupRegistryTypeName: lookupRegistryTypeName,
    getGroupingDisplayType: getGroupingDisplayType,
    getGroupingBaseType: getGroupingBaseType,
    isButtonFamilyType: isButtonFamilyType,
    normalizeSubComponentType: normalizeSubComponentType,
    isGroupingPresetType: isGroupingPresetType,
    isInternalReadType: isInternalReadType,
    isTransparentScanWrapper: isTransparentScanWrapper,
    getGroupingSpec: getGroupingSpec,
    getSimpleSpec: getSimpleSpec,
    isSimpleAtomicHandoffType: isSimpleAtomicHandoffType,
    getInternalReadSpec: getInternalReadSpec,
    matchesGroupingSubComponent: matchesGroupingSubComponent,
    subComponentTypeAllowedForInternalRead: subComponentTypeAllowedForInternalRead,
    isReadableInternalType: isReadableInternalType,
    isScanIgnoredType: isScanIgnoredType,
    getHandoffFieldRules: getHandoffFieldRules,
    getEffectiveHandoffMode: getEffectiveHandoffMode,
    resolveDesignerGuidanceText: resolveDesignerGuidanceText,
    shouldUseCustomHandoffRendering: shouldUseCustomHandoffRendering,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  root.WELLHUB_COMPONENT_REGISTRY = api;
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this);
