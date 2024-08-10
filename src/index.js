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

    showFormButton.addEventListener('click', function() {
        formSection.style.display = 'block'; 
        tableSection.style.display = 'none'; 
    });

    showTableButton.addEventListener('click', function() {
        formSection.style.display = 'none'; 
        tableSection.style.display = 'block'; 
    });

    function updateSubjectOptions() {
        const options = subjectSelect.options;
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            if (usedSubjects.has(option.value)) {
                option.disabled = true; 
            } else {
                option.disabled = false; 
            }
        }
    }

    marksForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        if (resultsTable.rows.length >= maxEntries) {
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
