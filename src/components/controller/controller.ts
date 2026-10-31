import AppLoader from './appLoader';
import { Callback, RequestParams } from './loader';
import { NewsApiResponse, SourcesApiResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesApiResponse>): void {
        const params: RequestParams = {
            endpoint: 'sources',
        };
        super.getResp(params, callback);
    }

    public getNews(e: MouseEvent, callback: Callback<NewsApiResponse>): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement;
        while (target && target !== newsContainer) {
            if (target.classList && target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    
                    const params: RequestParams = {
                        endpoint: 'everything',
                        options: {
                            sources: sourceId,
                        },
                    };
                    super.getResp(params, callback);
                }
                return;
            }
            
            target = target.parentElement;
        }
    }
}

export default AppController;