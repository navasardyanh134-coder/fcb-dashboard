// 1. Գրաֆիկի ստեղծում
function initChart() {
    const ctx = document.getElementById('playersChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    
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
            },
            plugins: {
                legend: { labels: { color: 'white' } }
            }
        }
    });
}

// 2. Լուրերի բաժին (Հաստատուն և ապահով տարբերակ)
function displayNews() {
    const newsBox = document.getElementById('news-list');
    
    // Սրանք թարմ և միշտ աշխատող հղումներ են
    const officialNews = [
        { title: "Barca Official News Hub", link: "https://www.fcbarcelona.com/en/news" },
        { title: "ESPN: Barcelona Latest Updates", link: "https://www.espn.com/soccer/team/_/id/83/fc-barcelona" },
        { title: "Transfer News & Rumors", link: "https://www.sport.es/en/" },
        { title: "Lamine Yamal: The Future of Barca", link: "https://www.mundodeportivo.com/futbol/fc-barcelona" }
    ];

    newsBox.innerHTML = ""; // Մաքրում ենք "Բեռնվում է"-ն
    
    officialNews.forEach(item => {
        newsBox.innerHTML += `
            <div class="news-item">
                <a href="${item.link}" target="_blank">${item.title}</a>
            </div>`;
    });
}

// 3. Խաղերի ցուցակ
function fetchMatches() {
    const list = document.getElementById('games-list');
    const matches = [
        { teams: "Barcelona vs Las Palmas", date: "Mar 30" },
        { teams: "PSG vs Barcelona", date: "Apr 10" },
        { teams: "Cadiz vs Barcelona", date: "Apr 13" }
    ];
    list.innerHTML = "";
    matches.forEach(m => {
        list.innerHTML += `
            <div class="match-item">
                <strong>${m.teams}</strong> <br>
                <small style="color: #edbb00;">${m.date}</small>
            </div>`;
    });
}

// Այս ֆունկցիաները կաշխատեն էջը բացելիս
window.onload = () => {
    initChart();
    displayNews(); // Այստեղ արդեն API չկա, իսկույն կբացվի
    fetchMatches();
};
