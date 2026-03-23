document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Ստեղծում ենք Խաղերի տվյալներ (Mock Data)
    const matches = [
        { home: "Barcelona", away: "Las Palmas", date: "Մարտ 30, 2024", competition: "La Liga" },
        { home: "PSG", away: "Barcelona", date: "Ապրիլ 10, 2024", competition: "Champions League" },
        { home: "Cadiz", away: "Barcelona", date: "Ապրիլ 13, 2024", competition: "La Liga" }
    ];

    // 2. Ստեղծում ենք Լուրերի տվյալներ (Mock Data)
    const news = [
        { title: "Յամալը նոր ռեկորդ է սահմանում Լա Լիգայում:", date: "Այսօր", link: "#" },
        { title: "Չեմպիոնների Լիգա. Բարսելոնան պատրաստվում է Փարիզյան ուղևորությանը:", date: "Երեկ", link: "#" },
        { title: "Լևանդովսկին ճանաչվել է ամսվա լավագույն ֆուտբոլիստ:", date: "2 օր առաջ", link: "#" }
    ];

    // 3. Ֆունկցիա, որը նկարում է խաղերը էկրանին
    const matchesContainer = document.getElementById('matches-container');
    matches.forEach((match, index) => {
        const matchElement = document.createElement('div');
        matchElement.className = 'list-item';
        // Փոխում ենք ձախ կողմի գիծը ՉԼ խաղերի համար
        if(match.competition === "Champions League") {
            matchElement.style.borderLeftColor = "#004D98"; 
        }

        matchElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong>${match.home} vs ${match.away}</strong>
                <span style="font-size: 0.75rem; background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 4px;">${match.competition}</span>
            </div>
            <span class="date-text">⏱ ${match.date}</span>
        `;
        matchesContainer.appendChild(matchElement);
    });

    // 4. Ֆունկցիա, որը նկարում է լուրերը
    const newsContainer = document.getElementById('news-container');
    news.forEach(item => {
        const newsElement = document.createElement('div');
        newsElement.className = 'list-item';
        newsElement.innerHTML = `
            <a href="${item.link}" class="news-link">📰 ${item.title}</a>
            <span class="date-text">${item.date}</span>
        `;
        newsContainer.appendChild(newsElement);
    });

});
