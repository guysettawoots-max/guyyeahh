document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* ========================================
       ACCESSIBILITY FOUNDATION
    ======================================== */

    function setupAccessibility() {


      /* ======================================
         ACCESSIBILITY STYLES
      ====================================== */

      const accessibilityStyle =
        document.createElement("style");


      accessibilityStyle.textContent = `

        /* SKIP LINK */

        .skip-link {
          position: fixed;

          top: 12px;
          left: 12px;

          z-index: 99999;

          padding: 12px 16px;

          border: 1px solid #111111;

          background: #ffffff;
          color: #111111;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 12px;

          text-decoration: none;

          transform:
            translateY(-200%);

          transition:
            transform 0.15s ease;
        }


        .skip-link:focus {
          transform:
            translateY(0);
        }



        /* KEYBOARD FOCUS */

        a:focus-visible,
        button:focus-visible,
        [tabindex]:focus-visible {
          outline:
            2px solid #111111;

          outline-offset:
            4px;
        }



        /* MAIN CONTENT FOCUS */

        #main-content:focus {
          outline: none;
        }



        /* SCREEN READER ONLY */

        .sr-only {
          position: absolute !important;

          width: 1px !important;
          height: 1px !important;

          padding: 0 !important;
          margin: -1px !important;

          overflow: hidden !important;

          clip:
            rect(
              0,
              0,
              0,
              0
            ) !important;

          white-space:
            nowrap !important;

          border: 0 !important;
        }

      `;


      document.head.appendChild(
        accessibilityStyle
      );



      /* ======================================
         MAIN CONTENT
      ====================================== */

      const mainContent =
        document.querySelector("main");


      if (mainContent) {


        if (!mainContent.id) {

          mainContent.id =
            "main-content";

        }


        mainContent.setAttribute(
          "tabindex",
          "-1"
        );



        /* ==================================
           SKIP LINK
        ================================== */

        const skipLink =
          document.createElement("a");


        skipLink.className =
          "skip-link";


        skipLink.href =
          "#main-content";


        skipLink.textContent =
          "SKIP TO CONTENT";


        document.body.insertBefore(
          skipLink,
          document.body.firstChild
        );


        skipLink.addEventListener(
          "click",
          function () {


            window.setTimeout(
              function () {

                mainContent.focus();

              },
              0
            );


          }
        );


      }



      /* ======================================
         NAVIGATION LABEL
      ====================================== */

      const primaryNavigation =
        document.querySelector(
          ".navigation"
        );


      if (primaryNavigation) {

        primaryNavigation.setAttribute(
          "aria-label",
          "Primary navigation"
        );

      }


    }



    setupAccessibility();



    /* ========================================
       MAIN ELEMENTS
    ======================================== */

    const navigation =
      document.querySelector(
        ".navigation"
      );


    const mainMenu =
      document.querySelector(
        ".menu"
      );


    const menuItems =
      Array.from(
        document.querySelectorAll(
          ".menu-item"
        )
      );



    /* ========================================
       MOBILE MENU
    ======================================== */

    let mobileMenuButton = null;



    if (
      navigation &&
      mainMenu
    ) {


      mainMenu.id =
        "site-menu";



      mobileMenuButton =
        document.createElement(
          "button"
        );


      mobileMenuButton.className =
        "mobile-menu-toggle";


      mobileMenuButton.type =
        "button";


      mobileMenuButton.setAttribute(
        "aria-controls",
        "site-menu"
      );


      mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
      );


      mobileMenuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
      );


      mobileMenuButton.textContent =
        "MENU";


      navigation.insertBefore(
        mobileMenuButton,
        mainMenu
      );



      function setMobileMenu(open) {


        navigation.classList.toggle(
          "mobile-menu-open",
          open
        );


        mobileMenuButton.setAttribute(
          "aria-expanded",
          open
            ? "true"
            : "false"
        );


        mobileMenuButton.setAttribute(
          "aria-label",
          open
            ? "Close navigation menu"
            : "Open navigation menu"
        );


        mobileMenuButton.textContent =
          open
            ? "CLOSE"
            : "MENU";


      }



      mobileMenuButton.addEventListener(
        "click",
        function () {


          const isOpen =
            navigation.classList.contains(
              "mobile-menu-open"
            );


          setMobileMenu(
            !isOpen
          );


        }
      );



      /* ======================================
         CLOSE AFTER NORMAL LINK
      ====================================== */

      mainMenu.addEventListener(
        "click",
        function (event) {


          const link =
            event.target.closest(
              "a"
            );


          if (
            link &&
            window.matchMedia(
              "(max-width: 760px)"
            ).matches
          ) {

            setMobileMenu(
              false
            );

          }


        }
      );



      /* ======================================
         RETURN TO DESKTOP
      ====================================== */

      window.addEventListener(
        "resize",
        function () {


          if (
            window.matchMedia(
              "(min-width: 761px)"
            ).matches
          ) {

            setMobileMenu(
              false
            );

          }


        }
      );



      /* ======================================
         ESCAPE
      ====================================== */

      document.addEventListener(
        "keydown",
        function (event) {


          if (
            event.key ===
            "Escape"
          ) {

            setMobileMenu(
              false
            );

          }


        }
      );


    }



    /* ========================================
       ??? NAVIGATION
    ======================================== */

    let chaosNav =
      document.querySelector(
        "[data-chaos-nav]"
      );



    if (!chaosNav) {


      chaosNav =
        menuItems.find(
          function (item) {


            const text =
              item
                .textContent
                .trim();


            return (
              text === "PLAY" ||
              text === "???"
            );


          }
        );


    }



    if (chaosNav) {


      chaosNav.href =
        "unknown.html";


      chaosNav.classList.add(
        "chaos-nav"
      );


      chaosNav.setAttribute(
        "data-chaos-nav",
        ""
      );


      chaosNav.setAttribute(
        "data-text",
        "???"
      );


      chaosNav.innerHTML =
        '<span class="chaos-nav-text">???</span>';



      /* CURRENT PAGE */

      if (
        document.body.classList.contains(
          "chaos-page-body"
        )
      ) {

        chaosNav.classList.add(
          "active"
        );

      }



      /* ======================================
         GLITCH WORDS
      ====================================== */

      const chaosWords = [

        "???",
        "404",
        "VOID",
        "PLAY?",
        "NOPE",
        "!!!",
        "???"

      ];


      const chaosNavText =
        chaosNav.querySelector(
          ".chaos-nav-text"
        );


      let chaosGlitchTimer =
        null;



      function setChaosWord(
        word
      ) {


        chaosNavText.textContent =
          word;


        chaosNav.setAttribute(
          "data-text",
          word
        );


      }



      function startChaosGlitch() {


        if (chaosGlitchTimer) {
          return;
        }


        chaosNav.classList.add(
          "is-glitching"
        );


        chaosGlitchTimer =
          window.setInterval(
            function () {


              const randomIndex =
                Math.floor(
                  Math.random() *
                  chaosWords.length
                );


              setChaosWord(
                chaosWords[
                  randomIndex
                ]
              );


            },
            85
          );


      }



      function stopChaosGlitch() {


        window.clearInterval(
          chaosGlitchTimer
        );


        chaosGlitchTimer =
          null;


        chaosNav.classList.remove(
          "is-glitching"
        );


        setChaosWord(
          "???"
        );


      }



      chaosNav.addEventListener(
        "mouseenter",
        startChaosGlitch
      );


      chaosNav.addEventListener(
        "mouseleave",
        stopChaosGlitch
      );


      chaosNav.addEventListener(
        "focus",
        startChaosGlitch
      );


      chaosNav.addEventListener(
        "blur",
        stopChaosGlitch
      );


    }



    /* ========================================
       CONTACT NAVIGATION
    ======================================== */

    const contactNav =
      menuItems.find(
        function (item) {


          return (
            item
              .textContent
              .trim() ===
            "CONTACT"
          );


        }
      );



    if (contactNav) {


      contactNav.href =
        "contact.html";


      if (
        document.body.classList.contains(
          "contact-page-body"
        )
      ) {

        contactNav.classList.add(
          "active"
        );

      }


    }



    /* ========================================
       COPY EMAIL
    ======================================== */

    const copyEmailButton =
      document.querySelector(
        "[data-copy-email]"
      );



    if (copyEmailButton) {


      copyEmailButton.setAttribute(
        "aria-live",
        "polite"
      );


      copyEmailButton.setAttribute(
        "aria-atomic",
        "true"
      );


      const originalButtonText =
        copyEmailButton
          .textContent
          .trim();



      function showCopiedState() {


        copyEmailButton.textContent =
          "COPIED!";


        copyEmailButton.classList.add(
          "is-copied"
        );


        window.setTimeout(
          function () {


            copyEmailButton.textContent =
              originalButtonText;


            copyEmailButton.classList.remove(
              "is-copied"
            );


          },
          1600
        );


      }



      function fallbackCopy(
        text
      ) {


        const textarea =
          document.createElement(
            "textarea"
          );


        textarea.value =
          text;


        textarea.setAttribute(
          "readonly",
          ""
        );


        textarea.style.position =
          "fixed";


        textarea.style.opacity =
          "0";


        document.body.appendChild(
          textarea
        );


        textarea.select();



        try {


          document.execCommand(
            "copy"
          );


          showCopiedState();


        }

        catch (error) {


          copyEmailButton.textContent =
            "COPY FAILED";


        }



        document.body.removeChild(
          textarea
        );


      }



      copyEmailButton.addEventListener(
        "click",
        function () {


          const email =
            copyEmailButton.getAttribute(
              "data-email"
            );


          if (!email) {
            return;
          }



          if (
            navigator.clipboard &&
            window.isSecureContext
          ) {


            navigator.clipboard
              .writeText(
                email
              )
              .then(
                showCopiedState
              )
              .catch(
                function () {

                  fallbackCopy(
                    email
                  );

                }
              );


          }

          else {


            fallbackCopy(
              email
            );


          }


        }
      );


    }



    /* ========================================
       WORK DROPDOWN
    ======================================== */

    const workMenu =
      document.querySelector(
        "[data-work-menu]"
      );


    const workToggle =
      document.querySelector(
        "[data-work-toggle]"
      );


    const workDropdown =
      workMenu
        ? workMenu.querySelector(
            ".work-dropdown"
          )
        : null;



    if (
      workToggle &&
      workDropdown
    ) {


      workDropdown.id =
        "work-dropdown";


      workToggle.setAttribute(
        "aria-controls",
        "work-dropdown"
      );


    }



    function closeWorkMenu() {


      if (
        !workMenu ||
        !workToggle
      ) {

        return;

      }


      workMenu.classList.remove(
        "is-open"
      );


      workToggle.setAttribute(
        "aria-expanded",
        "false"
      );


    }



    if (
      workMenu &&
      workToggle
    ) {


      workToggle.addEventListener(
        "click",
        function (event) {


          event.stopPropagation();


          const isOpen =
            workMenu.classList.toggle(
              "is-open"
            );


          workToggle.setAttribute(
            "aria-expanded",
            isOpen
              ? "true"
              : "false"
          );


        }
      );



      document.addEventListener(
        "click",
        function (event) {


          if (
            !workMenu.contains(
              event.target
            )
          ) {

            closeWorkMenu();

          }


        }
      );



      document.addEventListener(
        "keydown",
        function (event) {


          if (
            event.key ===
            "Escape"
          ) {


            closeWorkMenu();


            if (
              document.activeElement &&
              workMenu.contains(
                document.activeElement
              )
            ) {

              workToggle.focus();

            }


          }


        }
      );


    }



    /* ========================================
       WORK FILTER
    ======================================== */

    const projectCards =
      document.querySelectorAll(
        "[data-project-card]"
      );


    const filterButtons =
      document.querySelectorAll(
        "[data-filter]"
      );


    const dropdownLinks =
      document.querySelectorAll(
        "[data-dropdown-filter]"
      );


    const workEmpty =
      document.querySelector(
        "[data-work-empty]"
      );



    const allowedFilters = [

      "all",
      "kv",
      "illustration",
      "motion",
      "3d",
      "fine-art"

    ];



    /* ========================================
       FILTER STATUS FOR SCREEN READERS
    ======================================== */

    let filterStatus =
      null;



    if (
      projectCards.length > 0
    ) {


      filterStatus =
        document.createElement(
          "p"
        );


      filterStatus.className =
        "sr-only";


      filterStatus.setAttribute(
        "aria-live",
        "polite"
      );


      filterStatus.setAttribute(
        "aria-atomic",
        "true"
      );


      const workGrid =
        document.querySelector(
          ".work-grid"
        );


      if (workGrid) {


        workGrid.insertBefore(
          filterStatus,
          workGrid.firstChild
        );


      }


    }



    function applyFilter(
      filterName,
      updateURL
    ) {


      let selectedFilter =
        (
          filterName ||
          "all"
        ).toLowerCase();



      if (
        !allowedFilters.includes(
          selectedFilter
        )
      ) {

        selectedFilter =
          "all";

      }



      let visibleProjects =
        0;



      /* ======================================
         SHOW / HIDE PROJECT
      ====================================== */

      projectCards.forEach(
        function (card) {


          const categoryString =
            card.getAttribute(
              "data-categories"
            ) || "";


          const categories =
            categoryString
              .toLowerCase()
              .split(" ")
              .filter(
                Boolean
              );


          const shouldShow =
            selectedFilter ===
              "all" ||
            categories.includes(
              selectedFilter
            );



          if (shouldShow) {


            card.hidden =
              false;


            card.style.display =
              "";


            visibleProjects++;


          }

          else {


            card.hidden =
              true;


            card.style.display =
              "none";


          }


        }
      );



      /* ======================================
         FILTER BUTTON STATE
      ====================================== */

      filterButtons.forEach(
        function (button) {


          const isActive =
            button.dataset.filter ===
            selectedFilter;


          button.classList.toggle(
            "is-active",
            isActive
          );


          button.setAttribute(
            "aria-pressed",
            isActive
              ? "true"
              : "false"
          );


        }
      );



      /* ======================================
         DROPDOWN STATE
      ====================================== */

      dropdownLinks.forEach(
        function (link) {


          const isActive =
            link.dataset.dropdownFilter ===
            selectedFilter;


          link.classList.toggle(
            "is-active",
            isActive
          );


        }
      );



      /* ======================================
         EMPTY MESSAGE
      ====================================== */

      if (workEmpty) {


        if (
          visibleProjects ===
          0
        ) {


          workEmpty.hidden =
            false;


          workEmpty.style.display =
            "block";


        }

        else {


          workEmpty.hidden =
            true;


          workEmpty.style.display =
            "none";


        }


      }



      /* ======================================
         ACCESSIBLE FILTER STATUS
      ====================================== */

      if (filterStatus) {


        const filterLabel =
          selectedFilter ===
            "all"
            ? "all categories"
            : selectedFilter;


        filterStatus.textContent =
          visibleProjects +
          (
            visibleProjects === 1
              ? " project shown for "
              : " projects shown for "
          ) +
          filterLabel +
          ".";


      }



      /* ======================================
         URL
      ====================================== */

      if (
        updateURL &&
        projectCards.length > 0
      ) {


        try {


          const url =
            new URL(
              window.location.href
            );


          if (
            selectedFilter ===
            "all"
          ) {


            url.searchParams.delete(
              "filter"
            );


          }

          else {


            url.searchParams.set(
              "filter",
              selectedFilter
            );


          }


          window.history.replaceState(
            {},
            "",
            url
          );


        }

        catch (error) {


          /*
            FILTER STILL WORKS
            IN LOCAL FILE MODE
          */


        }


      }


    }



    /* ========================================
       FILTER BUTTON CLICK
    ======================================== */

    filterButtons.forEach(
      function (button) {


        button.addEventListener(
          "click",
          function () {


            applyFilter(
              button.dataset.filter,
              true
            );


          }
        );


      }
    );



    /* ========================================
       FILTER FROM URL
    ======================================== */

    if (
      projectCards.length > 0
    ) {


      const params =
        new URLSearchParams(
          window.location.search
        );


      const startingFilter =
        params.get(
          "filter"
        ) ||
        "all";


      applyFilter(
        startingFilter,
        false
      );


    }



    /* ========================================
       ??? CHAOS PAGE
    ======================================== */

    const chaosSpace =
      document.querySelector(
        "[data-chaos-space]"
      );


    const chaosCards =
      Array.from(
        document.querySelectorAll(
          "[data-chaos-card]"
        )
      );


    const scrambleButton =
      document.querySelector(
        "[data-chaos-scramble]"
      );



    if (
      chaosSpace &&
      chaosCards.length > 0
    ) {


      let topZIndex =
        20;


      let activeCard =
        null;


      let pointerOffsetX =
        0;


      let pointerOffsetY =
        0;


      let chaosPointerStartX =
        0;


      let chaosPointerStartY =
        0;


      let chaosDidDrag =
        false;



      function isChaosDesktop() {


        return window.matchMedia(
          "(min-width: 761px)"
        ).matches;


      }



      /* ======================================
         SCATTER
      ====================================== */

      function scatterChaosCards() {


        /* MOBILE */

        if (
          !isChaosDesktop()
        ) {


          chaosSpace.style.minHeight =
            "";


          chaosCards.forEach(
            function (card) {


              const rotation =
                (
                  Math.random() *
                  4
                ) -
                2;


              card.style.left =
                "";


              card.style.top =
                "";


              card.style.zIndex =
                "";


              card.style.setProperty(
                "--mobile-chaos-rotation",
                rotation +
                "deg"
              );


            }
          );


          return;


        }



        /* DESKTOP */

        /*
          Give the chaos space more room automatically
          as more cards are added in the future.
        */

        const extraCardGroups =
          Math.max(
            0,
            Math.ceil(
              (chaosCards.length - 8) / 4
            )
          );


        chaosSpace.style.minHeight =
          (
            1350 +
            (extraCardGroups * 420)
          ) +
          "px";


        const spaceWidth =
          chaosSpace.clientWidth;


        const spaceHeight =
          chaosSpace.clientHeight;



        chaosCards.forEach(
          function (
            card,
            index
          ) {


            const cardWidth =
              card.offsetWidth;


            const cardHeight =
              card.offsetHeight;


            const maxX =
              Math.max(
                20,
                spaceWidth -
                cardWidth -
                20
              );


            const maxY =
              Math.max(
                20,
                spaceHeight -
                cardHeight -
                20
              );


            const x =
              Math.random() *
              maxX;


            const y =
              Math.random() *
              maxY;


            const rotation =
              (
                Math.random() *
                16
              ) -
              8;


            card.style.left =
              x +
              "px";


            card.style.top =
              y +
              "px";


            card.style.transform =
              "rotate(" +
              rotation +
              "deg)";


            card.style.zIndex =
              10 +
              index;


          }
        );


      }



      /* ======================================
         SCRAMBLE
      ====================================== */

      if (
        scrambleButton
      ) {


        scrambleButton.addEventListener(
          "click",
          function () {


            scatterChaosCards();


            scrambleButton.classList.add(
              "is-scrambling"
            );


            window.setTimeout(
              function () {


                scrambleButton.classList.remove(
                  "is-scrambling"
                );


              },
              250
            );


          }
        );


      }



      /* ======================================
         IMAGE CARD HELPERS
      ====================================== */

      function isChaosImageCard(
        card
      ) {

        if (!card) {
          return false;
        }

        const type =
          (
            card.getAttribute(
              "data-chaos-type"
            ) || ""
          ).toLowerCase();

        return (
          type === "image" ||
          type === "sketch" ||
          type === "photo"
        );

      }



      /* ======================================
         DRAG
      ====================================== */

      chaosCards.forEach(
        function (card) {


          card.addEventListener(
            "pointerdown",
            function (event) {


              if (
                !isChaosDesktop() ||
                event.button !==
                  0
              ) {

                return;

              }


              const interactiveTarget =
                event.target.closest(
                  "button, a, input, textarea, select, audio, video, [data-chaos-no-drag]"
                );


              if (interactiveTarget) {

                return;

              }


              chaosPointerStartX =
                event.clientX;


              chaosPointerStartY =
                event.clientY;


              chaosDidDrag =
                false;


              event.preventDefault();


              activeCard =
                card;


              const cardRect =
                card.getBoundingClientRect();


              pointerOffsetX =
                event.clientX -
                cardRect.left;


              pointerOffsetY =
                event.clientY -
                cardRect.top;


              topZIndex++;


              card.style.zIndex =
                topZIndex;


              card.classList.add(
                "is-dragging"
              );


            }
          );


        }
      );



      document.addEventListener(
        "pointermove",
        function (event) {


          if (
            !activeCard ||
            !isChaosDesktop()
          ) {

            return;

          }


          const pointerDistance =
            Math.hypot(
              event.clientX -
                chaosPointerStartX,
              event.clientY -
                chaosPointerStartY
            );


          if (pointerDistance > 6) {

            chaosDidDrag =
              true;

          }


          const spaceRect =
            chaosSpace.getBoundingClientRect();


          let x =
            event.clientX -
            spaceRect.left -
            pointerOffsetX;


          let y =
            event.clientY -
            spaceRect.top -
            pointerOffsetY;


          const maxX =
            chaosSpace.clientWidth -
            activeCard.offsetWidth;


          const maxY =
            chaosSpace.clientHeight -
            activeCard.offsetHeight;


          x =
            Math.max(
              0,
              Math.min(
                x,
                maxX
              )
            );


          y =
            Math.max(
              0,
              Math.min(
                y,
                maxY
              )
            );


          activeCard.style.left =
            x +
            "px";


          activeCard.style.top =
            y +
            "px";


        }
      );



      function releaseChaosCard() {


        if (!activeCard) {
          return;
        }


        const releasedCard =
          activeCard;


        const shouldOpenImage =
          !chaosDidDrag &&
          isChaosImageCard(
            releasedCard
          );


        activeCard.classList.remove(
          "is-dragging"
        );


        activeCard =
          null;


        if (shouldOpenImage) {

          releasedCard.dispatchEvent(
            new CustomEvent(
              "chaosimageopen",
              { bubbles: true }
            )
          );

        }


      }



      document.addEventListener(
        "pointerup",
        releaseChaosCard
      );


      document.addEventListener(
        "pointercancel",
        releaseChaosCard
      );



      /* ======================================
         FIRST SCATTER
      ====================================== */

      window.setTimeout(
        scatterChaosCards,
        100
      );


      window.addEventListener(
        "load",
        scatterChaosCards
      );



      /* ======================================
         RESIZE
      ====================================== */

      let chaosResizeTimer;



      window.addEventListener(
        "resize",
        function () {


          window.clearTimeout(
            chaosResizeTimer
          );


          chaosResizeTimer =
            window.setTimeout(
              scatterChaosCards,
              150
            );


        }
      );


    }





    /* ========================================
       ??? WEIRD INTERACTIONS
    ======================================== */

    const chaosMessageCards =
      Array.from(
        document.querySelectorAll(
          "[data-chaos-message-card]"
        )
      );


    chaosMessageCards.forEach(
      function (card) {

        const button =
          card.querySelector(
            "[data-chaos-message-button]"
          );

        const output =
          card.querySelector(
            "[data-chaos-message-output]"
          );

        const messageItems =
          Array.from(
            card.querySelectorAll(
              "[data-chaos-message-list] li"
            )
          );

        const messages =
          messageItems
            .map(
              function (item) {
                return item.textContent.trim();
              }
            )
            .filter(Boolean);

        let messageIndex = 0;

        if (
          button &&
          output &&
          messages.length > 0
        ) {

          button.addEventListener(
            "click",
            function () {

              output.textContent =
                messages[messageIndex];

              messageIndex =
                (
                  messageIndex + 1
                ) % messages.length;

            }
          );

        }

      }
    );


    const chaosWorseButtons =
      Array.from(
        document.querySelectorAll(
          "[data-chaos-worse-button]"
        )
      );


    let chaosWorseTimer = null;


    chaosWorseButtons.forEach(
      function (button) {

        const originalText =
          button.textContent.trim();

        button.addEventListener(
          "click",
          function () {

            window.clearTimeout(
              chaosWorseTimer
            );

            document.body.classList.add(
              "is-chaos-worse"
            );

            button.disabled = true;

            button.textContent =
              "BAD DECISION...";

            chaosWorseTimer =
              window.setTimeout(
                function () {

                  document.body.classList.remove(
                    "is-chaos-worse"
                  );

                  chaosWorseButtons.forEach(
                    function (item) {
                      item.disabled = false;
                    }
                  );

                  button.textContent =
                    originalText;

                },
                1200
              );

          }
        );

      }
    );



    /* ========================================
       ??? V5 / FAKE DESKTOP WINDOWS
    ======================================== */

    const chaosWindowCards =
      Array.from(
        document.querySelectorAll(
          "[data-chaos-window-card]"
        )
      );


    if (chaosWindowCards.length > 0) {

      const chaosWindowLayer =
        document.createElement(
          "div"
        );


      chaosWindowLayer.className =
        "chaos-window-layer";


      chaosWindowLayer.setAttribute(
        "data-chaos-window-layer",
        ""
      );


      document.body.appendChild(
        chaosWindowLayer
      );


      let chaosWindowZIndex = 610;
      let activeChaosWindow = null;
      let chaosWindowOffsetX = 0;
      let chaosWindowOffsetY = 0;


      function isChaosWindowDesktop() {

        return window.matchMedia(
          "(min-width: 761px)"
        ).matches;

      }


      function bringChaosWindowToFront(
        chaosWindow
      ) {

        if (!chaosWindow) {
          return;
        }

        chaosWindowZIndex++;

        chaosWindow.style.zIndex =
          chaosWindowZIndex;

      }


      function positionChaosWindow(
        chaosWindow
      ) {

        if (!chaosWindow) {
          return;
        }


        if (!isChaosWindowDesktop()) {

          chaosWindow.style.left = "";
          chaosWindow.style.top = "";

          return;

        }


        const windowWidth =
          chaosWindow.offsetWidth || 430;

        const windowHeight =
          chaosWindow.offsetHeight || 320;


        const maxX =
          Math.max(
            24,
            window.innerWidth -
              windowWidth -
              24
          );

        const maxY =
          Math.max(
            100,
            window.innerHeight -
              windowHeight -
              24
          );


        const minX =
          Math.min(
            60,
            maxX
          );

        const minY =
          Math.min(
            120,
            maxY
          );


        const x =
          minX +
          Math.random() *
          Math.max(
            0,
            maxX - minX
          );

        const y =
          minY +
          Math.random() *
          Math.max(
            0,
            maxY - minY
          );


        chaosWindow.style.left =
          x + "px";

        chaosWindow.style.top =
          y + "px";

      }


      function closeTopChaosWindow() {

        const openWindows =
          Array.from(
            chaosWindowLayer.querySelectorAll(
              ".chaos-window"
            )
          );


        if (openWindows.length === 0) {
          return false;
        }


        openWindows.sort(
          function (a, b) {

            return (
              Number.parseInt(
                a.style.zIndex || "0",
                10
              ) -
              Number.parseInt(
                b.style.zIndex || "0",
                10
              )
            );

          }
        );


        const topWindow =
          openWindows[
            openWindows.length - 1
          ];


        if (topWindow) {

          topWindow.remove();

          return true;

        }


        return false;

      }


      chaosWindowCards.forEach(
        function (card) {

          const openButton =
            card.querySelector(
              "[data-chaos-window-open]"
            );

          const contentTemplate =
            card.querySelector(
              "[data-chaos-window-content]"
            );


          if (
            !openButton ||
            !contentTemplate
          ) {
            return;
          }


          openButton.addEventListener(
            "click",
            function () {

              const title =
                openButton.getAttribute(
                  "data-chaos-window-title"
                ) ||
                "untitled.txt";


              const chaosWindow =
                document.createElement(
                  "section"
                );


              chaosWindow.className =
                "chaos-window";


              chaosWindow.setAttribute(
                "role",
                "dialog"
              );


              chaosWindow.setAttribute(
                "aria-label",
                title
              );


              chaosWindow.setAttribute(
                "tabindex",
                "-1"
              );


              chaosWindow.innerHTML =
                '<div class="chaos-window-titlebar" data-chaos-window-handle>' +
                  '<span class="chaos-window-title"></span>' +
                  '<button class="chaos-window-close" type="button" aria-label="Close window" data-chaos-window-close>×</button>' +
                '</div>' +
                '<div class="chaos-window-content" data-chaos-window-body></div>';


              const titleElement =
                chaosWindow.querySelector(
                  ".chaos-window-title"
                );


              const bodyElement =
                chaosWindow.querySelector(
                  "[data-chaos-window-body]"
                );


              if (titleElement) {

                titleElement.textContent =
                  title;

              }


              if (bodyElement) {

                bodyElement.appendChild(
                  contentTemplate.content.cloneNode(
                    true
                  )
                );

              }


              chaosWindowLayer.appendChild(
                chaosWindow
              );


              bringChaosWindowToFront(
                chaosWindow
              );


              positionChaosWindow(
                chaosWindow
              );


              chaosWindow.focus();


              const closeButton =
                chaosWindow.querySelector(
                  "[data-chaos-window-close]"
                );


              if (closeButton) {

                closeButton.addEventListener(
                  "click",
                  function () {

                    chaosWindow.remove();

                  }
                );

              }


              chaosWindow.addEventListener(
                "pointerdown",
                function () {

                  bringChaosWindowToFront(
                    chaosWindow
                  );

                }
              );


              const handle =
                chaosWindow.querySelector(
                  "[data-chaos-window-handle]"
                );


              if (handle) {

                handle.addEventListener(
                  "pointerdown",
                  function (event) {

                    if (
                      !isChaosWindowDesktop() ||
                      event.button !== 0 ||
                      event.target.closest(
                        "button, a, input, textarea, select"
                      )
                    ) {
                      return;
                    }


                    event.preventDefault();


                    activeChaosWindow =
                      chaosWindow;


                    bringChaosWindowToFront(
                      activeChaosWindow
                    );


                    const rect =
                      activeChaosWindow.getBoundingClientRect();


                    chaosWindowOffsetX =
                      event.clientX -
                      rect.left;

                    chaosWindowOffsetY =
                      event.clientY -
                      rect.top;


                    activeChaosWindow.classList.add(
                      "is-window-dragging"
                    );

                  }
                );

              }

            }
          );

        }
      );


      document.addEventListener(
        "pointermove",
        function (event) {

          if (
            !activeChaosWindow ||
            !isChaosWindowDesktop()
          ) {
            return;
          }


          const maxX =
            Math.max(
              0,
              window.innerWidth -
                activeChaosWindow.offsetWidth
            );

          const maxY =
            Math.max(
              0,
              window.innerHeight -
                activeChaosWindow.offsetHeight
            );


          let x =
            event.clientX -
            chaosWindowOffsetX;

          let y =
            event.clientY -
            chaosWindowOffsetY;


          x =
            Math.max(
              0,
              Math.min(
                x,
                maxX
              )
            );

          y =
            Math.max(
              0,
              Math.min(
                y,
                maxY
              )
            );


          activeChaosWindow.style.left =
            x + "px";

          activeChaosWindow.style.top =
            y + "px";

        }
      );


      function releaseChaosWindow() {

        if (!activeChaosWindow) {
          return;
        }


        activeChaosWindow.classList.remove(
          "is-window-dragging"
        );


        activeChaosWindow = null;

      }


      document.addEventListener(
        "pointerup",
        releaseChaosWindow
      );


      document.addEventListener(
        "pointercancel",
        releaseChaosWindow
      );


      document.addEventListener(
        "keydown",
        function (event) {

          if (
            event.key === "Escape" &&
            !document.body.classList.contains(
              "chaos-lightbox-open"
            )
          ) {

            closeTopChaosWindow();

          }

        }
      );


      window.addEventListener(
        "resize",
        function () {

          if (!isChaosWindowDesktop()) {
            return;
          }


          const openWindows =
            Array.from(
              chaosWindowLayer.querySelectorAll(
                ".chaos-window"
              )
            );


          openWindows.forEach(
            function (chaosWindow) {

              const rect =
                chaosWindow.getBoundingClientRect();


              if (
                rect.right > window.innerWidth ||
                rect.bottom > window.innerHeight
              ) {

                positionChaosWindow(
                  chaosWindow
                );

              }

            }
          );

        }
      );

    }


    /* ========================================
       ??? IMAGE LIGHTBOX
    ======================================== */

    const chaosImageCards =
      Array.from(
        document.querySelectorAll(
          '[data-chaos-type="image"], [data-chaos-type="sketch"], [data-chaos-type="photo"]'
        )
      );


    if (
      chaosImageCards.length > 0
    ) {

      const chaosLightbox =
        document.createElement(
          "div"
        );


      chaosLightbox.className =
        "chaos-lightbox";


      chaosLightbox.setAttribute(
        "aria-hidden",
        "true"
      );


      chaosLightbox.innerHTML =
        '<button class="chaos-lightbox-backdrop" type="button" aria-label="Close image" data-chaos-lightbox-close></button>' +
        '<div class="chaos-lightbox-content" role="dialog" aria-modal="true" aria-label="Image preview">' +
          '<img class="chaos-lightbox-image" alt="" data-chaos-lightbox-image>' +
          '<p class="chaos-lightbox-caption" data-chaos-lightbox-caption></p>' +
        '</div>' +
        '<button class="chaos-lightbox-close" type="button" data-chaos-lightbox-close>CLOSE ×</button>';


      document.body.appendChild(
        chaosLightbox
      );


      const chaosLightboxImage =
        chaosLightbox.querySelector(
          "[data-chaos-lightbox-image]"
        );


      const chaosLightboxCaption =
        chaosLightbox.querySelector(
          "[data-chaos-lightbox-caption]"
        );


      const chaosLightboxCloseButton =
        chaosLightbox.querySelector(
          ".chaos-lightbox-close"
        );


      let chaosLightboxPreviousFocus =
        null;


      function openChaosLightbox(
        card
      ) {

        const image =
          card.querySelector(
            "img"
          );


        if (
          !image ||
          !chaosLightboxImage
        ) {

          return;

        }


        const caption =
          card.querySelector(
            ".chaos-card-caption"
          );


        chaosLightboxPreviousFocus =
          document.activeElement;


        chaosLightboxImage.src =
          image.currentSrc ||
          image.src;


        chaosLightboxImage.alt =
          image.alt ||
          "Image preview";


        if (chaosLightboxCaption) {

          chaosLightboxCaption.textContent =
            caption
              ? caption.textContent.trim()
              : "";


          chaosLightboxCaption.hidden =
            !chaosLightboxCaption.textContent;

        }


        chaosLightbox.classList.add(
          "is-open"
        );


        chaosLightbox.setAttribute(
          "aria-hidden",
          "false"
        );


        document.body.classList.add(
          "chaos-lightbox-open"
        );


        if (chaosLightboxCloseButton) {

          chaosLightboxCloseButton.focus();

        }

      }


      function closeChaosLightbox() {

        if (
          !chaosLightbox.classList.contains(
            "is-open"
          )
        ) {

          return;

        }


        chaosLightbox.classList.remove(
          "is-open"
        );


        chaosLightbox.setAttribute(
          "aria-hidden",
          "true"
        );


        document.body.classList.remove(
          "chaos-lightbox-open"
        );


        if (chaosLightboxImage) {

          chaosLightboxImage.removeAttribute(
            "src"
          );

        }


        if (
          chaosLightboxPreviousFocus &&
          typeof chaosLightboxPreviousFocus.focus ===
            "function"
        ) {

          chaosLightboxPreviousFocus.focus();

        }

      }


      chaosImageCards.forEach(
        function (card) {

          card.setAttribute(
            "title",
            "Click to view image"
          );


          card.addEventListener(
            "chaosimageopen",
            function () {

              openChaosLightbox(
                card
              );

            }
          );


          card.addEventListener(
            "click",
            function () {

              const isDesktop =
                window.matchMedia(
                  "(min-width: 761px)"
                ).matches;


              if (!isDesktop) {

                openChaosLightbox(
                  card
                );

              }

            }
          );

        }
      );


      chaosLightbox
        .querySelectorAll(
          "[data-chaos-lightbox-close]"
        )
        .forEach(
          function (button) {

            button.addEventListener(
              "click",
              closeChaosLightbox
            );

          }
        );


      document.addEventListener(
        "keydown",
        function (event) {

          if (
            event.key === "Escape"
          ) {

            closeChaosLightbox();

          }

        }
      );

    }



    /* ========================================
       ??? AUDIO CARDS
    ======================================== */

    const chaosAudioCards =
      Array.from(
        document.querySelectorAll(
          "[data-chaos-audio-card]"
        )
      );


    function formatChaosAudioTime(
      seconds
    ) {

      if (
        !Number.isFinite(seconds)
      ) {

        return "--:--";

      }


      const minutes =
        Math.floor(
          seconds / 60
        );


      const remainingSeconds =
        Math.floor(
          seconds % 60
        );


      return (
        String(minutes)
          .padStart(2, "0") +
        ":" +
        String(remainingSeconds)
          .padStart(2, "0")
      );

    }


    function pauseOtherChaosAudio(
      currentAudio
    ) {

      chaosAudioCards.forEach(
        function (card) {

          const audio =
            card.querySelector(
              "[data-chaos-audio]"
            );


          if (
            audio &&
            audio !== currentAudio &&
            !audio.paused
          ) {

            audio.pause();

          }

        }
      );

    }


    chaosAudioCards.forEach(
      function (card) {

        const audio =
          card.querySelector(
            "[data-chaos-audio]"
          );


        const toggle =
          card.querySelector(
            "[data-chaos-audio-toggle]"
          );


        const time =
          card.querySelector(
            "[data-chaos-audio-time]"
          );


        if (
          !audio ||
          !toggle
        ) {

          return;

        }


        function updateAudioTime() {

          if (!time) {
            return;
          }


          time.textContent =
            formatChaosAudioTime(
              audio.currentTime
            ) +
            " / " +
            formatChaosAudioTime(
              audio.duration
            );

        }


        function setAudioState(
          isPlaying
        ) {

          card.classList.toggle(
            "is-playing",
            isPlaying
          );


          toggle.textContent =
            isPlaying
              ? "PAUSE"
              : "PLAY";


          toggle.setAttribute(
            "aria-label",
            isPlaying
              ? "Pause audio"
              : "Play audio"
          );

        }


        toggle.addEventListener(
          "click",
          function () {

            if (
              card.classList.contains(
                "has-audio-error"
              )
            ) {

              return;

            }


            if (audio.paused) {

              pauseOtherChaosAudio(
                audio
              );


              const playPromise =
                audio.play();


              if (
                playPromise &&
                typeof playPromise.catch ===
                  "function"
              ) {

                playPromise.catch(
                  function () {

                    setAudioState(
                      false
                    );

                  }
                );

              }

            }
            else {

              audio.pause();

            }

          }
        );


        audio.addEventListener(
          "play",
          function () {

            setAudioState(
              true
            );

          }
        );


        audio.addEventListener(
          "pause",
          function () {

            setAudioState(
              false
            );

          }
        );


        audio.addEventListener(
          "ended",
          function () {

            audio.currentTime =
              0;


            setAudioState(
              false
            );


            updateAudioTime();

          }
        );


        audio.addEventListener(
          "loadedmetadata",
          updateAudioTime
        );


        audio.addEventListener(
          "timeupdate",
          updateAudioTime
        );


        audio.addEventListener(
          "error",
          function () {

            card.classList.add(
              "has-audio-error"
            );


            toggle.textContent =
              "NO FILE";


            toggle.disabled =
              true;


            if (time) {

              time.textContent =
                "CHECK AUDIO PATH";

            }

          }
        );


        setAudioState(
          false
        );


        updateAudioTime();

      }
    );



    /* ========================================
       CURRENT PAGE SEMANTICS
    ======================================== */

    function setCurrentPageSemantics() {


      document
        .querySelectorAll(
          '[aria-current="page"]'
        )
        .forEach(
          function (element) {


            element.removeAttribute(
              "aria-current"
            );


          }
        );



      /* HOME */

      const path =
        window.location.pathname;


      const isHome =
        path.endsWith("/") ||
        path.endsWith(
          "/index.html"
        );



      if (isHome) {


        const logo =
          document.querySelector(
            ".logo"
          );


        if (logo) {


          logo.setAttribute(
            "aria-current",
            "page"
          );


        }


        return;


      }



      /* OTHER PAGES */

      const activeItem =
        document.querySelector(
          ".menu-item.active"
        );


      if (activeItem) {


        activeItem.setAttribute(
          "aria-current",
          "page"
        );


      }


    }



    setCurrentPageSemantics();


  }
);