const data = {
  count: 0,
  callback: () => {
    console.log("hello");
  },
};

const evaluate = (context, expr) => {
  const keys = Object.keys(context);
  const result = Function(keys.join(","), expr + ";return arguments;")(...Object.values(context));
  return Object.values(result).reduce(function (res, value, index) {
    return Object.assign(res, { [keys[index]]: value });
  }, {});
};

const result = evaluate(data, "count++");
console.log(result);
