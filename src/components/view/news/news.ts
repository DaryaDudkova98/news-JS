import './news.css';
import { NewsArticle } from '../../../types';

class News {
    public draw(data: NewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const getElement = (selector: string): HTMLElement => {
                const el = newsClone.querySelector(selector) as HTMLElement;
                return el;
            };

            if (idx % 2) {
                getElement('.news__item')?.classList.add('alt');
            }

            getElement('.news__meta-photo').style.backgroundImage = `url(${
                (item as any).urlToImage || 'img/news_placeholder.jpg'
            })`;
            
            getElement('.news__meta-author').textContent = item.author || item.source.name;
            getElement('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getElement('.news__description-title').textContent = item.title;
            getElement('.news__description-source').textContent = item.source.name;
            getElement('.news__description-content').textContent = item.description || '';
            getElement('.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;