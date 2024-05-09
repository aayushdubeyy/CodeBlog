import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export interface Blog {
  content: string;
  title: string;
  id: string;
  createdAt: string;
  author: {
    name: string;
    userAbout: string;
  };
}
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id || ""}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      });
  }, [id]);
  return { loading, blog };
};
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      });
  }, []);
  return { loading, blogs };
};

export const useUserBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState<{
    name: string;
    userDescription: string;
    userAbout: string;
  }>({ name: "Anonymous", userDescription: "", userAbout: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blogs response always
        const blogsResponse = await axios.get(
          `${BACKEND_URL}/api/v1/blog/author`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlogs(blogsResponse.data.blogs);

        // Check if user details are present in local storage
        const storedUserDetails = localStorage.getItem("userDetails");
        if (storedUserDetails) {
          setUser(JSON.parse(storedUserDetails));
          setLoading(false);
        } else {
          // Fetch user details only if not present in local storage
          const userDetailsResponse = await axios.get(
            `${BACKEND_URL}/api/v1/user`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setUser(userDetailsResponse.data);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(userDetailsResponse.data)
          );
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { loading, blogs, user, setBlogs, setLoading };
};
export const useUser = () => {
  const [user, setUser] = useState({ name: "Anonymous" });
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    } else {
      const fetchUserDetails = async () => {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
        localStorage.setItem("userDetails", JSON.stringify(res.data));
        console.log("res data", res.data);
      };
      fetchUserDetails();
    }
  }, []);
  return { user };
};

export const usePublish = ({ id }: { id: string }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setContent(res.data.blog.content);
        setTitle(res.data.blog.title);
      };
      fetchBlog();
    }
  }, [id]);
  const publishHandler = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    navigate(`/blog/${response.data.id}`);
  };
  const editHandler = async () => {
    await axios.put(
      `${BACKEND_URL}/api/v1/blog/${id}`,
      { title, content },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    navigate("/profile");
  };
  return { title, setTitle, content, setContent, publishHandler, editHandler };
};
