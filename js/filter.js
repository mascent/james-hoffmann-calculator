const filterMenu = document.querySelector(".filter");
const filterListcreator = document.querySelector(".creators");
const filterListDevice = document.querySelector(".devices");
const filterButtons = filterMenu.querySelectorAll(".filter-btn");
const recipies = document.querySelectorAll(".recipieFilterSelector");
let activecreator = "all";
let activeDevice = "all";
let conferenceIndex = 0;

recipies.forEach((conference) => {
    conference.style.viewTransitionName = `conf-${++conferenceIndex}`;
});

filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let iscreator = false;
        if (e.target.classList.contains("filter-btn-auth")) {
            let confCategory = e.target.getAttribute("data-filter-creator");
            activecreator = confCategory;
            iscreator = true;
        } else {
            let confCategory = e.target.getAttribute("data-filter-device");
            activeDevice = confCategory;
        }
        if (!document.startViewTransition) {
            updateActiveButton(e.target, iscreator);
            filterEvents();
        }

        document.startViewTransition(() => {
            updateActiveButton(e.target, iscreator);
            filterEvents();
        });
    });
});


function updateActiveButton(newButton, iscreator) {
    let list = iscreator ? filterListcreator : filterListDevice
    list.querySelector(".active").classList.remove("active");
    newButton.classList.add("active");
}

function filterEvents() {
    recipies.forEach((conference) => {
        // get each conferences category
        let recipiecreators = (conference.getAttribute("data-creator") || "").split(",");
        let recipieDevice = conference.getAttribute("data-device");

        // check if that category matches with the filter
        if ((activecreator === "all" || recipiecreators.includes(activecreator)) && (activeDevice === "all" || activeDevice === recipieDevice)) {
            conference.removeAttribute("hidden");
        } else {
            conference.setAttribute("hidden", "");
        }
    });
}

function toggleFilterMenu() {
    if (!document.startViewTransition) {
        filterMenu.toggleAttribute("hidden");
    }

    document.startViewTransition(() => {
        filterMenu.toggleAttribute("hidden");
    });

}