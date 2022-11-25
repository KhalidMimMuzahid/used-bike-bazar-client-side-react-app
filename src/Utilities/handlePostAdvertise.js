import { toast } from "react-toastify";

const handleAdvertisePost = (_id, refetch, isRefetch = false) => {
  console.log("refetch", refetch, "\nisrefetch", isRefetch);
  fetch(`http://localhost:5000/makeadvertisement?_id=${_id}`, {
    method: "PUT",
  })
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
