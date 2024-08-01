import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Booking, PastOrder } from "../components/Interface";
import ProfileMain from "./ProfileMain";

interface User {
  id: number;
  name: string;
}

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const username = session?.user.email;

  const orderRes = await fetch(
    `https://yuchen-react-proj.azurewebsites.net/order_history/?username=${username}`,
    {
      cache: "no-store",
    }
  );
  const bookingRes = await fetch(
    `https://yuchen-react-proj.azurewebsites.net/reservations/?username=${username}`,
    {
      cache: "no-store",
    }
  );

  const orders: PastOrder[] = await orderRes.json();
  const bookings: Booking[] = await bookingRes.json();

  return (
    <div className="w-2/3 mx-auto my-4">
      <h1 className="font-bold text-3xl">Profile</h1>
      <ProfileMain orders={orders} bookings={bookings} />
    </div>
  );
};

export default Profile;
