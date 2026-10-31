import Loader from './loader';
import { LoaderOptions } from './loader';

class AppLoader extends Loader {
    constructor() {
        const url = process.env.API_URL as string;
        const apiKey = process.env.API_KEY as string;
        const options: LoaderOptions = {
            apiKey: apiKey,
        };

        super(url, options);
    }
}

export default AppLoader;
