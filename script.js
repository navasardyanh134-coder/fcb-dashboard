// 1. Թիմերի լոգոների բազա
const teamLogos = {
    "barcelona": "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/250px-FC_Barcelona_%28crest%29.svg.png",
    "atletico madrid": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Atletico_Madrid_Logo_2024.svg/250px-Atletico_Madrid_Logo_2024.svg.png",
    "espanyol": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/RCD_Espanyol_logo.svg/250px-RCD_Espanyol_logo.svg.png",
    "getafe": "https://upload.wikimedia.org/wikipedia/hy/7/77/%D4%BD%D5%A5%D5%BF%D5%A1%D6%86%D5%A5_%28%D6%86%D5%B8%D6%82%D5%BF%D5%A2%D5%B8%D5%AC%D5%A1%D5%B5%D5%AB%D5%B6_%D5%A1%D5%AF%D5%B8%D6%82%D5%B4%D5%A2%29.png",
    "sl benfica": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/250px-SL_Benfica_logo.svg.png",
    "celta de vigo": "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/RC_Celta_de_Vigo_logo.svg/200px-RC_Celta_de_Vigo_logo.svg.png"
};

// 2. Խաղացանկ
const barcaGames = [
    { opponent: "Atlético Madrid", date: "Sat, Apr 04", time: "21:00", comp: "La Liga", id: "atletico madrid" },
    { opponent: "SL Benfica", date: "Wed, Apr 08", time: "21:00", comp: "Champions League", id: "sl benfica" },
    { opponent: "Espanyol", date: "Sat, Apr 11", time: "18:30", comp: "La Liga", id: "espanyol" },
    { opponent: "SL Benfica", date: "Tue, Apr 14", time: "21:00", comp: "Champions League", id: "sl benfica" },
    { opponent: "Celta de Vigo", date: "Wed, Apr 22", time: "TBA", comp: "La Liga", id: "celta de vigo" },
    { opponent: "Getafe", date: "Sun, Apr 26", time: "TBA", comp: "La Liga", id: "getafe" }
];

// 3. Ռմբարկուներ (Բոլոր 6-ը)
const topScorers = [
    { name: "Robert Lewandowski", goals: 18, team: "Barcelona", photo: "https://img.uefa.com/imgml/TP/players/1/2026/324x324/250002096.jpg" },
    { name: "Kylian Mbappé", goals: 16, team: "Real Madrid", photo: "https://cdn.futwiz.com/assets/img/fc25/faces/231747.png?25" },
    { name: "Lamine Yamal", goals: 10, team: "Barcelona", photo: "https://img.uefa.com/imgml/TP/players/1/2026/324x324/250176450.jpg" },
    { name: "Raphinha", goals: 9, team: "Barcelona", photo: "https://static0.givemesportimages.com/wordpress/wp-content/uploads/2025/05/raphinha.jpg" },
    { name: "Vinícius Júnior", goals: 9, team: "Real Madrid", photo: "https://vinicius-7.com/wp-content/uploads/2024/11/358618.jpg" },
    { name: "Antoine Griezmann", goals: 8, team: "Atletico Madrid", photo: "https://cdn.futwiz.com/assets/img/fc25/faces/194765.png?25" }
];

// 4. Լուրեր
const newsSources = [
    { title: "FC Barcelona Official News", desc: "Latest updates directly from Camp Nou.", url: "https://www.fcbarcelona.com/en/news" },
    { title: "La Liga Official News", desc: "Spanish league updates and results.", url: "https://www.laliga.com/en-GB" },
    { title: "Mundo Deportivo", desc: "Barça transfer news and rumors.", url: "https://www.mundodeportivo.com/futbol/fc-barcelona" },
    { title: "Sport.es", desc: "Daily coverage of FC Barcelona.", url: "https://www.sport.es/en/barca/" }
];

// Նավիգացիայի ֆունկցիա
function showSection(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-btn'));
    
    const target = document.getElementById(id);
    if(target) {
        target.classList.add('active');
        if(event) event.currentTarget.classList.add('active-btn');
    }
}

// Էջի լցնում
async function init() {
    console.log("Initializing Dashboard...");

    // Լցնել Խաղերը
    const fixCont = document.getElementById("fixtures-container");
    if (fixCont) {
        fixCont.innerHTML = barcaGames.map(g => `
            <div class="fixture-card">
                <div class="teams-row">
                    <div class="team"><img src="${teamLogos.barcelona}"></div>
                    <div class="vs-circle">VS</div>
                    <div class="team"><img src="${teamLogos[g.id] || ''}"></div>
                </div>
                <div class="match-info">
                    <span class="league">${g.comp}</span>
                    <span class="date">${g.date}</span>
                    <span class="time">⏰ ${g.time}</span>
                </div>
            </div>
        `).join('');
    }

    // Լցնել Աղյուսակը (P, W, D, L, PTS)
    const tableCont = document.getElementById("table-container");
    if (tableCont) {
        try {
            const res = await fetch("https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4335");
            const data = await res.json();
            let tblHtml = `<table><thead><tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>PTS</th></tr></thead><tbody>`;
            data.table.forEach(t => {
                const isBarca = t.strTeam === "Barcelona" ? 'class="barca-row"' : '';
                tblHtml += `<tr ${isBarca}>
                    <td>${t.intRank}</td>
                    <td><div class="team-cell"><img src="${t.strBadge}" width="20"> ${t.strTeam}</div></td>
                    <td>${t.intPlayed}</td><td>${t.intWin}</td><td>${t.intDraw}</td><td>${t.intLoss}</td>
                    <td><b>${t.intPoints}</b></td>
                </tr>`;
            });
            tableCont.innerHTML = tblHtml + "</tbody></table>";
        } catch(e) { tableCont.innerHTML = "<p>Error loading table.</p>"; }
    }

    // Լցնել Ռմբարկուները
    const scCont = document.getElementById("scorers-container");
    if (scCont) {
        scCont.innerHTML = topScorers.map((s, i) => `
            <div class="scorer-card">
                <span class="scorer-rank">#${i+1}</span>
                <div class="scorer-photo-wrapper"><img src="${s.photo}" class="scorer-photo"></div>
                <h3>${s.name}</h3>
                <span class="scorer-team">${s.team}</span>
                <div class="scorer-stats"><b>${s.goals}</b> <small>GOALS</small></div>
            </div>
        `).join('');
    }

    // Լցնել Լուրերը
    const newsCont = document.getElementById("news-container");
    if (newsCont) {
        newsCont.innerHTML = newsSources.map(n => `
            <a href="${n.url}" target="_blank" class="news-card">
                <div class="news-info">
                    <h3>${n.title}</h3>
                    <p>${n.desc}</p>
                </div>
                <i class="fas fa-chevron-right"></i>
            </a>
        `).join('');
    }
}

window.onload = init;
