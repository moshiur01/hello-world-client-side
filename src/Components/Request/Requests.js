import { Box, Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Request from "./Request/Request";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    fetch("./fakeData.json")
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);
  return (
    <Box
      sx={{
        marginLeft: { xs: "auto", lg: "0" },
        marginRight: { xs: "auto", lg: "0" },
        width: { xs: "max-content", lg: "100%" },
        position: "sticky",
        top: "20px",
        zIndex: "-1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>Requests</Typography>
        <Chip sx={{ marginRight: 2 }} label={requests.length} />
      </Box>
      <Box sx={{ maxHeight: "300px", overflow: "scroll", overflowX: "hidden" }}>
        {requests.map((request) => (
          <Request key={request.id} request={request}></Request>
        ))}
      </Box>
    </Box>
  );
};

export default Requests;
