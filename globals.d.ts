/// <reference no-default-lib="true"/>
/// <reference lib="es2023"/>
interface Constructor<T> {
  readonly prototype: T;
  new (): T;
}
type TextEncoderConstructor = Constructor<ITextEncoder>;
type TextDecoderConstructor = Constructor<ITextDecoder>;

declare var global: GlobalThis;
declare var onUnhandledRejection: OnUnhandledRejection;
declare var require: Require;
declare var TextEncoder: TextEncoderConstructor;
declare var TextDecoder: TextDecoderConstructor;
declare var lo: Runtime;
declare var console: Console;
declare class CString extends Uint8Array {
  ptr: number;
  size: number;
}

interface GlobalThis extends GlobalThisBase {
  globalThis: GlobalThis;
  global: GlobalThis;
  onUnhandledRejection: OnUnhandledRejection;
  require: Require;
  TextEncoder: TextEncoderConstructor;
  TextDecoder: TextDecoderConstructor;
  lo: Runtime;
  console: Console;
  CString: CString;
}

interface GlobalThisBase
  extends Omit<Pick<
    typeof globalThis,
    | 'Object'
    | 'Function'
    | 'Array'
    | 'Number'
    | 'parseFloat'
    | 'parseInt'
    | 'Infinity'
    | 'NaN'
    | 'undefined'
    | 'Boolean'
    | 'String'
    | 'Symbol'
    | 'Date'
    | 'Promise'
    | 'RegExp'
    | 'Error'
    | 'AggregateError'
    | 'EvalError'
    | 'RangeError'
    | 'ReferenceError'
    | 'SyntaxError'
    | 'TypeError'
    | 'URIError'
    | 'globalThis'
    | 'JSON'
    | 'Math'
    | 'Intl'
    | 'ArrayBuffer'
    | 'Atomics'
    | 'Uint8Array'
    | 'Int8Array'
    | 'Uint16Array'
    | 'Int16Array'
    | 'Uint32Array'
    | 'Int32Array'
    | 'Float32Array'
    | 'Float64Array'
    | 'Uint8ClampedArray'
    | 'BigUint64Array'
    | 'BigInt64Array'
    | 'DataView'
    | 'Map'
    | 'BigInt'
    | 'Set'
    | 'WeakMap'
    | 'WeakSet'
    | 'Proxy'
    | 'Reflect'
    | 'FinalizationRegistry'
    | 'WeakRef'
    | 'decodeURI'
    | 'decodeURIComponent'
    | 'encodeURI'
    | 'encodeURIComponent'
    | 'escape'
    | 'unescape'
    | 'eval'
    | 'isFinite'
    | 'isNaN'
    | 'SharedArrayBuffer'
    | 'global'
    | 'lo'
    | 'onUnhandledRejection'
    | 'require'
    | 'TextDecoder'
    | 'TextEncoder'
    | 'console'
  >,
  | 'global'
  | 'globalThis'
  | 'lo'
  | 'onUnhandledRejection'
  | 'require'
  | 'TextDecoder'
  | 'TextEncoder'
  | 'console'
  > {}

type OnUnhandledRejection = (error: Error) => void;

type Require = <T extends Record<string | number | symbol, unknown>>(
  file_path: string
) => T | undefined;

interface Console {
  log: (str: unknown) => number;
  error: (str: unknown) => number;
}

interface ITextEncoder {
  /**
   * The encoding supported by the `TextEncoder` instance. Always set to `'utf-8'`.
   */
  readonly encoding: string;
  /**
   * UTF-8 encodes the `input` string and returns a `Uint8Array` containing the
   * encoded bytes.
   * @param [input='an empty string'] The text to encode.
   */
  encode(input?: string): Uint8Array;
  /**
   * UTF-8 encodes the `src` string to the `dest` Uint8Array and returns an object
   * containing the read Unicode code units and written UTF-8 bytes.
   *
   * ```js
   * const encoder = new TextEncoder();
   * const src = 'this is some data';
   * const dest = new Uint8Array(10);
   * const { read, written } = encoder.encodeInto(src, dest);
   * ```
   * @param src The text to encode.
   * @param dest The array to hold the encode result.
   */
  encodeInto(src?: string, dest?: Uint8Array): number;
}

interface ITextDecoder {
  /**
   * The encoding supported by the `TextEncoder` instance. Always set to `'utf-8'`.
   */
  readonly encoding: string;
  /**
   * UTF-8 decodes the `Uint8Array` and returns an `input` string.
   */
  decode(ptr_source?: typeof CString | Uint8Array): string;
}

type ZeroOrMinusOne = 0 | -1;
type OS = 'mac' | 'win' | 'linux';
type ARCH = 'x64' | 'arm64';
type TypedArray =
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array
  | BigUint64Array
  | BigInt64Array
  | ArrayBuffer;

type Ptr<T extends TypedArray> = T & {
  ptr: number;
  size: number;
};

// TODO: find better way to type imports
type UnknownLib<T extends string | number> = Record<
  T | string | number | symbol,
  unknown
>;
type SetLibTypeIfNameMatches<
  T extends string | number,
  Name,
  LibType,
  FallbackType
