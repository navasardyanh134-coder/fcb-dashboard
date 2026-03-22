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

window.onload = () => {
    initChart();
    displayNews();
};
