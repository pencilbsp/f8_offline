import { memo } from "react";

function Histories({ histories, total, onHistoriesCleared }) {
  return (
    <div>
      <h2>Lịch sử nạp tiền</h2>
      {histories.map((item, index) => (
        <h3 key={index}>{item.amount.toLocaleString()}</h3>
      ))}
      <h2>Tổng: {total.toLocaleString()}</h2>
      <button onClick={onHistoriesCleared}>Xoá lịch sủ</button>
    </div>
  );
}

export default memo(Histories);
