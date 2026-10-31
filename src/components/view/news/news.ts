import './news.css';
import { NewsArticle } from '../../../types';
import placeholder from '../../../img/no_photo.png';


class News {
    public draw(data: NewsArticle[]): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        if (!newsItemTemp) {
            console.warn('Template #newsItemTemp not found');
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const getElement = (selector: string): HTMLElement => {
                return newsClone.querySelector(selector) as HTMLElement;
            };

            if (idx % 2) {
                getElement('.news__item')?.classList.add('alt');
            }

            const imageUrl = item.urlToImage || placeholder;
            getElement('.news__meta-photo').style.backgroundImage = `url(${imageUrl})`;

            const author = item.author || item.source?.name || 'Неизвестный автор';
            getElement('.news__meta-author').textContent = author;

            const dateStr = item.publishedAt ? item.publishedAt.slice(0, 10) : '';
            getElement('.news__meta-date').textContent = dateStr.split('-').reverse().join('-');

            getElement('.news__description-title').textContent = item.title || 'Без заголовка';
            getElement('.news__description-source').textContent = item.source?.name || 'Неизвестный источник';
            getElement('.news__description-content').textContent = item.description || '';

            const linkEl = getElement('.news__read-more a');
            if (item.url) {
                linkEl.setAttribute('href', item.url);
            } else {
                linkEl.style.display = 'none';
            }

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