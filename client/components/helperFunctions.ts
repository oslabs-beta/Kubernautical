import { CLusterObj, nestedObj } from '../../types/types';


//~----------------------------------------------Modal--------------------------------------------------------->
export const makeModal = (obj: CLusterObj, type: string) => {
    //create necessary dom elements
    const subLists: HTMLElement[] = [];
    const div = document.createElement('div'); div.className = 'modal';
    const ul = document.createElement('ul');
    const header = document.createElement('div');
    header.className = 'modalHeader';
    //header assigned given type (Namespace, Service, etc.)
    header.innerText = `${type} Details`;
    //all items in given object to be iteraeted over
    Object.keys(obj).forEach((key: any) => {
        //filtering for private data (can be turned off in private settings)
        if (key === 'uid' || key === 'ingressIP') return;
        //arbitrarily nested objects dealt with using another helper function
        if (typeof obj[key] === 'object') subLists.push(recursiveList(obj[key], key));
        else {
            const li = document.createElement('li');
            li.innerText = `${humanReadable(key)}: ${obj[key]}`;
            ul.appendChild(li);
        }
    })
    //elements appended in order
    div.appendChild(header);
    div.appendChild(ul);
    subLists.forEach((el) => {
        div.appendChild(el);
    })
    //dom elements manipulated to match typing expectations for react-graph-vis tooltip
    return div as unknown as string;
};
//?recursively iterate nested objects to create sub lists
const recursiveList = (obj: nestedObj, key?: any) => {
    const subList = document.createElement('ul');
    const smallHeader = document.createElement('div');
    smallHeader.className = 'modalHeader';
    if (key) smallHeader.innerText = `${humanReadable(key)}`;
    //check for specifically nested obj (ports obj) to ensure consistent prints (edge case)
    if (Array.isArray(obj) && obj.length === 1 && typeof obj[0] !== 'object') {
        const singleLi = document.createElement('li')
        singleLi.innerText = `${humanReadable(key)}: ${obj[0]}`;
        subList.appendChild(singleLi);
        return subList;
    }
    //header to be appended first, no header for the above case
    subList.appendChild(smallHeader);
    Object.keys(obj).forEach((k: any) => { //fix typing here
        const li = document.createElement('li');
        //check for further nested objects
        if (typeof obj[k] === 'object') subList.appendChild(recursiveList(obj[k]));
        else {
            //check to ensure keys are not printed for array elements
            Array.isArray(obj) ? li.innerText = `${obj[k]}` : li.innerText = `${humanReadable(k)}: ${obj[k]}`;
            subList.appendChild(li);
        }
    });
    return subList;
}
//?helper function to make keys human readable (camel case)
export const humanReadable = (name: string) => {
    var words = name.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(capitalize).join(" ");
}
const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
}
//~--------------------------------------------Window Helper----------------------------------------------->
//helper function to prevent benign error message created when viewing larger clusters
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