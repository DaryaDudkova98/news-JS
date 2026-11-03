import AppLoader from './appLoader';
import { Callback, RequestParams } from './loader';
import { NewsApiResponse, SourcesApiResponse } from '../../types';

export enum Endpoint {
    Sources = 'sources',
    TopHeadlines = 'top-headlines',
}

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesApiResponse>): void {
        const params: RequestParams = {
            endpoint: Endpoint.Sources,
        };
        super.getResp(params, callback);
    }

    public getNewsBySource(sourceId: string | null, callback: Callback<NewsApiResponse>): void {
        if (!sourceId) return;

        const params: RequestParams = {
            endpoint: Endpoint.TopHeadlines,
            options: {
                sources: sourceId,
            },
        };
        super.getResp(params, callback);
    }
}

export default AppController;
