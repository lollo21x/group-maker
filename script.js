document.addEventListener('DOMContentLoaded', function() {
    // Lista di persone predefinita
    const people = [
        "Theodore Ambrogi",
        "Lorenzo Bacalini",
        "Anamika Badial",
        "Sara Burzacca",
        "Alessia Buselli",
        "Arianna Buselli",
        "Lorenzo Cingolani",
        "Gabriele Dipasquale",
        "Alessandro Eleuteri",
        "Riccardo Gerini",
        "Mario Gulino",
        "Zhennan Hu",
        "Mariana Lopez",
        "Mose' Mariangeli",
        "Angela Mazzarella",
        "Elena Monno",
        "Federica Nocerino",
        "Riccardo Persigilli",
        "Marco Radatti",
        "Federico Romaldini",
        "Maksym Sachuk",
        "Andrea Santini",
        "Simone Tardini",
        "Davide Tonti",
        "Igli Xhepa",
        "Jiayi Xiong"
    ];

    // Elementi DOM
    const generateBtn = document.getElementById('generateBtn');
    const groupSizeInput = document.getElementById('groupSize');
    const groupsContainer = document.getElementById('groupsContainer');
    const infoIcon = document.getElementById('infoIcon');
    const backIcon = document.getElementById('backIcon');
    const githubIcon = document.getElementById('githubIcon');
    const overlay = document.getElementById('overlay');
    const infoModal = document.getElementById('infoModal');
    const closeInfoModal = document.getElementById('closeInfoModal');

    // Funzione per mescolare un array (Algoritmo di Fisher-Yates)
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Funzione per dividere le persone in gruppi
    function createGroups(peopleList, groupSize) {
        const shuffledPeople = shuffleArray(peopleList);
        const groups = [];
        let currentIndex = 0;
        while (currentIndex < shuffledPeople.length) {
            const actualGroupSize = currentIndex + groupSize <= shuffledPeople.length 
                ? groupSize 
                : shuffledPeople.length - currentIndex;
            groups.push(shuffledPeople.slice(currentIndex, currentIndex + actualGroupSize));
            currentIndex += actualGroupSize;
        }
        return groups;
    }

    // Funzione per visualizzare i gruppi
    function displayGroups(groups) {
        groupsContainer.innerHTML = '';
        groups.forEach((group, index) => {
            const groupElement = document.createElement('div');
            groupElement.className = 'group';
            const groupTitle = document.createElement('h3');
            groupTitle.textContent = `Gruppo ${index + 1}`;
            groupElement.appendChild(groupTitle);
            const membersList = document.createElement('ul');
            group.forEach(person => {
                const listItem = document.createElement('li');
                listItem.textContent = person;
                membersList.appendChild(listItem);
            });
            groupElement.appendChild(membersList);
            groupsContainer.appendChild(groupElement);
        });
    }

    // Event listeners
    generateBtn.addEventListener('click', function() {
        const groupSize = parseInt(groupSizeInput.value, 10);
        if (isNaN(groupSize) || groupSize < 1) {
            alert('Inserisci un numero valido di persone per gruppo');
            return;
        }
        if (groupSize > 13) {
            alert('Impossibile creare un gruppo con più di 13 persone!');
            return;
        }
        if (groupSize > people.length) {
            alert('Il numero di persone per gruppo non può essere maggiore del numero totale di persone!');
            return;
        }
        const groups = createGroups(people, groupSize);
        displayGroups(groups);
    });

    // Gestione delle modali
    infoIcon.addEventListener('click', function() {
        overlay.style.display = 'block';
        infoModal.style.display = 'block';
    });
    closeInfoModal.addEventListener('click', function() {
        overlay.style.display = 'none';
        infoModal.style.display = 'none';
    });
    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
        infoModal.style.display = 'none';
    });

    // Gestione dei pulsanti di navigazione
    if (backIcon) {
        backIcon.addEventListener('click', function() {
            window.location.href = 'https://lollo21x.github.io/hub3d/';
        });
    }
    githubIcon.addEventListener('click', function() {
        window.open('https://github.com/lollo21x/group-maker', '_blank');
    });

    // Generazione dei gruppi all'avvio
    // generateBtn.click();
});