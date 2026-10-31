import './sources.css';
import { NewsSource } from '../../../types';

class Sources {
    public draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if (!sourceItemTemp) return;

        data.forEach((item) => {

            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            const nameElement = sourceClone.querySelector('.source__item-name');
            if (nameElement) {
                nameElement.textContent = item.name;
            }

            const sourceItemElement = sourceClone.querySelector('.source__item');
            if (sourceItemElement && item.id) {
                sourceItemElement.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });
        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;