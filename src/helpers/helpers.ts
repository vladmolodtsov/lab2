export const setLocalStorageFavouriteItems = (key:string, val:number[]):void => {
    const value = JSON.stringify(val);
    localStorage.setItem(key, value);
}

export const getFavouriteItemsFromLocalStorage = (key:string):number[]|null => {
    const data = localStorage.getItem(key);
    if(data) {
        return JSON.parse(data);
    }
    return null;
}