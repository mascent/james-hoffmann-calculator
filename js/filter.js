const filterMenu = document.querySelector(".filter");
const filterListAuthor = document.querySelector(".authors");
const filterListDevice = document.querySelector(".devices");
const filterButtons = filterMenu.querySelectorAll(".filter-btn");
const recipies = document.querySelectorAll(".recipieFilterSelector");
let activeAuthor = "all";
let activeDevice = "all";
let conferenceIndex = 0;

recipies.forEach((conference) => {
    conference.style.viewTransitionName = `conf-${++conferenceIndex}`;
});

filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let isAuthor = false;
        if (e.target.classList.contains("filter-btn-auth")) {
            let confCategory = e.target.getAttribute("data-filter-author");
            activeAuthor = confCategory;
            isAuthor = true;
        } else {
            let confCategory = e.target.getAttribute("data-filter-device");
            activeDevice = confCategory;
        }
        if (!document.startViewTransition) {
            updateActiveButton(e.target, isAuthor);
            filterEvents();
        }

        document.startViewTransition(() => {
            updateActiveButton(e.target, isAuthor);
            filterEvents();
        });
    });
});


function updateActiveButton(newButton, isAuthor) {
    let list = isAuthor ? filterListAuthor : filterListDevice
    list.querySelector(".active").classList.remove("active");
    newButton.classList.add("active");
}

function filterEvents() {
    recipies.forEach((conference) => {
        // get each conferences category
        let recipieAuthors = (conference.getAttribute("data-author") || "").split(",");
        let recipieDevice = conference.getAttribute("data-device");

        // check if that category matches with the filter
        if ((activeAuthor === "all" || recipieAuthors.includes(activeAuthor)) && (activeDevice === "all" || activeDevice === recipieDevice)) {
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