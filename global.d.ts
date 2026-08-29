export {};

declare module "meshline" {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

interface ViewTransition {
  readonly ready: Promise<void>;
  readonly finished: Promise<void>;
  skipTransition(): void;
}

interface Document {
  startViewTransition?(update: () => void): ViewTransition;
}
