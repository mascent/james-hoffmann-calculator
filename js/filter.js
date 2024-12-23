const filterMenu = document.querySelector(".filter");
const filterListcreator = document.querySelector(".creators");
const filterListDevice = document.querySelector(".devices");
const filterListtagg = document.querySelector(".taggs");
const filterButtons = filterMenu.querySelectorAll(".filter-btn");
const recipies = document.querySelectorAll(".recipieFilterSelector");

const filterTypeEnum = {
    creator: "creator",
    device: "device",
    tagg: "tagg"
}



let activecreator = "all";
let activeDevice = "all";
let activetagg = "all";
let conferenceIndex = 0;

recipies.forEach((conference) => {
    conference.style.viewTransitionName = `conf-${++conferenceIndex}`;
});

filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let filterType = null;
        switch (e.target.classList.values().find(x => x.includes("filter-btn-"))){
            case "filter-btn-auth":
                activecreator = e.target.getAttribute("data-filter-creator");
                filterType = filterTypeEnum.creator;
                break;
            case "filter-btn-device":
                activeDevice = e.target.getAttribute("data-filter-device");
                filterType = filterTypeEnum.device;
                break;
            case "filter-btn-taggs":
                activetagg = e.target.getAttribute("data-filter-tagg")
                filterType = filterTypeEnum.tagg;
                break;
            default:
                return;
        }
        if (!document.startViewTransition) {
            updateActiveButton(e.target, filterType);
            filterEvents();
        }

        document.startViewTransition(() => {
            updateActiveButton(e.target, filterType);
            filterEvents();
        });
    });
});


function updateActiveButton(newButton, iscreator) {
    let list = null;
    switch (iscreator) {
        case filterTypeEnum.creator:
            list = filterListcreator;
            break;
        case filterTypeEnum.device:
            list = filterListDevice;
            break;
        case filterTypeEnum.tagg:
            list = filterListtagg;
            break;
        default:
            return;
    }
    list.querySelector(".active").classList.remove("active");
    newButton.classList.add("active");
}

function filterEvents() {
    recipies.forEach((conference) => {
        // get each conferences category
        let recipiecreators = (conference.getAttribute("data-creator") || "").split(",");
        let recipieDevice = conference.getAttribute("data-device" || "");
        let recipietagg = (conference.getAttribute("data-tagg") || "").split(",");

        // check if that category matches with the filter
        if ((activecreator === "all" || recipiecreators.includes(activecreator))
            && (activeDevice === "all" || activeDevice === recipieDevice)
            && (activetagg === "all" || recipietagg.includes(activetagg))) {
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