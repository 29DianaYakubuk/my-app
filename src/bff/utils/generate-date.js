const generateDate = () => {
    const randomTimestamp = Math.floor(Math.random() * 1000000000) + 1999999999999;
    return new Date(randomTimestamp)
        .toISOString()
        .substring(0, 16)
        .replace('T', ' ');
};

export default generateDate;
