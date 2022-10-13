/** @format */

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type UnwrapArray<T> = T extends Array<infer U> ? U : T;
