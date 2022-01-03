import { styled } from "@mui/material/styles";
import { PhotoCamera } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { Box } from "@mui/system";
import useAuth from "../Hooks/useAuth";
import axios from "axios";

const NewPostBox = () => {
  const { postType, view, handleViewType, user } = useAuth();

  const [singleUserID, setSingleUserID] = useState([]);
  const [postData, setPostData] = useState("");
  const [image, setImage] = useState(null);
  const [imgCaption, setImgCaption] = useState("");
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => data.filter((x) => x.email === user.email))
      .then((newData) => setSingleUserID(newData[0]._id));
  }, [user.email]);

  const handlePost = (e) => {
    if (!image) {
      setImage("");
    }
    if (!postData) {
      setPostData("");
    }
    let UID = { UID: singleUserID };
    let storeP = { postData: postData };
    let postImg = { postImage: image };
    const iCaption = { imgCaption: imgCaption };
    const time = new Date().getTime();
    const finalData = {
      ...UID,
      displayName: user?.displayName,
      proImage: user?.photoURL,
      ...storeP,
      ...postImg,
      ...iCaption,
      time,
    };

    // console.log(finalData);

    axios.post("http://localhost:5000/posts", finalData).then((res) => {
      console.log(res.data);
    });
    //   //     const postData = document.getElementById("postData").value;
    //   //     const UID = { UID: singleUserID };
    //   //     const finalPost = { post: postData };
    //   //     const time = new Date().getTime();
    //   //     const finalData = { ...UID, time, ...finalPost };
    //   //     fetch("https://aqueous-springs-11487.herokuapp.com/posts", {
    //   //       method: "POST",
    //   //       headers: {
    //   //         "content-type": "application/json",
    //   //       },
    //   //       body: JSON.stringify(finalData),
    //   //     })
    //   //       .then((res) => res.json())
    //   //       .then((data) => {
    //   //         if (data?.insertedId) {
    //   //           document.location.reload();
    //   //           document.getElementById("postData").value = "";
    //   //         }
    //   //       });
  };

  function encodeImageFileAsURL(target) {
    const file = target;
    const reader = new FileReader();
    reader.onloadend = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const Input = styled("input")({
    display: "none",
  });

  return (
    <div
      style={{
        display: view ? "block" : "none",
        background: "white",
        padding: "5px",
        borderRadius: "10px",
        marginTop: "10px",
        boxShadow: "1px 1px 5px #ccc",
      }}
    >
      {/* Normal Post */}
      <div
        style={{
          display: postType === "text" ? "block" : "none",
          padding: "10px",
        }}
      >
        <TextField
          id="postData"
          label="Post"
          multiline
          rows={4}
          fullWidth
          onBlur={(e) => setPostData(e.target.value)}
        />

        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "10px" }}
        >
          <Button
            title="Close"
            onClick={() => {
              handleViewType(false);
            }}
          >
            {/* Cross Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fd0061"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
          <Button
            title="Clear"
            onClick={() => {
              document.getElementById("postData").value = "";
            }}
          >
            {/* Trash Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fd0061"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7h16" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              <path d="M10 12l4 4m0 -4l-4 4" />
            </svg>
          </Button>
          <Button
            onClick={() => {
              handlePost();
              document.getElementById("postData").value = "";
            }}
          >
            Post
          </Button>
        </div>
      </div>

      {/* Image */}
      <div
        style={{
          display: postType === "image" ? "block" : "none",
          textAlign: "center",
          padding: "10px",
        }}
      >
        <TextField
          id="postDataImg"
          label="Post"
          multiline
          rows={4}
          fullWidth
          onBlur={(e) => setImgCaption(e.target.value)}
        />

        {/* Preview */}
        {image ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
          >
            <img src={image} alt="" style={{ width: "200px" }} />
          </Box>
        ) : (
          ""
        )}

        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "10px" }}
        >
          <Button
            title="Close"
            onClick={() => {
              handleViewType(false);
            }}
          >
            {/* Cross Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fd0061"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
          <Button
            title="Clear"
            onClick={() => {
              document.getElementById("postDataImg").value = "";
              setImage("");
            }}
          >
            {/* Trash Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fd0061"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7h16" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              <path d="M10 12l4 4m0 -4l-4 4" />
            </svg>
          </Button>

          <label htmlFor="image-in">
            <Input
              accept="image/*"
              id="image-in"
              type="file"
              onChange={(e) => {
                encodeImageFileAsURL(e.target.files[0]);
              }}
            />
            <Button
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </Button>
          </label>

          <Button
            onClick={() => {
              handlePost();
              document.getElementById("postDataImg").value = "";
              setImage("");
            }}
          >
            Post
          </Button>
        </div>
      </div>

      {/* Others */}
      <div
        style={{
          display: postType === "others" ? "block" : "none",
          textAlign: "center",
          padding: "50px",
        }}
      >
        <h3>Coming Soon...</h3>
        <Button
          title="Close"
          onClick={() => {
            handleViewType(false);
          }}
        >
          {/* Cross Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-x"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fd0061"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default NewPostBox;
