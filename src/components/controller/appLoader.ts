import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('/.netlify/functions/news-proxy?', {});
    }
}

export default AppLoader;
