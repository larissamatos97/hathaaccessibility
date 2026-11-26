/**
 * Home screens: onboarding + menu (Component Accessibility / Writing Guidelines entry).
 * UI only — scan and downstream flows stay in ui.html.
 */
(function (root) {
  "use strict";

  var TUTORIAL_TOTAL = 8;
  var TUTORIAL_SLIDES = [
    {
      image:
        "https://lottie.host/dcc26b9f-8b67-440d-a230-1c9b7606f571/nLC0lqal40.gif",
      title: "Organize Your Frame",
      body:
        "The plugin reads your design using your Figma layer order. Before running the scan, arrange your components and text in the same order they appear on the screen. This ensures the generated accessibility cards follow the correct reading sequence.",
    },
    {
      image:
        "https://lottie.host/60da0dc0-29cb-4b3f-8d87-65e325b7f1a7/PDwM1TxdFx.png",
      title: "Prepare Your Components",
      body:
        "Yoga components are scanned automatically. If you've created custom components, detach them from the library before scanning but keep yoga main's component like buttons, checkbox, snackbar.",
    },
    {
      image:
        "https://lottie.host/684d45db-205b-48f3-8966-b0262e615939/FUaxS9Y9wc.png",
      title: "Run the Scan",
      body:
        "Select your frame and click Accessibility Check. The plugin will scan your design and generate accessibility cards automatically.",
    },
    {
      image:
        "https://lottie.host/5b7b669f-bf1f-4dc5-9934-668ff0c28ad7/eHla2XyGPy.gif",
      title: "Adjust Card Order",
      body:
        "To change the reading order, simply enter the correct sequence number. The cards will automatically update to match the new order.",
    },
    {
      image:
        "https://lottie.host/7c9f937c-356c-4146-9379-55f3a9ef597e/K18lPevYmx.gif",
      title: "Accessibility Labels",
      body:
        "By default, components are announced as they appear in the interface. If a component requires additional context, enable Accessibility Label and provide a custom description.",
    },
    {
      image:
        "https://lottie.host/6ef6ea85-5e9e-46b9-bdd2-b568a6a88f13/zaXDMA6iFF.gif",
      title: "Create Groupings",
      body:
        "Drag and drop cards to group them. Use this for components that should be read together, like a snackbar or accordion.",
    },
    {
      image:
        "https://lottie.host/ab1f38a8-aa53-4573-abdf-9ebc746b5736/dRBKSzHG48.gif",
      title: "Create Lists",
      body:
        "Lists are created using groupings. After creating your groupings, place one grouping inside another to build a list structure that reflects your interface hierarchy.",
    },
    {
      image:
        "https://lottie.host/cc473699-98cd-4f3d-aa2d-f1a78e83d243/voBi7TOMlJ.gif",
      title: "Writing Guidelines Tab",
      body:
        "Use the Writing Guidelines tab for ready-to-use labels. Select a card in Figma, ensure Custom A11y is active (type any character first to enable), and click a guideline to auto-fill the text.",
    },
  ];

  var tutorialIndex = 0;
  var tutorialMount = null;

  var ICON_ARROW_RIGHT =
    '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAsUlEQVR4AczUQQqFMAwE0P5/Mj2ZejK9mU4WQlFsk8kgSsdakDyyaP7l5edT4IDmd2RGZKvV4QbFMmGXoS0QThnxkqI9EJ4W9YBS1AvK0AgoQaNgGmXAFMqCNJoBKTQLXlE7N6MAa8Dmb32+fSvAFVUNWrDbGMT2vLJgjbkGfAYMY9Y3C1IYC9IYA6awKJjGIqAE84IyzANKMQ94ThDXpbaCvfTu4Q8FZBhqlR5o/0hzAAAA//9xyBzXAAAABklEQVQDAINaLjl8p1j5AAAAAElFTkSuQmCC" width="16" height="16" alt="" aria-hidden="true" />';

  var ICON_ARROW_LEFT =
    '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAs0lEQVR4AdTUXQ6CMBAEYOPF1JOpJ1NuxswDhKf9mZ2QQHZDm9J+bJP2fjv5uSz4wUb9kGk4KiT2hrQg05iCG/aFxDZecUxAAqysjPFXVFDCVFDGFHCEdcEx1gEtWBW0YRXQimXgEx+0zxnmhKGew3DRaDAC/5jIW4RVcmvRnUcEcnVCVjQD7WgFtKJV0IZ2QAvaBceoAo5QFZTRCSihU/CIPtjJ0gHS4I30YiNLF5g5+/gKAAD//+LXY7cAAAAGSURBVAMA3T4tOTOGEFcAAAAASUVORK5CYII=" width="16" height="16" alt="" aria-hidden="true" />';

  var ICON_BACK =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
    '<path fill="currentColor" d="M8.04297 7.04303c0.39052 -0.39052 1.02354 -0.39052 1.41406 0 0.39045 0.39053 0.3905 1.02356 0 1.41406L6.91406 11.0001H20c0.5522 0 1 0.4477 1 1 0 0.5522 -0.4478 0.9999 -1 1H6.91406l2.54297 2.5429c0.39045 0.3906 0.3905 1.0236 0 1.4141s-1.02353 0.3904 -1.41406 0l-4.25 -4.25c-0.39053 -0.3905 -0.39053 -1.0235 0 -1.4141z"/>' +
    "</svg>";

  var SCAN_ICON_A11Y =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6158 1.00991C7.98494 1.19205 4.79575 3.60203 3.61192 7.05817C2.97892 8.90625 2.971 10.9448 3.58963 12.804C3.93355 13.8376 4.46764 14.801 5.17298 15.66C5.52782 16.0921 5.608 16.152 5.83178 16.152C6.04243 16.152 6.20047 16.0487 6.29068 15.852C6.38649 15.6432 6.3342 15.4701 6.09086 15.1904C4.1344 12.9415 3.59848 9.77915 4.70421 7.00801C4.99089 6.28957 5.38135 5.61736 5.87522 4.99211C6.11347 4.69045 6.83563 3.97161 7.15178 3.72136C8.33918 2.78149 9.79171 2.19438 11.3158 2.03829C11.7247 1.99641 12.5871 2.00277 12.9958 2.05067C14.4838 2.22515 15.8932 2.80619 17.0298 3.71363C18.7043 5.0506 19.7447 6.90988 20.0082 9.03601C20.0598 9.45239 20.0657 10.423 20.019 10.812C19.8226 12.4483 19.2145 13.8658 18.181 15.096C17.8895 15.443 17.8694 15.4797 17.8706 15.66C17.8718 15.8286 17.9137 15.9216 18.0372 16.0301C18.149 16.1282 18.2131 16.152 18.3658 16.152C18.5641 16.152 18.6623 16.0875 18.9126 15.7923C20.1237 14.3646 20.8283 12.7129 21.0267 10.836C21.0656 10.468 21.0654 9.45805 21.0263 9.08401C20.827 7.17505 20.0829 5.46954 18.8217 4.03077C17.4014 2.4105 15.4001 1.34488 13.2594 1.06905C13.0166 1.03777 12.0884 0.977439 12.0118 0.987975C11.9986 0.989775 11.8204 0.999663 11.6158 1.00991ZM11.891 2.93157C11.0955 2.99946 10.3895 3.52909 10.0811 4.28939C9.96698 4.5706 9.94776 4.68786 9.94819 5.10001C9.94857 5.45452 9.95383 5.5006 10.0167 5.69985C10.134 6.07141 10.2915 6.33604 10.5565 6.60676C10.8172 6.87311 11.1065 7.04788 11.4839 7.16706C11.6832 7.22997 11.7293 7.23522 12.0838 7.23561C12.4959 7.23604 12.6132 7.21681 12.8944 7.10274C13.1879 6.98363 13.3915 6.84541 13.6318 6.60205C14.0605 6.16782 14.2587 5.68926 14.2587 5.08801C14.2587 4.55994 14.0833 4.07723 13.7491 3.68567C13.2854 3.14224 12.6142 2.86984 11.891 2.93157ZM11.9278 3.93736C11.6547 3.97866 11.436 4.09295 11.2505 4.29136C11.0169 4.54108 10.9338 4.77515 10.9476 5.14513C10.9558 5.36476 10.9649 5.40525 11.0429 5.56801C11.2512 6.00289 11.6209 6.24001 12.0907 6.24001C12.4281 6.24001 12.659 6.15167 12.8924 5.93334C13.3552 5.50045 13.3848 4.77765 12.9588 4.31157C12.6871 4.01425 12.3142 3.87892 11.9278 3.93736ZM8.15978 7.44222C7.85505 7.4805 7.51351 7.65529 7.28354 7.89064C7.1327 8.04503 7.02242 8.22577 6.94106 8.45197C6.88497 8.6079 6.8777 8.66365 6.87751 8.94001C6.87732 9.21841 6.88399 9.26944 6.93947 9.41382C7.09089 9.80773 7.34748 10.1021 7.683 10.2667C7.86093 10.3541 8.0094 10.3934 8.98778 10.6128L10.0918 10.8604L10.0983 11.3045L10.1048 11.7486L9.43464 13.1403C9.06604 13.9057 8.74497 14.5968 8.72114 14.676C8.65341 14.9011 8.66354 15.271 8.74416 15.516C8.86128 15.872 9.05222 16.1253 9.35016 16.32C9.59976 16.483 9.8669 16.5655 10.1518 16.5674C10.5852 16.5703 10.9346 16.4281 11.2367 16.126C11.4187 15.944 11.429 15.9271 11.7136 15.344C11.8735 15.0162 12.0207 14.7075 12.0407 14.658C12.0607 14.6085 12.0845 14.568 12.0937 14.568C12.1029 14.568 12.2383 14.8353 12.3946 15.162C12.7854 15.9788 12.8828 16.1213 13.1829 16.3168C13.8079 16.7238 14.6025 16.6342 15.1081 16.0997C15.4856 15.7006 15.6191 15.1185 15.4482 14.616C15.4146 14.517 15.1001 13.8408 14.7494 13.1133L14.1118 11.7906V11.3233V10.856L15.0058 10.6583C16.5252 10.3223 16.5759 10.3045 16.8844 9.9964C17.1729 9.70818 17.3278 9.34144 17.3278 8.9464C17.3278 8.46906 17.1174 8.02465 16.7667 7.76104C16.4565 7.52783 16.1966 7.43702 15.8398 7.43718C15.6333 7.43728 15.4547 7.47246 13.9438 7.8106C12.5993 8.11149 12.2409 8.18387 12.0958 8.18377C11.9524 8.18368 11.6203 8.11749 10.4638 7.8586C8.40199 7.39703 8.45025 7.40574 8.15978 7.44222ZM8.27978 8.44648C7.86393 8.53041 7.72992 9.0262 8.0477 9.3052C8.15433 9.39882 8.05471 9.37223 9.54647 9.70547C10.2393 9.86025 10.8109 9.99995 10.8545 10.0251C10.897 10.0498 10.9669 10.122 11.0098 10.1857L11.0878 10.3014V11.1648V12.0282L10.3865 13.4841C9.72904 14.8491 9.68522 14.9483 9.6852 15.072C9.68515 15.4624 10.1146 15.6884 10.4559 15.4775C10.4985 15.4511 10.5547 15.395 10.5807 15.3528C10.6067 15.3106 10.8617 14.79 11.1474 14.196C11.433 13.602 11.6957 13.0853 11.7312 13.0478C11.9306 12.8371 12.2532 12.8323 12.4533 13.037C12.4963 13.0809 12.7302 13.5388 13.056 14.2164C13.6424 15.4361 13.6727 15.4843 13.8896 15.5406C14.1281 15.6024 14.344 15.5064 14.4538 15.2897C14.5276 15.144 14.5357 15.0501 14.4862 14.913C14.4677 14.8619 14.1518 14.199 13.7842 13.44L13.1158 12.06L13.1089 11.1954L13.1021 10.3307L13.1588 10.2234C13.2696 10.0135 13.267 10.0143 14.6976 9.69455C15.4092 9.53545 16.0194 9.39061 16.0536 9.37269C16.4059 9.18793 16.4072 8.67369 16.0558 8.49714C16.0096 8.47393 15.9374 8.4484 15.8953 8.44038C15.8421 8.43025 15.3141 8.53897 14.1553 8.79868C12.6825 9.1288 12.4592 9.1731 12.2073 9.18517C12.0266 9.19384 11.8602 9.18793 11.7513 9.169C11.657 9.15261 10.8588 8.97827 9.97759 8.78159C9.09638 8.58493 8.37278 8.42526 8.36959 8.42677C8.3664 8.42829 8.32598 8.43717 8.27978 8.44648ZM5.86778 17.5758C5.57495 17.6507 5.28124 17.901 5.18529 18.1575C5.15747 18.2318 4.89647 19.2447 4.60523 20.4083C4.01635 22.7614 4.02659 22.7033 4.16531 22.9003C4.20407 22.9553 4.28438 23.0263 4.34378 23.058C4.56451 23.176 4.87502 23.0897 5.00006 22.8756C5.02567 22.8317 5.11327 22.5295 5.1947 22.2039L5.34278 21.612H6.09578H6.84878L6.99686 22.2039C7.07829 22.5295 7.16589 22.8317 7.1915 22.8756C7.31654 23.0897 7.62705 23.176 7.84778 23.058C7.90718 23.0263 7.98748 22.9553 8.02624 22.9003C8.16528 22.7029 8.17636 22.7654 7.57641 20.3695C7.23763 19.0166 7.01375 18.1677 6.97471 18.0879C6.78439 17.6989 6.28667 17.4686 5.86778 17.5758ZM10.372 17.5699C10.2617 17.6036 10.0891 17.7825 10.0577 17.8956C10.0436 17.9464 10.0318 18.0582 10.0314 18.144C10.0299 18.5042 9.81244 18.696 9.40584 18.696C9.10807 18.696 8.90378 18.8968 8.90378 19.1894C8.90378 19.4363 9.05517 19.6279 9.29008 19.6783C9.43452 19.7092 9.76855 19.6908 9.92978 19.643L10.0318 19.6127V20.8559V22.0991L9.64178 22.1083C9.2136 22.1185 9.17049 22.1303 9.03124 22.276C8.93265 22.3791 8.90368 22.4592 8.90416 22.6276C8.90467 22.7986 8.97225 22.9259 9.11606 23.027L9.21991 23.1H10.5358H11.8517L11.9555 23.027C12.0993 22.9259 12.1669 22.7986 12.1674 22.6276C12.1679 22.4592 12.1389 22.3791 12.0403 22.276C11.9011 22.1303 11.8579 22.1185 11.4303 22.1083L11.0408 22.0991L11.0343 19.9938L11.0278 17.8885L10.9616 17.7885C10.833 17.5942 10.5887 17.5037 10.372 17.5699ZM14.2678 17.5681C14.1591 17.6021 14.015 17.7327 13.9652 17.8423C13.937 17.9045 13.9206 17.9968 13.9202 18.096C13.9185 18.4973 13.7622 18.6572 13.3361 18.6934C13.0864 18.7147 12.9958 18.7526 12.891 18.8796C12.6601 19.1598 12.8178 19.601 13.1763 19.6779C13.3225 19.7092 13.6555 19.6911 13.8178 19.643L13.9198 19.6127V20.8559V22.0991L13.5298 22.1083C13.1088 22.1183 13.0601 22.1308 12.9259 22.2638C12.7348 22.4531 12.7415 22.7999 12.9398 22.9849C13.076 23.1119 13.0769 23.112 14.4312 23.112H15.6882L15.794 23.0562C15.9362 22.9811 16.0353 22.8367 16.0501 22.6831C16.0676 22.5006 16.0405 22.4087 15.9335 22.2872C15.7998 22.1352 15.6851 22.104 15.2599 22.104H14.9288L14.9223 19.9962L14.9158 17.8885L14.8496 17.7885C14.7561 17.6473 14.6253 17.5672 14.4684 17.5553C14.3976 17.5499 14.3074 17.5557 14.2678 17.5681ZM16.204 17.5713C16.0834 17.6061 15.927 17.7759 15.8883 17.9141C15.8265 18.135 15.8347 18.1507 16.651 19.3746L17.3998 20.4971L17.4002 21.6306C17.4006 22.7602 17.4007 22.7643 17.4544 22.859C17.484 22.9113 17.5549 22.9869 17.6121 23.027C17.7049 23.0923 17.7346 23.1 17.8918 23.1C18.0485 23.1 18.0788 23.0922 18.1699 23.028C18.2261 22.9884 18.2972 22.9084 18.3279 22.8502L18.3838 22.7445V21.6208V20.4971L19.1242 19.3858C19.5314 18.7745 19.8782 18.2332 19.8949 18.1827C19.951 18.0126 19.8702 17.7668 19.722 17.6567C19.5248 17.5103 19.2762 17.5106 19.1017 17.6575C19.0601 17.6925 18.7776 18.0943 18.474 18.5506C18.1703 19.0067 17.9143 19.3884 17.905 19.3986C17.8957 19.4089 17.6356 19.0381 17.3269 18.5747C17.0182 18.1112 16.7304 17.7011 16.6874 17.6633C16.563 17.5541 16.3828 17.5198 16.204 17.5713ZM5.84061 19.62L5.5979 20.592H6.09578H6.59366L6.35095 19.62C6.21748 19.0854 6.10264 18.648 6.09578 18.648C6.08892 18.648 5.97408 19.0854 5.84061 19.62Z" fill="#1D1D1F"/></svg>';

  var SCAN_ICON_WG =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.4679 0.722888C12.0713 0.753008 11.6982 0.867032 11.3579 1.06218C11.0987 1.21081 10.9762 1.30306 10.7673 1.50716C10.391 1.8747 10.1441 2.30427 10.003 2.83688C9.95141 3.03162 9.94995 3.07748 9.93708 4.92025L9.92393 6.80449L7.85993 9.31726L5.79593 11.83L5.78276 9.67702C5.76992 7.58091 5.76824 7.51957 5.71928 7.35601C5.64072 7.09357 5.59851 6.98898 5.48475 6.77516C5.13034 6.10894 4.49782 5.64272 3.73479 5.4853C3.35691 5.40735 2.82262 5.44266 2.44028 5.57082C1.77396 5.79418 1.19672 6.32269 0.924557 6.95857C0.800693 7.24794 0.746549 7.47296 0.718949 7.81309C0.701933 8.02261 0.696029 10.0537 0.700829 14.04L0.707933 19.956L0.763565 20.064C0.794165 20.1234 1.26396 20.8362 1.80756 21.648C2.68431 22.9573 2.80812 23.1314 2.90393 23.1896C3.11868 23.32 3.38576 23.32 3.59993 23.1896C3.6956 23.1313 3.8198 22.9567 4.68819 21.6599C5.22732 20.8548 5.69432 20.142 5.72595 20.076C5.78247 19.9581 5.78348 19.9442 5.78369 19.2693L5.78393 18.5826L6.13224 18.5708C6.71132 18.5511 6.29787 19.0016 9.55486 14.8423C11.0943 12.8764 12.3654 11.268 12.3795 11.268C12.3937 11.268 13.6921 13.0716 15.2648 15.276C16.8376 17.4804 18.1778 19.356 18.243 19.444C18.5564 19.8671 19.0471 20.1989 19.5721 20.3429C19.7877 20.402 19.8507 20.4086 20.1959 20.4081C20.5398 20.4076 20.6037 20.4007 20.8079 20.3427C20.9333 20.3071 21.0493 20.2757 21.0657 20.273C21.0821 20.2702 21.3413 20.5916 21.6417 20.987C22.277 21.8231 22.2968 21.841 22.6071 21.859C22.828 21.8718 22.9412 21.8302 23.0977 21.6787C23.2928 21.4899 23.3444 21.1892 23.223 20.9474C23.1879 20.8773 22.9291 20.5182 22.6481 20.1494L22.137 19.4787L22.2636 19.2771C22.4949 18.9087 22.6021 18.56 22.6245 18.103C22.6467 17.6486 22.5631 17.2516 22.3651 16.872C22.2943 16.7362 18.862 11.7231 15.5879 6.9735L15.4919 6.83422L15.4789 4.9231L15.4659 3.01201L15.4006 2.78703C15.3187 2.50494 15.2175 2.2628 15.1037 2.07651C14.531 1.1391 13.5592 0.64004 12.4679 0.722888ZM12.37 2.05158C11.9864 2.13505 11.5586 2.47645 11.3883 2.83508C11.2345 3.15906 11.2328 3.1807 11.2323 4.86601L11.2319 6.38401H12.7079H14.1839V4.87998C14.1839 3.88801 14.1749 3.32216 14.1573 3.21798C14.1426 3.1311 14.0905 2.97361 14.0415 2.86801C13.7482 2.23647 13.0616 1.9011 12.37 2.05158ZM2.94648 6.78133C2.87088 6.79966 2.75218 6.84346 2.68268 6.87867C2.51283 6.96474 2.25389 7.21933 2.16324 7.38942C2.00979 7.67734 2.01593 7.55132 2.01593 10.409V13.008H3.25193H4.48793L4.48757 10.422C4.48719 7.60923 4.49043 7.68157 4.35272 7.40955C4.271 7.2481 3.98384 6.96094 3.82239 6.87922C3.56765 6.75025 3.23024 6.71254 2.94648 6.78133ZM10.7338 7.87801C10.6433 7.98692 9.47482 9.40981 8.13718 11.04C6.79954 12.6702 5.66614 14.0458 5.6185 14.0969C5.57088 14.148 5.47793 14.2154 5.41193 14.2466L5.29193 14.3035L3.65393 14.3038L2.01593 14.304V15.78V17.256L4.01393 17.2554L6.01193 17.2548L9.73193 12.5005C11.7779 9.88558 13.4606 7.73127 13.4711 7.71308C13.4873 7.68514 13.2886 7.68001 12.1943 7.68001H10.8983L10.7338 7.87801ZM14.0279 9.12543C13.6055 9.66646 13.2521 10.1227 13.2426 10.1393C13.2226 10.1739 19.1655 18.5224 19.3802 18.7613C19.7005 19.1177 20.2356 19.2182 20.6812 19.0055C21.2311 18.7431 21.4791 18.074 21.229 17.5277C21.1782 17.4165 14.9073 8.2561 14.8224 8.16886C14.8029 8.14894 14.5924 8.40243 14.0279 9.12543ZM2.01593 19.0921V19.6081L2.6322 20.5326C2.97113 21.041 3.25604 21.4487 3.26528 21.4385C3.27452 21.4284 3.5534 21.0124 3.885 20.5142L4.48793 19.6085V19.0922V18.576H3.25193H2.01593V19.0921Z" fill="#1D1D1F"/></svg>';

  var deps = null;

  function init(homeDeps) {
    deps = homeDeps;
  }

  function createFadeInItem(staggerIndex) {
    var el = document.createElement("div");
    el.className = "home-fade-item";
    el.setAttribute("data-stagger", String(staggerIndex));
    return el;
  }

  function triggerFadeIn(root) {
    root.classList.add("home-screen--animate");
  }

  function createHathaTitle(fontSizePx) {
    var title = document.createElement("h1");
    title.className = "hatha-title";
    title.style.fontSize = fontSizePx + "px";
    title.textContent = "hatha";
    return title;
  }

  function createCollabFooter() {
    var footer = document.createElement("footer");
    footer.className = "collab-footer";

    var label = document.createElement("span");
    label.className = "collab-footer__label";
    label.textContent = "Collab: Larissa Matos & Laura Reinas";

    footer.appendChild(label);
    return footer;
  }

  function createBackButton(onClick) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "back-button back-button--asset";
    btn.setAttribute("aria-label", "Back");
    btn.innerHTML =
      '<span class="back-button__icon-wrap" aria-hidden="true">' +
      ICON_BACK +
      "</span>";
    btn.onclick = onClick;
    return btn;
  }

  function createMenuHeader() {
    var header = document.createElement("header");
    header.className = "menu-screen__header";

    var back = createBackButton(function () {
      tutorialIndex = Math.max(0, TUTORIAL_SLIDES.length - 1);
      tutorialMount = null;
      deps.setState(deps.STATE.TUTORIAL);
    });

    var title = createHathaTitle(28);
    title.className = "hatha-title menu-screen__title";

    header.appendChild(back);
    header.appendChild(title);
    return header;
  }

  function createScanCard(iconHtml, titleText, descriptionText, onClick) {
    var card = document.createElement("div");
    card.className = "scan-card";
    card.onclick = onClick;

    var icon = document.createElement("div");
    icon.className = "scan-icon";
    icon.innerHTML = iconHtml;

    var title = document.createElement("div");
    title.className = "scan-title";
    title.textContent = titleText;

    var description = document.createElement("div");
    description.className = "scan-description";
    description.textContent = descriptionText;

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(description);
    return card;
  }

  function createMenuCards() {
    var cardA11y = createScanCard(
      SCAN_ICON_A11Y,
      "Component Accessibility",
      "Scan for components and add accessibility documentation (labels, feedback, etc.).",
      function () {
        deps.startLoading("component");
        deps.postToPlugin({ type: "scan-components" });
      }
    );

    var cardWg = createScanCard(
      SCAN_ICON_WG,
      "Writing Guidelines",
      "A library of aria labels and usage examples, organized by component.",
      function () {
        deps.setState(deps.STATE.WRITING_GUIDELINES);
      }
    );

    return [cardA11y, cardWg];
  }

  function skipTutorial() {
    tutorialIndex = Math.max(0, TUTORIAL_SLIDES.length - 1);
    tutorialMount = null;
    deps.setState(deps.STATE.READY);
  }

  function goToTutorialSlide(nextIndex) {
    if (nextIndex < 0 || nextIndex >= TUTORIAL_TOTAL) return;
    if (nextIndex === tutorialIndex) return;
    if (!TUTORIAL_SLIDES[nextIndex]) {
      skipTutorial();
      return;
    }
    var fromIndex = tutorialIndex;
    tutorialIndex = nextIndex;
    renderTutorial(fromIndex);
  }

  function createTutorialDots(activeIndex) {
    var dots = document.createElement("div");
    dots.className = "tutorial-screen__dots";
    dots.setAttribute("aria-label", "Tutorial progress");

    var track = document.createElement("div");
    track.className = "tutorial-screen__dots-track";

    for (var i = 0; i < TUTORIAL_TOTAL; i++) {
      var dot = document.createElement("span");
      dot.className = "tutorial-screen__dot";
      track.appendChild(dot);
    }

    var active = document.createElement("span");
    active.className = "tutorial-screen__dots-active";
    active.style.setProperty("--tutorial-dot-index", String(activeIndex));
    track.appendChild(active);
    dots.appendChild(track);
    return dots;
  }

  function setTutorialDotIndex(index, animate) {
    if (!tutorialMount || !tutorialMount.activeDot) return;
    if (!animate) {
      tutorialMount.activeDot.style.transition = "none";
      tutorialMount.activeDot.style.setProperty(
        "--tutorial-dot-index",
        String(index)
      );
      void tutorialMount.activeDot.offsetWidth;
      tutorialMount.activeDot.style.transition = "";
      return;
    }
    tutorialMount.activeDot.style.setProperty(
      "--tutorial-dot-index",
      String(index)
    );
  }

  function replayTutorialContentFade() {
    if (!tutorialMount || !tutorialMount.content) return;
    var items = tutorialMount.content.querySelectorAll(".home-fade-item");
    for (var i = 0; i < items.length; i++) {
      items[i].style.animation = "none";
    }
    void tutorialMount.content.offsetWidth;
    for (var j = 0; j < items.length; j++) {
      items[j].style.animation = "";
    }
    tutorialMount.screen.classList.add("home-screen--animate");
  }

  function updateTutorialNav() {
    if (!tutorialMount) return;

    tutorialMount.leftSlot.innerHTML = "";
    if (tutorialIndex > 0) {
      var prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = "tutorial-screen__icon-btn";
      prevBtn.setAttribute("aria-label", "Previous");
      prevBtn.innerHTML = ICON_ARROW_LEFT;
      prevBtn.onclick = function () {
        goToTutorialSlide(tutorialIndex - 1);
      };
      tutorialMount.leftSlot.appendChild(prevBtn);
    }

    tutorialMount.rightSlot.innerHTML = "";
    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "tutorial-screen__icon-btn";
    nextBtn.setAttribute("aria-label", "Next");
    nextBtn.innerHTML = ICON_ARROW_RIGHT;
    if (tutorialIndex < TUTORIAL_TOTAL - 1) {
      nextBtn.onclick = function () {
        goToTutorialSlide(tutorialIndex + 1);
      };
    } else {
      nextBtn.onclick = skipTutorial;
    }
    tutorialMount.rightSlot.appendChild(nextBtn);

    if (tutorialMount.skipBtn) {
      var isLast = tutorialIndex >= TUTORIAL_TOTAL - 1;
      tutorialMount.skipBtn.classList.toggle("is-hidden", isLast);
      tutorialMount.skipBtn.setAttribute("aria-hidden", isLast ? "true" : "false");
      tutorialMount.skipBtn.tabIndex = isLast ? -1 : 0;
      if (isLast) tutorialMount.skipBtn.blur();
    }
  }

  function updateTutorialContentLayout() {
    if (!tutorialMount || !tutorialMount.content) return;
    if (
      tutorialIndex === 0 ||
      tutorialIndex === 1 ||
      tutorialIndex === 2 ||
      tutorialIndex === 3 ||
      tutorialIndex === 4 ||
      tutorialIndex === 5 ||
      tutorialIndex === 6 ||
      tutorialIndex === 7
    ) {
      tutorialMount.content.classList.add("tutorial-screen__content--centered");
    } else {
      tutorialMount.content.classList.remove("tutorial-screen__content--centered");
    }
    if (tutorialMount.image) {
      if (tutorialIndex === 1 || tutorialIndex === 2) {
        tutorialMount.image.classList.add("tutorial-screen__image--sm");
      } else {
        tutorialMount.image.classList.remove("tutorial-screen__image--sm");
      }
      if (tutorialIndex === 7) {
        tutorialMount.image.classList.add("tutorial-screen__image--rounded");
      } else {
        tutorialMount.image.classList.remove("tutorial-screen__image--rounded");
      }
    }
  }

  function updateTutorialSlide(fromDotIndex) {
    var slide = TUTORIAL_SLIDES[tutorialIndex];
    if (!slide || !tutorialMount) return;

    tutorialMount.image.src = slide.image;
    tutorialMount.title.textContent = slide.title;
    tutorialMount.copy.textContent = slide.body;
    updateTutorialContentLayout();
    updateTutorialNav();
    replayTutorialContentFade();

    if (typeof fromDotIndex === "number" && fromDotIndex !== tutorialIndex) {
      setTutorialDotIndex(fromDotIndex, false);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          setTutorialDotIndex(tutorialIndex, true);
        });
      });
    } else {
      setTutorialDotIndex(tutorialIndex, false);
    }
  }

  function renderTutorial(fromDotIndex) {
    if (!deps || !deps.app) return;
    var slide = TUTORIAL_SLIDES[tutorialIndex];
    if (!slide) {
      skipTutorial();
      return;
    }

    if (tutorialMount && deps.app.contains(tutorialMount.screen)) {
      updateTutorialSlide(fromDotIndex);
      return;
    }

    deps.app.innerHTML = "";
    tutorialMount = null;

    var screen = document.createElement("div");
    screen.className = "home-screen tutorial-screen";

    var body = document.createElement("div");
    body.className = "tutorial-screen__body";

    var content = document.createElement("div");
    content.className = "tutorial-screen__content";

    var imageWrap = createFadeInItem(0);
    imageWrap.className += " tutorial-screen__image-wrap";
    var image = document.createElement("img");
    image.className = "tutorial-screen__image";
    image.src = slide.image;
    image.alt = "";
    image.setAttribute("loading", "eager");
    imageWrap.appendChild(image);

    var titleWrap = createFadeInItem(1);
    var title = document.createElement("h1");
    title.className = "tutorial-screen__title";
    title.textContent = slide.title;
    titleWrap.appendChild(title);

    var copyWrap = createFadeInItem(2);
    var copy = document.createElement("p");
    copy.className = "tutorial-screen__copy";
    copy.textContent = slide.body;
    copyWrap.appendChild(copy);

    content.appendChild(imageWrap);
    content.appendChild(titleWrap);
    content.appendChild(copyWrap);

    var dots = createTutorialDots(tutorialIndex);
    var activeDot = dots.querySelector(".tutorial-screen__dots-active");

    body.appendChild(content);
    body.appendChild(dots);

    var footer = createFadeInItem(3);
    footer.className += " tutorial-screen__footer";

    var leftSlot = document.createElement("div");
    leftSlot.className = "tutorial-screen__footer-slot";

    var skipBtn = document.createElement("button");
    skipBtn.type = "button";
    skipBtn.className = "tutorial-screen__skip";
    skipBtn.textContent = "Skip tutorial";
    skipBtn.onclick = skipTutorial;

    var rightSlot = document.createElement("div");
    rightSlot.className = "tutorial-screen__footer-slot";

    footer.appendChild(leftSlot);
    footer.appendChild(skipBtn);
    footer.appendChild(rightSlot);

    screen.appendChild(body);
    screen.appendChild(footer);
    deps.app.appendChild(screen);

    tutorialMount = {
      screen: screen,
      content: content,
      image: image,
      title: title,
      copy: copy,
      activeDot: activeDot,
      leftSlot: leftSlot,
      rightSlot: rightSlot,
      skipBtn: skipBtn,
    };

    updateTutorialContentLayout();
    updateTutorialNav();
    triggerFadeIn(screen);
  }

  function renderMenu() {
    if (!deps || !deps.app) return;
    deps.app.innerHTML = "";

    var screen = document.createElement("div");
    screen.className = "home-screen menu-screen";

    var headerWrap = createFadeInItem(0);
    headerWrap.appendChild(createMenuHeader());
    screen.appendChild(headerWrap);

    var content = document.createElement("div");
    content.className = "menu-screen__content";

    var cards = createMenuCards();
    for (var i = 0; i < cards.length; i++) {
      var cardWrap = createFadeInItem(i + 1);
      cardWrap.appendChild(cards[i]);
      content.appendChild(cardWrap);
    }

    screen.appendChild(content);

    var footerWrap = createFadeInItem(3);
    footerWrap.className += " onboarding-screen__footer-wrap";
    footerWrap.appendChild(createCollabFooter());
    screen.appendChild(footerWrap);
    deps.app.appendChild(screen);

    triggerFadeIn(screen);
  }

  root.HomeScreens = {
    init: init,
    renderTutorial: renderTutorial,
    renderMenu: renderMenu,
  };
})(typeof window !== "undefined" ? window : this);
