/** @format */

export interface ClientSeverRenderer {
  html: Promise<string>;
}

type ClientRendererProps = {
  url: string;
};

export type ClientRenderer = (
  props: ClientRendererProps
) => Promise<ClientSeverRenderer>;

export interface EntryProps {
  url: string;
}
