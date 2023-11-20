import CartsButton from "./CartsButton";

export default function Header() {
  return (
    <div className="bg-gray-800/80 backdrop-blur-lg text-white sticky top-0 border-b-1 border-b-gray-500 mb-6 z-40">
      <header className="container max-w-7xl flex justify-between items-center h-[56px] px-6">
        <a href="/" className="flex justify-center items-center">
          <img
            width={40}
            alt="Troll Store"
            src="https://user-images.githubusercontent.com/52459150/215552092-9dc1e029-da35-43da-867f-17279e3dc180.png"
          />
          <span className="ml-2 font-bold">Troll Sotre</span>
        </a>

        <CartsButton />
      </header>
    </div>
  );
}
