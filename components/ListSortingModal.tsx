interface Props {
  setSortingValue: React.Dispatch<
    React.SetStateAction<{ text: string; query: string }>
  >;
  sort: {
    id: number;
    text: string;
    value: string;
  }[];
  setisSortingTab: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ListSortingModal({
  setSortingValue,
  sort,
  setisSortingTab,
}: Props) {
  const selectSorting = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSortingValue({
      text: e.currentTarget.name,
      query: e.currentTarget.value,
    });
    setisSortingTab(false);
  };
  return (
    <div className="absolute top-10 right-0 flex flex-col space-y-3 rounded-md border bg-white px-5 py-2">
      {sort.map((item) => (
        <button
          key={item.id}
          value={item.value}
          name={item.text}
          onClick={selectSorting}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
}
