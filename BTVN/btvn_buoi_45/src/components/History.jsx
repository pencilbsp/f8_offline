import { Badge, Button, Table } from "@radix-ui/themes";
import { useHistory } from "../context/History";
import { getGameResult, getTryCount, timeToNow } from "../utils";
import { Trash2Icon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

export default function History() {
  const { histories, clearHistory } = useHistory();

  if (histories.length > 0)
    return (
      <div className="flex flex-col items-end gap-y-4">
        <Table.Root className="w-full">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Thời gian</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Số lần đoán</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Kết quả</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {histories.map(({ time, history, number, tryCount }) => {
              const result = getGameResult(history, number);
              return (
                <Table.Row key={time}>
                  <Table.RowHeaderCell className="w-[180px]">{timeToNow(time)}</Table.RowHeaderCell>
                  <Table.Cell className="w-[180px]">
                    {history.length}/{tryCount}
                  </Table.Cell>
                  <Table.Cell>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="p-0">
                          <Badge color={result ? "green" : "ruby"}>
                            Đoán {result ? "đúng" : "sai"} số {number}
                          </Badge>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table.Root variant="surface" className="mt-3">
                            <Table.Header>
                              <Table.Row>
                                <Table.ColumnHeaderCell>Lần đoán</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Số nhập vào</Table.ColumnHeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {history.map((number, index) => (
                                <Table.Row key={time + index}>
                                  <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                                  <Table.Cell>{number}</Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table.Root>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
        <Button onClick={clearHistory} color="ruby" radius="large">
          <Trash2Icon size={20} />
          Xoá lịch sử
        </Button>
      </div>
    );

  return null;
}
