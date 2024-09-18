"use client";
import { WordInfo } from "@/models/wordInfo.model";

type ListwordsProps = {
  children?: React.ReactNode;
  listWords: WordInfo[];
  error: string;
  nextResults: number;
  totalRecords: number;
  handlerSetNextResult: (skip: number) => void;
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
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          disabled={
            props.listWords.length >= props.totalRecords || props.loading
          }
          onClick={() => {
            const skip = props.nextResults + 1;
            props.handlerSetNextResult(skip);
          }}
        >
          Load More
        </button>
      </div>
    </section>
  );
}

export { Listwords };
