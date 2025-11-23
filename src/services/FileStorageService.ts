import { File, Directory, Paths } from 'expo-file-system';
import { ListModel } from '../models/List';

// Get the base directory for storing lists
const getBaseDir = (): Directory => {
  return new Directory(Paths.document, 'handleliste_data');
};

export const FileStorageService = {
    ensureDirExists: async () => {
        const baseDir = getBaseDir();
        if (!baseDir.exists) {
            baseDir.create({ intermediates: true, idempotent: true });
        }
    },

    saveList: async (list: ListModel) => {
        await FileStorageService.ensureDirExists();
        const baseDir = getBaseDir();
        const file = new File(baseDir, `list_${list.id}.json`);
        file.write(JSON.stringify(list, null, 2));
    },

    loadList: async (id: string): Promise<ListModel | null> => {
        const baseDir = getBaseDir();
        const file = new File(baseDir, `list_${id}.json`);
        
        if (!file.exists) {
            return null;
        }

        const content = await file.text();
        return JSON.parse(content) as ListModel;
    },

    loadAllLists: async (): Promise<ListModel[]> => {
        await FileStorageService.ensureDirExists();
        const baseDir = getBaseDir();
        
        if (!baseDir.exists) {
            return [];
        }

        const contents = baseDir.list();
        const lists: ListModel[] = [];

        for (const item of contents) {
            // Check if it's a file and ends with .json
            if (item instanceof File && item.name.endsWith('.json')) {
                try {
                    const content = await item.text();
                    lists.push(JSON.parse(content));
                } catch (error) {
                    console.error(`Error loading list from ${item.name}:`, error);
                }
            }
        }

        return lists;
    },

    deleteListFile: async (id: string) => {
        const baseDir = getBaseDir();
        const file = new File(baseDir, `list_${id}.json`);
        
        if (file.exists) {
            file.delete();
        }
    }
};
