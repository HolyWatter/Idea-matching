export default function Category() {
  return (
    <div className="mr-14 flex flex-col space-y-5 md-m:hidden">
      <div className="w-[160px]">
        <p>카테고리</p>
        <div className="space-y-1 pt-3 text-sm">
          <p>개발</p>
          <p>요리</p>
          <p>일상</p>
        </div>
      </div>
      <div className="border-t" />
      <div className="w-[160px]">
        <p>인기태그</p>
        <div className="space-y-1 pt-3 text-sm">
          <p># 일상</p>
          <p># 감성</p>
        </div>
      </div>
    </div>
  );
}
