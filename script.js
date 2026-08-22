document.addEventListener("DOMContentLoaded", function () {


  /* ========================================
     MAIN ELEMENTS
  ======================================== */

  const navigation =
    document.querySelector(".navigation");

  const mainMenu =
    document.querySelector(".menu");

  const menuItems =
    Array.from(
      document.querySelectorAll(".menu-item")
    );



  /* ========================================
     MOBILE MENU
  ======================================== */

  let mobileMenuButton = null;


  if (navigation && mainMenu) {

    mainMenu.id = "site-menu";


    mobileMenuButton =
      document.createElement("button");


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
        open ? "true" : "false"
      );


      mobileMenuButton.textContent =
        open ? "CLOSE" : "MENU";

    }



    mobileMenuButton.addEventListener(
      "click",
      function () {

        const isOpen =
          navigation.classList.contains(
            "mobile-menu-open"
          );


        setMobileMenu(!isOpen);

      }
    );



    /* CLOSE AFTER CLICKING A NORMAL LINK */

    mainMenu.addEventListener(
      "click",
      function (event) {

        const link =
          event.target.closest("a");


        if (
          link &&
          window.matchMedia(
            "(max-width: 760px)"
          ).matches
        ) {

          setMobileMenu(false);

        }

      }
    );



    /* CLOSE WHEN RETURNING TO DESKTOP */

    window.addEventListener(
      "resize",
      function () {

        if (
          window.matchMedia(
            "(min-width: 761px)"
          ).matches
        ) {

          setMobileMenu(false);

        }

      }
    );



    /* ESCAPE CLOSES MOBILE MENU */

    document.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Escape") {

          setMobileMenu(false);

        }

      }
    );

  }



  /* ========================================
     ??? NAVIGATION
     TURN PLAY INTO ???
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
            item.textContent.trim();

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



    if (
      document.body.classList.contains(
        "chaos-page-body"
      )
    ) {

      chaosNav.classList.add(
        "active"
      );

    }



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


    let chaosGlitchTimer = null;



    function setChaosWord(word) {

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
              chaosWords[randomIndex]
            );

          },
          85
        );

    }



    function stopChaosGlitch() {

      window.clearInterval(
        chaosGlitchTimer
      );


      chaosGlitchTimer = null;


      chaosNav.classList.remove(
        "is-glitching"
      );


      setChaosWord("???");

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
          item.textContent.trim() ===
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

    const originalButtonText =
      copyEmailButton.textContent.trim();



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



    function fallbackCopy(text) {

      const textarea =
        document.createElement(
          "textarea"
        );


      textarea.value = text;

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

        document.execCommand("copy");

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
            .writeText(email)
            .then(showCopiedState)
            .catch(
              function () {

                fallbackCopy(email);

              }
            );

        }

        else {

          fallbackCopy(email);

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



  function closeWorkMenu() {

    if (!workMenu || !workToggle) {
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



  if (workMenu && workToggle) {

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

        if (event.key === "Escape") {

          closeWorkMenu();

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



    let visibleProjects = 0;



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
            .filter(Boolean);


        const shouldShow =
          selectedFilter === "all" ||
          categories.includes(
            selectedFilter
          );


        if (shouldShow) {

          card.hidden = false;

          card.style.display = "";

          visibleProjects++;

        }

        else {

          card.hidden = true;

          card.style.display = "none";

        }

      }
    );



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



    if (workEmpty) {

      if (visibleProjects === 0) {

        workEmpty.hidden = false;

        workEmpty.style.display =
          "block";

      }

      else {

        workEmpty.hidden = true;

        workEmpty.style.display =
          "none";

      }

    }



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
          selectedFilter === "all"
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

  if (projectCards.length > 0) {

    const params =
      new URLSearchParams(
        window.location.search
      );


    const startingFilter =
      params.get("filter") ||
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

    let topZIndex = 20;

    let activeCard = null;

    let pointerOffsetX = 0;
    let pointerOffsetY = 0;



    function isChaosDesktop() {

      return window.matchMedia(
        "(min-width: 761px)"
      ).matches;

    }



    function scatterChaosCards() {


      /* MOBILE */

      if (!isChaosDesktop()) {

        chaosCards.forEach(
          function (card) {

            const rotation =
              (
                Math.random() * 4
              ) - 2;


            card.style.left = "";
            card.style.top = "";
            card.style.zIndex = "";


            card.style.setProperty(
              "--mobile-chaos-rotation",
              rotation + "deg"
            );

          }
        );


        return;

      }



      /* DESKTOP */

      const spaceWidth =
        chaosSpace.clientWidth;


      const spaceHeight =
        chaosSpace.clientHeight;



      chaosCards.forEach(
        function (card, index) {

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
              Math.random() * 16
            ) - 8;


          card.style.left =
            x + "px";


          card.style.top =
            y + "px";


          card.style.transform =
            "rotate(" +
            rotation +
            "deg)";


          card.style.zIndex =
            10 + index;

        }
      );

    }



    /* ========================================
       SCRAMBLE
    ======================================== */

    if (scrambleButton) {

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



    /* ========================================
       DRAG
    ======================================== */

    chaosCards.forEach(
      function (card) {

        card.addEventListener(
          "pointerdown",
          function (event) {

            if (
              !isChaosDesktop() ||
              event.button !== 0
            ) {

              return;

            }


            event.preventDefault();


            activeCard = card;


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
          x + "px";


        activeCard.style.top =
          y + "px";

      }
    );



    function releaseChaosCard() {

      if (!activeCard) {
        return;
      }


      activeCard.classList.remove(
        "is-dragging"
      );


      activeCard = null;

    }



    document.addEventListener(
      "pointerup",
      releaseChaosCard
    );


    document.addEventListener(
      "pointercancel",
      releaseChaosCard
    );



    /* FIRST SCATTER */

    window.setTimeout(
      scatterChaosCards,
      100
    );


    window.addEventListener(
      "load",
      scatterChaosCards
    );



    /* RESIZE */

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


});