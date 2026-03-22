const API_KEY = "eda7dde088mshd13de3d1e6d82efp1920dbjsncbe1e54d0f89";
const BARCA_ID = "2817";

// 1. Լուրերի Բաժին
function fetchNews() {
    const newsBox = document.getElementById('news-list');
    
    // Լուրերի օրինակներ (քանի որ News API-ները հիմնականում վճարովի են)
    const newsData = [
        { title: "Լամին Յամալը պատրաստ է հաջորդ խաղին", url: "https://www.google.com/search?q=Lamine+Yamal+news" },
        { title: "Լևանդովսկին շարունակում է գոլերի շարքը", url: "https://www.google.com/search?q=Lewandowski+news" },
        { title: "Բարսելոնան նոր տրանսֆերային նպատակներ ունի", url: "https://www.google.com/search?q=FC+Barcelona+transfer+news" }
    ];

    newsBox.innerHTML = "";
    newsData.forEach(item => {
        let div = document.createElement('div');
        div.className = "news-item";
        div.innerHTML = `
            <a href="${item.url}" target="_blank">${item.title}</a>
            <small>Կարդալ ավելին →</small>
        `;
        newsBox.appendChild(div);
    });
}

// 2. Խաղերի Բաժին (API)
async function fetchMatches() {
    const list = document.getElementById('games-list');
    const url = `https://sportapi7.p.rapidapi.com/api/v1/team/${BARCA_ID}/events/next/0`;
    const options = {
        method: 'GET',
        headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': 'sportapi7.p.rapidapi.com' }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        list.innerHTML = ""; 

        if (data.events && data.events.length > 0) {
            data.events.slice(0, 5).forEach(match => {
                const home = match.homeTeam.name;
                const away = match.awayTeam.name;
                const date = new Date(match.startTimestamp * 1000).toLocaleDateString('hy-AM', { day: 'numeric', month: 'short' });
                const searchUrl = `https://www.google.com/search?q=${home}+vs+${away}+match+details`;

                let a = document.createElement('a');
                a.href = searchUrl; a.target = "_blank"; a.className = "match-link";
                a.innerHTML = `<div class="match-item"><span>${home} - ${away}</span><small>${date}</small></div>`;
                list.appendChild(a);
            });
        } else {
            list.innerHTML = "<li>Լուրեր չկան</li>";
        }
    } catch (error) {
        list.innerHTML = "<li>Սխալ</li>";
    }
}

// 3. Գրաֆիկ
function initChart() {
    const ctx = document.getElementById('playersChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lewandowski', 'Raphinha', 'Yamal', 'Pedri'],
            datasets: [{
                label: 'Գոլեր',
                data: [15, 10, 7, 3],
                backgroundColor: ['#a50044', '#004d98', '#a50044', '#004d98'],
                borderColor: '#f5c518',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { color: 'white' } },
                x: { ticks: { color: 'white' } }
            },
            plugins: { legend: { labels: { color: 'white' } } }
        }
    });
}

window.onload = () => {
    initChart();
    fetchMatches();
    fetchNews();
};
