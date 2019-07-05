import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        type     : 'group',
        children : [
            {
                id        : 'actorTable',
                title     : 'Actors',
                type      : 'item',
                url       : '/actor/table',
                exactMatch: true
            },
            {
                id        : 'customerTable',
                title     : 'Customers',
                type      : 'item',
                url       : '/customer/table',
                exactMatch: true
            },
            {
                id        : 'storeTable',
                title     : 'Stores',
                type      : 'item',
                url       : '/store/table',
                exactMatch: true
            }
        ]
    }
];
