import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col gap-2 h-99  justify-center">
        <div className="w-full">
          <div className=" font-bold text-lg ">Welcome to Home Page</div>
          <div className="">
            <p className="my-4">
              🖱️ Client Page: Interactive client-side rendering in action. 🚀
              Server Page: Optimized static content for SEO.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
