document.addEventListener("DOMContentLoaded", () => {
    fetch("projects.json")
        .then(res => res.json())
        .then(projects => {
            const cardsContainer = document.querySelector(".cards");
            const modal = document.getElementById("project-modal");
            const titleEl = document.getElementById("modal-title");
            const videoEl = document.getElementById("modal-video");
            const descEl = document.getElementById("modal-description");
            const closeBtn = document.getElementById("modal-close");

            function openProjectModal(project) {
                titleEl.textContent = project.title;
                descEl.textContent = project.description || "";
                videoEl.src = `https://www.youtube.com/embed/${project.videoId}`;
                modal.classList.remove("hidden");
                history.pushState(null, "", `?project=${project.slug}`);
            }

            function closeProjectModal() {
                modal.classList.add("hidden");
                videoEl.src = ""; // stop video
                history.pushState(null, "", "index.html");
            }

            projects.forEach(project => {
                const card = document.createElement("div");
                card.className = "card";

                const img = document.createElement("img");
                img.src = project.image;
                img.alt = project.alt || project.title;
                img.width = 120;
                img.height = 90;

                const link = document.createElement("a");
                link.href = `?project=${project.slug}`;
                link.textContent = project.title;
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    openProjectModal(project);
                });

                card.appendChild(img);
                card.appendChild(link);
                cardsContainer.appendChild(card);
            });

            closeBtn.addEventListener("click", closeProjectModal);

            // Open modal if ?project=<slug> in URL
            const params = new URLSearchParams(window.location.search);
            const slug = params.get("project");
            if (slug) {
                const match = projects.find(p => p.slug === slug);
                if (match) openProjectModal(match);
            }
        });
});