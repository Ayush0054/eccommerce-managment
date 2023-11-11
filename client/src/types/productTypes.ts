/* eslint-disable @typescript-eslint/no-explicit-any */
export type Product = {
  map(
    arg0: (prod: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  Name: string;
  Price: number;
  Description: string;
  Quantity: number;
  Sales: number;
  CreatedAt: Date;
};
