/**
 * Writing Guidelines UI — overview, detail, drawer, and label apply actions.
 */
(function (root) {
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
  ];

  var ICON_BACK =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path fill="currentColor" d="M8.043 7.043c.39-.39 1.024-.39 1.414 0 .39.391.39 1.024 0 1.414L6.914 11H20c.552 0 1 .448 1 1s-.448 1-1 1H6.914l2.543 2.543c.39.39.39 1.024 0 1.414s-1.024.39-1.414 0l-4.25-4.25a1 1 0 0 1 0-1.414z"/>' +
    "</svg>";

  var ICON_HAMBURGER =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.75 -0.75 24 24" width="22" height="22" aria-hidden="true">' +
    '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.763 6.599H1.182M21.317 6.599H9.381M13.119 16.025H1.182M21.317 16.025h-3.58"/>' +
    '<path stroke="currentColor" stroke-width="1.5" d="M4.763 6.469a2.309 2.309 0 1 0 4.618 0 2.309 2.309 0 1 0-4.618 0M13.119 16.028a2.309 2.309 0 1 0 4.618 0 2.309 2.309 0 1 0-4.618 0"/>' +
    "</svg>";

  var ICON_CHEVRON =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">' +
    '<path fill="currentColor" fill-rule="evenodd" d="M.961 5.764a.595.595 0 0 0-.301.815l9.162 8.531c.355.248.804.273 1.21.078.135-.065.428-.352 4.439-4.36 3.144-3.14 4.311-4.32 4.356-4.401a.595.595 0 0 0-.066-.56.595.595 0 0 0-.335-.292.595.595 0 0 0-.482.045l-2.68 1.883L10 14.279l-4.218-4.215C3.461 7.745 1.524 5.825 1.477 5.797a.595.595 0 0 0-.516-.033"/>' +
    "</svg>";

  var ICON_INFO =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="wg-aria-info-icon">' +
    '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>' +
    '<path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 8v.01M12 12v4"/>' +
    "</svg>";

  function createBackButton(ariaLabel, onClick) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "wg-back-btn";
    btn.setAttribute("aria-label", ariaLabel);
    btn.innerHTML = ICON_BACK;
    btn.onclick = onClick;
    return btn;
  }

  function getLabelText(labels, fieldKey) {
    if (!labels) return null;
    var value = labels[fieldKey];
    if (value == null || value === "") return null;
    return String(value);
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
        "Writing Guidelines data is missing. Reload the plugin and verify writing-guidelines-data.js is in the plugin folder."
      );
    }

    closePortaledUiMenu();
    app.innerHTML = "";

    var view = "overview";
    var selectedIndex = 0;
    var drawerOpen = false;
    var openUseCaseIndices = new Set();

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

    var overviewTitle = document.createElement("h1");
    overviewTitle.className = "wg-overview-title";
    overviewTitle.textContent = "Writing Guidelines";

    var overviewSubtitle = document.createElement("p");
    overviewSubtitle.className = "wg-overview-subtitle";
    overviewSubtitle.textContent =
      "Select a component type to explore standard labels and accessibility guidelines";

    overviewHeading.appendChild(overviewTitle);
    overviewHeading.appendChild(overviewSubtitle);

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
    hamburger.innerHTML = ICON_HAMBURGER;

    drawerHeader.appendChild(drawerTitle);
    drawerHeader.appendChild(drawerCloseBtn);
    drawer.appendChild(drawerHeader);
    drawer.appendChild(drawerList);

    function setDrawer(open) {
      drawerOpen = open;
      overlay.classList.toggle("open", drawerOpen);
      drawer.classList.toggle("open", drawerOpen);
    }

    function resetDetailState() {
      openUseCaseIndices = new Set();
    }

    function goToOverview() {
      view = "overview";
      selectedIndex = 0;
      resetDetailState();
      setDrawer(false);
      render();
    }

    function goToDetail(index) {
      view = "detail";
      selectedIndex = index;
      resetDetailState();
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

      var stats =
        typeof getWritingGuidelinesStats === "function"
          ? getWritingGuidelinesStats(components)
          : {
              totalComponents: components.length,
              totalUseCases: components.reduce(function (total, component) {
                return total + ((component.useCases && component.useCases.length) || 0);
              }, 0),
            };
      var statsCard = document.createElement("div");
      statsCard.className = "wg-stats-card";

      var statsTitle = document.createElement("h2");
      statsTitle.className = "wg-stats-title";
      statsTitle.textContent = "Component Coverage";

      var statsGrid = document.createElement("div");
      statsGrid.className = "wg-stats-grid";

      var statItems = [
        {
          value: String(stats.totalComponents),
          label: "Components",
          colorClass: "wg-stat-value--blue",
        },
        {
          value: String(stats.totalUseCases),
          label: "Use Cases",
          colorClass: "wg-stat-value--purple",
        },
      ];

      statItems.forEach(function (item) {
        var wrap = document.createElement("div");
        wrap.className = "wg-stat-item";

        var num = document.createElement("div");
        num.className = "wg-stat-value " + item.colorClass;
        num.textContent = item.value;

        var label = document.createElement("div");
        label.className = "wg-stat-label";
        label.textContent = item.label;

        wrap.appendChild(num);
        wrap.appendChild(label);
        statsGrid.appendChild(wrap);
      });

      statsCard.appendChild(statsTitle);
      statsCard.appendChild(statsGrid);
      content.appendChild(statsCard);
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

      var typeHeader = document.createElement("div");
      typeHeader.className = "wg-detail-type-header";

      var typeTitle = document.createElement("h2");
      typeTitle.className = "wg-detail-type-title";
      typeTitle.textContent = selected.name;

      typeHeader.appendChild(typeTitle);
      content.appendChild(typeHeader);

      var list = document.createElement("div");
      list.className = "wg-usecase-list";

      (selected.useCases || []).forEach(function (useCase, idx) {
        var card = document.createElement("div");
        card.className =
          "wg-usecase-card" + (openUseCaseIndices.has(idx) ? " open" : "");

        var headerBtn = document.createElement("button");
        headerBtn.type = "button";
        headerBtn.className = "wg-usecase-header";
        headerBtn.setAttribute(
          "aria-expanded",
          openUseCaseIndices.has(idx) ? "true" : "false"
        );

        var headerText = document.createElement("div");
        headerText.className = "wg-usecase-header-text";

        var titleEl = document.createElement("p");
        titleEl.className = "wg-usecase-title";
        titleEl.textContent = useCase.title;

        var subtitleEl = document.createElement("p");
        subtitleEl.className = "wg-usecase-subtitle";
        subtitleEl.textContent = useCase.description || "";

        headerText.appendChild(titleEl);
        headerText.appendChild(subtitleEl);

        var chevron = document.createElement("span");
        chevron.className = "wg-usecase-chevron";
        chevron.innerHTML = ICON_CHEVRON;

        headerBtn.appendChild(headerText);
        headerBtn.appendChild(chevron);

        var body = document.createElement("div");
        body.className = "wg-usecase-body";

        var ariaList = document.createElement("div");
        ariaList.className = "wg-aria-list";

        LABEL_FIELDS.forEach(function (field) {
          ariaList.appendChild(buildAriaButton(useCase.labels, field));
        });

        body.appendChild(ariaList);

        headerBtn.onclick = function () {
          if (openUseCaseIndices.has(idx)) {
            openUseCaseIndices.delete(idx);
          } else {
            openUseCaseIndices.add(idx);
          }
          renderDetailContent();
        };

        card.appendChild(headerBtn);
        card.appendChild(body);
        list.appendChild(card);
      });

      content.appendChild(list);
    }

    function renderHeader() {
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
    app.appendChild(overlay);
    app.appendChild(drawer);

    render();
  }

  root.mountWritingGuidelinesUI = mountWritingGuidelinesUI;
})(
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
      ? self
      : this
);
