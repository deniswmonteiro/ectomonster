type ISeriesList = {
    serie: number;
    done: boolean;
}

type IStorageExerciseData = {
    data: [ISeriesList] | string,
    expiry: number
}

/** Save done series in local storage expiring in one day */
export const setWithExpiry = (key: string, value: ISeriesList[] | string, ttl: number) => {
    const now = new Date();
    const item = {
        data: value,
        expiry: now.getTime() + ttl,
    }

    localStorage.setItem(key, JSON.stringify(item));
}

/** Get done series from local storage */
export const getWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) return null;

    
    const item = JSON.parse(itemStr) as IStorageExerciseData;
    const now = new Date();

    // Compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage and return null
        localStorage.removeItem(key);
        return null;
    }

    return item.data;
}