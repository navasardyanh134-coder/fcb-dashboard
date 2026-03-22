async function fetchNews() {
    const newsBox = document.getElementById('news-list');
    // Օգտագործում ենք ավելի պարզ հղում
    const rssUrl = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.espn.com%2Fsoccer%2Frss%2Fteam%2F_%2Fid%2F83%2Ffc-barcelona";

    try {
        const response = await fetch(rssUrl);
        const data = await response.json();
        
        if (data.status === 'ok') {
            newsBox.innerHTML = "";
            data.items.slice(0, 5).forEach(item => {
                let div = document.createElement('div');
                div.className = "news-item";
                div.innerHTML = `
                    <a href="${item.link}" target="_blank">${item.title}</a>
                    <small>${new Date(item.pubDate).toLocaleDateString('hy-AM')}</small>
                `;
                newsBox.appendChild(div);
            });
        }
    } catch (e) {
        // Եթե էլի սխալ տա, ցույց կտանք սա, որ դատարկ չմնա
        newsBox.innerHTML = `
            <div class="news-item">
                <a href="https://www.google.com/search?q=FC+Barcelona+news" target="_blank">Դիտել թարմ լուրերը Google News-ում</a>
            </div>`;
    }
}