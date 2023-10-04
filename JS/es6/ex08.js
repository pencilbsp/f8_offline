const getUser = async () => new Promise((resolve) => setTimeout(() => resolve("Vu Thong"), 1000));

async function showMessage() {
  try {
    const data = await getUser();
    console.log(data);
  } catch (error) {}
}

showMessage();
