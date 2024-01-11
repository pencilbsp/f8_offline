import data from "./data.json"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
})

async function seed() {
  for (const user of data.users) {
    await prisma.customer.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        shippings: {
          create: user.shippings[0],
        },
      },
    })
  }

  for (const product of data.products) {
    await prisma.product.upsert({
      where: {
        sku: product.sku,
      },
      update: {},
      create: {
        name: product.name,
        sku: product.sku,
        price: product.price,
        discount_price: product.discount_price,
      },
    })
  }
}

async function buy(customer_id, cart) {
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: Object.keys(cart).map((id) => Number(id)),
      },
    },
  })

  const order_items = products.map((product) => {
    const quantity = cart[product.id].quantity
    const price = product.discount_price || product.price
    const subtotal = quantity * price

    return {
      quantity: quantity,
      price: price,
      subtotal: subtotal,
      product_id: product.id,
    }
  })

  const shipping = await prisma.shipping.findFirst({
    where: {
      customer_id: customer_id,
    },
  })
  console.log(shipping)
  const total_amount = order_items.reduce((total, item) => (total += item.subtotal), 0)

  const order = await prisma.order.create({
    data: {
      total_amount: total_amount,
      shipping_fee: 30000,
      order_items: {
        createMany: {
          data: order_items,
        },
      },
      status: {
        create: {
          detail: "Đơn hàng đã tạo thành công, đang chờ người bán xác nhận",
        },
      },
      customer: {
        connect: {
          id: customer_id,
        },
      },
      shipping: {
        connect: {
          id: shipping.id,
        },
      },
    },
  })

  console.log("order", order)
}

async function logOrder(order_id) {
  const order = await prisma.order.findUnique({
    where: {
      id: order_id,
    },
    select: {
      customer: {
        select: {
          name: true,
          email: true,
          phone_number: true,
        },
      },
      order_items: {
        select: {
          price: true,
          quantity: true,
          subtotal: true,
          product: {
            select: {
              name: true,
              sku: true,
            },
          },
        },
      },
      status: {
        select: {
          detail: true,
          updated_at: true,
        },
      },
      order_date: true,
      updated_at: true,
    },
  })

  console.log(order)
}

async function updateOrder(order_id, status) {
  await prisma.order.update({
    where: {
      id: order_id,
    },
    data: {
      status: {
        create: {
          detail: status,
        },
      },
    },
  })
}

async function listOrder() {
  const orders = await prisma.order.findMany({
    where: {},
    select: {
      total_amount: true,
      order_date: true,
      order_items: {
        select: {
          quantity: true,
        },
      },
      customer: {
        select: {
          name: true,
          email: true,
          phone_number: true,
        },
      },
    },
  })
  console.log(orders)
}

// await logOrder(1)

// await buy(1, {
//   3: {
//     quantity: 2,
//   },
//   4: {
//     quantity: 3,
//   },
//   5: {
//     quantity: 4,
//   },
// })

await updateOrder(1, "Đơn hàng đã được người bán xác nhận")

// await seed()

// await listOrder()
