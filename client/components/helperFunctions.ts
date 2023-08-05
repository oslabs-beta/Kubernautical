import { CLusterObj, nestedObj } from '../../types/types';


//~----------------------------------------------Modal--------------------------------------------------------->
export const makeModal = (obj: CLusterObj, type: string) => {
    const subLists: HTMLElement[] = [];
    //?elements created for list
    const div = document.createElement('div'); div.className = 'modal';
    const ul = document.createElement('ul');
    const header = document.createElement('div');
    header.className = 'modalHeader';
    header.innerText = `${type} Details`;
    for (let key in obj) {
        if (key === 'uid') return;
        if (typeof obj[key] === 'object') {
            subLists.push(recursiveList(obj[key], key));
        }
        else {
            const li = document.createElement('li');
            li.innerText = `${key}: ${obj[key]}`;
            ul.appendChild(li);
        }
    }
    div.appendChild(header);
    div.appendChild(ul);
    subLists.forEach((el) => {
        div.appendChild(el);
    })
    return div as unknown as string;
};
const recursiveList = (obj: nestedObj, key?: any) => {
    const subList = document.createElement('ul');
    const smallHeader = document.createElement('div');
    smallHeader.className = 'modalHeader';
    key ? smallHeader.innerText = `${key}` : '';
    subList.appendChild(smallHeader);
    for (let k in obj) { //fix typing here
        const li = document.createElement('li');
        if (typeof obj[k] === 'object') subList.appendChild(recursiveList(obj[k]));
        else {
            Array.isArray(obj) ? li.innerText = `${obj[k]}` : li.innerText = `${k}: ${obj[k]}`;
            subList.appendChild(li);
        }
    };
    // subLists.push(subList);
    return subList;
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


//~deprecated modal function
// export const makeModal = (obj: CLusterObj, type: string) => {
//     const subLists: HTMLElement[] = [];
//     const div = document.createElement('div');
//     div.className = 'modal';
//     const ul = document.createElement('ul');
//     const header = document.createElement('div');
//     header.className = 'modalHeader';
//     header.innerText = `${type} Details`;
//     // const deleteButton = document.createElement('button');
//     // deleteButton.innerText = 'X';
//     // deleteButton.addEventListener('click', () => console.log('deleted the johnson'))
//     Object.keys(obj).forEach((key) => {
//         if (key === 'uid') return;
//         if (typeof obj[key] === 'object') {
//             let newObj: nestedObj = obj[key];
//             if (typeof newObj[0] === 'object') newObj = newObj[0]; //!hard coded garbage
//             const subList = document.createElement('ul');
//             const smallHeader = document.createElement('div');
//             smallHeader.className = 'modalHeader';
//             smallHeader.innerText = `${key}`;
//             subList.appendChild(smallHeader);
//             Object.keys(newObj).forEach((k: any) => { //TODO fix this type
//                 const smallLi = document.createElement('li');
//                 Array.isArray(newObj) ? smallLi.innerText = `${newObj[k]}` : smallLi.innerText = `${k}: ${newObj[k]}`;
//                 subList.appendChild(smallLi);
//             });
//             subLists.push(subList);
//         }
//         else {
//             const li = document.createElement('li');
//             li.innerText = `${key}: ${obj[key]}`;
//             ul.appendChild(li);
//         }
//     })
//     div.appendChild(header);
//     div.appendChild(ul);
//     //TODO make this effecient its sickening
//     subLists.forEach((el) => {
//         div.appendChild(el);
//     })
//     // div.appendChild(deleteButton);
//     return div as unknown as string;
// };