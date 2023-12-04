import { Tooltip } from "@nextui-org/react"
import { getDictionary } from "@/dictionaries"
import HomeButtons from "@/components/HomePage"

export async function generateMetadata({ params: { lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.home.headTitle,
  }
}

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang)

  return (
    <main className="flex flex-col gap-y-3">
      <h1 className="text-xl">{dict.home.title}</h1>

      <p>{dict.home.message}</p>

      <ul>
        <li>
          <p>
            + {dict.home.skill1} Objective-C, Python, Swift, Html,{" "}
            <Tooltip
              content={
                <a href="https://fullstack.edu.vn" target="_blank">
                  {dict.home.studyAt}
                </a>
              }
            >
              <b>{dict.home.studying} Css</b>
            </Tooltip>{" "}
            (scss,{" "}
            <a className="text-blue-500 hover:underline" href="https://tailwindcss.com" target="_blank">
              tailwind
            </a>
            ,{" "}
            <a className="text-blue-500 hover:underline" href="https://mui.com" target="_blank">
              mui
            </a>
            ,{" "}
            <a className="text-blue-500 hover:underline" href="https://ant.design" target="_blank">
              antd
            </a>
            ), Javascript (
            <a className="text-blue-500 hover:underline" href="https://nodejs.org" target="_blank">
              nodejs
            </a>
            , vanilla,{" "}
            <a className="text-blue-500 hover:underline" href="https://react.dev" target="_blank">
              reactjs
            </a>
            , redux,{" "}
            <a className="text-blue-500 hover:underline" href="https://nextjs.org" target="_blank">
              nextjs
            </a>
            ,{" "}
            <a className="text-blue-500 hover:underline" href="https://www.typescriptlang.org" target="_blank">
              typescript
            </a>
            ,{" "}
            <a className="text-blue-500 hover:underline" href="https://frida.re" target="_blank">
              frida
            </a>
            )
          </p>
        </li>
        <li>
          <p>
            + {dict.home.skill2} (
            <a className="text-blue-500 hover:underline" href="https://www.prisma.io" target="_blank">
              prisma
            </a>
            ), Mongodb, SwiftData
          </p>
        </li>
        <li>
          <p>{dict.home.hobby}</p>
        </li>
      </ul>

      <a
        className="text-blue-500 hover:underline"
        href="https://x.com/Pkn0wn"
        target="_blank"
        rel="noopener noreferrer"
      >
        -&gt; x
      </a>

      <HomeButtons dict={dict} />
    </main>
  )
}
