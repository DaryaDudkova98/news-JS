import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsApiResponse, SourcesApiResponse } from '../../types';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement = document.querySelector('.sources') as HTMLElement;
        
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: MouseEvent) => {
                this.controller.getNews(e, (data: NewsApiResponse) => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data: SourcesApiResponse) => this.view.drawSources(data));
    }
}

export default App;