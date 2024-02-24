import React, { useEffect, useState } from "react";
import Result from "./Result";

function ResultList() {
const [resultList] = useState([]);
  return (
    <div>
      {resultList &&
        resultList.map(post => (
          <Result post={post} key={post.postId} />
        ))}
    </div>
  );
}

export default ResultList;
