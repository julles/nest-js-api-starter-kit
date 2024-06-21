export interface SeederInterface {
  seederName: string;

  run(): Promise<void>;
}
