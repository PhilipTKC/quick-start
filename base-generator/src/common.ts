import { resolve, join } from 'path';
import { existsSync } from 'fs';

export interface DocAttributes {
    title: string;
    id: string;
    category: string;
    category_id: string;
    description: string;
    last_updated: string;
    docs: boolean;
    objectID?: string;
}

export interface DocsAttributes {
    path: string;
    path1: string;
    fileName: string;
    isParent: boolean;
    parent: string;
    title: string;
    order: number;
}

const sourceFolder = resolve(__dirname, '../../src');
export const contentPath = join(sourceFolder, '_content');

export const doesContentFolderExist = () => {
    if (!existsSync(contentPath)) {
        throw new Error(`Content folder does not exist at ${contentPath}`);
    }
}