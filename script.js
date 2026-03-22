// 1. Գրաֆիկի ստեղծում
function initChart() {
    const ctx = document.getElementById('playersChart').getContext('2d');
    if (window.myChart) { window.myChart.destroy(); }
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lewandowski', 'Raphinha', 'Lamine Yamal', 'Dani Olmo'],
            datasets: [{
                label: 'Գոլեր (25/26)',
                data: [19, 12, 7, 6],
                backgroundColor: ['#a50044', '#004d98', '#a50044', '#004d98'],
                borderColor: '#edbb00',
                borderWidth: 2,
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#edbb00' } },
                x: { ticks: { color: 'white' } }
            }
        }
    });
}

// 2. Լուրերի ցուցադրում
function displayNews() {
    const newsBox = document.getElementById('news-list');
    const newsItems = [
        { title: "Barca Official News Hub", link: "https://www.fcbarcelona.com/en/news" },
        { title: "ESPN: Barcelona Updates", link: "https://www.espn.com/soccer/team/_/id/83/fc-barcelona" },
        { title: "Sport.es: Latest Rumors", link: "https://www.sport.es/en/" }
    ];
    newsBox.innerHTML = "";
    newsItems.forEach(item => {
        newsBox.innerHTML += `<div class="news-item"><a href="${item.link}" target="_blank">${item.title}</a></div>`;
    });
}

// 3. ԱՎՏՈՄԱՏ ԹԱՐՄԱՑՎՈՂ ՀԱՆԴԻՊՈՒՄՆԵՐ (ScoreBat API)
async function fetchLiveMatches() {
    const list = document.getElementById('games-list');
    try {
        // Այս API-ն բերում է ֆուտբոլային իրադարձությունները իրական ժամանակում
        const response = await fetch("https://www.scorebat.com/video-api/v3/");
        const data = await response.json();
        
        // Ֆիլտրում ենք միայն Բարսելոնայի խաղերը
        const barcaMatches = data.response.filter(m => 
            m.title.toLowerCase().includes("barcelona")
        ).slice(0, 3);

        list.innerHTML = "";

        if (barcaMatches.length > 0) {
            barcaMatches.forEach(m => {
                list.innerHTML += `
                    <div class="match-item">
                        <strong>${m.title}</strong> <br>
                        <small style="color: #edbb00;">${new Date(m.date).toLocaleDateString()}</small>
                        <br><a href="${m.matchviewUrl}" target="_blank" style="font-size: 0.8rem; color: #5eb1ff;">Դիտել մանրամասները</a>
                    </div>`;
            });
        } else {
            // Եթե այս պահին թարմ խաղ չկա API-ում, ցույց ենք տալիս մոտակա հաստատուն խաղերը
            list.innerHTML = `
                <div class="match-item"><strong>Barcelona vs Las Palmas</strong> <br><small>Mar 30, 2026</small></div>
                <div class="match-item"><strong>PSG vs Barcelona</strong> <br><small>Apr 10, 2026</small></div>
            `;
        }
    } catch (e) {
        list.innerHTML = "<div class='match-item'>Չհաջողվեց թարմացնել խաղերը:</div>";
    }
}

window.onload = () => {
    initChart();
    displayNews();
    fetchLiveMatches(); // Կանչում ենք ավտոմատ թարմացումը
};
