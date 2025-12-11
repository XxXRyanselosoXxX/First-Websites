const projects = document.querySelectorAll('.project-link');

projects.forEach(project => {
    project.addEventListener('click', (e) => {
        alert(`Opening ${project.textContent}...`);
    });
});