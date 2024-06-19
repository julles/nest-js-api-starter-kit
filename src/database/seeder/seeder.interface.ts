export interface SeederInferface {
  seederName: string;

  run(): Promise<void>;
}
