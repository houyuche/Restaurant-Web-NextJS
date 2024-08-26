import Image from "next/image";

export default function Home() {
  return (
    <main className=" min-h-screen p-6">
      <div className="text-center text-4xl mt-10 font-bold text-gray-800">
        Welcome to Our Restaurant
      </div>
      <div className="mt-10 max-w-4xl mx-auto text-lg text-gray-700">
        <p>To see all the features of the app, you can log in using: </p>
        <p>Username: admin@123.com</p>
        <p>Password: 123456</p>
      </div>
    </main>
  );
}
