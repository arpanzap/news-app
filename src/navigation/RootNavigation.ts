
import React, { RefObject } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef: RefObject<NavigationContainerRef> = React.createRef();

// export const resetStack = (name: string, params: string) => {
//     navigationRef.current?.reset({
//         index: 0, routes: [{
//             name: name,
//             params: params
//         }]
//     })
// }