import Image from "next/image";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 md:flex items-center justify-center w-full text-sm md:text-base text-center px-2 text-white">
      <div className="flex flex-row flex-wrap items-center justify-center w-full gap-2 pb-3">
        Made with 🧡 at Based India - Powered by{" "}
        <Image
          src="/safe/logo.svg"
          alt="LayerZero Logo"
          className="shadow-md"
          width={"80"}
          height={"80"}
        />
      </div>
    </footer>
  );
}
