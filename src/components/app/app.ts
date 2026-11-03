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
            console.log('1. App.ts получил выбранный источник:', source);

            if (source && source.id) {
                this.controller.getNewsBySource(source.id, (data: NewsApiResponse) => {
                    this.view.drawNews(data);
                });
            } else {
                console.error('Ошибка: source или source.id отсутствует', source);
            }
        });

        this.controller.getSources((data: SourcesApiResponse) => {
            this.view.drawSources(data);
        });
    }
}

export default App;
