import { toast } from "sonner";
import { useMemo, useRef, useState } from "react";
import { Button, Slider, TextField } from "@radix-ui/themes";

import { CircleProgress } from "./Progress";
import useKeyPress from "../hooks/useKeyPress";
import { useHistory } from "../context/History";
import { getTryCount } from "../utils";

const getTargetNumber = (range) => Math.floor(Math.random() * range + 1);

export default function Player({ min = 1, max = 2048, defaultValue = [100] }) {
  const inputRef = useRef();
  const [games, setGames] = useState(0);
  const [number, setNumber] = useState(0);
  const [start, setStart] = useState(false);
  const [history, setHistory] = useState([]);
  const [range, setRange] = useState(defaultValue[0]);

  const { addHistory } = useHistory();

  const tryCount = useMemo(() => getTryCount(range), [range, games]);
  const targetNumber = useMemo(() => getTargetNumber(range), [range, games]);

  const handleKeyPress = (num) => {
    if (start && document.activeElement !== inputRef.current && num > 0 && num <= range) {
      setNumber(num);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const num = Number(event.target.value);
    num > 0 && num <= range && setNumber(num);
  };

  const handleRestart = (list, number, tryCount) => {
    addHistory(list, number, tryCount);
    setHistory([]);
    setStart(false);
    setGames(games + 1);
  };

  const handleCheckNumber = () => {
    if (!start) return;

    const list = [...history, number];
    setHistory(list);

    if (history.length < tryCount - 1) {
      if (number > targetNumber) {
        toast.warning("Bạn cần giảm một chút...");
      } else if (number < targetNumber) {
        toast.warning("Bạn cần tăng một chút...");
      } else {
        toast.success("Bạn đã đoán chính xác!");
        handleRestart(list, targetNumber, tryCount);
      }
    } else {
      toast.error(`Bạn đã thua, số cần đoán là ${targetNumber}.`);
      handleRestart(list, targetNumber, tryCount);
    }
  };

  useKeyPress(13, handleCheckNumber);
  useKeyPress("(", () => handleKeyPress(number - 1));
  useKeyPress("&", () => handleKeyPress(number + 1));

  return (
    <div className="flex flex-col gap-y-6">
      <p className="text-2xl font-semibold">Bạn cần tìm kiếm một con số từ 1 đến {range}</p>

      <div className="flex flex-col">
        <Slider
          size="3"
          min={min}
          max={max}
          disabled={start}
          defaultValue={defaultValue}
          onValueChange={(value) => setRange(value)}
        />
        <div className="flex justify-between mt-1 relative">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>

      <TextField.Root>
        <TextField.Input
          size="3"
          type="number"
          radius="large"
          value={number}
          ref={inputRef}
          disabled={!start}
          onChange={handleChange}
          placeholder="Thử nhập 1 con số..."
        />
      </TextField.Root>

      <div className="flex flex-col w-full justify-center items-center">
        {start ? (
          <>
            <CircleProgress className="w-16 h-16" value={((tryCount - history.length) / tryCount) * 100} />
            <p className="text-2xl font-semibold mt-2">Bạn còn {tryCount - history.length} lần thử</p>
          </>
        ) : (
          <Button onClick={() => setStart(true)} radius="large" size="3" className="cursor-pointer">
            {games > 0 ? "Chơi lại" : "Bắt đầu chơi"}
          </Button>
        )}
      </div>
    </div>
  );
}
