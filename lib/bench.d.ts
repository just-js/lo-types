declare module "lib/bench.js" {

export class Bench {
  start(name: string): void;
  end(runs: number): void;
}

}