> = Name extends T
  ? T extends Name
    ? Record<T, LibType>
    : FallbackType
  : FallbackType;
type Library<T extends string | number> =
  SetLibTypeIfNameMatches<T, 'core', Core, UnknownLib<T>>
  & {
  handle?: number;
  fileName?: string;
  internal?: boolean;
};

interface RuntimeVersion {
  lo: string;
  v8: string;
}

// TODO: autogenerate
interface Core {
  name: 'core',
  // TODO: add missing declarations
  // validate with list from: lo eval 'console.log(`"${Object.getOwnPropertyNames(lo.core).join(`":unknown;"`)}":unknown;`)'
  open(path: string, flags: number, mode?: number): number;
  dlsym(handle: number, name: string): number;
  dlopen(path: string, flags: number): number;
  strnlen(str: string | number, size: number): number;
  /**
   * Reads a file from the given path into a Uint8Array and returns it.
   * @param [path] The path to the file.
   */
  read_file(path: string): Uint8Array;
  /**
   * Creates/Overwrites a file at the specified path with the given Uint8Array
   * as the contents of the file.
   * @param {string}[path] The path of the file to create.
   * @param {TypedArray}[buffer] The data write to the file.
   * @returns {number} Number of bytes written
   */
  write_file(
    path: string,
    buffer: Uint8Array,
    flags?: number,
    mode?: number
  ): number;
  os: OS;
  arch: ARCH;
  little_endian: boolean;
  homedir: string;
  defaultWriteFlags: number;
  defaultWriteMode: number;
  isatty(fd: number): 0 | 1;
  mmap(
    ptr: number,
    length: number,
    prot: number,
    flags: number,
    fd: number,
    offset: number
  ): number;
  calloc(num: number, size: number): number;
  free(num: number): void;
  memcpy(dest: number, src: number, size: number): number;
  aligned_alloc(alignment: number, size: number): number;
  memmove(dest: number, src: number, size: number): number;
  fork(): number;
  usleep(microseconds: number): void;
  sysconf(num: number): number;
  times(buf: TypedArray): number;
  pread(num: number, buf: TypedArray, num2: number, num3: number): number;
  waitpid(num: number, buf: TypedArray, num2: number): number;
  execve(str: string, buf: TypedArray, buf2: TypedArray): number;
  execvp(str: string, buf: TypedArray): number;
  readlink(path: string, buf: TypedArray, num: number): number;
  getcwd(ptr: number, num: number, buf: Uint32Array): void;
  getenv(name: string, buf: Uint32Array): void;
  setenv(name: string, value: string, overwrite?: number): ZeroOrMinusOne;
  write_string(num: number, str: string): number;
  fstat(fd: number, buf: TypedArray): number;
  read(fd: number, buf: TypedArray, count: number): ZeroOrMinusOne;
  write(fd: number, buf: TypedArray, count: number): number;
  close(fd: number): ZeroOrMinusOne;
  readFile(path: string, flags?: number, size?: number): Uint8Array;

  isolate_context_size(): number;
  isolate_context_destroy(context: number): void;
  isolate_context_create(argc: number, argv: number, main: string, main_size: number, script: string, script_size: number, buffer: number, buffer_len: number, fd: number, starttime: number, globalname: string, scriptname: string, cleanup: number, onexit: number, startupdata: number, context: number): void;
  writeFile(
    path: string,
    u8: Uint8Array,
    flags?: number,
    mode?: number
  ): number;

  isFile(path: string): boolean;
  // conditionally defined props
  loader?: (specifier: string, resource: string) => string;
  sync_loader?: (specifier: string, resource: string) => string;
  binding_loader?: <T extends string>(name: T) => Library<T>;

  // constants
  S_IFBLK: number;
  S_IFCHR: number;
  S_IFIFO: number;
  S_IRUSR: number;
  S_IWUSR: number;
  S_IRGRP: number;
  S_IWGRP: number;
  S_IROTH: number;
  S_IWOTH: number;
  O_RDONLY: number;
  O_WRONLY: number;
  O_CREAT: number;
  S_IRWXU: number;
  S_IRWXG: number;
  S_IXOTH: number;
  O_TRUNC: number;
  STDIN: 0;
  STDOUT: 1;
  STDERR: 2;
  O_CLOEXEC: number;
  RUSAGE_SELF: number;
  SEEK_SET: number;
  SEEK_CUR: number;
  SEEK_END: number;
  S_IRWXO: number;
  F_OK: number;
  S_IFMT: number;
  S_IFDIR: number;
  S_IFREG: number;
  NAME_MAX: number;
  O_RDWR: number;
  O_SYNC: number;
  O_DIRECTORY: number;
  F_SETFL: number;
  O_NONBLOCK: number;
  EAGAIN: number;
  WNOHANG: number;
  SIGTERM: number;
  MAP_SHARED: number;
  MAP_ANONYMOUS: number;
  MAP_PRIVATE: number;
  MS_ASYNC: number;
  MS_SYNC: number;
  MS_INVALIDATE: number;
  _SC_CLK_TCK: number;
  F_GETFL: number;
  RTLD_NOW: number;
  RTLD_LAZY: number;
  RTLD_GLOBAL: number;
  RTLD_LOCAL: number;
  RTLD_NODELETE: number;
  RTLD_NOLOAD: number;
  RTLD_DEFAULT: number;
  RTLD_NEXT: number;
  PROT_READ: number;
  PROT_WRITE: number;
  PROT_EXEC: number;
}

