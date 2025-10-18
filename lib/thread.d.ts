declare module "lib/thread.js" {

type pthread = {
  EBUSY: number;
};

export const pthread : pthread;

type JoinResult = [number, number];

export function spawn (address: number, ctx: number): number;
export function join (tid: number): JoinResult;
export function try_join (tid: number);

}
