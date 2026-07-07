import React from "react";

export default async function UserDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1>User Detail Page</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}