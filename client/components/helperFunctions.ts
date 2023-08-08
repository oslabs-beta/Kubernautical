import { CLusterObj, nestedObj } from '../../types/types';


//~----------------------------------------------Modal--------------------------------------------------------->
export const makeModal = (obj: CLusterObj, type: string) => {
    const subLists: HTMLElement[] = [];
    const div = document.createElement('div'); div.className = 'modal';
    const ul = document.createElement('ul');
    const header = document.createElement('div');
    header.className = 'modalHeader';
    header.innerText = `${type} Details`;
    Object.keys(obj).forEach((key: any) => {
        if (key === 'uid' || key === 'ingressIP') return;
        if (typeof obj[key] === 'object') {
            subLists.push(recursiveList(obj[key], key));
        }
        else {
            const li = document.createElement('li');
            li.innerText = `${humanReadable(key)}: ${obj[key]}`;
            ul.appendChild(li);
        }
    })
    div.appendChild(header);
    div.appendChild(ul);
    subLists.forEach((el) => {
        div.appendChild(el);
    })
    return div as unknown as string;
};
//?recursively iterate nested objects to create sub lists
const recursiveList = (obj: nestedObj, key?: any) => {
    const subList = document.createElement('ul');
    const smallHeader = document.createElement('div');
    smallHeader.className = 'modalHeader';
    key ? smallHeader.innerText = `${humanReadable(key)}` : null;
    if (Array.isArray(obj) && obj.length === 1 && typeof obj[0] !== 'object') {
        const singleLi = document.createElement('li')
        singleLi.innerText = `${humanReadable(key)}: ${obj[0]}`;
        subList.appendChild(singleLi);
        return subList;
    }
    subList.appendChild(smallHeader);
    Object.keys(obj).forEach((k: any) => { //fix typing here
        const li = document.createElement('li');
        if (typeof obj[k] === 'object') subList.appendChild(recursiveList(obj[k]));
        else {
            Array.isArray(obj) ? li.innerText = `${obj[k]}` : li.innerText = `${humanReadable(k)}: ${obj[k]}`;
            subList.appendChild(li);
        }
    });
    return subList;
}
//?helper function to make keys human readable
const humanReadable = (name: string) => {
    var words = name.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(capitalize).join(" ");
}
const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
}
//~--------------------------------------------Window Helper----------------------------------------------->
export const windowHelper = () => {
    window.addEventListener('error', e => {
        console.log(e.message);
        if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
            const resizeObserverErrDiv = document.getElementById(
                'webpack-dev-server-client-overlay-div'
            );
            const resizeObserverErr = document.getElementById(
                'webpack-dev-server-client-overlay'
            );
            if (resizeObserverErr) {
                resizeObserverErr.setAttribute('style', 'display: none');
            }
            if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute('style', 'display: none');
            }
        }
    });
}