// TODO: autogenerate
interface Runtime {
  // validate with list from: lo eval 'console.log(`"${Object.getOwnPropertyNames(lo).join(`":unknown;"`)}":unknown;`)'
  moduleCache: Map<string, ReturnType<Runtime['loadModule']>>;
  libCache: Map<string, object>;
  requireCache: Map<string, object>;
  start: number;
  errno: number;
  colors: Record<Uppercase<string>, string>;
  core: Core;
  libraries(): string[];
  builtins(): string[];
  assert(expression: any, message?: string | Function): any;
  cstr(str: string): CString;
  load(name: string): any;
  library<T extends string | number>(name: T): Library<T>;
  /**
   * Prints a string to the console
   * @param [str='a string'] The text to print.
   */
  print(str: string): void;
  exit(status: number): void;
  runMicroTasks(): void;
  hrtime(): number;
  nextTick(callback: Function): void;
  getAddress(buf: TypedArray): number;
  utf8Length(str: string): number;
  utf8EncodeInto(str: string, buf: TypedArray): number;
  utf8EncodeIntoAtOffset(str: string, buf: TypedArray, off: number): number;
  utf8_decode(address: number, len?: number): string;
  latin1Decode(address: number, len?: number): string;
  utf8Encode(str: string): Uint8Array;
  utf8Decode: Runtime['utf8_decode'];
  wrap<
    Handle extends TypedArray,
    WrappedFnArgs extends unknown[],
  >(
    handle: Handle,
    fn: (...args: [...WrappedFnArgs, Handle]) => unknown,
    plen: number
  ): (...args: WrappedFnArgs) => number;
  addr(handle: TypedArray): number;
  version: RuntimeVersion;
  args: string[];
  argv: number;
  argc: number;
  workerSource: string;
  builtin(path: string): string;
  os(): OS;
  arch(): ARCH;
  getenv(str: string): string;
  evaluateModule<T extends object>(identifier: number): Promise<T>;
  loadModule(
    source: string,
    specifier: string
  ): {
    requests: string;
    isSourceTextModule: boolean;
    status: number;
    specifier: string;
    src: string;
    identity: number;
    scriptId: number;
    // js land extensions on returned value
    resource?: string;
    evaluated?: boolean;
    namespace?: object; // module namespace object
  };
  readMemory(dest: TypedArray, start: number, len: number): void;
  /**
   * Wraps a raw pointer and a size in an ArrayBuffer
   * @param [start] The memory address of the pointer.
   * @param [size] The number of bytes of memory to wrap.
   * @param [free] `0` to control when the memory is freed, `1` to have GC free it.
   */
  wrapMemory(start: number, size: number, free: number): Uint8Array;
  unwrapMemory(buffer: ArrayBufferLike): void;
  ptr<T extends TypedArray>(u8: T): Ptr<T>;
  register_callback(ptr: number, fn: Function): void;
  registerCallback: Runtime['register_callback'];
  setModuleCallbacks(
    on_module_load: Function,
    on_module_instantiate: Function
  ): void;

  utf8EncodeIntoPtr(str: string, ptr: number): number;
  runScript(source: string, path: string /* resource name */): void;
  pumpMessageLoop(): void;
  readMemoryAtOffset(
    u8: TypedArray,
    start: number,
    size: number,
    offset: number
  ): void;
  setFlags(str: string): void;
  getMeta: unknown;

  setenv: Core['setenv'];
  getcwd(): string;
  run_script: Runtime['runScript'];
  bindings: Runtime['libraries'];
  evaluate_module: Runtime['evaluateModule'];
  get_address: Runtime['getAddress'];
  get_meta: Runtime['getMeta'];
  latin1_decode: Runtime['latin1Decode'];
  lib_cache: Runtime['libCache'];
  load_module: Runtime['loadModule'];
  module_cache: Runtime['moduleCache'];
  next_tick: Runtime['nextTick'];
  pump_message_loop: Runtime['pumpMessageLoop'];
  read_memory: Runtime['readMemory'];
  read_memory_at_offset: Runtime['readMemoryAtOffset'];
  require_cache: Runtime['requireCache'];
  run_microtasks: Runtime['runMicroTasks'];
  set_flags: Runtime['setFlags'];
  set_module_callbacks: Runtime['setModuleCallbacks'];
  unwrap_memory: Runtime['unwrapMemory'];
  utf8_encode: Runtime['utf8Encode'];
  utf8_encode_into: Runtime['utf8EncodeInto'];
  utf8_encode_into_ptr: Runtime['utf8EncodeIntoPtr'];
  utf8_encode_into_at_offset: Runtime['utf8EncodeIntoAtOffset'];
  utf8_length: Runtime['utf8Length'];
  wrap_memory: Runtime['wrapMemory'];
}
