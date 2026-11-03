import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const params = { ...event.queryStringParameters };
    const endpoint = params.endpoint || 'top-headlines';
    delete params.endpoint;

    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Переменная API_KEY не настроена на сервере Netlify' }),
        };
    }

    try {
        const query = new URLSearchParams({
            ...params,
            apiKey: apiKey,
        }).toString();

        const response = await fetch(`https://newsapi.org/v2/${endpoint}?${query}`);

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Ошибка от NewsAPI (${response.status}):`, errorData);

            return {
                statusCode: response.status,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Ошибка NewsAPI', details: errorData }),
            };
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('КРИТИЧЕСКАЯ ОШИБКА ПРОКСИ:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Внутренняя ошибка прокси', details: String(error) }),
        };
    }
};

export { handler };
