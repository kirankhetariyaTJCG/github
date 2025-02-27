"use strict";

var OnlineOrder = function () {
    this.initialize = function (options = {}) {
        this.iframeUrl = options.iframeSrc || "";
        this.iframeStyles = options.iframeStyles || {};
        this.applyButtonStyles();
        this.addButtonListeners();
    };

    this.applyButtonStyles = function () {
        const buttonStyles = {
            padding: "15px",
            margin: "4px",
            boxSizing: "border-box",
            cursor: "pointer",
            textAlign: "center",
            verticalAlign: "middle",
            color: "#FFF",
            fontFamily: "'Arial', sans-serif",
            fontSize: "1.0625rem",
            fontWeight: "600",
            borderRadius: "8px",
            backgroundColor: "#4E9F3D",
        };

        const reservationButtonStyles = {
            backgroundColor: "#FF5833",
            border: "1px solid #FFF",
            color: "#FFF",
        };

        const buttons = document.querySelectorAll(".roos-button");
        buttons.forEach((button) => {
            this.applyStyles(button, buttonStyles);

            if (button.classList.contains("reservation")) {
                this.applyStyles(button, reservationButtonStyles);
            }
        });
    };

    this.addButtonListeners = function () {
        const buttons = document.querySelectorAll("[data-rid]");
        buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const rid = e.target.getAttribute("data-rid");
                const isTable = e.target.getAttribute("data-is-table") === "true";

                this.openIframe(rid, isTable);
            });
        });
    };

    this.openIframe = function (rid, isTable) {
        this.showLoading();
        setTimeout(() => {
            var iframeUrl = `https://web.1roos.com/?restaurant_id=${rid}`;
            if (isTable) {
                iframeUrl += "&isTable=true";
            }
            this.hideLoading();
            document.documentElement.style.overflow = "hidden";
            this.createIframe(iframeUrl);
        }, 1000);
    };

    this.closeIframe = function () {
        if (this.iframeContainer) {
            document.body.removeChild(this.iframeContainer);
        }
        document.documentElement.style.overflow = "auto";
    };

    this.createIframe = function (iframeUrl) {
        this.iframeContainer = document.createElement("div");
        this.iframeContainer.classList.add("custom-iframe-container");

        this.iframe = document.createElement("iframe");
        this.iframe.src = iframeUrl;
        this.iframe.classList.add("custom-iframe");
        this.iframe.setAttribute("frameborder", "0");

        this.closeButton = document.createElement("span");
        this.closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 7l10 10M7 17L17 7"/></svg>`;
        this.closeButton.classList.add("custom-iframe-close");
        this.closeButton.addEventListener("click", () => this.closeIframe());

        this.iframeContainer.appendChild(this.closeButton);
        this.iframeContainer.appendChild(this.iframe);

        this.applyIframeStyles();
        this.applyContainerStyles();
        document.body.appendChild(this.iframeContainer);
    };

    this.showLoading = function () {
        this.loadingSpinner = document.createElement("div");
        this.loadingSpinner.classList.add("custom-loading");
        this.loadingSpinner.innerHTML = `<div class="loading-spinner"></div>`;
        document.body.appendChild(this.loadingSpinner);
        this.applyLoadingStyles();
    };

    this.hideLoading = function () {
        if (this.loadingSpinner) {
            document.body.removeChild(this.loadingSpinner);
        }
    };

    this.applyStyles = function (element, styles) {
        Object.keys(styles).forEach((key) => {
            element.style[key] = styles[key];
        });
    };

    this.applyContainerStyles = function () {
        const containerStyles = {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: "9999",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        };
        this.applyStyles(this.iframeContainer, containerStyles);
    };

    this.applyIframeStyles = function () {
        const iframeStyles = Object.assign(
            { width: "100%", height: "100%", border: "none" },
            this.iframeStyles
        );
        this.applyStyles(this.iframe, iframeStyles);

        const closeButtonStyles = {
            position: "absolute",
            zIndex: "10",
            top: "90px",
            left: "calc(50% + 480px)",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#0009",
            color: "#fff",
            boxShadow: "0 2px 10px #00000080",
            cursor: "pointer",
            display: 'flex'
        };
        this.applyStyles(this.closeButton, closeButtonStyles);
    };

    this.applyLoadingStyles = function () {
        const loadingStyles = {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "9999"
        };

        const spinnerStyles = {
            width: "50px",
            height: "50px",
            border: "5px solid #f3f3f3",
            borderTop: "5px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
        };

        this.applyStyles(this.loadingSpinner, loadingStyles);
        this.applyStyles(this.loadingSpinner.querySelector(".loading-spinner"), spinnerStyles);

        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerHTML = `@keyframes spin {0% {transform: rotate(0deg);}100% {transform: rotate(360deg);}}`;
        document.head.appendChild(styleSheet);
    };
};

// Script loading (check for existing script before appending)
if (!document.querySelector('script[src="https://1roos.com/sdk/sdk.js"]')) {
    var s = document.createElement("script");
    s.src = `https://1roos.com/sdk/sdk.js`;
    s.async = true;
    var e = document.getElementsByTagName("script")[0];
    e.parentNode.insertBefore(s, e);
    var onlineOrderSDK;
    s.onload = function () {
        onlineOrderSDK = new OnlineOrder();
        onlineOrderSDK.initialize();
    };
}
