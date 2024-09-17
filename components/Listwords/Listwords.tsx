"use client";
import { WordInfo } from "@/models/wordInfo.model";

type ListwordsProps = {
  children?: React.ReactNode;
  listWords: WordInfo[];
  error: string;
  onError: () => React.JSX.Element;
  loading: boolean;
  onLoading: () => React.JSX.Element;
  onEmptySearch: () => React.JSX.Element;
  render: (item: WordInfo, index: number) => React.ReactNode;
};
function Listwords(props: ListwordsProps) {
  return (
    <section>
      {props.error && props.onError()}
      {props.loading && props.onLoading()}

      {!props.loading && !props.listWords.length && props.onEmptySearch()}

      {props.listWords.map(props.render)}
      <ul>{props.children}</ul>
    </section>
  );
}

export { Listwords };
