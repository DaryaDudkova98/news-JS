import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsApiResponse, SourcesApiResponse, NewsSource } from '../../types';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.view = new AppView();
        this.controller = new AppController();
    }

    public start(): void {
        this.view.onSourceSelect((source: NewsSource) => {
            this.controller.getNewsBySource(source.id, (data: NewsApiResponse) => {
                this.view.drawNews(data);
            });
        });

        this.controller.getSources((data: SourcesApiResponse) => {
            this.view.drawSources(data);
        });
    }
}

export default App;