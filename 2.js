const dataForm = document.getElementById('data-form');
const thankYou = document.getElementById('thankyou');
const adminLoginBtn = document.getElementById('admin-login-btn');
const adminPassInput = document.getElementById('admin-pass');
const adminPanel = document.getElementById('admin-panel');
const submissionsList = document.getElementById('submissions-list');

// Load submissions from localStorage
let submissions = JSON.parse(localStorage.getItem('submissions')) || [];

// Handle form submission
dataForm.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim() || "Anonymous";
    const message = document.getElementById('message').value.trim();

    if(!message) return;

    const submission = { name, message };
    submissions.push(submission);

    // Save to localStorage
    localStorage.setItem('submissions', JSON.stringify(submissions));

    // Reset form and show thank you
    dataForm.reset();
    thankYou.style.display = 'block';
    setTimeout(() => { thankYou.style.display = 'none'; }, 3000);
});

// Admin login
adminLoginBtn.addEventListener('click', ()=>{
    const password = adminPassInput.value;
    if(password === "admin123"){ // <-- Your admin password
        adminPanel.style.display = 'block';
        displaySubmissions();
        adminPassInput.style.display = 'none';
        adminLoginBtn.style.display = 'none';
    } else {
        alert("Wrong password!");
    }
});

// Display submissions
function displaySubmissions(){
    submissionsList.innerHTML = "";
    submissions.forEach((sub,index)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index+1}</td>
            <td>${sub.name}</td>
            <td>${sub.message}</td>
        `;
        submissionsList.appendChild(tr);
    });
}