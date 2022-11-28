import { toast } from "react-toastify";

const handleAdvertisePost = (_id, refetch, isRefetch = false) => {
  console.log("refetch", refetch, "\nisrefetch", isRefetch);
  fetch(
    `https://used-bike-bazar-server.vercel.app/makeadvertisement?_id=${_id}`,
    {
      method: "PUT",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data?.acknowledged) {
        toast.success("this post is advertised");
        if (isRefetch) {
          refetch();
        }
      }
    });
};
export default handleAdvertisePost;
