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

/**
 * Camada com o olho do Figma ligado e opacidade efetiva > 0 na cadeia de pais.
 * Frames/grupos vazios podem não ter bounds; isso não os torna “ocultos”.
 */
function isEffectivelyVisible(node) {
  if (!node) return false;
  var n = node;
  var opacityAcc = 1;
  while (n) {
    if (typeof n.removed === "boolean" && n.removed) return false;
    if ("visible" in n && n.visible === false) return false;
    if ("opacity" in n && typeof n.opacity === "number" && !Number.isNaN(n.opacity)) {
      opacityAcc *= n.opacity;
      if (opacityAcc < 0.001) return false;
    }
    n = n.parent;
  }
  return true;
}

/**
 * INSTANCE / TEXT (e similares) só entram no handoff se o Figma os desenha no canvas.
 * Camadas com olho desligado costumam ter `absoluteRenderBounds === null`.
 */
function hasCanvasRenderBounds(node) {
  if (!node) return false;
  try {
    if (!("absoluteRenderBounds" in node)) return true;
    var rb = node.absoluteRenderBounds;
    if (rb == null) return false;
    if (typeof rb.width === "number" && typeof rb.height === "number") {
      if (rb.width < 0.5 && rb.height < 0.5) return false;
    }
    return true;
  } catch (e) {
    return true;
  }
}

/** Visível no painel + renderizado (para emitir componente ou texto). */
function isScannableHandoffNode(node) {
  return isEffectivelyVisible(node) && hasCanvasRenderBounds(node);
}

/** Internal read walk: TEXT pode não ter render bounds; INSTANCE ainda exige bounds. */
function isScannableForInternalReadWalk(node) {
  if (!node || !isEffectivelyVisible(node)) return false;
  if (node.type === "TEXT") return true;
  return hasCanvasRenderBounds(node);
}

function isDescendantOfNode(ancestor, node) {
  if (!ancestor || !node) return false;
  var p = node.parent;
  while (p) {
    if (p.id === ancestor.id) return true;
    p = p.parent;
  }
  return false;
}

function isHandoffButtonTypeName(typeName) {
  return WELLHUB_COMPONENT_REGISTRY.isButtonFamilyType(typeName);
}

function isInstanceLikeNode(node) {
  if (!node) return false;
  var t = node.type;
  return t === "INSTANCE" || t === "COMPONENT" || t === "COMPONENT_SET";
}

/** Nomes da instância + main component + component set (variantes no Figma). */
async function getInstanceLookupNames(node) {
  var localName = node.name || "";
  var mainName = localName;
  var setName = "";
  if (node && node.type === "INSTANCE") {
    try {
      var main = await node.getMainComponentAsync();
      if (main && main.name) mainName = main.name;
      var parent = main && main.parent;
      if (parent && parent.type === "COMPONENT_SET" && parent.name) {
        setName = String(parent.name);
      }
    } catch (e) {}
  }
  return { localName: localName, mainName: mainName, setName: setName };
}

/** Base do nome da layer (sem sufixos de variante Figma: vírgula / #). */
function headingSlotLayerBaseName(name) {
  var raw = (name || "").trim();
  if (!raw) return "";
  var hashCut = raw.indexOf("#");
  if (hashCut >= 0) raw = raw.slice(0, hashCut);
  var commaCut = raw.indexOf(",");
  if (commaCut >= 0) raw = raw.slice(0, commaCut);
  return raw.trim();
}

/** Heading slots — apenas nomes exatos: back-button, action-button, right-button. */
function resolveHeadingSlotButtonType(name) {
  var normalized = WELLHUB_COMPONENT_REGISTRY.normalizeComponentName(
    headingSlotLayerBaseName(name)
  );
  if (
    normalized === "back button" ||
    normalized === "action button" ||
    normalized === "right button"
  ) {
    return "Button";
  }
  return null;
}

async function isTextInsideHeadingSlotButton(textNode, internalReadRoot) {
  var p = textNode && textNode.parent;
  while (p && p !== internalReadRoot) {
    if (isInstanceLikeNode(p)) {
      var names = await getInstanceLookupNames(p);
      if (
        resolveHeadingSlotButtonType(names.localName) ||
        resolveHeadingSlotButtonType(names.mainName)
      ) {
        return true;
      }
    }
    p = p.parent;
  }
  return false;
}

/** Resolve tipo do registry a partir de nomes de layer / biblioteca (ordem de prioridade). */
function resolveRegistryTypeFromNames(localName, mainName, setName) {
  var R = WELLHUB_COMPONENT_REGISTRY;
  var slotNames = [localName, mainName];
  for (var si = 0; si < slotNames.length; si++) {
    var slotType = resolveHeadingSlotButtonType(slotNames[si]);
    if (slotType) return slotType;
  }
  var names = [localName, setName, mainName];
  for (var i = 0; i < names.length; i++) {
    var nm = names[i];
    if (!nm) continue;
    var fromLegacy = getComponentTypeFromName(nm);
    if (fromLegacy && !WELLHUB_COMPONENT_REGISTRY.isScanIgnoredType(fromLegacy)) return fromLegacy;
    var fromRegistry = R.lookupRegistryTypeName(nm);
    if (fromRegistry && !WELLHUB_COMPONENT_REGISTRY.isScanIgnoredType(fromRegistry)) return fromRegistry;
  }
  return null;
}

async function resolveHandoffTypeForInstanceNode(node) {
  var names = await getInstanceLookupNames(node);
  var resolved = await resolveNodeMatchedType(node);
  if (resolved) return resolved;
  return resolveRegistryTypeFromNames(
    names.localName,
    names.mainName,
    names.setName
  );
}

/**
 * Conta instâncias de botão visíveis na subárvore (frames/grupos no meio),
 * sem entrar dentro de outro botão já contado.
 */
function countButtonInstancesInSubtree(node, depth, maxDepth) {
  if (!node || !("children" in node) || depth > maxDepth) return 0;
  var count = 0;
  forEachChildInFrameOrder(node, function (ch) {
    if (!isEffectivelyVisible(ch)) return;
    if (
      (ch.type === "INSTANCE" || ch.type === "COMPONENT" || ch.type === "COMPONENT_SET") &&
      isScannableHandoffNode(ch)
    ) {
      var t = getComponentTypeFromName(ch.name || "");
      if (isHandoffButtonTypeName(t)) {
        count++;
        return;
      }
      count += countButtonInstancesInSubtree(ch, depth + 1, maxDepth);
      return;
    }
    if (
      ch.type === "FRAME" ||
      ch.type === "GROUP" ||
      ch.type === "SECTION" ||
      ch.type === "COMPONENT" ||
      ch.type === "INSTANCE"
    ) {
      count += countButtonInstancesInSubtree(ch, depth + 1, maxDepth);
    }
  });
  return count;
}

/** Pai que agrupa 2+ botões (ex.: linha Primary + Secondary) — não vira card único. */
function isButtonGroupContainerNode(node) {
  if (!node) return false;
  if (node.type !== "INSTANCE" && node.type !== "COMPONENT" && node.type !== "COMPONENT_SET") {
    return false;
  }
  var typeName = getComponentTypeFromName(node.name || "");
  if (typeName && WELLHUB_COMPONENT_REGISTRY.getGroupingSpec(typeName)) {
    return false;
  }
  return countButtonInstancesInSubtree(node, 0, 6) >= 2;
}

/** Botão dentro de um agrupador: deve aparecer como card próprio no handoff. */
function isButtonReleasedFromGroupContainer(node) {
  if (!node || (node.type !== "INSTANCE" && node.type !== "COMPONENT")) return false;
  var selfType = getComponentTypeFromName(node.name || "");
  if (!isHandoffButtonTypeName(selfType)) return false;
  var p = node.parent;
  while (p) {
    if (isButtonGroupContainerNode(p)) return true;
    p = p.parent;
  }
  return false;
}

/** Só componentes Figma e camadas de texto (o resto da árvore é só estrutura). */
function isHandoffReportableNode(node) {
  if (!node) return false;
  var t = node.type;
  return (
    t === "TEXT" ||
    t === "INSTANCE" ||
    t === "COMPONENT" ||
    t === "COMPONENT_SET"
  );
}

/**
 * Ordem de leitura dos filhos diretos:
 * - Auto-layout (layoutMode ≠ NONE): índice 0 → fim = ordem do fluxo no frame (topo→baixo no vertical).
 * - Demais frames/grupos: do topo ao fundo do painel Layers (índice length-1 → 0 na API).
 */
function forEachChildInFrameOrder(node, fn) {
  if (!node || !("children" in node) || !node.children || node.children.length === 0) {
    return;
  }
  var children = node.children;
  var useDocumentIndex =
    "layoutMode" in node && node.layoutMode && node.layoutMode !== "NONE";
  if (useDocumentIndex) {
    for (var i = 0; i < children.length; i++) {
      fn(children[i]);
    }
  } else {
    for (var idx = children.length - 1; idx >= 0; idx--) {
      fn(children[idx]);
    }
  }
}

/** Posição na tela para desempate (Y, depois X) quando a ordem da árvore empata. */
function getNodeCanvasSortKey(node) {
  try {
    var box = node.absoluteBoundingBox;
    if (box && typeof box.y === "number" && typeof box.x === "number") {
      return { y: box.y, x: box.x };
    }
  } catch (e) {}
  return { y: 0, x: 0 };
}

/**
 * Valid roots for component / design-system scans (not only FRAME).
 * SECTION and GROUP are common in current Figma files; COMPONENT / INSTANCE / COMPONENT_SET
 * allow scanning a single component subtree without an extra wrapper frame.
 */
function isScanRootNode(node) {
  if (!node) return false;
  const t = node.type;
  return (
    t === "FRAME" ||
    t === "SECTION" ||
    t === "GROUP" ||
    t === "COMPONENT" ||
    t === "INSTANCE" ||
    t === "COMPONENT_SET"
  );
}

/**
 * Shows the plugin main UI.
 */
figma.showUI(__html__, { width: 420, height: 600 });

const FIGMA_TEXT_PICK_ALLOWED_KEYS = [
  "labelAlternative",
  "supplementary",
  "feedback",
];

const DEFAULT_FONT_FALLBACK = { family: "Inter", style: "Regular" };

