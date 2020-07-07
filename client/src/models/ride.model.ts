export interface IRide {
  id: number;
  distance: number;
  startTime: string; // ISO date
  duration: number; // Duration in SECONDS
  price?: number; // Price in euros
  visited?: boolean; // has been clicked ?
}
