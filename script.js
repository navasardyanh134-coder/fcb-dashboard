// 1. Կոնստանտներ և կարգավորումներ
const API_KEY = '04027f5aafff460487955488cc988dd7';
const TEAM_ID = 81; // FC Barcelona
const RSS_URL = 'https://www.espn.com/soccer/rss/team/_/id/83/barcelona';

// Ֆունկցիան աշխատում է էջը բեռնվելուն պես
document.addEventListener('DOMContentLoaded', () => {
    initScorersChart();
    fetchMatches();
    fetchNews();
});

// 2. Լավագույն ռմբարկուների գրաֆիկ (Chart.js)
function initScorersChart() {
    const ctx = document.getElementById('scorersChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lewandowski', 'Raphinha', 'Lamine Yamal', 'Dani Olmo'],
            datasets: [{
                label: 'Գոլեր (25/26)',
                data: [19, 12, 7, 6], // Տվյալները կարող ես թարմացնել ըստ պահի
                backgroundColor: [
                    'rgba(165, 0, 68, 0.8)', // Բարսայի մուգ կարմիր
                    'rgba(0, 77, 152, 0.8)', // Բարսայի կապույտ
                    'rgba(165, 0, 68, 0.8)',
                    'rgba(0, 77, 152, 0.8)'
                ],
                borderColor: '#edbb00', // Ոսկեգույն եզրագծեր
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#fff' } },
                x: { ticks: { color: '#fff' } }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });
}

// 3. Հաջորդ հանդիպումների ստացում (Football-Data API)
async function fetchMatches() {
    const container = document.getElementById('matches-list');
    try {
        const response = await fetch(`https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=SCHEDULED`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        const data = await response.json();
        
        if (!data.matches || data.matches.length === 0) {
            container.innerHTML = '<p>Առաջիկա խաղեր չկան:</p>';
            return;
        }

        container.innerHTML = '';
        data.matches.slice(0, 2).forEach(match => {
            const date = new Date(match.utcDate).toLocaleString('hy-AM', {
                month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });
            container.innerHTML += `
                <div style="background: #222; margin: 10px 0; padding: 10px; border-radius: 8px; border-left: 4px solid #edbb00;">
                    <p><strong>${match.homeTeam.shortName} vs ${match.awayTeam.shortName}</strong></p>
                    <small>${date}</small>
                </div>`;
        });
    } catch (error) {
        console.error("Matches error:", error);
        container.innerHTML = '<p>Խաղերը բեռնելիս սխալ տեղի ունեցավ:</p>';
    }
}

// 4. Թարմ լուրերի ստացում (RSS to JSON)
async function fetchNews() {
    const newsContainer = document.getElementById('news-list');
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            newsContainer.innerHTML = '';
            data.items.slice(0, 3).forEach(item => {
                newsContainer.innerHTML += `
                    <div style="margin-bottom: 15px; border-bottom: 1px dashed #444; padding-bottom: 5px;">
                        <a href="${item.link}" target="_blank" style="color: #edbb00; text-decoration: none; font-size: 0.9em;">
                            ${item.title}
                        </a>
                    </div>`;
            });
        } else {
            throw new Error();
        }
    } catch (error) {
        newsContainer.innerHTML = '<p>Լուրերը ժամանակավոր հասանելի չեն (Server Error 500):</p>';
    }
}
