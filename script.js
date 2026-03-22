// 1. Գրաֆիկի ստեղծում
function initChart() {
    const ctx = document.getElementById('playersChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lewandowski', 'Raphinha', 'Lamine Yamal', 'Dani Olmo'],
            datasets: [{
                label: 'Գոլեր (25/26)',
                data: [19, 12, 7, 6],
                backgroundColor: ['#a50044', '#004d98', '#a50044', '#004d98'],
                borderColor: '#edbb00',
                borderWidth: 2
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

// 2. Լուրերի բեռնում
async function fetchNews() {
    const newsBox = document.getElementById('news-list');
    try {
        const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.espn.com%2Fsoccer%2Frss%2Fteam%2F_%2Fid%2F83%2Ffc-barcelona");
        const data = await response.json();
        newsBox.innerHTML = "";
        data.items.slice(0, 4).forEach(item => {
            newsBox.innerHTML += `<div class="news-item"><a href="${item.link}" target="_blank">${item.title}</a></div>`;
        });
    } catch (e) {
        newsBox.innerHTML = "<div class='news-item'>Լուրերը ժամանակավոր հասանելի չեն:</div>";
    }
}

// 3. Խաղերի ցուցակ
function fetchMatches() {
    const list = document.getElementById('games-list');
    const matches = [
        { teams: "Barcelona vs Las Palmas", date: "Mar 30" },
        { teams: "PSG vs Barcelona", date: "Apr 10" }
    ];
    list.innerHTML = "";
    matches.forEach(m => {
        list.innerHTML += `<div class="match-item"><strong>${m.teams}</strong> - ${m.date}</div>`;
    });
}

window.onload = () => {
    initChart();
    fetchNews();
    fetchMatches();
};
