import { useState } from "react";
import { useSearchUsersQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";

function Users() {
  const [searchInput, setSearchInput] = useState("");
  const debounced = useDebounce(searchInput);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  return (
    <div className="flex justify-center pt-10 mh-auto h-screen w-screen">
      {isError && (
        <p className="text-center pb-10 text-red-600">Something wrong...</p>
      )}
      <div className="w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2 "
          placeholder="Search username..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="absolute pt-10 mh-auto ">
        {isLoading && <p>Loading...</p>}
        {data?.map((user) => (
          <ul
            className="relative w-[200px] pt-10 hover:shadow-md transition-all"
            key={user.id}
          >
            <a href={user.html_url} target="_blank">
              <img src={user.avatar_url} />
              <li className="text-center py-2 px-4 cursor-pointer">
                {user.login}
              </li>
            </a>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Users;
