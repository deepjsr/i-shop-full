import React from "react";

function PageNotFound() {
  return (
    <div style={{ height: "100vh" }}>
      <div
        class="d-flex justify-content-center 
					align-items-center flex-column 
					text-center w-100 my-5"
      >
        {/* <div class="bg_img w-50 my-4"></div> */}
        <div
          class="d-flex justify-content-center 
					align-items-center flex-column 
					text-center"
        >
          <p class="display-4">Looks Like You're Lost</p>
          <p>The page you are looking for not available...</p>
          <a
            href="/"
            class="text-white text-decoration-none px-4 py-3 
						bg-success d-inline-block mt-2 rounded"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
