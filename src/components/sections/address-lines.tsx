import { Fragment } from "react";

/** Address lines separated by line breaks, for use inside an <address>. */
export function AddressLines({ lines }: { readonly lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </>
  );
}
