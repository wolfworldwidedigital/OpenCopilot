// https://github.com/mantinedev/mantine/blob/master/packages/@mantine/hooks/src/use-merged-ref/use-merged-ref.ts
import React, { Ref, useCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

export function assignRef<T>(ref: PossibleRef<T>, value: T) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
        (ref as React.MutableRefObject<T>).current = value;
    }
}

export function mergeRefs<T>(...refs: PossibleRef<T>[]) {
    return (node: T | null) => {
        refs.forEach((ref) => assignRef(ref, node));
    };
}

export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
    const merge = useCallback(() => mergeRefs(...refs), [refs])
    return merge
}