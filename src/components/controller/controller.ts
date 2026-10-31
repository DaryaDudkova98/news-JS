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

    public getNewsBySource(sourceId: string | null, callback: Callback<NewsApiResponse>): void {
        if (!sourceId) return;

        const params: RequestParams = {
            endpoint: 'everything',
            options: {
                sources: sourceId,
            },
        };
        super.getResp(params, callback);
    }
}

export default AppController;