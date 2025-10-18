declare module "lib/proc.js" {

type ExecArgs = {
  args: Ptr,
  cstrings: TypedArray[]
};

export function mem(): number;
export function make_args(args: string[]): ExecArgs;
}