function isPlainObject(value) {
  if (!value || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function toSafeString(value) {
  if (typeof value === "string") return value;
  if (value == null) return "";
  try {
    return String(value);
  } catch (e) {
    return "";
  }
}

function toErrorMessage(error) {
  if (error && typeof error === "object" && "message" in error) {
    const msg = error.message;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  const s = toSafeString(error);
  return s.trim() ? s : "Unexpected error inside plugin code.";
}

function postToUi(message) {
  try {
    figma.ui.postMessage(message);
  } catch (e) {
    // Best effort: don't fail the plugin if postMessage throws.
  }
}

async function ensureFontLoadedForTextNode(textNode, desiredFontName) {
  if (!textNode || textNode.type !== "TEXT") return;

  if (desiredFontName) {
    try {
      await figma.loadFontAsync(desiredFontName);
      try {
        textNode.fontName = desiredFontName;
      } catch (e) {
        // ignore
      }
    } catch (e) {
      // ignore
    }
  }

  const current = textNode.fontName;
  if (current && typeof current !== "symbol") {
    try {
      await figma.loadFontAsync(current);
      return;
    } catch (e) {
      // ignore and fall back below
    }
  }

  try {
    await figma.loadFontAsync(DEFAULT_FONT_FALLBACK);
  } catch (e) {
    // ignore
  }
}

async function setTextCharactersSafe(textNode, characters, desiredFontName) {
  await ensureFontLoadedForTextNode(textNode, desiredFontName);
  textNode.characters = typeof characters === "string" ? characters : toSafeString(characters);
}

/** @type {{ componentId: string, fieldKey: string } | null} */
let figmaTextPickPending = null;

/** Último card/layer selecionado no canvas — usado ao clicar em Writing Guidelines (o foco na UI pode limpar a seleção). */
let lastWritingGuidelineTargetId = null;

/** Frame raiz do último scan de componentes — posiciona o handoff ao lado na geração. */
let lastScanRootId = null;

const HANDOFF_CARD_PLACEMENT_GAP = 48;

function rememberWritingGuidelineTargetFromSelection() {
  const sel = figma.currentPage.selection;
  if (sel && sel.length >= 1 && sel[0]) {
    lastWritingGuidelineTargetId = sel[0].id;
  }
}

function tryApplyFigmaTextPickFromSelection() {
  if (!figmaTextPickPending) return;
  const sel = figma.currentPage.selection;
  if (!sel || sel.length === 0) return;
  const node = sel[0];
  if (node.type !== "TEXT") return;
  const pending = figmaTextPickPending;
  figmaTextPickPending = null;
  postToUi({
    type: "figma-text-pick-result",
    componentId: pending.componentId,
    fieldKey: pending.fieldKey,
    text: node.characters,
  });
}

function onFigmaSelectionChange() {
  rememberWritingGuidelineTargetFromSelection();
  tryApplyFigmaTextPickFromSelection();
}

figma.on("selectionchange", onFigmaSelectionChange);
rememberWritingGuidelineTargetFromSelection();

/**
 * Handles messages coming from the UI.
 * Wrapped in try/catch to always respond (avoids the UI getting stuck in loading).
 */
figma.ui.onmessage = async (msg) => {
  try {
    if (!isPlainObject(msg) || typeof msg.type !== "string") return;

    switch (msg.type) {
      case "scan-components": {
        const result = await scanComponents();
        postToUi({ type: "scan-components-result", payload: result });
        return;
      }
      case "scan-design-system": {
        const result = scanDesignSystem();
        postToUi({ type: "scan-design-system-result", payload: result });
        return;
      }
      case "generate-accessibility-doc": {
        await generateAccessibilityFrame(msg.payload);
        figma.closePlugin("Accessibility documentation generated.");
        return;
      }
      case "apply-writing-guideline": {
        const wgPayload = isPlainObject(msg.payload) ? msg.payload : msg;
        await applyWritingGuidelineToSelectedCard(wgPayload);
        return;
      }
      case "close-plugin": {
        figma.closePlugin();
        return;
      }
      case "resize-ui": {
        const height =
          typeof msg.height === "number" && msg.height > 0 ? msg.height : 600;
        figma.ui.resize(420, height);
        return;
      }
      case "figma-text-pick-start": {
        const componentId = msg.componentId;
        const fieldKey = msg.fieldKey;
        if (
          typeof componentId === "string" &&
          typeof fieldKey === "string" &&
          FIGMA_TEXT_PICK_ALLOWED_KEYS.indexOf(fieldKey) !== -1
        ) {
          figmaTextPickPending = { componentId, fieldKey };
          tryApplyFigmaTextPickFromSelection();
        }
        return;
      }
      default:
        return;
    }
  } catch (error) {
    postToUi({ type: "plugin-error", message: toErrorMessage(error) });
  }
};

function resolveWritingGuidelineTargetRoot() {
  const selection = figma.currentPage.selection;
  if (selection.length > 0 && selection[0]) {
    lastWritingGuidelineTargetId = selection[0].id;
    return selection[0];
  }
  if (lastWritingGuidelineTargetId) {
    const cached = figma.getNodeById(lastWritingGuidelineTargetId);
    if (cached) return cached;
  }
  return null;
}

function findValueTextInHandoffRow(labelTextNode) {
  let cur = labelTextNode;
  for (let depth = 0; depth < 10 && cur; depth++) {
    const parent = cur.parent;
    if (parent && "children" in parent && parent.children && parent.children.length) {
      const valueWrapper = parent.children.find(
        (n) => n && n.type === "FRAME" && n.name === "value-wrapper"
      );
      if (valueWrapper) {
        const valueStack = [valueWrapper];
        while (valueStack.length) {
          const n = valueStack.pop();
          if (!n) continue;
          if (n.type === "TEXT") return n;
          if ("children" in n && n.children && n.children.length) {
            for (const ch of n.children) {
              if (isEffectivelyVisible(ch)) valueStack.push(ch);
            }
          }
        }
      }
    }
    cur = parent;
  }
  return null;
}

async function applyWritingGuidelineToSelectedCard(payload) {
  const root = resolveWritingGuidelineTargetRoot();
  if (!root) {
    postToUi({
      type: "apply-writing-guideline-result",
      success: false,
      reason: "no-selection",
    });
    return;
  }

  const labelKey =
    payload && typeof payload === "object" ? payload.labelKey : undefined;
  const text = payload && typeof payload === "object" ? payload.text : undefined;

  const labelMap = {
    labelAlternative: "LABEL ALTERNATIVE:",
    supplementary: "SUPPLEMENTARY:",
    feedback: "FEEDBACK:",
    designerGuidance: "DESIGNER GUIDANCE:",
  };

  const targetLabelText = labelMap[labelKey];
  if (!targetLabelText) {
    postToUi({
      type: "apply-writing-guideline-result",
      success: false,
      reason: "invalid-label",
    });
    return;
  }

  const asStringText = typeof text === "string" ? text : String(text || "");

  const stack = [root];
  const labelTextNodes = [];
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    if (
      node.type === "TEXT" &&
      String(node.characters || "").trim() === targetLabelText
    ) {
      labelTextNodes.push(node);
    }
    if ("children" in node && node.children && node.children.length) {
      for (const ch of node.children) {
        if (isEffectivelyVisible(ch)) stack.push(ch);
      }
    }
  }

  for (const labelTextNode of labelTextNodes) {
    const valueTextNode = findValueTextInHandoffRow(labelTextNode);
    if (valueTextNode) {
      await setTextCharactersSafe(valueTextNode, asStringText);
      postToUi({
        type: "apply-writing-guideline-result",
        success: true,
        labelKey: labelKey,
      });
      return;
    }
  }

  postToUi({
    type: "apply-writing-guideline-result",
    success: false,
    reason: "label-not-found",
  });
}

var HEADING_PROP_ON_VALUES = ["on", "true", "yes", "show", "1", "left", "right", "both"];
var HEADING_PROP_OFF_VALUES = ["off", "false", "no", "none", "hide"];

function normalizeHeadingPropertyKey(key) {
  return String(key || "").toLowerCase().replace(/#[\w:]+/g, "").trim();
}

function cleanHeadingPropertyLabel(key) {
  var s = String(key || "").replace(/#[\w:]+.*$/, "").trim();
  return s || String(key || "");
}

function extractHeadingPropertyValue(raw) {
  if (raw && typeof raw === "object" && "value" in raw) return raw.value;
  return raw;
}

function isHeadingPropertyValueOn(value) {
  if (value === true) return true;
  if (value === false) return false;
  var v = String(value == null ? "" : value).toLowerCase().trim();
  if (HEADING_PROP_OFF_VALUES.indexOf(v) >= 0) return false;
  if (HEADING_PROP_ON_VALUES.indexOf(v) >= 0) return true;
  return !!v;
}

function isHeadingComponentBooleanKey(keyLower) {
  if (
    keyLower.indexOf("headline") >= 0 ||
    keyLower.indexOf("title") >= 0 ||
    keyLower === "text" ||
    keyLower.indexOf("titulo") >= 0
  ) {
    return false;
  }
  var hasButtonWord =
    keyLower.indexOf("button") >= 0 ||
    keyLower.indexOf("buttons") >= 0 ||
    keyLower.indexOf("btn") >= 0;
  if (keyLower.indexOf("back") >= 0 && hasButtonWord) return true;
  if (keyLower.indexOf("action") >= 0 && hasButtonWord) return true;
  if (keyLower === "back button" || keyLower === "back-button") return true;
  if (keyLower === "action button" || keyLower === "action-button") return true;
  if (keyLower === "button" || keyLower === "buttons") return true;
  return false;
}

function readHeadingVariantPropertyKeys(props) {
  var active = [];
  if (!props || typeof props !== "object") return active;
  for (var key in props) {
    if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
    if (isHeadingPropertyValueOn(props[key])) {
      active.push(cleanHeadingPropertyLabel(key));
    }
  }
  return active;
}

function readHeadingComponentBooleanPropertyKeys(props) {
  var active = [];
  if (!props || typeof props !== "object") return active;
  for (var key in props) {
    if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
    var keyLower = normalizeHeadingPropertyKey(key);
    if (!isHeadingComponentBooleanKey(keyLower)) continue;
    var value = extractHeadingPropertyValue(props[key]);
    if (value === true || isHeadingPropertyValueOn(value)) {
      active.push(cleanHeadingPropertyLabel(key));
    }
  }
  return active;
}

function addUniqueHeadingPropertyKeys(target, seen, keys) {
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var norm = normalizeHeadingPropertyKey(key);
    if (seen[norm]) continue;
    seen[norm] = true;
    target.push(key);
  }
}

/**
 * Heading: variant properties + boolean toggles (toggle layer visibility) em Headings antigos.
 */
function collectHeadingActiveVariants(node) {
  var active = [];
  var seen = {};
  if (!node || node.type !== "INSTANCE") return active;
  if ("variantProperties" in node && node.variantProperties) {
    addUniqueHeadingPropertyKeys(
      active,
      seen,
      readHeadingVariantPropertyKeys(node.variantProperties)
    );
  }
  if ("componentProperties" in node && node.componentProperties) {
    addUniqueHeadingPropertyKeys(
      active,
      seen,
      readHeadingComponentBooleanPropertyKeys(node.componentProperties)
    );
  }
  return active;
}

/**
 * Section Title e outros: apenas variant properties.
 */
function collectActiveInstanceVariantKeys(node) {
  if (!node || node.type !== "INSTANCE") return [];
  if (!("variantProperties" in node) || !node.variantProperties) return [];
  return readHeadingVariantPropertyKeys(node.variantProperties);
}

/**
 * Scans a subtree and detects instances of supported components.
 * If the user selects a frame, section, group, or component root, scans only that subtree; otherwise returns a selection error.
 */
async function scanComponents() {
  const selection = figma.currentPage.selection;
  if (!selection.length || !isScanRootNode(selection[0])) {
    lastScanRootId = null;
    return {
      components: [],
      scanRootId: null,
      error:
        "Select a frame, section, group, or component instance containing the components you want to scan.",
    };
  }

  const rootFrame = selection[0];
  lastScanRootId = rootFrame.id;

  /** Ordem de leitura: DFS na ordem do frame (auto-layout ou painel Layers). */
  var frameOrderById = new Map();
  var frameOrderNext = 0;
  (function walkFrameOrder(node) {
    if (node !== rootFrame && !isEffectivelyVisible(node)) return;
    if (node !== rootFrame) {
      var canvas = getNodeCanvasSortKey(node);
      frameOrderById.set(node.id, {
        seq: frameOrderNext++,
        y: canvas.y,
        x: canvas.x,
      });
    }
    forEachChildInFrameOrder(node, function (ch) {
      walkFrameOrder(ch);
    });
  })(rootFrame);

  function compareFrameReadingOrder(aId, bId) {
    var a = frameOrderById.get(aId);
    var b = frameOrderById.get(bId);
    var aSeq = a && a.seq != null ? a.seq : 2147483646;
    var bSeq = b && b.seq != null ? b.seq : 2147483646;
    if (aSeq !== bSeq) return aSeq - bSeq;
    var ay = a && a.y != null ? a.y : 0;
    var by = b && b.y != null ? b.y : 0;
    if (ay !== by) return ay - by;
    var ax = a && a.x != null ? a.x : 0;
    var bx = b && b.x != null ? b.x : 0;
    if (ax !== bx) return ax - bx;
    return String(aId).localeCompare(String(bId));
  }

  function getTreeOrderForNode(nodeId) {
    var entry = frameOrderById.get(nodeId);
    return entry && entry.seq != null ? entry.seq : 2147483646;
  }

  const found = [];

  // Walk the entire frame subtree (including nested frames).
  // Only consider Figma component nodes: INSTANCE, COMPONENT, COMPONENT_SET.
  // Do not treat generic FRAME/GROUP as items (avoid guessing).
  var candidates = [];
  (function collect(node) {
    if (node === rootFrame) {
      forEachChildInFrameOrder(node, function (ch) {
        collect(ch);
      });
      return;
    }
    if (!isEffectivelyVisible(node)) return;
    if (node.type === "INSTANCE" || node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
      if (hasCanvasRenderBounds(node)) {
        candidates.push(node);
      }
    }
    forEachChildInFrameOrder(node, function (ch) {
      collect(ch);
    });
  })(rootFrame);

  // Resolve types before top-level filter (Internal Read preset é transparente).
  var candidateTypeById = new Map();
  for (var preIdx = 0; preIdx < candidates.length; preIdx++) {
    candidateTypeById.set(
      candidates[preIdx].id,
      await resolveNodeMatchedType(candidates[preIdx])
    );
  }
  if (isInstanceLikeNode(rootFrame)) {
    candidateTypeById.set(
      rootFrame.id,
      await resolveNodeMatchedType(rootFrame)
    );
  }

  const candidateIds = new Set(candidates.map(function (n) { return n.id; }));
  candidates = candidates.filter(function (node) {
    var p = node.parent;
    while (p && p !== rootFrame) {
      if (candidateIds.has(p.id)) {
        if (isButtonReleasedFromGroupContainer(node)) {
          p = p.parent;
          continue;
        }
        var parentType = candidateTypeById.get(p.id);
        if (
          WELLHUB_COMPONENT_REGISTRY.isTransparentScanWrapper(
            parentType,
            isInstanceLikeNode(p)
          )
        ) {
          p = p.parent;
          continue;
        }
        return false;
      }
      p = p.parent;
    }
    return true;
  });

  async function collectGroupingListItems(node, groupingSpec) {
    var items = [];
    var counts = {};
    var R = WELLHUB_COMPONENT_REGISTRY;

    function tryAddMatch(n, resolvedType) {
      var match = R.matchesGroupingSubComponent(resolvedType, groupingSpec);
      if (!match) return false;
      var key = match.resolvedType;
      counts[key] = counts[key] || 0;
      if (match.spec.maxCount && counts[key] >= match.spec.maxCount) return true;
      counts[key]++;
      var childTree = getTreeOrderForNode(n.id);
      var childCanvas = getNodeCanvasSortKey(n);
      items.push({
        id: n.id,
        name: n.name || "",
        type: match.resolvedType,
        _sortY: childTree,
        _sortX: childCanvas.x,
      });
      return true;
    }

    async function walk(n) {
      if (n !== node && !isEffectivelyVisible(n)) return;
      if (n !== node && n.type === "TEXT") {
        if (!isScannableHandoffNode(n)) return;
        var ch = n.characters;
        if (typeof ch !== "string" || !ch.trim()) return;
        var fontSize = getFontSizeForTextNode(n);
        if (fontSize == null) fontSize = approximateFontSizeFromTextBounds(n);
        var textType = classifyTypographyFromSizePx(fontSize);
        if (!textType) textType = "Text Body";
        if (tryAddMatch(n, textType)) return;
        return;
      }

      var descendIntoChildren = true;
      if (n !== node && isInstanceLikeNode(n)) {
        if (isScannableHandoffNode(n)) {
          var lookupNames = await getInstanceLookupNames(n);
          var childType = await resolveHandoffTypeForInstanceNode(n);
          if (WELLHUB_COMPONENT_REGISTRY.isScanIgnoredType(childType)) {
            descendIntoChildren = false;
          } else if (isButtonGroupContainerNode(n)) {
            // Desce para ler cada Button filho (ex.: Primary + Secondary no Heading).
          } else if (childType && tryAddMatch(n, childType)) {
            descendIntoChildren = false;
          }
        }
      }

      if (descendIntoChildren && "children" in n && n.children && n.children.length) {
        var childNodes = [];
        forEachChildInFrameOrder(n, function (ch) {
          childNodes.push(ch);
        });
        for (var wi = 0; wi < childNodes.length; wi++) {
          await walk(childNodes[wi]);
        }
      }
    }

    await walk(node);
    items.sort(function (a, b) {
      return compareFrameReadingOrder(a.id, b.id);
    });
    return items;
  }

  function isRegistryEmitTypeForInternalRead(resolvedType) {
    if (!resolvedType || WELLHUB_COMPONENT_REGISTRY.isScanIgnoredType(resolvedType)) return false;
    if (WELLHUB_COMPONENT_REGISTRY.isInternalReadType(resolvedType)) return false;
    return !!WELLHUB_COMPONENT_REGISTRY.lookupRegistrySpec(resolvedType);
  }

  async function collectInternalReadItems(node) {
    var items = [];
    var seenIds = {};
    var R = WELLHUB_COMPONENT_REGISTRY;

    function tryEmitTypography(n, textType) {
      if (textType !== "Text Body" && textType !== "Text Headline") return false;
      if (seenIds[n.id]) return true;
      seenIds[n.id] = true;
      var childCanvas = getNodeCanvasSortKey(n);
      items.push({
        id: n.id,
        name: n.name || "Text",
        type: textType,
        _sortY: getTreeOrderForNode(n.id),
        _sortX: childCanvas.x,
      });
      return true;
    }

    async function tryEmitInstance(n, resolvedType, localName, mainName) {
      if (!isRegistryEmitTypeForInternalRead(resolvedType)) return false;
      if (seenIds[n.id]) return true;
      seenIds[n.id] = true;

      var emitType = resolvedType;
      var groupingSpec = R.getGroupingSpec(resolvedType);
      if (groupingSpec) {
        emitType = R.getGroupingDisplayType(resolvedType);
      }
      if (emitType === "Buttons") emitType = "Button";

      var childCanvas = getNodeCanvasSortKey(n);
      var item = {
        id: n.id,
        name: localName || mainName || n.name || "",
        type: emitType,
        _sortY: getTreeOrderForNode(n.id),
        _sortX: childCanvas.x,
      };

      if (groupingSpec) {
        var groupingChildren = await collectGroupingListItems(n, groupingSpec);
        item.listItems = groupingChildren.map(function (c) {
          return {
            id: c.id,
            name: c.name,
            type: c.type,
            _sortY: c._sortY,
            _sortX: c._sortX != null ? c._sortX : 0,
          };
        });
        item.presetGrouping = true;
      }

      items.push(item);
      return true;
    }

    async function tryEmitHeadingSlotButtonInstance(n, irLookupNames) {
      var slotType =
        resolveHeadingSlotButtonType(irLookupNames.localName) ||
        resolveHeadingSlotButtonType(irLookupNames.mainName);
      if (!slotType) return false;
      return await tryEmitInstance(
        n,
        slotType,
        irLookupNames.localName,
        irLookupNames.mainName
      );
    }

    async function processInternalReadCandidate(n) {
      if (!n || n.id === node.id) return;
      if (n.type === "TEXT") {
        if (!isScannableForInternalReadWalk(n)) return;
        if (await isTextInsideHeadingSlotButton(n, node)) return;
        var ch = n.characters;
        if (typeof ch !== "string" || !ch.trim()) return;
        var fontSize = getFontSizeForTextNode(n);
        if (fontSize == null) fontSize = approximateFontSizeFromTextBounds(n);
        var textType = classifyTypographyFromSizePx(fontSize);
        if (!textType) textType = "Text Body";
        await tryEmitTypography(n, textType);
        return;
      }
      if (isInstanceLikeNode(n) && isEffectivelyVisible(n)) {
        var irLookupNames = await getInstanceLookupNames(n);
        if (await tryEmitHeadingSlotButtonInstance(n, irLookupNames)) return;
        if (!isScannableForInternalReadWalk(n)) return;
        var childType = await resolveHandoffTypeForInstanceNode(n);
        if (WELLHUB_COMPONENT_REGISTRY.isScanIgnoredType(childType)) return;
        if (!R.isInternalReadType(childType)) {
          await tryEmitInstance(
            n,
            childType,
            irLookupNames.localName,
            irLookupNames.mainName
          );
        }
      }
    }

    async function walk(n) {
      if (n !== node && !isEffectivelyVisible(n)) return;
      if (n !== node && n.type === "TEXT") {
        if (!isScannableForInternalReadWalk(n)) return;
        if (await isTextInsideHeadingSlotButton(n, node)) return;
        var ch = n.characters;
        if (typeof ch !== "string" || !ch.trim()) return;
        var fontSize = getFontSizeForTextNode(n);
        if (fontSize == null) fontSize = approximateFontSizeFromTextBounds(n);
        var textType = classifyTypographyFromSizePx(fontSize);
        if (!textType) textType = "Text Body";
        if (tryEmitTypography(n, textType)) return;
        return;
      }

      var descendIntoChildren = true;
      if (n !== node && isInstanceLikeNode(n) && isEffectivelyVisible(n)) {
        var irLookupNames = await getInstanceLookupNames(n);
        var isSlotButton =
          resolveHeadingSlotButtonType(irLookupNames.localName) ||
          resolveHeadingSlotButtonType(irLookupNames.mainName);
        if (isSlotButton) {
          if (await tryEmitHeadingSlotButtonInstance(n, irLookupNames)) {
            descendIntoChildren = false;
          } else {
            descendIntoChildren = false;
          }
        } else if (isScannableForInternalReadWalk(n)) {
          var childType = await resolveHandoffTypeForInstanceNode(n);
          if (WELLHUB_COMPONENT_REGISTRY.isScanIgnoredType(childType)) {
            descendIntoChildren = false;
          } else if (!R.isInternalReadType(childType)) {
            if (
              await tryEmitInstance(
                n,
                childType,
                irLookupNames.localName,
                irLookupNames.mainName
              )
            ) {
              descendIntoChildren = false;
            }
          }
        }
      }

      if (descendIntoChildren && "children" in n && n.children && n.children.length) {
        var childNodes = [];
        forEachChildInFrameOrder(n, function (ch) {
          childNodes.push(ch);
        });
        for (var wi = 0; wi < childNodes.length; wi++) {
          await walk(childNodes[wi]);
        }
      }
    }

    await walk(node);

    if (!items.length && isInstanceLikeNode(node) && typeof node.findAll === "function") {
      var descendants = node.findAll(function (n) {
        if (!isEffectivelyVisible(n)) return false;
        return n.type === "TEXT" || isInstanceLikeNode(n);
      });
      for (var di = 0; di < descendants.length; di++) {
        await processInternalReadCandidate(descendants[di]);
      }
    }

    items.sort(function (a, b) {
      return compareFrameReadingOrder(a.id, b.id);
    });
    return items;
  }

  function pushInternalReadScanItems(internalChildren) {
    for (var ic = 0; ic < internalChildren.length; ic++) {
      var icItem = internalChildren[ic];
      if (!icItem || icItem.id == null) continue;
      if (internalReadEmittedIds.has(icItem.id)) continue;
      internalReadEmittedIds.add(icItem.id);
      recognizedTopLevelIds.add(icItem.id);
      if (icItem.listItems && icItem.listItems.length) {
        for (var ili = 0; ili < icItem.listItems.length; ili++) {
          var liNode = icItem.listItems[ili];
          if (liNode && liNode.id != null) {
            internalReadEmittedIds.add(liNode.id);
            recognizedTopLevelIds.add(liNode.id);
          }
        }
      }
      found.push(icItem);
    }
  }

  /** Top-level instances that were actually emitted (excludes unmatched names so inner TEXT can surface as standalone). */
  var recognizedTopLevelIds = new Set();
  var internalReadEmittedIds = new Set();
  var skipCandidateIds = new Set();

  function skipDescendantCandidatesOfInternalRead(containerNode) {
    for (var sci = 0; sci < candidates.length; sci++) {
      if (isDescendantOfNode(containerNode, candidates[sci])) {
        skipCandidateIds.add(candidates[sci].id);
      }
    }
  }

  if (isInstanceLikeNode(rootFrame)) {
    var rootMatchedType = candidateTypeById.get(rootFrame.id);
    if (rootMatchedType == null) {
      rootMatchedType = await resolveNodeMatchedType(rootFrame);
    }
    if (WELLHUB_COMPONENT_REGISTRY.isInternalReadType(rootMatchedType)) {
      recognizedTopLevelIds.add(rootFrame.id);
      var rootInternalChildren = await collectInternalReadItems(rootFrame);
      pushInternalReadScanItems(rootInternalChildren);
      skipDescendantCandidatesOfInternalRead(rootFrame);
    }
  }

  for (var c = 0; c < candidates.length; c++) {
    var node = candidates[c];
    if (skipCandidateIds.has(node.id)) continue;
    if (!isScannableHandoffNode(node)) continue;
    var localName = node.name || "";
    var mainName = localName;

    if (node.type === "INSTANCE") {
      try {
        var main = await node.getMainComponentAsync();
        if (main && main.name) mainName = main.name;
      } catch (e) {}
    }

    if (!localName && !mainName) continue;

    var matchedType = candidateTypeById.get(node.id);
    if (matchedType == null) {
      matchedType = await resolveNodeMatchedType(node);
    }

    if (!matchedType) continue;

    if (WELLHUB_COMPONENT_REGISTRY.isScanIgnoredType(matchedType)) continue;

    if (isButtonGroupContainerNode(node)) continue;

    if (internalReadEmittedIds.has(node.id)) continue;

    // Internal Read: sem card do container; filhos lidos via walk na subárvore.
        if (WELLHUB_COMPONENT_REGISTRY.isInternalReadType(matchedType)) {
          recognizedTopLevelIds.add(node.id);
          var internalChildren = await collectInternalReadItems(node);
          pushInternalReadScanItems(internalChildren);
          skipDescendantCandidatesOfInternalRead(node);
          continue;
        }

    var treeOrder = getTreeOrderForNode(node.id);
    var canvasKey = getNodeCanvasSortKey(node);
    var emitType = matchedType;
    var groupingSpec = WELLHUB_COMPONENT_REGISTRY.getGroupingSpec(matchedType);
    if (groupingSpec) {
      emitType = WELLHUB_COMPONENT_REGISTRY.getGroupingDisplayType(matchedType);
    }

    const item = {
      id: node.id,
      name: localName || mainName,
      type: emitType,
      _sortY: treeOrder,
      _sortX: canvasKey.x,
    };

    const hasGroupingItems = !!groupingSpec;
    if (hasGroupingItems) {
      var groupingChildren = await collectGroupingListItems(node, groupingSpec);
      item.listItems = groupingChildren.map(function (c) {
        return {
          id: c.id,
          name: c.name,
          type: c.type,
          _sortY: c._sortY,
          _sortX: c._sortX != null ? c._sortX : 0,
        };
      });
      item.presetGrouping = true;
    }

    recognizedTopLevelIds.add(node.id);
    found.push(item);
  }

  // Standalone typography: TEXT not under a *recognized* top-level instance (unknown wrappers no longer block).
  // Sizes: Text Headline when dominant font size is at or above TYPO_HEADLINE_MIN_PX (see classifyTypographyFromSizePx).
  (function collectStandaloneText(node) {
    if (node !== rootFrame && !isEffectivelyVisible(node)) return;
    if (node.type === "TEXT") {
      if (internalReadEmittedIds.has(node.id) || recognizedTopLevelIds.has(node.id)) return;
      if (!isScannableHandoffNode(node)) return;
      var ch = node.characters;
      if (typeof ch !== "string" || !ch.trim()) {
        return;
      }
      var p = node.parent;
      var isInsideComponent = false;
      while (p && p !== rootFrame) {
        if (recognizedTopLevelIds.has(p.id)) {
          isInsideComponent = true;
          break;
        }
        p = p.parent;
      }
      if (!isInsideComponent) {
        var fontSize = getFontSizeForTextNode(node);
        if (fontSize == null) {
          fontSize = approximateFontSizeFromTextBounds(node);
        }
        if (shouldReportStandaloneTypography(node, fontSize)) {
          var textType = classifyTypographyFromSizePx(fontSize);
          if (textType) {
            var textOrder = getTreeOrderForNode(node.id);
            var textCanvas = getNodeCanvasSortKey(node);
            found.push({
              id: node.id,
              name: node.name || "Text",
              type: textType,
              _sortY: textOrder,
              _sortX: textCanvas.x,
            });
          }
        }
      }
      return;
    }
    forEachChildInFrameOrder(node, function (ch) {
      collectStandaloneText(ch);
    });
  })(rootFrame);

  // Ordem final = travessia do frame; desempate por posição Y/X no canvas.
  found.sort(function (a, b) {
    return compareFrameReadingOrder(a.id, b.id);
  });
  found.forEach(function (item, orderIdx) {
    item._sortY = orderIdx;
    item._sortX = item._sortX != null ? item._sortX : 0;
    if (item._scanSortY == null) item._scanSortY = orderIdx;
    if (item._scanSortX == null) item._scanSortX = item._sortX;
  });

  return {
    components: found.map(function (item) {
      const result = {
        id: item.id,
        name: item.name,
        type: item.type,
      };
      if (item._sortY != null) {
        result._sortY = item._sortY;
        result._sortX = item._sortX != null ? item._sortX : 0;
      }
      if (item._scanSortY != null) {
        result._scanSortY = item._scanSortY;
        result._scanSortX = item._scanSortX != null ? item._scanSortX : 0;
      }
      if (item.headingVariants && item.headingVariants.length) {
        result.headingVariants = item.headingVariants;
      }
      if (item.presetGrouping) {
        result.presetGrouping = true;
      }
      if (item.listItems && item.listItems.length) {
        result.listItems = item.listItems;
      }
      if (WELLHUB_COMPONENT_REGISTRY.isSimpleAtomicHandoffType(result.type)) {
        delete result.listItems;
      }
      return result;
    }),
    scanRootId: rootFrame.id,
    error: null,
  };
}

/**
 * Posiciona o frame de handoff à direita do frame escaneado (coordenadas da page).
 */
function placeAccessibilityHandoffToRightOfScanRoot(cardFrame, scanRootId) {
  if (!cardFrame) return null;

  var root = null;
  var rootId =
    typeof scanRootId === "string" && scanRootId
      ? scanRootId
      : lastScanRootId;

  if (rootId) {
    try {
      root = figma.getNodeById(rootId);
    } catch (e) {
      root = null;
    }
  }

  if (
    (!root || root.removed) &&
    figma.currentPage.selection.length > 0 &&
    isScanRootNode(figma.currentPage.selection[0])
  ) {
    root = figma.currentPage.selection[0];
  }

  if (root && !root.removed && "absoluteBoundingBox" in root && root.absoluteBoundingBox) {
    var box = root.absoluteBoundingBox;
    cardFrame.x = box.x + box.width + HANDOFF_CARD_PLACEMENT_GAP;
    cardFrame.y = box.y;
  }

  try {
    var zoomTargets = [cardFrame];
    if (root && !root.removed) zoomTargets.push(root);
    figma.viewport.scrollAndZoomIntoView(zoomTargets);
  } catch (e) {
    // ignore viewport errors
  }

  try {
    figma.currentPage.selection = [cardFrame];
  } catch (e) {
    // ignore selection errors
  }

  return root;
}

/**
 * Scans the selected subtree and evaluates conformance with the Yoga Design System.
 * This is a simple rules-based implementation intended to be adapted to your real DS rules.
 */
function scanDesignSystem() {
  const selection = figma.currentPage.selection;

  if (!selection.length || !isScanRootNode(selection[0])) {
    return {
      summary: {
        passed: 0,
        warnings: 0,
        failed: 0,
      },
      categories: [],
      error:
        "Select a frame, section, group, or component instance with design system layers to check conformance.",
    };
  }

  const rootFrame = selection[0];

  const categories = {
    colors: {
      id: "colors",
      name: "Colors",
      status: "pass",
      failed: 0,
      warnings: 0,
      items: [],
    },
    typography: {
      id: "typography",
      name: "Typography",
      status: "pass",
      failed: 0,
      warnings: 0,
      items: [],
    },
    spacing: {
      id: "spacing",
      name: "Spacing",
      status: "pass",
      failed: 0,
      warnings: 0,
      items: [],
    },
    components: {
      id: "components",
      name: "Components",
      status: "pass",
      failed: 0,
      warnings: 0,
      items: [],
    },
    borders: {
      id: "borders",
      name: "Borders & Radius",
      status: "pass",
      failed: 0,
      warnings: 0,
      items: [],
    },
  };

  // Example rules (mock): apenas componentes e texto visíveis (ignora frames/grupos como alvo de regra).
  traverse(rootFrame, (node) => {
    // Colors: check whether fills are using styles
    if ("fills" in node && Array.isArray(node.fills) && node.fills.length) {
      const usesStyle = !!node.fillStyleId;
      categories.colors.items.push({
        nodeId: node.id,
        label: node.name || "Layer",
        status: usesStyle ? "pass" : "warning",
        details: usesStyle
          ? "Using color style from Yoga."
          : "Fill is not linked to a Yoga color style.",
        issues: usesStyle
          ? []
          : [
              "Apply a color style from the Yoga Design System to this layer.",
            ],
      });
      if (!usesStyle) {
        categories.colors.warnings += 1;
        categories.colors.status = "warning";
      }
    }

    // Typography: check whether text is using a text style
    if (node.type === "TEXT") {
      const usesTextStyle = !!node.textStyleId;
      categories.typography.items.push({
        nodeId: node.id,
        label: node.name || "Text",
        status: usesTextStyle ? "pass" : "fail",
        details: usesTextStyle
          ? "Using text style from Yoga."
          : "Text is not linked to a Yoga typography style.",
        issues: usesTextStyle
          ? []
          : [
              "Apply a typography style from the Yoga Design System to this text.",
            ],
      });
      if (!usesTextStyle) {
        categories.typography.failed += 1;
        categories.typography.status = "fail";
      }
    }

    // Spacing: check if auto layout paddings/gaps are multiples of 4
    if ("layoutMode" in node && node.layoutMode !== "NONE") {
      const paddings = [
        node.paddingLeft,
        node.paddingRight,
        node.paddingTop,
        node.paddingBottom,
        node.itemSpacing,
      ].filter((v) => typeof v === "number");

      const invalid = paddings.some(
        (value) => typeof value === "number" && value % 4 !== 0
      );

      categories.spacing.items.push({
        nodeId: node.id,
        label: node.name || "Auto layout",
        status: invalid ? "warning" : "pass",
        details: invalid
          ? "Some paddings or gaps are not multiples of 4."
          : "Spacing follows a 4px base grid.",
        issues: invalid
          ? ["Adjust spacing to multiples of 4px according to Yoga scale."]
          : [],
      });

      if (invalid) {
        categories.spacing.warnings += 1;
        categories.spacing.status = "warning";
      }
    }

    // Components: only check instance presence (avoid mainComponent lookups in dynamic-page).
    // This can be extended later with getMainComponentAsync if needed/allowed.
    if (node.type === "INSTANCE") {
      categories.components.items.push({
        nodeId: node.id,
        label: node.name || "Instance",
        status: "pass",
        details: "Instance detected (main component link not checked).",
        issues: [],
      });
      // Keep category as pass by default; real rules can be added later with allowed APIs.
    }

    // Borders & Radius: check whether radius uses standard tokens (e.g. 0, 4, 8, 999)
    if ("cornerRadius" in node && typeof node.cornerRadius === "number") {
      const allowed = [0, 2, 4, 8, 12, 16, 24, 999];
      const isValid = allowed.includes(node.cornerRadius);
      categories.borders.items.push({
        nodeId: node.id,
        label: node.name || "Layer",
        status: isValid ? "pass" : "warning",
        details: isValid
          ? "Radius matches one of the standard tokens."
          : "Radius does not match standard Yoga tokens.",
        issues: isValid
          ? []
          : ["Use one of the standard radius tokens (e.g. 4, 8, 999)."],
      });
      if (!isValid) {
        categories.borders.warnings += 1;
        if (categories.borders.status !== "fail") {
          categories.borders.status = "warning";
        }
      }
    }
  });

  const allCategories = Object.values(categories);
  let passed = 0;
  let warnings = 0;
  let failed = 0;

  for (const cat of allCategories) {
    for (const item of cat.items) {
      if (item.status === "pass") passed += 1;
      if (item.status === "warning") warnings += 1;
      if (item.status === "fail") failed += 1;
    }
  }

  return {
    summary: {
      passed,
      warnings,
      failed,
    },
    categories: allCategories,
    error: null,
  };
}

/**
 * 1px separator (#D3D3D3) between items in Grouping/list cards.
 * Uses an empty frame with fixed height and STRETCH width (respects contentFrame padding).
 * Avoids Line + layoutGrow (can break with \"object is not extensible\" in some runtimes).
 */
function createGroupingListDividerLine() {
  var f = figma.createFrame();
  f.name = "List divider";
  f.layoutMode = "VERTICAL";
  f.primaryAxisSizingMode = "FIXED";
  f.counterAxisSizingMode = "AUTO";
  f.itemSpacing = 0;
  f.paddingLeft = 0;
  f.paddingTop = 0;
  f.paddingRight = 0;
  f.paddingBottom = 0;
  f.fills = [
    { type: "SOLID", color: { r: 211 / 255, g: 211 / 255, b: 211 / 255 } },
  ];
  f.layoutAlign = "STRETCH";
  f.resize(10, 1);
  return f;
}

/**
 * True when a list-item payload has user-authored custom a11y content to render
 * (enabled fields with non-empty text or designer guidance). Used for nested and
 * top-level rows so standard fallback does not replace filled custom labels.
 */
function handoffListItemShouldRenderCustomHandoffRows(listItem) {
  if (!listItem || !listItem.customData || typeof listItem.customData !== "object") {
    return false;
  }
  var cd = listItem.customData;
  var keys = ["labelAlternative", "supplementary", "feedback"];
  for (var i = 0; i < keys.length; i++) {
    var data = cd[keys[i]];
    if (data && data.enabled && String(data.text || "").trim() !== "") {
      return true;
    }
  }
  var dg = cd.designerGuidance;
  if (typeof dg === "string" && String(dg).trim() !== "") {
    return true;
  }
  if (dg && typeof dg === "object" && dg.enabled && String(dg.text || "").trim() !== "") {
    return true;
  }
  return false;
}

var HANDOFF_DESIGNER_GUIDANCE_TEXT_COLOR = {
  r: 198 / 255,
  g: 6 / 255,
  b: 6 / 255,
};

/**
 * Appends DESIGNER GUIDANCE label + value (value in #C60606) to a handoff content frame.
 */
async function appendHandoffDesignerGuidanceBlock(
  parentFrame,
  dgText,
  interBold,
  interRegular,
  valueWidth
) {
  var text = String(dgText || "").trim();
  if (!text) return;

  var row = figma.createFrame();
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "AUTO";
  row.counterAxisSizingMode = "AUTO";
  row.layoutAlign = "STRETCH";
  row.itemSpacing = 6;
  row.fills = [];

  var label = figma.createText();
  label.fontSize = 8;
  await setTextCharactersSafe(label, "DESIGNER GUIDANCE:", interBold);
  label.textAutoResize = "HEIGHT";

  var valueFrame = figma.createFrame();
  valueFrame.name = "value-wrapper";
  valueFrame.layoutMode = "VERTICAL";
  valueFrame.primaryAxisSizingMode = "AUTO";
  valueFrame.counterAxisSizingMode = "FIXED";
  valueFrame.fills = [];
  valueFrame.clipsContent = false;
  valueFrame.resize(valueWidth || 210, 1);

  var value = figma.createText();
  value.fontSize = 10;
  await setTextCharactersSafe(value, text, interRegular);
  value.fills = [{ type: "SOLID", color: HANDOFF_DESIGNER_GUIDANCE_TEXT_COLOR }];
  value.textAutoResize = "HEIGHT";
  value.layoutAlign = "STRETCH";

  valueFrame.appendChild(value);
  valueFrame.resize(valueWidth || 210, Math.max(value.height, 1));
  row.appendChild(label);
  row.appendChild(valueFrame);
  parentFrame.appendChild(row);
}

/**
 * Creates a frame in the current file with the accessibility handoff documentation.
 * payload.components comes from the UI with reviewed/confirmed data.
 */
async function generateAccessibilityFrame(payload) {
  const { components } = payload || {};
  const page = figma.currentPage;

  // Preload Inter if available (best effort)
  const interRegular = { family: "Inter", style: "Regular" };
  const interBold = { family: "Inter", style: "Bold" };
  try { await figma.loadFontAsync(interRegular); } catch (e) {}
  try { await figma.loadFontAsync(interBold); } catch (e) {}

  const cardFrame = figma.createFrame();
  cardFrame.name = "Accessibility Handoff";
  cardFrame.layoutMode = "VERTICAL";
  cardFrame.primaryAxisSizingMode = "AUTO";
  cardFrame.counterAxisSizingMode = "FIXED";
  cardFrame.resize(355, 10);
  cardFrame.itemSpacing = 0;
  cardFrame.paddingTop = 0;
  cardFrame.paddingBottom = 0;
  cardFrame.paddingLeft = 0;
  cardFrame.paddingRight = 0;
  cardFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  cardFrame.strokes = [
    { type: "SOLID", color: { r: 0.925, g: 0.925, b: 0.925 } },
  ];
  cardFrame.strokeWeight = 1;
  cardFrame.cornerRadius = 8;
  cardFrame.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0.059, g: 0.09, b: 0.165, a: 0.14 },
      offset: { x: 0, y: 8 },
      radius: 16,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
  ];

  page.appendChild(cardFrame);

  /** Component explanatory text (e.g. \"Button element…\") — #57544D */
  const explanatoryTextColor = { r: 87 / 255, g: 84 / 255, b: 77 / 255 };
  /** Index 01, 02… inside list/grouping content — #D8385E */
  const listContentIndexColor = { r: 216 / 255, g: 56 / 255, b: 94 / 255 };

  const CARD_WIDTH = 355;
  /** Same usable width as body (padding 16+16). FIX prevents Hug from collapsing cards on generate/paste. */
  const BODY_INNER_WIDTH = CARD_WIDTH - 16 - 16;
  /** Usable area inside the component contentFrame (padding 12+12). */
  const LIST_ITEM_INNER_WIDTH = BODY_INNER_WIDTH - 24;

  const bodyFrame = figma.createFrame();
  bodyFrame.layoutMode = "VERTICAL";
  bodyFrame.primaryAxisSizingMode = "AUTO";
  bodyFrame.counterAxisSizingMode = "AUTO";
  bodyFrame.layoutAlign = "STRETCH";
  bodyFrame.itemSpacing = 12;
  bodyFrame.paddingTop = 14;
  bodyFrame.paddingBottom = 14;
  bodyFrame.paddingLeft = 16;
  bodyFrame.paddingRight = 16;
  bodyFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

  /**
   * Container custom a11y fields (intro + LABEL ALTERNATIVE / etc. + guideline).
   * Also used before the List/Grouping children block to avoid dropping listItems.
   */
  async function appendContainerCustomHandoff(contentFrame, comp) {
    if (!WELLHUB_COMPONENT_REGISTRY.shouldUseCustomHandoffRendering(comp) || !comp.customData) return;

    const customIntro = figma.createText();
    customIntro.fontSize = 12;
    const introTypeName = comp.type || "Component";
    await setTextCharactersSafe(
      customIntro,
      `${introTypeName} element, read as per the components below:`,
      interRegular
    );
    customIntro.textAutoResize = "HEIGHT";
    customIntro.layoutAlign = "STRETCH";
    customIntro.fills = [{ type: "SOLID", color: explanatoryTextColor }];
    contentFrame.appendChild(customIntro);

    const labelMap = {
      labelAlternative: "LABEL ALTERNATIVE:",
      supplementary: "SUPPLEMENTARY:",
      feedback: "FEEDBACK:",
    };

    for (const key of ["labelAlternative", "supplementary", "feedback"]) {
      const data = comp.customData[key];
      if (data && data.enabled) {
        const row = figma.createFrame();
        row.layoutMode = "HORIZONTAL";
        row.primaryAxisSizingMode = "AUTO";
        row.counterAxisSizingMode = "AUTO";
        row.layoutAlign = "STRETCH";
        row.itemSpacing = 6;
        row.fills = [];

        const label = figma.createText();
        label.fontSize = 8;
        await setTextCharactersSafe(label, labelMap[key], interBold);
        label.textAutoResize = "HEIGHT";

        const labelWidth =
          key === "supplementary" || key === "feedback" ? 85 : undefined;
        const labelEl =
          labelWidth != null
            ? (() => {
                const labelFrame = figma.createFrame();
                labelFrame.layoutMode = "HORIZONTAL";
                labelFrame.primaryAxisSizingMode = "AUTO";
                labelFrame.counterAxisSizingMode = "FIXED";
                labelFrame.fills = [];
                labelFrame.appendChild(label);
                labelFrame.resize(labelWidth, Math.max(label.height, 14));
                return labelFrame;
              })()
            : label;

        const valueFrame = figma.createFrame();
        valueFrame.name = "value-wrapper";
        valueFrame.layoutMode = "VERTICAL";
        valueFrame.primaryAxisSizingMode = "AUTO";
        valueFrame.counterAxisSizingMode = "FIXED";
        valueFrame.fills = [];
        valueFrame.clipsContent = false;
        valueFrame.resize(210, 1);

        const valueColor = { r: 0.341, g: 0.329, b: 0.302 };
        const value = figma.createText();
        value.fontSize = 10;
        await setTextCharactersSafe(
          value,
          typeof data.text === "string" ? data.text : String(data.text || ""),
          interRegular
        );
        value.fills = [{ type: "SOLID", color: valueColor }];
        value.textAutoResize = "HEIGHT";
        value.layoutAlign = "STRETCH";

        valueFrame.appendChild(value);
        valueFrame.resize(210, Math.max(value.height, 1));
        row.appendChild(labelEl);
        row.appendChild(valueFrame);
        contentFrame.appendChild(row);
      }
    }

    const dgStr = WELLHUB_COMPONENT_REGISTRY.resolveDesignerGuidanceText(comp);
    await appendHandoffDesignerGuidanceBlock(
      contentFrame,
      dgStr,
      interBold,
      interRegular,
      210
    );
  }

  if (!components || !components.length) {
    const empty = figma.createText();
    empty.fontSize = 12;
    await setTextCharactersSafe(
      empty,
      "No components configured. Go back to the plugin to edit before generating the card.",
      interRegular
    );
    empty.textAutoResize = "HEIGHT";
    empty.layoutAlign = "STRETCH";
    bodyFrame.appendChild(empty);
  } else {
    for (let index = 0; index < components.length; index++) {
      const comp = components[index];
      const compFrame = figma.createFrame();
      compFrame.layoutMode = "VERTICAL";
      compFrame.primaryAxisSizingMode = "AUTO";
      compFrame.counterAxisSizingMode = "AUTO";
      compFrame.layoutAlign = "STRETCH";
      compFrame.itemSpacing = 0;
      compFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      compFrame.strokes = [
        { type: "SOLID", color: { r: 0.925, g: 0.925, b: 0.925 } },
      ];
      compFrame.strokeWeight = 1;
      compFrame.cornerRadius = 8;

      const headerComp = figma.createFrame();
      headerComp.layoutMode = "HORIZONTAL";
      headerComp.primaryAxisSizingMode = "FIXED";
      headerComp.counterAxisSizingMode = "AUTO";
      headerComp.layoutAlign = "STRETCH";
      headerComp.itemSpacing = 8;
      headerComp.paddingTop = 12;
      headerComp.paddingBottom = 12;
      headerComp.paddingLeft = 12;
      headerComp.paddingRight = 12;
      headerComp.fills = [
        { type: "SOLID", color: { r: 0.976, g: 0.976, b: 0.976 } },
      ];
      headerComp.resize(BODY_INNER_WIDTH, 38);

      const typeName = comp.type || "Component";
      const titleColor = { r: 0.114, g: 0.114, b: 0.122 };
      const indexText = figma.createText();
      indexText.fontSize = 12;
      await setTextCharactersSafe(
        indexText,
        typeName === "Screen Title"
          ? "00"
          : String(comp.globalIndex != null ? comp.globalIndex : index + 1).padStart(2, "0"),
        interBold
      );
      indexText.fills = [{ type: "SOLID", color: titleColor }];

      const typeText = figma.createText();
      typeText.fontSize = 12;
      await setTextCharactersSafe(
        typeText,
        typeName === "Screen Title" ? "SCREEN TITLE" : (comp.type || comp.name || "Component"),
        interBold
      );
      typeText.fills = [{ type: "SOLID", color: titleColor }];
      typeText.textAutoResize = "HEIGHT";
      typeText.layoutGrow = 1;

      headerComp.appendChild(indexText);
      headerComp.appendChild(typeText);

      const contentFrame = figma.createFrame();
      contentFrame.layoutMode = "VERTICAL";
      contentFrame.primaryAxisSizingMode = "AUTO";
      contentFrame.counterAxisSizingMode = "AUTO";
      contentFrame.layoutAlign = "STRETCH";
      contentFrame.itemSpacing = 6;
      contentFrame.paddingTop = 14;
      contentFrame.paddingBottom = 14;
      contentFrame.paddingLeft = 12;
      contentFrame.paddingRight = 12;
      contentFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

      const isListType =
        typeName === "List" ||
        typeName === "Grouping" ||
        typeName === "Ordered list" ||
        (typeName && typeName.indexOf("• Grouping") >= 0);
      const listItems = comp.listItems;
      const hasListItems =
        isListType && listItems && listItems.length > 0;

      if (typeName === "Screen Title") {
        const introText = figma.createText();
        introText.fontSize = 12;
        await setTextCharactersSafe(
          introText,
          "\u201cTitle element\u201d for the screen, with the following name:",
          interRegular
        );
        introText.textAutoResize = "HEIGHT";
        introText.layoutAlign = "STRETCH";
        introText.fills = [{ type: "SOLID", color: explanatoryTextColor }];
        contentFrame.appendChild(introText);

        const titleData =
          comp.customData && comp.customData.screenTitle
            ? comp.customData.screenTitle
            : null;
        const titleValue =
          titleData && typeof titleData.text === "string" ? titleData.text : "";

        const row = figma.createFrame();
        row.layoutMode = "HORIZONTAL";
        row.primaryAxisSizingMode = "AUTO";
        row.counterAxisSizingMode = "AUTO";
        row.layoutAlign = "STRETCH";
        row.itemSpacing = 6;
        row.fills = [];

        const label = figma.createText();
        label.fontSize = 8;
        await setTextCharactersSafe(label, "TITLE:", interBold);
        label.textAutoResize = "HEIGHT";

        const valueFrame = figma.createFrame();
        valueFrame.name = "value-wrapper";
        valueFrame.layoutMode = "VERTICAL";
        valueFrame.primaryAxisSizingMode = "AUTO";
        valueFrame.counterAxisSizingMode = "FIXED";
        valueFrame.fills = [];
        valueFrame.clipsContent = false;
        valueFrame.resize(210, 1);

        const valueColor = { r: 0.341, g: 0.329, b: 0.302 };
        const value = figma.createText();
        value.fontSize = 10;
        await setTextCharactersSafe(value, titleValue, interRegular);
        value.fills = [{ type: "SOLID", color: valueColor }];
        value.textAutoResize = "HEIGHT";
        value.layoutAlign = "STRETCH";

        valueFrame.appendChild(value);
        valueFrame.resize(210, Math.max(value.height, 1));
        row.appendChild(label);
        row.appendChild(valueFrame);
        contentFrame.appendChild(row);
      } else if (hasListItems) {
        await appendContainerCustomHandoff(contentFrame, comp);
        contentFrame.itemSpacing = 8;

        const introText = figma.createText();
        introText.fontSize = 12;
        await setTextCharactersSafe(introText, getStandardAccessibilityText(typeName), interRegular);
        introText.textAutoResize = "HEIGHT";
        introText.layoutAlign = "STRETCH";
        introText.fills = [{ type: "SOLID", color: explanatoryTextColor }];
        contentFrame.appendChild(introText);

        var listLabelMap = {
          labelAlternative: "LABEL ALTERNATIVE:",
          supplementary: "SUPPLEMENTARY:",
          feedback: "FEEDBACK:",
        };
        var valueColor = { r: 0.341, g: 0.329, b: 0.302 };
        var listItemTitleColor = { r: 29 / 255, g: 29 / 255, b: 31 / 255 };

        async function appendNestedListItemsForHandoff(parentFrame, nestedItems, depth) {
          if (!nestedItems || !nestedItems.length) return;
          for (var j = 0; j < nestedItems.length; j++) {
            parentFrame.appendChild(createGroupingListDividerLine());
            var sub = nestedItems[j];
            var subType = sub.type || "Other";
            var subExtras =
              sub.activeTextFields || sub.rightComponent
                ? { activeTextFields: sub.activeTextFields, rightComponent: sub.rightComponent }
                : undefined;
            var nestFrame = figma.createFrame();
            nestFrame.layoutMode = "VERTICAL";
            nestFrame.primaryAxisSizingMode = "AUTO";
            nestFrame.counterAxisSizingMode = "AUTO";
            nestFrame.layoutAlign = "STRETCH";
            nestFrame.itemSpacing = 4;
            nestFrame.paddingLeft = Math.min(4 + depth * 6, 22);
            nestFrame.paddingTop = 4;
            nestFrame.paddingBottom = 6;
            nestFrame.fills = [{ type: "SOLID", color: { r: 0.99, g: 0.988, b: 0.984 } }];

            var nHeader = figma.createFrame();
            nHeader.layoutMode = "HORIZONTAL";
            nHeader.primaryAxisSizingMode = "AUTO";
            nHeader.counterAxisSizingMode = "AUTO";
            nHeader.itemSpacing = 6;
            nHeader.fills = [];

            var nIndex = figma.createText();
            nIndex.fontSize = 10;
            var nNum = sub.globalIndex != null ? sub.globalIndex : j + 1;
            await setTextCharactersSafe(nIndex, String(nNum).padStart(2, "0"), interBold);
            nIndex.fills = [{ type: "SOLID", color: listItemTitleColor }];

            var nType = figma.createText();
            nType.fontSize = 10;
            var subTypeDisplay = sub.rightComponent
              ? subType + " (Right: " + sub.rightComponent + ")"
              : subType;
            await setTextCharactersSafe(nType, subTypeDisplay, interBold);
            nType.textAutoResize = "HEIGHT";
            nType.fills = [{ type: "SOLID", color: listItemTitleColor }];

            nHeader.appendChild(nIndex);
            nHeader.appendChild(nType);
            nestFrame.appendChild(nHeader);

            var isSubCustom = handoffListItemShouldRenderCustomHandoffRows(sub);
            if (isSubCustom) {
              for (const key of ["labelAlternative", "supplementary", "feedback"]) {
                var sdata = sub.customData[key];
                if (sdata && sdata.enabled) {
                  var srow = figma.createFrame();
                  srow.layoutMode = "HORIZONTAL";
                  srow.primaryAxisSizingMode = "AUTO";
                  srow.counterAxisSizingMode = "AUTO";
                  srow.layoutAlign = "STRETCH";
                  srow.itemSpacing = 6;
                  srow.fills = [];
                  var slab = figma.createText();
                  slab.fontSize = 8;
                  await setTextCharactersSafe(slab, listLabelMap[key], interBold);
                  slab.textAutoResize = "HEIGHT";
                  var listLabelWidth = key === "supplementary" || key === "feedback" ? 85 : undefined;
                  var slabEl =
                    listLabelWidth != null
                      ? (function () {
                          var lf = figma.createFrame();
                          lf.layoutMode = "HORIZONTAL";
                          lf.primaryAxisSizingMode = "AUTO";
                          lf.counterAxisSizingMode = "FIXED";
                          lf.fills = [];
                          lf.appendChild(slab);
                          lf.resize(listLabelWidth, Math.max(slab.height, 14));
                          return lf;
                        })()
                      : slab;

                  var svalueFrame = figma.createFrame();
                  svalueFrame.layoutMode = "VERTICAL";
                  svalueFrame.primaryAxisSizingMode = "AUTO";
                  svalueFrame.counterAxisSizingMode = "FIXED";
                  svalueFrame.fills = [];
                  svalueFrame.clipsContent = false;
                  svalueFrame.resize(210, 1);

                  var sval = figma.createText();
                  sval.fontSize = 10;
                  await setTextCharactersSafe(
                    sval,
                    typeof sdata.text === "string" ? sdata.text : String(sdata.text || ""),
                    interRegular
                  );
                  sval.textAutoResize = "HEIGHT";
                  sval.layoutAlign = "STRETCH";
                  sval.fills = [{ type: "SOLID", color: valueColor }];
                  svalueFrame.appendChild(sval);
                  svalueFrame.resize(210, Math.max(sval.height, 1));
                  srow.appendChild(slabEl);
                  srow.appendChild(svalueFrame);
                  nestFrame.appendChild(srow);
                }
              }
              var subDgStr = WELLHUB_COMPONENT_REGISTRY.resolveDesignerGuidanceText(sub);
              await appendHandoffDesignerGuidanceBlock(
                nestFrame,
                subDgStr,
                interBold,
                interRegular,
                LIST_ITEM_INNER_WIDTH - 24
              );
            } else {
              var nRead = getStandardAccessibilityText(subType, undefined, subExtras);
              var nText = figma.createText();
              nText.fontSize = 11;
              await setTextCharactersSafe(nText, nRead, interRegular);
              nText.textAutoResize = "HEIGHT";
              nText.layoutAlign = "STRETCH";
              nText.fills = [{ type: "SOLID", color: explanatoryTextColor }];
              nestFrame.appendChild(nText);
              var subDgStd = WELLHUB_COMPONENT_REGISTRY.resolveDesignerGuidanceText(sub);
              await appendHandoffDesignerGuidanceBlock(
                nestFrame,
                subDgStd,
                interBold,
                interRegular,
                LIST_ITEM_INNER_WIDTH - 24
              );
            }

            nestFrame.counterAxisSizingMode = "FIXED";
            nestFrame.resize(LIST_ITEM_INNER_WIDTH, nestFrame.height);
            parentFrame.appendChild(nestFrame);
            await appendNestedListItemsForHandoff(nestFrame, sub.nestedItems, depth + 1);
          }
        }

        for (var idx = 0; idx < listItems.length; idx++) {
          contentFrame.appendChild(createGroupingListDividerLine());

          var listItem = listItems[idx];
          var itemType = listItem.type || "Other";
          var listItemExtras = (listItem.activeTextFields || listItem.rightComponent) ? { activeTextFields: listItem.activeTextFields, rightComponent: listItem.rightComponent } : undefined;
          var isItemCustom = handoffListItemShouldRenderCustomHandoffRows(listItem);

          var itemFrame = figma.createFrame();
          itemFrame.layoutMode = "VERTICAL";
          itemFrame.primaryAxisSizingMode = "AUTO";
          itemFrame.counterAxisSizingMode = "AUTO";
          itemFrame.layoutAlign = "STRETCH";
          itemFrame.itemSpacing = 6;
          itemFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

          var itemHeader = figma.createFrame();
          itemHeader.layoutMode = "HORIZONTAL";
          itemHeader.primaryAxisSizingMode = "AUTO";
          itemHeader.counterAxisSizingMode = "AUTO";
          itemHeader.itemSpacing = 6;
          itemHeader.fills = [];

          var itemIndex = figma.createText();
          itemIndex.fontSize = 10;
          var itemNum = (listItem.globalIndex != null) ? listItem.globalIndex : (idx + 1);
          await setTextCharactersSafe(itemIndex, String(itemNum).padStart(2, "0"), interBold);
          itemIndex.fills = [{ type: "SOLID", color: listContentIndexColor }];

          var itemTypeText = figma.createText();
          itemTypeText.fontSize = 10;
          await setTextCharactersSafe(
            itemTypeText,
            listItem.rightComponent ? itemType + " (Right: " + listItem.rightComponent + ")" : itemType,
            interBold
          );
          itemTypeText.textAutoResize = "HEIGHT";
          itemTypeText.fills = [{ type: "SOLID", color: listItemTitleColor }];

          itemHeader.appendChild(itemIndex);
          itemHeader.appendChild(itemTypeText);

          itemFrame.appendChild(itemHeader);

          if (isItemCustom) {
            for (const key of ["labelAlternative", "supplementary", "feedback"]) {
              var data = listItem.customData[key];
              if (data && data.enabled) {
                var row = figma.createFrame();
                row.layoutMode = "HORIZONTAL";
                row.primaryAxisSizingMode = "AUTO";
                row.counterAxisSizingMode = "AUTO";
                row.layoutAlign = "STRETCH";
                row.itemSpacing = 6;
                row.fills = [];

                var label = figma.createText();
                label.fontSize = 8;
                await setTextCharactersSafe(label, listLabelMap[key], interBold);
                label.textAutoResize = "HEIGHT";

                var listLabelWidth = (key === "supplementary" || key === "feedback") ? 85 : undefined;
                var labelEl = listLabelWidth != null
                  ? (function () {
                      var lf = figma.createFrame();
                      lf.layoutMode = "HORIZONTAL";
                      lf.primaryAxisSizingMode = "AUTO";
                      lf.counterAxisSizingMode = "FIXED";
                      lf.fills = [];
                      lf.appendChild(label);
                      lf.resize(listLabelWidth, Math.max(label.height, 14));
                      return lf;
                    })()
                  : label;

                var valueFrame = figma.createFrame();
                valueFrame.layoutMode = "VERTICAL";
                valueFrame.primaryAxisSizingMode = "AUTO";
                valueFrame.counterAxisSizingMode = "FIXED";
                valueFrame.fills = [];
                valueFrame.clipsContent = false;
                valueFrame.resize(210, 1);

                var value = figma.createText();
                value.fontSize = 10;
                await setTextCharactersSafe(
                  value,
                  typeof data.text === "string" ? data.text : String(data.text || ""),
                  interRegular
                );
                value.textAutoResize = "HEIGHT";
                value.layoutAlign = "STRETCH";
                value.fills = [{ type: "SOLID", color: valueColor }];

                valueFrame.appendChild(value);
                valueFrame.resize(210, Math.max(value.height, 1));

                row.appendChild(labelEl);
                row.appendChild(valueFrame);
                itemFrame.appendChild(row);
              }
            }
            var listDgStr = WELLHUB_COMPONENT_REGISTRY.resolveDesignerGuidanceText(listItem);
            await appendHandoffDesignerGuidanceBlock(
              itemFrame,
              listDgStr,
              interBold,
              interRegular,
              LIST_ITEM_INNER_WIDTH - 24
            );
          } else {
            var reading = getStandardAccessibilityText(itemType, undefined, listItemExtras);
            var itemReading = figma.createText();
            itemReading.fontSize = 12;
            await setTextCharactersSafe(itemReading, reading, interRegular);
            itemReading.textAutoResize = "HEIGHT";
            itemReading.layoutAlign = "STRETCH";
            itemReading.fills = [{ type: "SOLID", color: explanatoryTextColor }];

            itemFrame.appendChild(itemReading);
            var listDgStd = WELLHUB_COMPONENT_REGISTRY.resolveDesignerGuidanceText(listItem);
            await appendHandoffDesignerGuidanceBlock(
              itemFrame,
              listDgStd,
              interBold,
              interRegular,
              LIST_ITEM_INNER_WIDTH - 24
            );
          }

          if (listItem.nestedItems && listItem.nestedItems.length) {
            await appendNestedListItemsForHandoff(itemFrame, listItem.nestedItems, 0);
          }

          itemFrame.counterAxisSizingMode = "FIXED";
          itemFrame.resize(LIST_ITEM_INNER_WIDTH, itemFrame.height);
          contentFrame.appendChild(itemFrame);
        }
      } else if (WELLHUB_COMPONENT_REGISTRY.shouldUseCustomHandoffRendering(comp) && comp.customData) {
        await appendContainerCustomHandoff(contentFrame, comp);
      } else {
        const standardText = figma.createText();
        standardText.fontSize = 12;
        const headingVariants = comp.headingVariants;
        await setTextCharactersSafe(
          standardText,
          getStandardAccessibilityText(typeName, headingVariants),
          interRegular
        );
        standardText.textAutoResize = "HEIGHT";
        standardText.layoutAlign = "STRETCH";
        standardText.fills = [{ type: "SOLID", color: explanatoryTextColor }];
        contentFrame.appendChild(standardText);
        var dgStd = WELLHUB_COMPONENT_REGISTRY.resolveDesignerGuidanceText(comp);
        await appendHandoffDesignerGuidanceBlock(
          contentFrame,
          dgStd,
          interBold,
          interRegular,
          BODY_INNER_WIDTH - 32
        );
      }

      compFrame.appendChild(headerComp);
      compFrame.appendChild(contentFrame);

      contentFrame.counterAxisSizingMode = "FIXED";
      contentFrame.resize(BODY_INNER_WIDTH, contentFrame.height);
      compFrame.counterAxisSizingMode = "FIXED";
      compFrame.resize(BODY_INNER_WIDTH, compFrame.height);
      bodyFrame.appendChild(compFrame);
    }
  }

  bodyFrame.counterAxisSizingMode = "FIXED";
  bodyFrame.resize(CARD_WIDTH, bodyFrame.height);
  cardFrame.appendChild(bodyFrame);

  cardFrame.resize(CARD_WIDTH, bodyFrame.height);

  placeAccessibilityHandoffToRightOfScanRoot(
    cardFrame,
    payload && payload.scanRootId
  );
}

function traverse(node, callback) {
  if (!isEffectivelyVisible(node)) return;
  if (isHandoffReportableNode(node) && isScannableHandoffNode(node)) {
    callback(node);
  }
  forEachChildInFrameOrder(node, function (child) {
    traverse(child, callback);
  });
}

/**
 * Orders Heading variants by reading order: back-button (left) → text/headline → action-button (right).
 */
function orderHeadingVariants(variants) {
  if (!variants || variants.length === 0) return [];
  var back = [];
  var text = [];
  var action = [];
  for (var i = 0; i < variants.length; i++) {
    var v = String(variants[i]).toLowerCase().replace(/\s+/g, " ").trim();
    if (v.indexOf("back") >= 0 && (v.indexOf("button") >= 0 || v.indexOf("btn") >= 0)) {
      back.push(variants[i]);
    } else if (v.indexOf("action") >= 0 && (v.indexOf("button") >= 0 || v.indexOf("btn") >= 0)) {
      action.push(variants[i]);
    } else if (v.indexOf("headline") >= 0 || v.indexOf("title") >= 0 || v.indexOf("text") >= 0 || v.indexOf("titulo") >= 0) {
      text.push(variants[i]);
    } else {
      text.push(variants[i]);
    }
  }
  var out = [];
  for (var j = 0; j < back.length; j++) out.push(back[j]);
  for (var k = 0; k < text.length; k++) out.push(text[k]);
  for (var l = 0; l < action.length; l++) out.push(action[l]);
  return out;
}

/**
 * Returns the default accessibility text for each component type.
 * headingVariants: array of active variant names (Heading).
 * listItemExtras: { activeTextFields } for List items with active overtitle/title/subtitle/tag.
 */
function getStandardAccessibilityText(typeName, headingVariants, listItemExtras) {
  const t = typeName || "Component";
  const appendListFields = function (base) {
    if (listItemExtras && listItemExtras.activeTextFields && listItemExtras.activeTextFields.length) {
      return base + " Active text fields in order: " + listItemExtras.activeTextFields.join(", ") + ".";
    }
    return base;
  };
  if (t === "Search Bar") {
    return "Search Bar element, read as an editable text field with its current query.";
  }
  if (t === "Text Headline" || t === "Text Body") {
    return appendListFields("Text element, read exactly as the interface.");
  }
  if (
    t === "Button" ||
    t === "Buttons" ||
    t === "Button Primary" ||
    t === "Button Secondary" ||
    t === "Button Link"
  ) {
    return appendListFields("Button element, read exactly as the interface/label.");
  }
  if (t === "Heading" || t === "Heading • Grouping") {
    if (headingVariants && headingVariants.length > 0) {
      // Reading order: back-button (left) → text/headline → action-button (right)
      var ordered = orderHeadingVariants(headingVariants);
      var list = ordered.join(", ");
      return "Heading element. In this variant, the following are active (read in this order): " + list + ". If back-button is active, the icon is on the left; then the text/headline; if action-button is active, it appears after the text.";
    }
    return "Heading element. Items are read separately: back button (left) if present, then text/headline, then action button (right) if present. Read in order from left to right, top to bottom.";
  }
  if (t === "Section Title" || t === "Section Title • Grouping") {
    if (headingVariants && headingVariants.length > 0) {
      var stOrdered = orderHeadingVariants(headingVariants);
      return (
        "Section title element. In this variant, the following are active (read in this order): " +
        stOrdered.join(", ") +
        ". Read headline, body, and action only when present in the interface."
      );
    }
    return "Section title element. Read headline, body, and action in order from left to right, top to bottom, only for items present in the interface.";
  }
  if (t === "Input" || t === "Input/Text") {
    return "Input element for text and typography. Read as an editable field with its label and current value.";
  }
  if (t === "Stepper") {
    return "Stepper element. Read with current value and controls to increase or decrease (e.g. for numbers or steps).";
  }
  if (t === "Progress Bar") {
    return "Progress bar element, read with current value and state.";
  }
  if (t === "Checkbox" || t === "Switch") {
    return appendListFields(t + " element, read with label and state (checked/unchecked, on/off).");
  }
  if (t === "Radio Button") {
    return appendListFields("Radio Button element, read with label and state (selected/unselected).");
  }
  if (t === "SnackBar" || t === "Snackbar" || t === "Snackbar • Grouping") {
    return "SnackBar element, read as notification with message and action if present.";
  }
  if (t === "Loader") {
    return "Loader element. Provide measurable feedback on loading status and completion.";
  }
  if (t === "QR Code") {
    return "QR Code element, read with accessible label describing its purpose.";
  }
  if (t === "Feedback") {
    return "Feedback element, read with message and state as shown in the interface.";
  }
  if (t === "Result List") {
    return "Result List element. Read each result item in order.";
  }
  if (t === "Banner" || t === "Banner • Grouping") {
    return "Banner element, read with message and actions as shown in the interface.";
  }
  if (t === "Bottom Sheet") {
    return "Bottom Sheet element, read with content and actions as shown in the interface.";
  }
  if (t === "Footer Card") {
    return "Footer Card element, read with content and actions as shown in the interface.";
  }
  if (t === "Accordion" || t === "Accordion • Grouping") {
    return "Accordion element. Read header and expandable content in order.";
  }
  if (t === "Text Field" || t === "Text Field • Grouping") {
    return "Text Field element. Read label, value, helper text, and action as shown in the interface.";
  }
  if (t === "Section Title") {
    return "Section title element, read as heading or label for the section.";
  }
  if (t === "List") {
    return "Announces to screen readers the total number of items and the position of each item in the list.";
  }
  if (t === "Grouping") {
    return "Elements are read sequentially, automatically and without and no time limit. Inform the position in the list.";
  }
  if (t && t.indexOf("• Grouping") >= 0) {
    return "Grouping element that groups related components. Read each child component in order.";
  }
  if (t === "Ordered list") {
    return "Announces list and item positions. Read each list item in order with its position.";
  }
  if (t === "Tag" || t === "Tags") {
    return appendListFields("Tag element. Read each tag with its label. Used for categorization or selection.");
  }
  if (t === "Chips") {
    return appendListFields("Chips element. Read each chip with its label. Used for selection, filtering or multi-choice.");
  }
  if (t === "Rating") {
    return "Rating element. Read with current value (e.g. stars or score) and optionally the scale (e.g. out of 5).";
  }
  return appendListFields(t + " element, read exactly as the interface/label.");
}

/** Text Headline a partir de 20px; abaixo disso → Text Body. */
const TYPO_HEADLINE_MIN_PX = 20;
const TYPO_BODY_MIN_PX = 10;
const TYPO_BODY_MAX_PX = 16;

/**
 * Map measured font size to Text Body / Text Headline (weight-independent).
 * 20px ou mais (arredondado) → Text Headline; menor → Text Body.
 */
function classifyTypographyFromSizePx(px) {
  if (px == null || typeof px !== "number" || !(px > 0)) return null;
  var rounded = Math.round(px);
  if (rounded >= TYPO_HEADLINE_MIN_PX) return "Text Headline";
  return "Text Body";
}

/** Tamanho medido no canvas prevalece sobre o nome da biblioteca. */
function reconcileTextComponentTypeFromCanvas(node, matchedType) {
  if (matchedType !== "Text Headline" && matchedType !== "Text Body") return matchedType;
  var px = getFontSizeFromNode(node);
  if (px == null) return matchedType;
  var fromSize = classifyTypographyFromSizePx(px);
  return fromSize || matchedType;
}

/**
 * Whether to emit a standalone typography card for this TEXT (avoids noise on tiny non-DS strings).
 */
function shouldReportStandaloneTypography(node, fontSize) {
  if (fontSize == null || typeof fontSize !== "number" || fontSize < 8) return false;
  var rounded = Math.round(fontSize);
  if (isInterFont(node)) return true;
  if (rounded >= TYPO_HEADLINE_MIN_PX) return true;
  if (rounded >= TYPO_BODY_MIN_PX && rounded <= TYPO_BODY_MAX_PX) return true;
  if (rounded > TYPO_BODY_MAX_PX && rounded < TYPO_HEADLINE_MIN_PX) return true;
  return false;
}

/**
 * Estimate when fontSize is not exposed (mixed styles or missing API value).
 * Uses a slightly conservative divisor so tight line-heights do not undershoot large type.
 */
function approximateFontSizeFromTextBounds(node) {
  if (!node || node.type !== "TEXT") return null;
  try {
    var box = node.absoluteBoundingBox;
    if (!box || typeof box.height !== "number") return null;
    var raw = node.characters || "";
    var lines = Math.max(1, raw.split(/\r?\n/).length);
    var perLinePx = box.height / lines;
    var est = perLinePx / 1.22;
    if (est >= 8 && est <= 160) return est;
  } catch (e) {}
  return null;
}

/**
 * Font size for a TEXT node: max across styled segments, single number, or mixed text ranges.
 */
function getFontSizeForTextNode(node) {
  if (!node || node.type !== "TEXT") return null;
  try {
    if (typeof node.getStyledTextSegments === "function") {
      var segments = node.getStyledTextSegments(["fontSize"]);
      var maxSeg = 0;
      for (var si = 0; si < segments.length; si++) {
        var f = segments[si].fontSize;
        if (typeof f === "number" && f > maxSeg) maxSeg = f;
      }
      if (maxSeg > 0) return maxSeg;
    }

    var fs = node.fontSize;
    if (typeof fs === "number") return fs;
    if (fs === figma.mixed && node.characters && node.characters.length > 0) {
      var max = 0;
      var len = node.characters.length;
      var step = len > 800 ? Math.ceil(len / 800) : 1;
      for (var i = 0; i < len; i += step) {
        if (typeof node.getRangeFontSize === "function") {
          var end = Math.min(i + step, len);
          var sz = node.getRangeFontSize(i, end);
          if (typeof sz === "number" && sz > max) max = sz;
        }
      }
      if (max > 0) return max;
    }

    var approx = approximateFontSizeFromTextBounds(node);
    if (approx != null) return approx;
  } catch (e) {}
  return null;
}

/**
 * Max fontSize among all visible TEXT nodes in the subtree.
 * The first TEXT in a tree is often a small label; using max avoids misclassifying a larger title as Body.
 */
function getFontSizeFromNode(node) {
  if (!isEffectivelyVisible(node)) return null;
  var max = null;
  if (node.type === "TEXT") {
    var s = getFontSizeForTextNode(node);
    if (s != null) max = s;
  }
  if ("children" in node) {
    for (var i = 0; i < node.children.length; i++) {
      var v = getFontSizeFromNode(node.children[i]);
      if (v != null && (max == null || v > max)) max = v;
    }
  }
  return max;
}

/**
 * Returns true if any sampled run uses the Inter family (handles figma.mixed fontName).
 */
function isInterFont(node) {
  if (node.type !== "TEXT") return false;
  try {
    var fn = node.fontName;
    if (fn === figma.mixed && node.characters && node.characters.length > 0 && node.getRangeFontName) {
      var raw = node.characters;
      var len = raw.length;
      var idxs = [0, Math.floor(len / 2), len - 1];
      for (var ii = 0; ii < idxs.length; ii++) {
        var idx = idxs[ii];
        if (idx < 0 || idx >= len) continue;
        var rf = node.getRangeFontName(idx, Math.min(idx + 1, len));
        if (rf && rf.family === "Inter") return true;
      }
      return false;
    }
    if (typeof fn === "object" && fn !== null && fn.family) {
      return fn.family === "Inter";
    }
    if (node.characters && node.characters.length > 0 && node.getRangeFontName) {
      var rangeFont = node.getRangeFontName(0, 1);
      return rangeFont && rangeFont.family === "Inter";
    }
  } catch (e) {
    // ignore
  }
  return false;
}

/**
 * Maps a List item's Right Component variant value to an item type.
 * Radio button/Checkbox → keep. Icon/Chevron → Buttons. Title/Text/Tag → respective types.
 */
function mapListRightComponentToType(value) {
  if (!value || typeof value !== "string") return null;
  const v = value.toLowerCase().trim().replace(/\s+/g, " ");
  if (v.includes("radio")) return "Radio Button";
  if (v.includes("checkbox") || v.includes("check box")) return "Checkbox";
  if (v.includes("icon")) return "Button";
  if (v.includes("chevron")) return "Button";
  if (v === "title") return "Text Headline";
  if (v === "text") return "Text Body";
  if (v.includes("tag")) return "Tag";
  return null;
}

/**
 * Extracts Right Component and active text fields (overtitle, title, subtitle, tag)
 * from componentProperties or variantProperties of a List item instance.
 */
function getListItemProperties(instanceNode) {
  const result = { rightComponent: null, activeTextFields: [] };
  if (!instanceNode || instanceNode.type !== "INSTANCE") return result;

  const textFieldKeys = ["overtitle", "title", "subtitle", "tag"];
  const onValues = ["on", "true", "yes", "show", "1"];
  const rightComponentKeys = ["right component", "rightcomponent"];

  function readProps(props) {
    if (!props || typeof props !== "object") return;
    for (const key in props) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
      const keyLower = key.toLowerCase().replace(/#[\w:]+/g, "").trim();
      const raw = props[key];
      const value = (raw && typeof raw === "object" && "value" in raw) ? raw.value : raw;
      const strVal = String(value || "").toLowerCase().trim();

      if (rightComponentKeys.some((r) => keyLower.includes(r))) {
        result.rightComponent = value;
        continue;
      }
      if (textFieldKeys.includes(keyLower) && (onValues.includes(strVal) || (strVal && !["off", "false", "no", "none", "hide"].includes(strVal)))) {
        result.activeTextFields.push(keyLower);
      }
    }
  }

  if ("componentProperties" in instanceNode && instanceNode.componentProperties) {
    readProps(instanceNode.componentProperties);
  }
  if ("variantProperties" in instanceNode && instanceNode.variantProperties) {
    readProps(instanceNode.variantProperties);
  }
  return result;
}

/**
 * Maps a node name (library name in Figma) into one of the supported component types.
 * Registry preset + regras legadas de Text Headline / Text Body.
 */
function getComponentTypeFromName(name) {
  var raw = (name || "").trim();
  if (!raw) return null;

  var normalized = WELLHUB_COMPONENT_REGISTRY.normalizeComponentName(raw);
  if (!normalized) return null;

  var registryType = WELLHUB_COMPONENT_REGISTRY.lookupRegistryTypeName(raw);
  if (registryType) return registryType;

  var one = normalized.split(" ")[0];

  if (one === "tag" || one === "tags" || normalized === "tag" || normalized === "tags") {
    return "Tag";
  }

  if (
    one === "headline" ||
    one === "title" ||
    one === "titulo" ||
    one === "título"
  ) {
    return "Text Headline";
  }
  if (one === "h1" || one === "h2" || one === "h3") return "Text Headline";
  if (one === "body") return "Text Body";
  if (one === "text") {
    if (normalized.indexOf("headline") >= 0) return "Text Headline";
    if (normalized.indexOf("input") >= 0 || normalized.indexOf("field") >= 0) {
      return null;
    }
    if (normalized.indexOf("button") >= 0) return "Button";
    return "Text Body";
  }

  if (one === "secondary") return "Button";
  if (one === "link") return "Button";
  if (one === "button" || one === "btn" || one === "buttom") {
    if (normalized.indexOf("secondary") >= 0) return "Button";
    if (normalized.indexOf("link") >= 0) return "Button";
    return "Button";
  }

  if (normalized.indexOf("divider") >= 0) return null;
  if (normalized.indexOf("switch") >= 0 || normalized.indexOf("toggle") >= 0) {
    return "Switch";
  }
  if (normalized.indexOf("radio") >= 0) return "Radio Button";

  var isButtonLike =
    normalized.indexOf("button") >= 0 ||
    normalized.indexOf("buttom") >= 0 ||
    normalized.indexOf(" btn ") >= 0 ||
    normalized.indexOf("btn ") === 0 ||
    normalized.lastIndexOf(" btn") === normalized.length - 4 ||
    normalized === "btn" ||
    normalized.indexOf("cta") >= 0 ||
    normalized.indexOf("botao") >= 0 ||
    normalized.indexOf("botão") >= 0 ||
    normalized.indexOf("login") >= 0 ||
    normalized.indexOf("sign in") >= 0 ||
    normalized.indexOf("signin") >= 0 ||
    normalized.indexOf("entrar") >= 0 ||
    normalized.indexOf("submit") >= 0 ||
    normalized.indexOf("enviar") >= 0 ||
    normalized.indexOf("confirmar") >= 0;

  if (isButtonLike) {
    if (
      normalized.indexOf("tertiary") < 0 &&
      normalized.indexOf("ghost") < 0 &&
      normalized.indexOf("disabled") < 0
    ) {
      return "Button";
    }
  }

  if (normalized.indexOf("checkbox") >= 0 || normalized.indexOf("remember") >= 0) {
    return "Checkbox";
  }

  if (
    normalized === "headline" ||
    normalized === "title" ||
    normalized === "titulo" ||
    normalized === "título" ||
    normalized.indexOf("text headline") >= 0 ||
    normalized.indexOf("text title") >= 0 ||
    (normalized.indexOf("headline") >= 0 && normalized.indexOf("text") >= 0) ||
    (normalized.indexOf("title") >= 0 && normalized.indexOf("text") >= 0) ||
    (normalized.indexOf("titulo") >= 0 && normalized.indexOf("text") >= 0) ||
    (normalized.indexOf("título") >= 0 && normalized.indexOf("text") >= 0)
  ) {
    return "Text Headline";
  }

  if (
    normalized === "text body" ||
    normalized.indexOf("text body") >= 0 ||
    (normalized.indexOf("body") >= 0 && normalized.indexOf("text") >= 0) ||
    normalized.indexOf("label") >= 0 ||
    normalized.indexOf("error") >= 0 ||
    normalized.indexOf("message") >= 0 ||
    normalized.indexOf("alert") >= 0 ||
    normalized.indexOf("hint") >= 0
  ) {
    return "Text Body";
  }

  if (
    normalized.indexOf("decorative image") >= 0 ||
    (normalized.indexOf("decorative") >= 0 && normalized.indexOf("image") >= 0) ||
    normalized.indexOf("avatar") >= 0 ||
    one === "image" ||
    one === "img" ||
    one === "logo" ||
    normalized.indexOf("gradient background") >= 0 ||
    (normalized.indexOf("gradient") >= 0 && normalized.indexOf("background") >= 0)
  ) {
    return "Decorative Image";
  }

  var generic = ["instance", "frame", "rectangle", "ellipse", "component", "vector", "shape"];
  if (
    generic.indexOf(normalized) >= 0 ||
    /^(frame|rectangle|ellipse|component)\s*\d+$/.test(normalized)
  ) {
    return null;
  }

  return null;
}

async function resolveNodeMatchedType(node) {
  var names = await getInstanceLookupNames(node);
  var localName = names.localName;
  var mainName = names.mainName;

  if (isInstanceLikeNode(node)) {
    var slotType =
      resolveHeadingSlotButtonType(localName) ||
      resolveHeadingSlotButtonType(mainName);
    if (slotType) return slotType;
  }

  // Instâncias: identidade do componente na biblioteca (main / set) antes de heurísticas do layer.
  if (isInstanceLikeNode(node)) {
    var registryType = resolveRegistryTypeFromNames(
      localName,
      mainName,
      names.setName
    );
    if (registryType) {
      if (registryType === "Text Headline" || registryType === "Text Body") {
        return reconcileTextComponentTypeFromCanvas(node, registryType);
      }
      return registryType;
    }
  }

  var typeLocal = getComponentTypeFromName(localName);
  var typeMain = mainName ? getComponentTypeFromName(mainName) : null;
  var matchedType = typeLocal != null ? typeLocal : typeMain;
  if (matchedType == null && mainName && mainName !== localName) {
    matchedType = typeMain;
  }
  if (matchedType == null) {
    matchedType = resolveRegistryTypeFromNames(
      localName,
      mainName,
      names.setName
    );
  }
  if ((typeLocal === "Text Body" || typeLocal == null) && typeMain === "Text Headline") {
    matchedType = reconcileTextComponentTypeFromCanvas(node, "Text Headline");
  }
  if (matchedType === "Text Headline" || matchedType === "Text Body") {
    matchedType = reconcileTextComponentTypeFromCanvas(node, matchedType);
  }
  return matchedType;
}
