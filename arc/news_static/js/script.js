async function loadNewsData() {
    try {
        const response = await fetch('content.txt');
        const text = await response.text();
        return parseNewsData(text);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        return [];
    }
}
function parseNewsData(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return lines.map(line => {
        const [title, date, category, preview] = line.split(';');
        return { title, date, category, preview };
    });
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

function createNewsCard(news, index) {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.innerHTML = `
        <div class="card-content">
            <span class="news-category">${news.category}</span>
            <div class="news-date">${formatDate(news.date)}</div>
            <h2 class="news-title">${news.title}</h2>
            <div class="news-preview" id="preview-${index}">
                <p>${news.preview}</p>
            </div>
            <button class="read-more" data-index="${index}">Читать далее</button>
        </div>
    `;
    return card;
}

function createPopularNewsList(newsData) {
    const popularList = document.getElementById('popular-news');
    const topNews = newsData.slice(0, 5);

    topNews.forEach((news, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'popular-item';
        listItem.innerHTML = `
            <span class="popular-number"></span>
            <a href="#" class="popular-link">${news.title}</a>
        `;
        popularList.appendChild(listItem);
    });
}
function handleReadMoreClick(event) {
    if (event.target.classList.contains('read-more')) {
        const index = event.target.getAttribute('data-index');
        const preview = document.getElementById(`preview-${index}`);
        if (preview.classList.contains('active')) {
            preview.classList.remove('active');
            event.target.textContent = 'Читать далее';
        } else {
            preview.classList.add('active');
            event.target.textContent = 'Свернуть';
        }
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const newsContainer = document.getElementById('news-container');
    const newsData = await loadNewsData();

    if (newsData.length === 0) {
        newsContainer.innerHTML = '<p>Не удалось загрузить новости</p>';
        return;
    }
    newsData.forEach((news, index) => {
        const card = createNewsCard(news, index);
        newsContainer.appendChild(card);
    });
    createPopularNewsList(newsData);
    newsContainer.addEventListener('click', handleReadMoreClick);
});