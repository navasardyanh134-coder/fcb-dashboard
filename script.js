// 1. Գրաֆիկի ստեղծում (Lewandowski, Raphinha, Yamal, Olmo)
function initChart() {
    const ctx = document.getElementById('playersChart').getContext('2d');
    // Եթե նախկինում գրաֆիկ կար, ջնջում ենք, որ նորը սիրուն նստի
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

// 2. Լուրերի բեռնում (Ավելի կայուն տարբերակ)
async function fetchNews() {
    const newsBox = document.getElementById('news-list');
    const rssUrl = "https://www.espn.com/soccer/rss/team/_/id/83/fc-barcelona";
    // Օգտագործում ենք AllOrigins որպես միջնորդ (Proxy), որ 422 սխալ չտա
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("Network issues");
        
        const data = await response.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const items = xml.querySelectorAll("item");

        if (items.length > 0) {
            newsBox.innerHTML = "";
            items.forEach((item, index) => {
                if (index < 4) {
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;
                    newsBox.innerHTML += `
                        <div class="news-item">
                            <a href="${link}" target="_blank">${title}</a>
                        </div>`;
                }
            });
        } else {
            throw new Error("No items found");
        }
    } catch (e) {
        // Սա մեր "Plan B"-ն է. եթե API-ն չաշխատի, սրանք միանգամից կհայտնվեն
        newsBox.innerHTML = `
            <div class="news-item"><a href="https://www.fcbarcelona.com/en/news" target="_blank">Barca Official News Hub</a></div>
            <div class="news-item"><a href="https://www.espn.com/soccer/team/_/id/83/fc-barcelona" target="_blank">ESPN Barcelona Updates</a></div>
            <div class="news-item"><a href="https://www.sport.es/en/" target="_blank">Sport.es: Latest Barca News</a></div>
        `;
    }
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

// Ամեն ինչ բեռնվում է էջը բացելիս
window.onload = () => {
    initChart();
    fetchNews();
    fetchMatches();
};
