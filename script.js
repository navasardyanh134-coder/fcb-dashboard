// 1. Կոնֆիգուրացիա
const API_KEY = '04027f5aafff460487955488cc988dd7';
const TEAM_ID = 81; // FC Barcelona
const RSS_URL = 'https://www.espn.com/soccer/rss/team/_/id/83/barcelona';
const PROXY = 'https://api.allorigins.win/raw?url='; // CORS սխալը շրջանցելու համար

// 2. Ֆունկցիան աշխատում է էջը բեռնվելուն պես
document.addEventListener('DOMContentLoaded', () => {
    initScorersChart();
    fetchMatches();
    fetchNews();
    fetchStandings();
});

// 3. Լավագույն ռմբարկուների գրաֆիկ
function initScorersChart() {
    const canvas = document.getElementById('scorersChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lewandowski', 'Raphinha', 'Lamine Yamal', 'Dani Olmo'],
            datasets: [{
                label: 'Գոլեր (25/26)',
                data: [19, 12, 7, 6],
                backgroundColor: ['#A50044', '#004D98', '#A50044', '#004D98'],
                borderColor: '#EDBB00',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { 
                    beginAtZero: true, 
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: { 
                    ticks: { color: '#fff' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });
}

// 4. Հաջորդ հանդիպումների ստացում (CORS Proxy-ով)
async function fetchMatches() {
    const container = document.getElementById('matches-list');
    if (!container) return;

    const apiUrl = `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=SCHEDULED`;
    
    try {
        const response = await fetch(PROXY + encodeURIComponent(apiUrl), {
            headers: { 'X-Auth-Token': API_KEY }
        });

        if (!response.ok) throw new Error('API Error');
        
        const data = await response.json();
        const matches = data.matches.slice(0, 2);

        if (matches.length === 0) {
            container.innerHTML = '<p>Առաջիկա խաղեր չկան:</p>';
            return;
        }

        container.innerHTML = '';
        matches.forEach(match => {
            const date = new Date(match.utcDate).toLocaleString('hy-AM', {
                month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });
            container.innerHTML += `
                <div class="match-item">
                    <p style="margin:0; font-weight:bold; color:#fff;">${match.homeTeam.shortName} vs ${match.awayTeam.shortName}</p>
                    <small style="color: #bbb;">${date}</small>
                </div>`;
        });
    } catch (error) {
        container.innerHTML = '<p style="color:#ff4d4d;">Խաղերը բեռնելիս սխալ տեղի ունեցավ:</p>';
    }
}

// 5. Թարմ լուրերի ստացում (Փոխարինված RSS-ը` NewsAPI-ով)
async function fetchNews() {
    const newsContainer = document.getElementById('news-list');
    if (!newsContainer) return;

    // RSS2JSON-ի 500 սխալի պատճառով օգտագործում ենք NewsAPI
    const newsApi = `https://newsapi.org/v2/everything?q=fc barcelona&sortBy=publishedAt&apiKey=f65b4c1303cc44249a0e69818815f483`;

    try {
        const response = await fetch(newsApi);
        const data = await response.json();

        if (data.status === 'ok') {
            newsContainer.innerHTML = '';
            data.articles.slice(0, 3).forEach(item => {
                const date = new Date(item.publishedAt).toLocaleDateString('hy-AM');
                newsContainer.innerHTML += `
                    <div class="news-item">
                        <a href="${item.url}" target="_blank">${item.title}</a>
                        <p>${date}</p>
                    </div>`;
            });
        } else {
            throw new Error('RSS error');
        }
    } catch (error) {
        newsContainer.innerHTML = '<p style="color:#888;">Լուրերը ժամանակավոր հասանելի չեն:</p>';
    }
}

// 6. Թիմի վարկանիշի ստացում
async function fetchStandings() {
    const standingsContainer = document.getElementById('standings-list');
    if (!standingsContainer) return;

    const apiUrl = `https://api.football-data.org/v4/competitions/PD/standings`;

    try {
        const response = await fetch(PROXY + encodeURIComponent(apiUrl), {
            headers: { 'X-Auth-Token': API_KEY }
        });

        if (!response.ok) throw new Error('Standings error');
        
        const data = await response.json();
        const standings = data.standings[0].table;
        const barcaStandings = standings.find(s => s.team.id === TEAM_ID);

        standingsContainer.innerHTML = `
            <div class="standing-item">
                <span style="color: var(--primary-gold); font-weight: bold;">${barcaStandings.position}</span>
                <span>${barcaStandings.team.name}</span>
                <span style="font-weight: bold;">${barcaStandings.points}</span>
            </div>`;
    } catch (error) {
        standingsContainer.innerHTML = '<p style="color:#ff4d4d;">Վարկանիշը բեռնելիս սխալ տեղի ունեցավ:</p>';
    }
}
