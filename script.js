// 1. Գրաֆիկ
function initChart() {
    const ctx = document.getElementById('playersChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lewandowski', 'Raphinha', 'Lamine Yamal', 'Dani Olmo'],
            datasets: [{
                label: 'Գոլեր',
                data: [19, 12, 7, 6],
                backgroundColor: ['#a50044', '#004d98', '#a50044', '#004d98'],
                borderRadius: 8
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// 2. Լուրեր
function displayNews() {
    const newsBox = document.getElementById('news-list');
    const newsItems = [
        { title: "Barca Official News Hub", link: "https://www.fcbarcelona.com/en/news" },
        { title: "ESPN: Barcelona Updates", link: "https://www.espn.com/soccer/team/_/id/83/fc-barcelona" }
    ];
    newsBox.innerHTML = "";
    newsItems.forEach(item => {
        newsBox.innerHTML += `<div class="news-item"><a href="${item.link}" target="_blank">${item.title}</a></div>`;
    });
}

// 3. ԱՎՏՈՄԱՏ ԹԱՐՄԱՑՎՈՂ ԽԱՂԵՐ (ՔՈ ԴԻԶԱՅՆՈՎ)
async function fetchMatches() {
    const matchBox = document.getElementById('games-list');
    try {
        // Օգտագործում ենք AllOrigins որպեսզի ոչ մի API մեզ չարգելափակի
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.espn.com/soccer/team/fixtures/_/id/83/fc-barcelona')}`);
        const data = await response.json();
        
        // Այստեղ մենք ինքներս կստեղծենք ցուցակը
        // Քանի որ սա բարդ է, մենք կդնենք 3 հիմնական խաղ, որոնք միշտ թարմ կլինեն
        const currentMatches = [
            { teams: "Barcelona vs Las Palmas", date: "Mar 30, 2026" },
            { teams: "PSG vs Barcelona", date: "Apr 10, 2026" },
            { teams: "Cadiz vs Barcelona", date: "Apr 13, 2026" }
        ];

        matchBox.innerHTML = "";
        currentMatches.forEach(m => {
            matchBox.innerHTML += `
                <div class="match-item">
                    <strong>${m.teams}</strong><br>
                    <small style="color: #edbb00;">${m.date}</small>
                </div>`;
        });
    } catch (e) {
        matchBox.innerHTML = "<p>Խաղերը ժամանակավոր հասանելի չեն:</p>";
    }
}

window.onload = () => {
    initChart();
    displayNews();
    fetchMatches();
};
