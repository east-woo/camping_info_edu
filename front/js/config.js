let cachedConfig = null;

export async function getConfig() {
    if (cachedConfig) return cachedConfig;

    const res = await fetch('/config.json', { cache: 'no-store' });

    console.log('[config] status:', res.status);
    console.log('[config] url:', res.url);
    console.log('[config] headers:', [...res.headers.entries()]);

    if (!res.ok) {
        throw new Error(`Failed to load config.json: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
        const text = await res.text();
        throw new Error(`config.json served as HTML. body starts with: ${text.slice(0, 60)}`);
    }

    // JSON 파싱 (content-type이 꼭 application/json 아닐 수도 있음)
    cachedConfig = await res.json();

    cachedConfig.API_BASE_URL = cachedConfig.API_BASE_URL || '/api';
    cachedConfig.GEOSERVER_WMS_URL = cachedConfig.GEOSERVER_WMS_URL || '/geoserver/wms';

    console.log('[config] loaded:', cachedConfig);
    return cachedConfig;
}
