export function getURLWithQueryParams(url: string, params: Record<string, any>) {
    let newUrl = `${url}?`;
    Object.keys(params)
        .filter(key => params[key])
        .forEach(key => {
            newUrl += `${key}=${params[key]}&`;
        });

    return newUrl;
}
