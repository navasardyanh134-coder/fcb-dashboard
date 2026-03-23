// 1. Կոնֆիգուրացիա
const API_KEY = '04027f5aafff460487955488cc988dd7';
const TEAM_ID = 81; // FC Barcelona
const RSS_URL = 'https://www.espn.com/soccer/rss/team/_/id/83/barcelona';
const PROXY = 'https://api.allorigins.win/raw?url=';

document.addEventListener('DOMContentLoaded', () => {
    initScorersChart();
    fetchMatches();
    fetchNews();
});

// 2. Լավագույն ռմբարկուների գրաֆիկ
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

// 3. Հաջորդ հանդիպումների ստացում (CORS Proxy-ով)
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
                <div style="background: rgba(255,255,255,0.05); margin: 10px 0; padding: 12px; border-radius: 8px; border-left: 4px solid #EDBB00;">
                    <p style="margin:0; font-weight:bold; color:#fff;">${match.homeTeam.shortName} vs ${match.awayTeam.shortName}</p>
                    <small style="color: #bbb;">${date}</small>
                </div>`;
        });
    } catch (error) {
        container.innerHTML = '<p style="color:#ff4d4d;">Խաղերը բեռնելիս սխալ տեղի ունեցավ:</p>';
    }
}

// 4. Թարմ լուրերի ստացում
async function fetchNews() {
    const newsContainer = document.getElementById('news-list');
    if (!newsContainer) return;

    const newsApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

    try {
        const response = await fetch(newsApi);
        const data = await response.json();

        if (data.status === 'ok') {
            newsContainer.innerHTML = '';
            data.items.slice(0, 3).forEach(item => {
                newsContainer.innerHTML += `
                    <div style="margin-bottom: 12px; border-bottom: 1px solid #333; padding-bottom: 8px;">
                        <a href="${item.link}" target="_blank" style="color: #EDBB00; text-decoration: none; font-size: 0.95rem; display: block;">
                            ${item.title}
                        </a>
                    </div>`;
            });
        } else {
            throw new Error('RSS error');
        }
    } catch (error) {
        newsContainer.innerHTML = '<p style="color:#888;">Լուրերը ժամանակավոր հասանելի չեն:</p>';
    }
}
