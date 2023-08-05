import { CLusterObj } from '../../../types/types';

export const makeModal = (obj: CLusterObj, type: string) => {
    const subLists: HTMLElement[] = [];
    const div = document.createElement('div');
    div.className = 'modal';
    const ul = document.createElement('ul');
    const header = document.createElement('div');
    header.className = 'modalHeader';
    header.innerText = `${type} Details`;
    // const deleteButton = document.createElement('button');
    // deleteButton.innerText = 'X';
    // deleteButton.addEventListener('click', () => console.log('deleted the johnson'))
    Object.keys(obj).forEach((key) => {
        if (key === 'uid') return;
        if (typeof obj[key] === 'object') {
            const newObj = obj[key];
            const subList = document.createElement('ul');
            const smallHeader = document.createElement('div');
            smallHeader.className = 'modalHeader';
            smallHeader.innerText = `${key}`;
            subList.appendChild(smallHeader);
            Object.keys(newObj).forEach((k) => {
                const smallLi = document.createElement('li');
                smallLi.innerText = `${newObj[k]}`;
                subList.appendChild(smallLi);
            });
            subLists.push(subList);
        }
        else {
            const li = document.createElement('li');
            li.innerText = `${key}: ${obj[key]}`;
            ul.appendChild(li);
        }
    })
    div.appendChild(header);
    div.appendChild(ul);
    //TODO make this effecient its sickening
    subLists.forEach((el) => {
        div.appendChild(el);
    })
    // div.appendChild(deleteButton);
    return div as unknown as string;
};