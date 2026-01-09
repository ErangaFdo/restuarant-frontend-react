import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { getAllUser } from "../Services/user"; // your API service

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

interface UserCardGridHandle {
  refreshData: () => void;
}

const UserCardGrid = forwardRef<UserCardGridHandle>((_, ref) => {
  const [userList, setUserList] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  const loadData = async () => {
    try {
      const res = await getAllUser(page, limit);
      setUserList(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  useImperativeHandle(ref, () => ({
    refreshData: () => loadData(),
  }));

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div className="mt-10">
      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userList.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{user.firstname} {user.lastname}</h3>
            <p className="text-gray-600">{user.email}</p>
            <span className="mt-2 inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
              {user.role}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span className="font-medium text-lg">{page} / {totalPages}</span>
        <button
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
});

UserCardGrid.displayName = "UserCardGrid";

export default UserCardGrid;