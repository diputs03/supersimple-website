document.addEventListener("DOMContentLoaded", () => {
    const tutorials = document.querySelectorAll(".tutorial");

    tutorials.forEach(tutorial => {
        const title = tutorial.querySelector(".tutorial-title");
        const content = tutorial.querySelector(".tutorial-content");

        title.addEventListener("click", () => {
            const isActive = content.style.display === "block";
            document.querySelectorAll(".tutorial-content").forEach(tc => tc.style.display = "none");

            if (!isActive) {
                content.style.display = "block";
            }
        });
    });
});
