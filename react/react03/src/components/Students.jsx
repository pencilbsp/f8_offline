import { useState, startTransition } from "react";
import students from "../db.json";

export default function Students() {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (event) => {
    startTransition(() => setKeyword(event.target.value.toLowerCase()));
  };

  return (
    <div>
      <input value={keyword} type="search" placeholder="Từ khoá..." onChange={handleSearch} />
      <h3>Danh sách sinh viên</h3>
      {students.map(({ fullName, id }) => {
        const index = fullName.toLowerCase().indexOf(keyword);
        if (keyword && index > -1) {
          // console.log(index);
          return (
            <h4 key={id}>
              {fullName.slice(0, index)}
              <span className="text-blue-500">{fullName.slice(index, index + keyword.length)}</span>
              {fullName.slice(index + keyword.length)}
            </h4>
          );
        } else {
          return <h4 key={id}>{fullName}</h4>;
        }
      })}
    </div>
  );
}
