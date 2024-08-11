document.addEventListener('DOMContentLoaded', function() {
    const showFormButton = document.getElementById('showFormButton');
    const showTableButton = document.getElementById('showTableButton');
    const formSection = document.getElementById('formSection');
    const tableSection = document.getElementById('tableSection');
    const marksForm = document.getElementById('marksForm');
    const resultsTable = document.getElementById('resultsTable').querySelector('tbody');
    const subjectSelect = document.getElementById('subject');
    const maxEntries = 7;
    const usedSubjects = new Set(); 
    const calculateAps = document.getElementById("calculateAps");
    const apsScore = document.getElementById("apsScore");
const formFull=document.getElementById("formFull")
    showFormButton.addEventListener('click', function() {
        formSection.style.display = 'block'; 
        tableSection.style.display = 'none'; 
        showTableButton.textContent = "View Marks";
    });

    showTableButton.addEventListener('click', function() {
        formSection.style.display = 'none'; 
        tableSection.style.display = 'block'; 
        showTableButton.textContent = "View Suggested Courses";
    });

    function updateSubjectOptions() {
        const options = subjectSelect.options;
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            option.disabled = usedSubjects.has(option.value);
        }
    }

    function calculateSum() {
        let totalSum = 0;
        const rows = resultsTable.querySelectorAll('tr');
        rows.forEach(row => {
            const levelCell = row.cells[3]; 
            const level = parseInt(levelCell.textContent, 10);
            if (!isNaN(level)) {
                totalSum += level;
            }
        });
        return totalSum;
    }

    calculateAps.addEventListener('click', function(event) {
        event.preventDefault();

        if (resultsTable.rows.length >= maxEntries) {
            const sum = calculateSum();
            apsScore.textContent = `APS TOTAL = ${sum}`;
        } else {
            apsScore.textContent = `Fill in ${maxEntries} subjects to calculate your APS score`;
            apsScore.style.color = "red"; 
            setTimeout(function() {
                apsScore.textContent = ""; 
                apsScore.style.color = ""; 
            }, 3000);
            alert(`Enter ${maxEntries} subjects to calculate APS`);
        }
    });

    marksForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (resultsTable.rows.length >= maxEntries) {
            formFull.textContent="7 subjects entered click view marks "
            formFull.style.color="red"
            alert('You can only enter up to 7 subjects.');
            return;
        }

        const subject = document.getElementById('subject').value;
        const marks = document.getElementById('marks').value;
        const level = document.getElementById('level').value;

        if (usedSubjects.has(subject)) {
            alert('This subject has already been added.');
            return;
        }

        const row = document.createElement('tr');
        const lineCell = document.createElement('td');
        lineCell.textContent = resultsTable.rows.length + 1;
        const subjectCell = document.createElement('td');
        subjectCell.textContent = subject;
        const marksCell = document.createElement('td');
        marksCell.textContent = marks;
        const levelCell = document.createElement('td');
        levelCell.textContent = level;

        row.appendChild(lineCell);
        row.appendChild(subjectCell);
        row.appendChild(marksCell);
        row.appendChild(levelCell);

        resultsTable.appendChild(row);
        usedSubjects.add(subject);
        updateSubjectOptions();
        marksForm.reset();
        formSection.style.display = 'none';
        tableSection.style.display = 'block';
    });

    updateSubjectOptions();
});
