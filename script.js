const API_KEY = '04027f5aafff460487955488cc988dd7';
const TEAM_ID = 81; // FC Barcelona

async function fetchMatches() {
    try {
        const response = await fetch(`https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=SCHEDULED`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        const data = await response.json();
        
        // Վերցնում ենք առաջիկա 2 խաղը
        const matches = data.matches.slice(0, 2);
        const container = document.querySelector('.matches-list'); // Համոզվիր, որ HTML-ում այս դասը կա

        container.innerHTML = ''; // Մաքրում ենք հին տեքստը

        matches.forEach(match => {
            const date = new Date(match.utcDate).toLocaleString('hy-AM', {
                month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });
            
            container.innerHTML += `
                <div class="match-card">
                    <p><strong>${match.homeTeam.shortName} vs ${match.awayTeam.shortName}</strong></p>
                    <p>${date}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Խաղերի բեռնման սխալ:", error);
    }
}

fetchMatches();
