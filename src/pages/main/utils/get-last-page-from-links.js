export const getLastPageFromLinks = (links) => {
    if (typeof links !== 'string') return 1; // или 0, или null, если нет пагинации
    const result = links.match(/_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"/);
    return result?.[1] ? Number(result[1]) : 1;
};
