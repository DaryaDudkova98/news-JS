export interface LoaderOptions {
    [key: string]: string | undefined;
}

export interface RequestParams {
    endpoint: string;
    options?: LoaderOptions;
}

export type Callback<T> = (data: T) => void;

class Loader {
    private baseLink: string;
    private options: LoaderOptions;
    private readonly CACHE_TTL = 15 * 60 * 1000;

    constructor(baseLink: string, options: LoaderOptions = {}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: LoaderOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };

        urlOptions['endpoint'] = endpoint;

        const separator = this.baseLink.includes('?') ? '' : '?';
        let url = `${this.baseLink}${separator}`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: Callback<T>, options: LoaderOptions = {}): void {
        const url = this.makeUrl(options, endpoint);
        const cacheKey = `news_cache_${url}`;
        const cachedString = localStorage.getItem(cacheKey);

        if (cachedString) {
            try {
                const { timestamp, data } = JSON.parse(cachedString);
                const now = new Date().getTime();

                if (now - timestamp < this.CACHE_TTL) {
                    console.log(`[Cache] Данные для ${endpoint} взяты из localStorage`);
                    callback(data as T);
                    return;
                } else {
                    localStorage.removeItem(cacheKey);
                }
            } catch {
                localStorage.removeItem(cacheKey);
            }
        }

        console.log(`[Network] Запрос к API для ${endpoint}`);
        fetch(url, { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => {
                const cacheData = {
                    timestamp: new Date().getTime(),
                    data: data,
                };
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                } catch {
                    console.warn('Не удалось сохранить данные в localStorage (возможно, переполнен)');
                }
                callback(data);
            })
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
